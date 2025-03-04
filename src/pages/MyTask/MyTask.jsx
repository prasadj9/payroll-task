import TaskTable from "./TaskTable";
import AddTaskForm from "./AddTaskForm";

import { Button, Stack, TextField } from "@mui/material";
import FilterButton from "./FilterButton";

const MyTask = () => {
  return (
    <div style={{ width: "100%" }}>
      <Stack direction="row" justifyContent="space-between" m={2}>
        <FilterButton />
        <Stack direction="row" gap={2}>
          <TextField label="Search" variant="standard"   />
        </Stack>
        <AddTaskForm/>
      </Stack>
      <TaskTable />
    </div>
  );
};

export default MyTask;
