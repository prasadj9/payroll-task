import TaskTable from "./TaskTable";
import AddTaskForm from "./AddTaskForm";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button, Stack } from "@mui/material";
import FilterButton from "./FilterButton";

const MyTask = () => {
  return (
    <div style={{ width: "100%" }}>
      <Stack direction="row" justifyContent="space-between" m={2}>
        <FilterButton />
        <Button variant="contained">Add Task</Button>
      </Stack>
      <TaskTable />
    </div>
  );
};

export default MyTask;
