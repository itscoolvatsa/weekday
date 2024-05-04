import { Autocomplete, Chip, MenuItem, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

const Dropdown = ({ data, defaultValue, placeholder }) => {
    const [selectedValue, setSelectedValue] = useState(defaultValue);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <TextField
            select
            label="Select"
            defaultValue={defaultValue}
            value={selectedValue}
            onChange={handleChange}
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
                <MenuItem
                    key={option}
                    value={option}
                    selected={selectedValue === option}
                >
                    {option}
                </MenuItem>
            ))}
        </TextField>
    );
};

const MultiSelectAutocomplete = ({ data, defaultValue }) => {
    const [selectedValues, setSelectedValues] = React.useState(defaultValue);

    const handleChange = (event, newValues) => {
        setSelectedValues(newValues);
    };

    return (
        <Stack sx={{ m: 1, width: "250px" }}>
            <Autocomplete
                multiple
                id="tags-outlined"
                options={data}
                onChange={handleChange}
                getOptionLabel={(data) => data}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={defaultValue}
                        placeholder={defaultValue}
                    />
                )}
            />
            {console.log(selectedValues)}
        </Stack>
    );
};

export { Dropdown, MultiSelectAutocomplete };
