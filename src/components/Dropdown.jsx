import { MenuItem, TextField } from "@mui/material";
import React from "react";

const Dropdown = ({ data, defaultValue, placeholder }) => {
    return (
        <TextField
            select
            label="Select"
            defaultValue={defaultValue}
            variant="outlined"
            SelectProps={{
                displayEmpty: true,
                renderValue: (value) => value || placeholder,
            }}
            sx={{ m: 1, width: "250px" }}
        >
            <MenuItem disabled value="">
                {placeholder}
            </MenuItem>
            {data.map((option) => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default Dropdown;
