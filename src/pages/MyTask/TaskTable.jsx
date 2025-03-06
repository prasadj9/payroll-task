import React, { useEffect, useState } from "react";
import { ButtonGroup, IconButton, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  AccessTime,
  DeleteForeverOutlined,
  ThumbUpAltOutlined,
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

const TaskTable = ({ search }) => {
  const dispatch = useDispatch();
  const { filterData } = useSelector((state) => state.task);
  const { tasks, totalCount, loading } = useSelector((state) => state.task);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [sortModel, setSortModel] = useState([]);
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
      sortColumn: sortModel.length > 0 ? sortModel[0].field : "",
      sortOrder: sortModel.length > 0 ? sortModel[0].sort : "",
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

  const fetchAllTasks = ({ pageNo, pageSize, sortColumn, sortOrder }) => {
    const payload = {
      From: pageNo * pageSize + 1,
      To: pageSize * (pageNo + 1),
      Title: search,
      UserId: 1248,
      IsArchive: false,
      UserIds: "",
      Priority: "",
      TaskStatus: "",
      FromDueDate: "",
      ToDueDate: "",
      SortByDueDate: "",
      SortColumn: sortColumn,
      SortOrder: sortOrder,
      ...filterData
    };
    dispatch(fetchTasks(payload));
  };
  useEffect(() => {
    fetchAllTasks({
      pageNo: paginationModel.page,
      pageSize: paginationModel.pageSize,
      sortColumn: sortModel.length > 0 ? sortModel[0].field : "",
      sortOrder: sortModel.length > 0 ? sortModel[0].sort : "",
    });
  }, [dispatch, rowsPerPage, search, sortModel, paginationModel, filterData]);

  const columns = [
    {
      field: "Title",
      headerName: "Title",
      sortable: false,
      minWidth: 100,
      flex : 1,
      renderCell: (params) => (
        <span style={{ color: "blue" }}>{params.row.Title}</span>
      ),
    },
    {
      field: "LeadName",
      headerName: "Customer Name",
      sortable: false,
      minWidth: 100,
      flex : 1,
      renderCell: (params) => (
        <span style={{ color: "blue" }}>{params.row.LeadName || "-"}</span>
      ),
    },
    { field: "AssignedByUserName", headerName: "Assigned By", sortable: false },
    {
      field: "createDate",
      headerName: "Assigned Date",
      sortable: true,
      minWidth: 100,
      flex : 1,
      renderCell: (params) => formatDate(params.row.CreateDate),
    },
    {
      field: "TaskEndDate",
      headerName: "Due Date",
      sortable: true,
      flex : 1,
      minWidth: 100,
      renderCell: (params) => formatDate(params.row.TaskEndDate),
    },
    { field: "Priority", headerName: "Priority", sortable: false },
    {
      field: "Status",
      headerName: "Status",
      flex : 1,
      minWidth: 100,
      sortable: false,
      renderCell: (params) => (
        <span style={{ color: getStatus(params.row.TaskStatus).color }}>
          {getStatus(params.row.TaskStatus).text}
        </span>
      ),
    },
    {
      field: "",
      headerName: "Action",
      minWidth: 250,
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
              onClick={() => {
                setSelectedTask(params.row?.TaskId);
                setIsConfirmOpen(true);
              }}
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
              onClick={() => {
                setSelectedTask(params.row.TaskId);
                setIsPartialTaskModalOpen(true);
              }}
            >
              <AccessTime />
            </IconButton>
          </ButtonGroup>
        );
      },
    },
  ];

  const handleConfirmDelete = () => {
    if (selectedTask) dispatch(deleteTask(selectedTask));
    setSelectedTask(null);
    setIsConfirmOpen(false);
  };

  const handleSortModelChange = (newSortModel) => {
    setSortModel(newSortModel);
  };

  return (
    <Paper sx={{ width: "100%", overflowX: "auto" }}>
      <DataGrid
        columns={columns}
        rows={tasks}
        rowCount={totalCount}
        paginationMode="server"
        loading={loading}
        getRowId={(row) => row?.TaskId}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        pageSizeOptions={rowsPerPage}
        sortingMode="server"
        onSortModelChange={handleSortModelChange}
        sx={{
          fontSize: "14px",
          "& .MuiDataGrid-root": {
            overflowX: "auto", // Handle horizontal overflow
          },
          "& .MuiDataGrid-columnHeaders": {
            fontSize: "14px",
            "@media (max-width: 600px)": {
              fontSize: "12px", // Adjust font size for smaller screens
            },
          },
          "& .MuiDataGrid-cell": {
            display: "flex",
            justifyContent: "left",
            fontSize: "13px",
            "@media (max-width: 600px)": {
              fontSize: "11px", // Adjust cell font size
            },
          },
          '& .MuiDataGrid-row:hover': {
            cursor: 'pointer'
          },
          "--DataGrid-overlayHeight": "300px",
        }}
      />
      <PartialCompleteModal
        isOpen={isPartialTaskModalOpen}
        handleClose={() => setIsPartialTaskModalOpen(false)}
        taskId={selectedTask}
        handleUpdateTaskStatus={handleUpdateTaskStatus}
      />
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
