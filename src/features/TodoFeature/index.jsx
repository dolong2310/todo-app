import { Box, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectForm from "./components/SelectForm";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import {
    addTodo,
    filteredTodoList,
    getData,
    searchTodoList,
} from "./todoSlice";
import Skeleton from "@material-ui/lab/Skeleton";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory, useLocation, useRouteMatch } from "react-router";
import queryString from "query-string";
import SearchForm from "./components/SearchForm";

TodoFeature.propTypes = {};

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "600px",
        width: "100%",
        margin: "50px auto 0",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",

        "& > h1": {
            marginBottom: theme.spacing(2),
        },
    },

    form: {
        display: "flex",
        alignItems: "center",
        width: "100%",
    },
}));

function TodoFeature(props) {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const loggedInUser = useSelector((state) => state.user.current);
    const isLoggedIn = !!loggedInUser.id; // if has user.current.id assign true and vice versa

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getData());
        }
        setLoading(false);
    }, [dispatch, isLoggedIn]);

    const todoList = useSelector((state) => {
        const all = state.todo.data;
        const filterList = state.todo.filter;
        const searchItem = state.todo.searchTerm;

        const urlParams = queryString.parse(location.search).status; // type string, is value when selectForm pass up (handleFiltersChange)

        // filter item by search
        const searched = all.filter((item) => {
            return item.title.includes(searchItem);
        });

        if (urlParams === "all" || filterList === "all") {
            if (searched.length > 0) {
                return searched;
            } else {
                return [];
            }
        } else {
            return all.filter(
                (item) => urlParams === "all" || urlParams === item.status
            );
        }
    });

    const handleFiltersChange = (value) => {
        dispatch(filteredTodoList(value));

        // set query param = status: value(all/completed/new)
        const queryParams = { status: value };
        // navigate to location.search with url param ?status=(all/completed/new)
        history.push({
            pathname: match.path,
            search: queryString.stringify(queryParams),
        });
    };

    const handleSubmit = (value) => {
        const userId = JSON.parse(localStorage.getItem("user")).id;
        console.log(userId);
        const formValues = {
            id: Math.trunc(Math.random() * 100000),
            userId: userId,
            ...value,
            status: "new",
        };
        dispatch(addTodo(formValues));
    };

    const handleSearchSubmit = (value) => {
        console.log("FORM SUBMIT: ", value);
        dispatch(searchTodoList(value));
    };

    return (
        <>
            {loading ? (
                <Box className={classes.root}>
                    <Skeleton
                        variant="text"
                        style={{ width: "136px", height: "50px" }}
                    />
                    <Box className={classes.form}>
                        <Skeleton
                            variant="text"
                            style={{ width: "462px", height: "70px" }}
                        />
                        <Skeleton
                            variant="text"
                            style={{
                                marginLeft: "8px",
                                width: "130px",
                                height: "70px",
                            }}
                        />
                    </Box>
                    <CircularProgress style={{ marginTop: "16px" }} />
                </Box>
            ) : (
                <Box className={classes.root}>
                    <h1>Todo List</h1>
                    <SearchForm
                        onSubmit={handleSearchSubmit}
                        isLoggedIn={isLoggedIn}
                    />
                    <Box className={classes.form}>
                        <TodoForm
                            onSubmit={handleSubmit}
                            isLoggedIn={isLoggedIn}
                        />
                        <SelectForm onChange={handleFiltersChange} />
                    </Box>
                    {isLoggedIn ? (
                        <TodoList todoList={todoList} />
                    ) : (
                        <Typography variant="subtitle1">
                            Please login to create your to do list
                        </Typography>
                    )}
                </Box>
            )}
        </>
    );
}

export default TodoFeature;
