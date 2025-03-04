import {
  AppBar,
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import CustomSelect from "../../components/CustomSelect";
import { priorityOptions } from "../../utils/utils";
import toast from "react-hot-toast";
import MembersList from "./MembersList";

const AddTaskForm = () => {
  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const { control, register, handleSubmit, reset } = useForm();
  const [fileName, setFileName] = useState("");
  const [fileBase64, setFileBase64] = useState("");
  const fileAttachmentRef = useRef(null);

  const [usersModalOpen, setUsersModalOpen] = useState(false)

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };
  const handleCloseModal = () => {
    setOpen(false);
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file size (2 MB limit)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size exceeds 2 MB limit.");
        return;
      }

      // Convert file to base64
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result.split(",")[1]; // Remove the data URL prefix
        setFileBase64(base64String);
        setFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setFileName("");
    setFileBase64("");
    fileAttachmentRef.current.value = ""; // Clear the file input
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)} >Add Task</Button>
    
    <Modal open={open} onClose={handleCloseModal}>
      <Box
        component="div"
        sx={{
          width: {
            xs: "90%", // 90% of the parent width on small screens
            sm: "70%", // 70% of the parent width on small tablets
            md: "50%", // 50% of the parent width on medium screens (desktops)
          },
          margin: "auto",
          boxShadow: 3,
          height: "80vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          background: "white",
        }}
      >
        {/* AppBar at the top */}
        <AppBar
          position="sticky"
          sx={{ top: 0, width: "100%", background: "white", color: "black" }}
        >
          <Toolbar>
            <Typography sx={{ flexGrow: 1 }}>Add Task</Typography>
          </Toolbar>
        </AppBar>

        {/* Tabs for switching between sections */}
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          textColor="inherit"
          indicatorColor="primary"
        >
          <Tab label="Assign to Others" />
          <Tab label="Assign to Me" />
        </Tabs>

        {/* Form content */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            flexGrow: 1,
            px: 3,
            overflowY: "auto",
            height: "calc(100% - 120px)",
            pb: 2,
          }}
        >
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
            label="Add File"
            value={fileName}
            onClick={() => fileAttachmentRef.current.click()}
            margin="normal"
            variant="standard"
            fullWidth
            InputProps={{
              readOnly : true,
              endAdornment: fileName && (
                <InputAdornment position="end">
                  <Button variant="text" color="secondary" onClick={handleRemoveFile}>
                    Remove
                  </Button>
                </InputAdornment>
              ),
            }}
          />
          <input type="file" id="file-input" ref={fileAttachmentRef} style={{ display: "none" }} onChange={handleFileChange}/>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column", // For xs (mobile): vertical
                  sm: "row", // For sm (tablet): horizontal
                  md: "row", // For md (medium): horizontal
                  lg: "row", // For lg (large): horizontal
                },
                gap: "10px",
              }}
            >
              {/* Lead/Customer Name */}
              <FormControl fullWidth sx={{ flex: 1 }}>
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
              
                <Controller
                  name="duedate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Select Due Date"
                      format="DD MMM YYYY"
                      minDate={dayjs()}
                      sx={{ flex: 1 }}
                      slotProps={{ textField: { variant: "standard" } }}
                    />
                  )}
                />
            </Box>

            {/* Priority Selection */}

                  {/* Priority Selection */}
        <CustomSelect
          name="priority"
          label="Select Priority"
          control={control}
          options={priorityOptions}
        />

            {/* <FormControl fullWidth sx={{width : "50%"}} >
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
            </FormControl> */}
          </Box>

          {/* Members */}
          <TextField
            label="Add Users"
            value={"3 users"}
            onClick={() => setUsersModalOpen(true)}
            margin="normal"
            variant="standard"
            fullWidth
            InputProps={{
              readOnly : true,
            }}
          />
        </Box>

        {/* Bottom AppBar */}
        <AppBar
          position="sticky"
          sx={{
            bottom: 0,
            width: "100%",
            background: "white",
            color: "grey",
            top: "auto",
          }}
        >
          <Toolbar sx={{ justifyContent: "end", gap: 2 }}>
            <Button variant="outlined" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Add
            </Button>
          </Toolbar>
        </AppBar>
        <MembersList open={usersModalOpen} handleClose={() => setUsersModalOpen(false)} />
      </Box>
    </Modal>
    </div>
  );
};

export default AddTaskForm;
