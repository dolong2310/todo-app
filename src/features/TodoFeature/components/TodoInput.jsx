import { TextField } from "@material-ui/core";
import React from "react";
import { Controller } from "react-hook-form";

TodoInput.propTypes = {};

function TodoInput(props) {
    const { form, name, label, disabled } = props;
    const { errors } = form;
    const hasError = errors[name];

    return (
        <Controller
            name={name}
            control={form.control}
            render={({ onChange, onBlur, value, name }) => (
                <TextField
                    name={name}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    fullWidth
                    autoFocus
                    variant="outlined"
                    label={label}
                    disabled={disabled}
                    error={hasError}
                    helperText={errors[name]?.message}
                />
            )}
            label={label}
            variant="outlined"
        />
    );
}

export default TodoInput;
