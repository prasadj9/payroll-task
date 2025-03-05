import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privateRequest } from "./../../services/privateRequest";
import {
  DELETE_TASK,
  TASK,
  UPDATE_TASK_STATUS,
} from "../../services/endPoints";
import { getMediaDetails, getUserId } from "../../utils/utils";
import dayjs from "dayjs";

const initialState = {
  team: {},
  tasks: [],
  comments: [],
  totalCount: null,
  filterData: {},
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk(
  "task/fetchTasks",
  async (payload) => {
    try {
      const response = await privateRequest.post(TASK, payload);
      if (response.data?.status === 404) {
        return {
          tasks: [],
          comments: [],
          totalCount: 0,
        };
      }

      return {
        tasks: response.data.data.TaskList,
        comments: response.data.data.CommentList,
        totalCount: response.data.data.TotalCount,
      };
    } catch (error) {
      console.log(error);
      throw error.response.data;
    }
  }
);

const formatData = async (payload) => {

  let mediaDetails = {
    MultimediaData: "",
    MultimediaExtension: "",
    MultimediaFileName: "",
    MultimediaType: "",
  };

  if (payload?.file) {
    try {
      mediaDetails = await getMediaDetails(payload.file);
      console.log("FILE : ", payload?.file, mediaDetails)
    } catch (error) {
      console.error("Error processing media file:", error.message);
    }
  }
  const obj = {
    Id: "",
    AssignedBy: getUserId(),
    AssignedToUserId: "",
    AssignedDate: "",
    CompletedDate: "",
    Description: payload?.Description || "",
    IntercomGroupIds: [],
    IsActive: true,
    Latitude: "",
    Location: "",
    Longitude: "",
    Image: mediaDetails.MultimediaData,
    MultimediaData: mediaDetails.MultimediaData, 
    MultimediaExtension: mediaDetails.MultimediaExtension,
    MultimediaFileName: mediaDetails.MultimediaFileName,
    MultimediaType: mediaDetails.MultimediaType,
    Priority: payload?.Priority || "",
    TaskEndDateDisplay: dayjs(payload?.TaskEndDate).format("DD MMM YYYY"),
    TaskEndDate: payload?.TaskEndDate,
    TaskDisplayOwners: `${payload?.TaskOwners?.length > 0 ? payload?.TaskOwners?.length + "Users" : ""}`,
    TaskOwners: payload?.TaskOwners,
    TaskStatus: "",
    Title: payload?.Title,
    UserDisplayIds: `${payload?.UserIds?.length > 0 ? payload?.UserIds?.length + "Users" : ""}`,
    UserIds: payload?.UserIds || "",
    LeadId: payload?.LeadId?.id || "",
  };
  return obj;
};

export const addTask = createAsyncThunk(
  "task/addTask",
  async (payload, { dispatch }) => {
    try {
      const data = await formatData(payload);
      // await privateRequest.post("/addtask", payload);
      console.log("Payload", payload, data);
    } catch (error) {
      console.log(error);
      throw error.response.data;
    }
  }
);

export const deleteTask = createAsyncThunk(
  "task/addTask",
  async (taskId, { dispatch }) => {
    try {
      await privateRequest.get(DELETE_TASK + `?taskId=${taskId}`);
    } catch (error) {
      console.log(error);
      throw error.response.data;
    }
  }
);

export const updateTaskStatus = createAsyncThunk(
  "task/updateTaskStatus",
  async (data, { dispatch }) => {
    try {
      await privateRequest.post(UPDATE_TASK_STATUS, data);
    } catch (error) {
      console.log(error);
      throw error.response.data;
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks;
        state.comments = action.payload.comments;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilterData } = taskSlice.actions;

export default taskSlice.reducer;
