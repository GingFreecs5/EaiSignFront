import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../Services/authservice";

let user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  user = JSON.parse(sessionStorage.getItem("user"));
}
export const signup = createAsyncThunk(
  "auth/signup",
  async (
    { nom, prenom, email, num_telephone, piece_justicatif, password },
    thunkAPI
  ) => {
    try {
      const response = await AuthService.signup(
        nom,
        prenom,
        email,
        num_telephone,
        piece_justicatif,
        password
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);
export const createfolder = createAsyncThunk(
  "auth/createfolder",
  async (id, thunkAPI) => {
    try {
      const response = await AuthService.createFolder(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const checkEmail = createAsyncThunk(
  "auth/checkEmail",
  async (email, thunkAPI) => {
    try {
      const resp = AuthService.checkEmail(email);
      console.log(resp);
      const response = await AuthService.checkEmail(email);
      console.log(response);

      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, checked }, thunkAPI) => {
    try {
      const data = await AuthService.login(email, password, checked);
      return { user: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      const msg = thunkAPI.rejectWithValue(message);
      console.log(msg);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  console.log("ok");
  AuthService.logout();
});

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUser(state, action) {
      state.isLoggedIn = false;
      state.user = action.payload;
    },
    deleteUser(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: {
    [signup.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [signup.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});
const { reducer } = authSlice;
export const { saveUser, deleteUser } = authSlice.actions;
export default reducer;
