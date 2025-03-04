import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, IconButton, Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  ThumbUp,
  BarChart,
  Delete,
  CheckCircle,
  AccessTime,
  DeleteForeverOutlined,
  ThumbUpAltOutlined,
  CheckCircleOutlineOutlined,
  CheckCircleOutline,
  ArchiveOutlined,
  BarChartOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  fetchTasks,
  updateTaskStatus,
} from "../../store/slices/taskSlice";
import { getStatus } from "../../utils/utils";
import dayjs from "dayjs";
import PartialCompleteModal from "./PartialCompleteModal";
import ConfirmModal from "../../components/ConfirmModal";

const DEFAULT_PAGE_NO = 0;
const rowsPerPage = [10, 25, 50, 100];

const TaskTable = () => {
  const dispatch = useDispatch();
  const { tasks, totalCount } = useSelector((state) => state.task);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isPartialTaskModalOpen, setIsPartialTaskModalOpen] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: rowsPerPage[0],
    page: DEFAULT_PAGE_NO,
  });

  const onPaginationModelChange = (value) => {
    fetchAllTasks({
      pageNo:
        paginationModel.pageSize === value.pageSize
          ? value.page
          : DEFAULT_PAGE_NO,
      pageSize: value.pageSize,
    });
    setPaginationModel({
      ...value,
      page:
        paginationModel.pageSize === value.pageSize
          ? value.page
          : DEFAULT_PAGE_NO,
    });
  };

  const formatDate = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };

  const handleUpdateTaskStatus = (TaskId, TaskStatusValue) => {
    dispatch(updateTaskStatus({ TaskId, TaskStatusValue }));
    setSelectedTask(null);
    setIsPartialTaskModalOpen(false);
  };

  const fetchAllTasks = ({ pageNo, pageSize }) => {
    const payload = {
      From: pageNo * pageSize + 1,
      To: pageSize * (pageNo + 1),
      Title: "",
      UserId: 1248,
      IsArchive: false,
      UserIds: "",
      Priority: "",
      TaskStatus: "",
      FromDueDate: "",
      ToDueDate: "",
      SortByDueDate: "",
      SortColumn: "",
      SortOrder: "",
    };
    dispatch(fetchTasks(payload));
  };
  useEffect(() => {
    // pageNo: paginationModel.page, pageSize: paginationModel.pageSize
    fetchAllTasks({
      pageNo: paginationModel.page,
      pageSize: paginationModel.pageSize,
    });
  }, [dispatch, rowsPerPage]);

  const columns = [
    {
      field: "Title",
      headerName: "Title",
      renderCell: (params) => (
        <span style={{ color: "blue" }}>{params.row.Title}</span>
      ),
    },
    {
      field: "LeadName",
      headerName: "Customer Name",
      renderCell: (params) => (
        <span style={{ color: "blue" }}>{params.row.LeadName || "-"}</span>
      ),
    },
    { field: "AssignedByUserName", headerName: "Assigned By" },
    {
      field: "createDate",
      headerName: "Assigned Date",
      renderCell: (params) => formatDate(params.row.CreateDate),
    },
    {
      field: "TaskEndDate",
      headerName: "Due Date",
      renderCell: (params) => formatDate(params.row.TaskEndDate),
    },
    { field: "Priority", headerName: "Priority" },
    {
      field: "Status",
      headerName: "Status",
      renderCell: (params) => (
        <span style={{ color: getStatus(params.row.TaskStatus).color }}>
          {getStatus(params.row.TaskStatus).text}
        </span>
      ),
    },
    {
      field: "",
      headerName: "Action",
      width: 100,
      flex: 1,
      renderCell: (params) => {
        const isTaskPartial =
          params.row.CompletionPercentage !== -1 &&
          params.row.CompletionPercentage !== 100;
        return (
          <ButtonGroup variant="outlined">
            <IconButton>
              <ArchiveOutlined />
            </IconButton>

            <IconButton
              color="primary"
              sx={{
                visibility: params.row.TaskStatus === -1 ? "visible" : "hidden",
              }}
              onClick={() => handleUpdateTaskStatus(params.row.TaskId, 0)}
            >
              <ThumbUpAltOutlined />
            </IconButton>
            <IconButton color="info">
              <BarChartOutlined />
            </IconButton>

            <IconButton
              color="error"
              onClick={() => {setSelectedTask(params.row?.TaskId); setIsConfirmOpen(true);}}
            >
              <DeleteForeverOutlined />
            </IconButton>

            <IconButton
              color="secondary"
              sx={{ visibility: isTaskPartial ? "visible" : "hidden" }}
              onClick={() => handleUpdateTaskStatus(params.row.TaskId, 100)}
            >
              <CheckCircleOutline />
            </IconButton>
            <IconButton
              color="success"
              sx={{ visibility: isTaskPartial ? "visible" : "hidden" }}
              onClick={() =>{setSelectedTask(params.row.TaskId); setIsPartialTaskModalOpen(true)}}
            >
              <AccessTime />
            </IconButton>
          </ButtonGroup>
        );
      },
    },
  ];

  
  const handleConfirmDelete = () => {
    if(selectedTask)
    dispatch(deleteTask(selectedTask));
    setSelectedTask(null);
    setIsConfirmOpen(false);
  }

  return (
    <Paper>
      <PartialCompleteModal/>
      <DataGrid
        columns={columns}
        rows={tasks}
        rowCount={totalCount}
        paginationMode="server"
        loading={!tasks?.length}
        getRowId={(row) => row?.TaskId}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        pageSizeOptions={rowsPerPage}
      />
      <PartialCompleteModal isOpen={isPartialTaskModalOpen} handleClose={() => setIsPartialTaskModalOpen(false)} taskId={selectedTask} handleUpdateTaskStatus={handleUpdateTaskStatus}  />
      <ConfirmModal
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Task"
        message="Do you want to delete this Task?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </Paper>
  );
};

export default TaskTable;
