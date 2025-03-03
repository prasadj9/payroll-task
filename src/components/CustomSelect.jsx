import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const CustomSelect = ({ label, options=[], value, onChange, name, fullWidth = true }, props) => {
  return (
    <FormControl fullWidth={fullWidth} margin="normal" variant="standard">
      <InputLabel>{label}</InputLabel>
      <Select name={name} value={value} onChange={onChange} {...props} >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
