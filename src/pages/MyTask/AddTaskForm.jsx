import {
  AppBar,
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import dayjs from "dayjs";

const AddTaskForm = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const { control, register, handleSubmit, reset } = useForm();
  const fileName = "New";

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <Box sx={{ width: {
      xs: '90%',    // 90% of the parent width on small screens
      sm: '70%',    // 70% of the parent width on small tablets
      md: '50%',    // 50% of the parent width on medium screens (desktops)
    }, margin: "auto", boxShadow: 3, height: "70vh", overflow: "hidden", display : "flex", flexDirection : "column" }}>
      {/* AppBar at the top */}
      <AppBar position="sticky" sx={{ top: 0, width: "100%", background: "white", color: "black" }}>
        <Toolbar >
          <Typography  sx={{flexGrow : 1}} >Add Task</Typography>
        </Toolbar>
      </AppBar>

      {/* Tabs for switching between sections */}
      <Tabs value={tabIndex} onChange={handleTabChange} textColor="inherit"
  indicatorColor="primary" >
        <Tab label="Assign to Others" />
        <Tab label="Assign to Me" />
      </Tabs>

      {/* Form content */}
      <Box component="form" onSubmit={handleSubmit} sx={{ flexGrow : 1, px : 2, overflowY: "auto", height: "calc(100% - 120px)", pb : 2 }}>
        <TextField
          fullWidth
          label="Title"
          {...register("title")}
          margin="normal"
          variant="standard"
          required
        />
        <TextField
          fullWidth
          label="Description"
          {...register("description")}
          margin="normal"
          variant="standard"
          required
          multiline
          rows={2}
        />

        {/* File Upload */}
        <TextField
          label="Upload File"
          value={fileName}
          onClick={() => document.getElementById("file-input").click()}
          disabled
          margin="normal"
          variant="standard"
          fullWidth
          InputProps={{
            endAdornment: fileName && (
              <InputAdornment position="end">
                <Button variant="text" color="secondary" onClick={() => {}}>
                  Remove
                </Button>
              </InputAdornment>
            ),
          }}
        />
        <input type="file" id="file-input" style={{ display: "none" }} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
        

          <Box sx={{display: 'flex',
    flexDirection: {
      xs: 'column',  // For xs (mobile): vertical
      sm: 'row',     // For sm (tablet): horizontal
      md: 'row',     // For md (medium): horizontal
      lg: 'row',     // For lg (large): horizontal
    },
    gap: '10px',}} >
          {/* Lead/Customer Name */}
          <FormControl fullWidth sx={{flex: 1}} >
            <InputLabel>Lead/Customer Name</InputLabel>
            <Controller
              name="customer"
              control={control}
              render={({ field }) => (
                <Select {...field} variant="standard">
                  <MenuItem value="Customer 1">Customer 1</MenuItem>
                </Select>
              )}
            />
          </FormControl>

          {/* Due Date */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="duedate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Select Due Date"
                  format="DD MMM YYYY" 
                  minDate={dayjs()}
                  sx={{flex: 1}}
                  slotProps={{textField : {variant : "standard"}}}
                />
              )}
            />
          </LocalizationProvider>
          </Box>

          {/* Priority Selection */}
          <FormControl fullWidth>
            <InputLabel>Select Priority</InputLabel>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Select {...field} variant="standard">
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              )}
            />
          </FormControl>
        </Box>
      </Box>

      {/* Bottom AppBar */}
      <AppBar position="sticky" sx={{ bottom: 0, width: "100%", background: "white", color: "grey", top: "auto" }}>
        <Toolbar sx={{ justifyContent: "end", gap : 2 }}>
          <Button variant="outlined" >Cancel</Button>
          <Button type="submit" variant="contained" color="primary">Add</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AddTaskForm;
