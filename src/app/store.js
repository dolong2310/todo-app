import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/TodoFeature/todoSlice";
import userReducer from "../features/auth/userSlice";

const rootReducer = {
    todo: todoReducer,
    user: userReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
