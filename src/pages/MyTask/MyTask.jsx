import TaskTable from "./TaskTable";
import AddTaskForm from "./AddTaskForm";

import { Button, Stack, TextField } from "@mui/material";
import FilterButton from "./FilterButton";
import { useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import AppliedFilters from "./AppliedFilters";

const MyTask = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearch = useDebounce(searchTerm, 1000);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };


  return (
    <div style={{ width: "100%" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" m={2}>
        <FilterButton />
        <Stack direction="row" gap={2}>
          <TextField label="Search" variant="standard" value={searchTerm}
          onChange={handleSearchChange}   />
        </Stack>
        <AddTaskForm/>
      </Stack>
        <AppliedFilters/>
      <TaskTable search={debounceSearch}/>
    </div>
  );
};

export default MyTask;
