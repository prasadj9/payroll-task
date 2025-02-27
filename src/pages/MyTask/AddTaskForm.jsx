import {
  Box,
  Button,
  InputAdornment,
  Tab,
  Tabs,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const AddTaskForm = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const { control, register, handleSubmit, reset } = useForm();
  const fileName = "New";

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <Box sx={{ width: "500px", margin: "auto", padding: 3, boxShadow: 3 }}>
      <h2>Add Task</h2>
      <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth">
        <Tab label="Assign to Others" />
        <Tab label="Assign to Me" />
      </Tabs>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
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
        <input type="file" id="file-input" />
      </Box>
    </Box>
  );
};

export default AddTaskForm;
