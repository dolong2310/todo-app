import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1, 0, 1, 1),
        minWidth: 130,
    },
}));

SelectForm.propTypes = {
    onchange: PropTypes.func,
};

function SelectForm({ onChange = null }) {
    const classes = useStyles();
    const [value, setValue] = useState("");

    const handleChange = (event) => {
        setValue(event.target.value);
        if (onChange) onChange(event.target.value);
    };

    return (
        <>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="simple-select-outlined-label">
                    Filters
                </InputLabel>
                <Select
                    labelId="simple-select-outlined-label"
                    value={value}
                    onChange={handleChange}
                    label="Filters"
                    MenuProps={{
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right",
                        },
                        transformOrigin: {
                            vertical: "top",
                            horizontal: "right",
                        },
                        getContentAnchorEl: null,
                    }}
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="new">New</MenuItem>
                </Select>
            </FormControl>
        </>
    );
}

export default SelectForm;
