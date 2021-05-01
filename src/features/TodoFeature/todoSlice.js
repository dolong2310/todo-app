import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import todoApi from "../../api/todoApi";

export const getData = createAsyncThunk("todo/getData", async () => {
    // call API & return data has userId matched with user id when logged in (userId match id of user in local storage)
    const data = await todoApi.getAll({
        userId: JSON.parse(localStorage.getItem("user")).id,
    });
    return data;
});

const todoSlice = createSlice({
    name: "todo",
    initialState: {
        data: [],
        filter: "all",
        status: null,
        searchTerm: "",
    },
    reducers: {
        addTodo(state, action) {
            // add item to array
            state.data.push(action.payload);

            // add item to server
            (async () => {
                await todoApi.add(action.payload);
            })();
        },
        updateTodo(state, action) {
            // update item to client
            // if current state id match action.payload.id then break out the loop
            // now index++ match with item you clicked => update object from action.payload to object of current state
            let index = -1;
            for (let i = 0; i < state.data.length; i++) {
                index++;
                if (state.data[i].id === action.payload.id) {
                    break;
                }
            }

            if (index !== -1) {
                state.data[index] = action.payload;

                // update item to server
                (async () => {
                    await todoApi.update((state.data[index] = action.payload));
                })();
            }
        },
        removeTodo(state, action) {
            const { index, id } = action.payload;

            // remove item to array
            state.data.splice(index, 1);

            // remove item to server
            (async () => {
                await todoApi.remove(id);
            })();
        },
        completedTodo(state, action) {
            const { id, status } = action.payload;

            // if id of item match with action.payload(id from todoFeature) then toggle status of it
            const index = state.data.findIndex((item) => item.id === id);
            if (index === -1) return;
            state.data[index].status === "completed"
                ? (state.data[index].status = "new")
                : (state.data[index].status = "completed");

            // update item to server
            (async () => {
                const formValues = {
                    ...action.payload,
                    status: status === "completed" ? "new" : "completed",
                };
                await todoApi.update(formValues);
            })();
        },
        filteredTodoList(state, action) {
            // filter todo list
            state.filter = action.payload;
        },
        searchTodoList(state, action) {
            state.searchTerm = action.payload;
        },
    },
    extraReducers: {
        [getData.pending]: (state) => {
            state.status = "loading";
        },
        [getData.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = "success";
        },
        [getData.rejected]: (state) => {
            state.status = "failed";
        },
    },
});

const { actions, reducer } = todoSlice;
export const {
    addTodo,
    updateTodo,
    removeTodo,
    completedTodo,
    filteredTodoList,
    searchTodoList,
} = actions;
export default reducer;
