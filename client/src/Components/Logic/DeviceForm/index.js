import React from "react";
import TextField from "@material-ui/core/TextField";
import styles from "./styles";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

export default function DeviceForm({ onValuesChange }) {
  const classes = styles();

  const handleChange = (evt) => {
    const value = evt.target.value;
    const name = evt.target.name;
    onValuesChange(name, value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        className={classes.input}
        fullWidth
        id="device-vendor"
        label="Vendor"
        variant="outlined"
        name="vendor"
        onChange={handleChange}
      />
      <FormControl className={classes.formControl}>
        <InputLabel id="device-status-label">Status</InputLabel>
        <Select
          labelId="device-status-label"
          id="device-status"
          name="status"
          onChange={handleChange}
        >
          <MenuItem value="online">Online</MenuItem>
          <MenuItem value="offline">Offline</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
}
