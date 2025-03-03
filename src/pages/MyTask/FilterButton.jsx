import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Popper,
  ClickAwayListener,
  Paper,
} from "@mui/material";
import CustomSelect from "../../components/CustomSelect";
import dayjs from "dayjs";

const FilterButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    member: "",
    fromDate: "",
    toDate: "",
  });

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };


  const priorityOptions = [
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" },
  ];

  const statusOptions = [
    // { label: "All", value: "" },
    { label: "Not Accepted", value: "Not Accepted" },
    { label: "Partial Complete", value: "Partial Complete" },
    { label: "Accepted", value: "Accepted" },
    { label: "Completed", value: "Completed" },
  ];

  const open = Boolean(anchorEl);
  const id = open ? "filter-popper" : undefined;

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Filter
      </Button>

      <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-start">
        <ClickAwayListener onClickAway={handleClose}>
          <Paper sx={{ p: 2, width: 250, boxShadow: 3, borderRadius: 2 }} onClick={(e) => e.stopPropagation()}>
            {/* <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select name="status" value={filters.status} onChange={handleChange}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Not Accepted">Not Accepted</MenuItem>
                <MenuItem value="Partial Complete">Partial Complete</MenuItem>
                <MenuItem value="Accepted">Accepted</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl> */}

            <CustomSelect options={statusOptions}  />
            <CustomSelect options={priorityOptions}  />

            <FormControl fullWidth margin="normal">
              <InputLabel>Priority</InputLabel>
              <Select name="priority" value={filters.priority} onChange={handleChange}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="From Due Date"
              type="date"
              name="fromDate"
              value={filters.fromDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              margin="normal"
            />

            <TextField
              label="To Due Date"
              type="date"
              name="toDate"
              value={filters.toDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              margin="normal"
            />

            <Button onClick={() => setFilters({ status: "", priority: "", fromDate: "", toDate: "" })}>Clear</Button>
            <Button variant="contained" color="primary" onClick={handleClose}>
              Apply
            </Button>
          </Paper>
        </ClickAwayListener>
      </Popper>

    </div>
  );
};

export default FilterButton;
