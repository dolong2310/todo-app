import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";

SearchForm.propTypes = {
    onSubmit: PropTypes.func,
    isLoggedIn: PropTypes.bool,
};

function SearchForm({ onSubmit = null, isLoggedIn }) {
    const [value, setValue] = useState("");
    const typingTimeoutRef = useRef(null);

    const handleSearchChange = (e) => {
        console.log(e.target.value);
        const values = e.target.value;
        setValue(values);

        if (!onSubmit) return;

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            onSubmit(values);
        }, 500);
    };

    return (
        <TextField
            name="title"
            value={value}
            onChange={handleSearchChange}
            fullWidth
            autoFocus
            variant="outlined"
            label="Search"
            disabled={!isLoggedIn}
        />
    );
}

export default SearchForm;
