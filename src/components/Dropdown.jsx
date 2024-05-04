import { MenuItem, TextField } from "@mui/material";
import React from "react";

const Dropdown = ({ data, defaultValue }) => {
    return (
        <TextField
            select
            label="Select"
            defaultValue={defaultValue}
            variant="outlined"
            placeholder={defaultValue}
            sx={{ m: 1, width: "250px" }}
        >
            {data.map((option) => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default Dropdown;
