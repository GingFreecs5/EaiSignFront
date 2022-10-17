import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reportService from "../Services/FileUpload/reportService";

export const exportReport = createAsyncThunk(
  "report/exportReport",
  async ({ status, date, type, reportName }, thunkAPI) => {
    try {
      const response = reportService.exportReport(
        status,
        date,
        type,
        reportName
      );
      console.log(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);
export const exportUserReport = createAsyncThunk(
  "report/exportUserReport",
  async (thunkAPI) => {
    try {
      const response = reportService.exportUserReport();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);
export const sendReportsperEmail = createAsyncThunk(
  "report/sendReportsperEmail",
  async ({ email, reports }, thunkAPI) => {
    try {
      console.log(email);
      const json = JSON.stringify(reports);
      console.log(json);
      console.log(reports);

      const response = reportService.sendReportsperEmail(email, reports);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState: {
    reports: [],
  },
  reducers: {
    addReport(state, { payload }) {
      state.reports = [...state.reports, payload];
    },
    reportsUpdate(state, { payload }) {
      console.log(payload);
      state.reports = payload;
    },
    initialReportList(state, { payload }) {
      state.reports = payload;
    },
    removeReport(state, { payload }) {
      state.reports = state.reports.filter(
        (report) => report.reportName !== payload
      );
    },
    selectReport(state, { payload }) {
      console.log(payload);
      const reports = state.reports.map((report) => {
        if (report.reportName == payload) {
          return { ...report, selected: !report.selected };
        }
        return report;
      });
      state.reports = reports;
    },
  },
});
export default reportSlice.reducer;
export const {
  addReport,
  reportsUpdate,
  initialReportList,
  removeReport,
  selectReport,
} = reportSlice.actions;
