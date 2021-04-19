import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import TodoItem from "./TodoItem";

TodoList.propTypes = {
    todoList: PropTypes.array,
};

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        width: "100%",
        border: "1px solid #ccc",
        borderRadius: "4px",
        maxHeight: "540px",
        overflowY: "auto",
    },

    empty: {
        marginTop: theme.spacing(2),
        color: theme.palette.grey[500],
    },
}));

function TodoList({ todoList = [] }) {
    const classes = useStyles();
    console.log(todoList);

    return (
        <>
            {todoList.length === 0 ? (
                <p className={classes.empty}>Not have to do</p>
            ) : (
                <div className={classes.root}>
                    {todoList.map((todo, index) => (
                        <TodoItem key={todo.id} todo={todo} index={index} />
                    ))}
                </div>
            )}
        </>
    );
}

export default TodoList;
