import { Box, IconButton, makeStyles } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import CreateIcon from "@material-ui/icons/Create";
import SubdirectoryArrowRightIcon from "@material-ui/icons/SubdirectoryArrowRight";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { completedTodo, updateTodo, removeTodo } from "../todoSlice";

TodoItem.propTypes = {
    todo: PropTypes.object,
    index: PropTypes.number,
};

const useStyles = makeStyles((theme) => ({
    todoItem: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        paddingLeft: theme.spacing(2),
        fontWeight: "bold",

        "&:not(:first-child)": {
            borderTop: "1px solid #ccc",
        },
    },

    todoItemCompleted: {
        color: theme.palette.grey[500],
        textDecoration: "line-through",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        paddingLeft: theme.spacing(2),

        "&:not(:first-child)": {
            borderTop: "1px solid #ccc",
        },
    },

    editTable: {
        border: "none",
        fontSize: "16px",
        fontWeight: "bold",
        color: theme.palette.primary.main,
        flex: 1,
        padding: "14px",
    },

    editTableDisabled: {
        border: "none",
        fontSize: "14px",
        backgroundColor: "transparent",
        color: theme.palette.grey[500],
    },
}));

function TodoItem({ todo, index }) {
    const classes = useStyles();
    const [editTable, setEditTable] = useState(false);
    const [title, setTitle] = useState(todo.title);

    const dispatch = useDispatch();

    const handleRemoveTodo = (index, id) => {
        const action = removeTodo({ index, id });
        dispatch(action);
    };

    const handleCompleted = (todo) => {
        const action = completedTodo(todo);
        dispatch(action);
    };

    return (
        <>
            <Box
                className={
                    todo.status === "completed"
                        ? classes.todoItemCompleted
                        : classes.todoItem
                }
            >
                {editTable ? (
                    <input
                        type="text"
                        className={classes.editTable}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                ) : (
                    <p key={todo.id}>{todo.title}</p>
                )}

                <Box>
                    {todo.status === "new" && (
                        <IconButton
                            onClick={() => {
                                dispatch(
                                    updateTodo({
                                        ...todo,
                                        title: title,
                                    })
                                );

                                setEditTable(!editTable);
                            }}
                        >
                            {editTable ? (
                                <SubdirectoryArrowRightIcon />
                            ) : (
                                <CreateIcon />
                            )}
                        </IconButton>
                    )}

                    <IconButton onClick={() => handleCompleted(todo)}>
                        <CheckIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => handleRemoveTodo(index, todo.id)}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
            </Box>
        </>
    );
}

export default TodoItem;
