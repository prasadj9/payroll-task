import React, { useEffect, useState } from "react";
import { ButtonGroup, IconButton, Paper } from "@mui/material";
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
import { deleteTask, fetchTasks } from "../../store/slices/taskSlice";
import { getStatus } from "../../utils/utils";
import dayjs from "dayjs";

const DEFAULT_PAGE_NO = 0;
const rowsPerPage = [10, 25, 50, 100];

const TaskTable = () => {
  const { tasks, totalCount } = useSelector((state) => state.task);
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

  const dispatch = useDispatch();

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
            >
              <ThumbUpAltOutlined />
            </IconButton>
            <IconButton color="info">
              <BarChartOutlined />
            </IconButton>

            <IconButton color="error" onClick={() => handleDeleteTask(params.row?.TaskId)} >
              <DeleteForeverOutlined />
            </IconButton>

            <IconButton
              color="secondary"
              sx={{ visibility: isTaskPartial ? "visible" : "hidden" }}
            >
              <CheckCircleOutline />
            </IconButton>
            <IconButton
              color="success"
              sx={{ visibility: isTaskPartial ? "visible" : "hidden" }}
            >
              <AccessTime />
            </IconButton>
          </ButtonGroup>
        );
      },
    },
  ];

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId))
  }

  return (
    <Paper>
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
    </Paper>
  );
};

export default TaskTable;
