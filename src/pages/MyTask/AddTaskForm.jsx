import {
  AppBar,
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import CustomSelect from "../../components/CustomSelect";
import { getMediaDetails, getUserId, priorityOptions } from "../../utils/utils";
import toast from "react-hot-toast";
import MembersList from "./MembersList";
import { useDispatch } from 'react-redux';
import { addTask } from "../../store/slices/taskSlice";
import useLeadMembers from "../../hooks/useLeads";

const AddTaskForm = () => {
  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const { control, register, handleSubmit, reset, setValue, watch, formState : {errors} } = useForm();
  const [fileName, setFileName] = useState("");
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const fileAttachmentRef = useRef(null);
  const {leadMembers, loading} = useLeadMembers();

  const [usersModal, setUsersModal] = useState({ open: false, type: null });

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file size (2 MB limit)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size exceeds 2 MB limit.");
        return;
      }
      setFile(file);
      setFileName(file.name);
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setFileName("");
    fileAttachmentRef.current.value = ""; // Clear the file input
  };

  const setMembers = (memberIds) => {
    if (usersModal.open) setValue(usersModal.type, memberIds);
  };

  const onSubmit = async (values) => {
    dispatch(addTask({...values, file}))
    
  };
  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Task
      </Button>

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
            onSubmit={handleSubmit(onSubmit)}
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
              {...register("Title", {
                required: "Title is required",
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Title should only contain alphabat",
                },
              })}
              margin="normal"
              variant="standard"
              error={!!errors.Title}
              helperText={errors.Title?.message}    
              required
            />
            <TextField
              fullWidth
              label="Description"
              {...register("Description", {required: "Description is required"})}
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
                readOnly: true,
                endAdornment: fileName && (
                  <InputAdornment position="end">
                    <Button
                      variant="text"
                      color="secondary"
                      onClick={handleRemoveFile}
                    >
                      Remove
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
            <input
              type="file"
              id="file-input"
              ref={fileAttachmentRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
            >
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
                  {/* <InputLabel>Lead/Customer Name</InputLabel> */}
                  <Controller
                    name="LeadId"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                      {...field}
                      options={leadMembers}
                      getOptionKey={(option) => option.id}
                      renderInput={(params) => <TextField {...params} variant="standard" label="Lead/Customer Name" />}
                    />
                    )}
                  />
                </FormControl>

                {/* Due Date */}

                <Controller
                  name="TaskEndDate"
                  control={control}
                  rules={{
                    required: "Due Date is required",
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      label="Select Due Date"
                      format="DD MMM YYYY"
                      minDate={dayjs()}
                      sx={{ flex: 1 }}
                      slotProps={{ textField: { variant: "standard", error: !!error,
                        helperText: error ? error.message : "", required : true } }}
                    />
                  )}
                />
              </Box>

              {/* Priority Selection */}
              <CustomSelect
                name="priority"
                label="Select Priority"
                control={control}
                options={priorityOptions}
              />

            </Box>

            {/* Members */}
            <TextField
              name="UserIds"
              label="Add Users"
              value={
                watch("UserIds")
                  ? Object.keys(watch("UserIds")).length + " Users"
                  : ""
              }
              onClick={() => setUsersModal({ open: true, type: "UserIds" })}
              margin="normal"
              variant="standard"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />

            {/* CC Members */}
            <TextField
              name="TaskOwners"
              label="Add CC Members"
              value={
                watch("TaskOwners")
                  ? Object.keys(watch("TaskOwners")).length + " Users"
                  : ""
              }
              onClick={() => setUsersModal({ open: true, type: "TaskOwners" })}
              margin="normal"
              variant="standard"
              fullWidth
              InputProps={{
                readOnly: true,
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
              <Button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                variant="contained"
                color="primary"
              >
                Add
              </Button>
            </Toolbar>
          </AppBar>
          <MembersList
            open={usersModal.open}
            handleClose={() => setUsersModal({ open: false, type: null })}
            setcheckedMembers={setMembers}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default AddTaskForm;
