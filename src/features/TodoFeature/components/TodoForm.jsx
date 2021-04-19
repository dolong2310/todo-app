import React from "react";
import PropTypes from "prop-types";
import TodoInput from "./TodoInput";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { makeStyles } from "@material-ui/core";

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
    isLoggedIn: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
    form: {
        width: "100%",
    },
}));

function TodoForm({ onSubmit = null, isLoggedIn }) {
    const classes = useStyles();
    const schema = yup.object().shape({
        title: yup.string().required("Please enter your todo"),
    });

    const form = useForm({
        defaultValues: {
            title: "",
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = (value) => {
        if (!onSubmit) return;
        onSubmit(value);

        form.reset();
    };

    return (
        <form
            className={classes.form}
            onSubmit={form.handleSubmit(handleSubmit)}
        >
            <TodoInput
                name="title"
                label="Todo"
                form={form}
                disabled={!isLoggedIn}
            />
        </form>
    );
}

export default TodoForm;
