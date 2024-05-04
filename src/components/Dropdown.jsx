import { Autocomplete, Stack, TextField } from "@mui/material";
import React from "react";

const MultiSelectAutocomplete = ({
    data,
    defaultValue,
    onSelectedDataChange,
}) => {
    const handleChange = (event, newValues) => {
        onSelectedDataChange(newValues);
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
        </Stack>
    );
};

export { MultiSelectAutocomplete };
