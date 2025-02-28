import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    TablePagination,
  } from "@mui/material";
  import { ThumbUp, BarChart, Delete, CheckCircle, AccessTime } from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../store/slices/taskSlice';
import dayjs from './../../../node_modules/dayjs/esm/index';
import { getStatus } from '../../utils/utils';
  

const taskData = [
    { title: "Outside geofence test : Make a Phone call", customer: "VishalCustomer Murudkar", assignedBy: "Rijo Varghese", assignedDate: "27 Feb 2025", dueDate: "28 Feb 2025", priority: "High", status: "Not Accepted" },
    { title: "Outside geofence test", customer: "-", assignedBy: "Rijo Varghese", assignedDate: "27 Feb 2025", dueDate: "28 Feb 2025", priority: "High", status: "Not Accepted" },
    { title: "asads", customer: "ArchiveTest", assignedBy: "Rijo Varghese", assignedDate: "11 Feb 2025", dueDate: "25 Feb 2025", priority: "High", status: "Accepted" },
    { title: "asd", customer: "ArchiveTest", assignedBy: "Rijo Varghese", assignedDate: "11 Feb 2025", dueDate: "25 Feb 2025", priority: "High", status: "Accepted" },
    { title: "test", customer: "ArchiveTest", assignedBy: "Rijo Varghese", assignedDate: "11 Feb 2025", dueDate: "28 Feb 2025", priority: "High", status: "Completed" },
    { title: "dsvdv", customer: "OmkarTest2", assignedBy: "Rijo Varghese", assignedDate: "07 Feb 2025", dueDate: "07 Feb 2025", priority: "Low", status: "Not Accepted" },
    { title: "sadas", customer: "My company 2", assignedBy: "Rijo Varghese", assignedDate: "29 Jan 2025", dueDate: "29 Jan 2025", priority: "High", status: "Not Accepted" },
    { title: "aa", customer: "My company 2", assignedBy: "Rijo Varghese", assignedDate: "29 Jan 2025", dueDate: "29 Jan 2025", priority: "High", status: "Not Accepted" },
    { title: "Jayesh", customer: "My company 2", assignedBy: "Rijo Varghese", assignedDate: "29 Jan 2025", dueDate: "29 Jan 2025", priority: "High", status: "Not Accepted" },
  ];

const TaskTable = () => {
    const [page, setPage] = useState(0)
    const {tasks, totalCount} = useSelector((state) => state.task)
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const formatDate = (date) => {
        return dayjs(date).format("YYYY-MM-DD");
    }

    const dispatch = useDispatch();
    useEffect(() => {
        const payload = {
            "From": (page + 1),
            "To": (page + 1) * rowsPerPage,
            "Title": "",
            "UserId": 1248,
            "IsArchive": false,
            "UserIds": "",
            "Priority": "",
            "TaskStatus": "",
            "FromDueDate": "",
            "ToDueDate": "",
            "SortByDueDate": "",
            "SortColumn": "",
            "SortOrder": ""
        }
        dispatch(fetchTasks(payload))
    }, [dispatch, page, rowsPerPage])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

  return (
    <Paper>

    <TableContainer component={Paper} sx={{ maxWidth: "95%", margin: "auto", mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Assigned By</TableCell>
            <TableCell>Assigned Date</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks?.map((task, index) => (
            <TableRow key={index}>
              <TableCell>{task.Title}</TableCell>
              <TableCell>{task.LeadName}</TableCell>
              <TableCell>{task.AssignedByUserName}</TableCell>
              <TableCell>{formatDate(task.CreateDate)}</TableCell>
              <TableCell>{ formatDate(task.TaskEndDate)}</TableCell>
              <TableCell>{task.Priority}</TableCell>
              <TableCell sx={{ color: getStatus(task.TaskStatus).color }}>
                { getStatus(task.TaskStatus).text}
              </TableCell>
              <TableCell>
                <IconButton color="primary"><ThumbUp /></IconButton>
                <IconButton color="secondary"><BarChart /></IconButton>
                <IconButton color="error"><Delete /></IconButton>
                {task.status === "Accepted" && <IconButton color="success"><CheckCircle /></IconButton>}
                {task.status === "Accepted" && <IconButton color="primary"><AccessTime /></IconButton>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
    rowsPerPageOptions={[5, 10, 25]}
    component="div"
    count={totalCount}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </Paper>
  )
}

export default TaskTable