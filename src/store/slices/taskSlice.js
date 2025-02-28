import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privateRequest } from "./../../services/privateRequest";
import { TASK } from "../../services/endPoints";

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

export const addTask = createAsyncThunk(
  "task/addTask",
  async ({ payload }, { dispatch }) => {
    try {
      await privateRequest.post("/addtask", payload);
    } catch (error) {
      console.log(error);
      throw error.response.data;
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
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

export default taskSlice.reducer;