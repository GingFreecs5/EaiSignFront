import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fileuploadservice from "../Services/FileUpload/FileUploadService";
import FileSignService from "../Services/FileUpload/fileSignService";
import reportService from "../Services/FileUpload/reportService";

//*************** UPLOAD FILE **************//

export const uploadfile = createAsyncThunk(
  "files/uploadfile",
  async (file, thunkAPI) => {
    try {
      const response = fileuploadservice.upload(file);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const copyFiles = createAsyncThunk(
  "files/copyFiles",
  async ({ filesname, idEnveloppe }, thunkAPI) => {
    try {
      const response = fileuploadservice.copyFiles(filesname, idEnveloppe);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);
//*************** SAVE ENVELOPPE **************//

export const saveEnveloppe = createAsyncThunk(
  "files/saveEnvoloppe",
  async ({ enveloppeName, enveloppeStatus_, favoris }, thunkAPI) => {
    try {
      const response = fileuploadservice.saveEnvoloppe(
        enveloppeName,
        enveloppeStatus_,
        favoris
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);
export const updateEnveloppe = createAsyncThunk(
  "files/updateEnveloppe",
  async ({ envId, enveloppeName, enveloppeStatus_, favoris }, thunkAPI) => {
    console.log(envId);
    try {
      const response = fileuploadservice.updateEnveloppe(
        envId,
        enveloppeName,
        enveloppeStatus_,
        favoris
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

//*************** SAVE DOCUMENTS **************//

export const saveDocuments = createAsyncThunk(
  "files/saveDocuments",
  async (
    {
      filesname,
      idEnveloppe,
      canalUtilise,
      signataireEmail,
      signataireNom,
      signatairePrenom,
      copyFiles,
    },
    thunkAPI
  ) => {
    try {
      const response = fileuploadservice.saveDocuments(
        filesname,
        idEnveloppe,
        canalUtilise,
        signataireEmail,
        signataireNom,
        signatairePrenom,
        copyFiles
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);
//*************** GET ENVELOPPES **************//

export const getEnveloppes = createAsyncThunk(
  "files/getEnveloppes",
  async (accessToken, thunkAPI) => {
    try {
      const response = fileuploadservice.getEnveloppes(accessToken);
      const resp = JSON.stringify(response);
      console.log(resp);
      console.log(response);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);
//*************** GET Files BY ENVELLOPE ID **************//
export const getFilesbyEnvId = createAsyncThunk(
  "files/getFilesbyEnvId",
  async (envId, thunkAPI) => {
    try {
      const response = fileuploadservice.getFilesbyEnvId(envId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

//***********************Delete Enveloppe ********************/
export const deleteEnveloppe = createAsyncThunk(
  "files/deleteEnveloppe",
  async (idEnveloppe, thunkAPI) => {
    try {
      const response = fileuploadservice.deleteEnveloppe(idEnveloppe);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);
//***********************Delete Enveloppes ********************/
export const deleteEnveloppes = createAsyncThunk(
  "files/deleteEnveloppes",
  async (envIds, thunkAPI) => {
    try {
      const response = fileuploadservice.deleteEnveloppes(envIds);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);
export const deleteDocumentsbyEnvId = createAsyncThunk(
  "files/deleteDocumentsbyEnvId",
  async (idEnveloppe, thunkAPI) => {
    try {
      const response = fileuploadservice.deleteDocumentsbyEnvId(idEnveloppe);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

//************** Sign Files **********//

export const signFile01 = createAsyncThunk(
  "files/signFile01",
  async (files_, thunkAPI) => {
    try {
      const response = await FileSignService.signFile01(files_);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const signFile02 = createAsyncThunk(
  "files/signFile02",
  async ({ email, transactionId, channel }, thunkAPI) => {
    try {
      console.log(transactionId);
      console.log(email);
      console.log(channel);

      const response = await FileSignService.signFile02(
        email,
        transactionId,
        channel
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const signFile03 = createAsyncThunk(
  "files/signFile03",
  async ({ otp_, transactionid, pjList, channel }, thunkAPI) => {
    try {
      const response = FileSignService.signFile03(
        otp_,
        pjList,
        transactionid,
        channel
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);
const filesSlice = createSlice({
  name: "files",
  initialState: {
    enveloppes: [],
    files: [],
    enveloppeName: "",
  },
  reducers: {
    reInitFiles: (state) => {
      state.enveloppes = [];
      state.files = [];
      state.enveloppeName = "";
    },
    setFiles: (state, { payload }) => {
      state.files = [...payload];
    },
    addFile: (state, { payload }) => {
      const file = payload;
      file.id = state.files.length;
      console.log(file);
      state.files = [...state.files, file];
    },
    deletefile: (state, { payload }) => {
      state.files = state.files.filter((file) => file.name !== payload);
    },
    updateFileCanSign: (state, { payload }) => {
      const fileList = [...state.files];
      const files = fileList.map((file) => {
        if (file.id == payload) {
          return { ...file, canSign: !file.canSign };
        }
        return file;
      });
      state.files = files;
    },
  },
  extraReducers: {
    [uploadfile.fulfilled]: (state, { payload }) => {
      // const file = {
      //   name: payload.data.name,
      //   pdfB64: payload.data.pdfB64,
      // };
      // state.files = [...state.files, file];
    },

    [uploadfile.rejected]: (state, action) => {},
    [updateEnveloppe.fulfilled]: (state, { payload }) => {
      console.log(payload);
      const enveloppes_ = state.enveloppes.map((enveloppe) => {
        if (enveloppe.id === payload.data.id) {
          return { ...enveloppe, status: payload.data.status };
        }
        return enveloppe;
      });
      state.enveloppes = enveloppes_;
    },
    [getEnveloppes.fulfilled]: (state, { payload }) => {
      state.enveloppes = payload.data;
    },
    [deleteEnveloppe.fulfilled]: (state, { payload }) => {
      state.enveloppes = state.enveloppes.filter(
        (enveloppe) => enveloppe.id !== payload.data
      );
    },
    [deleteEnveloppes.fulfilled]: (state, { payload }) => {
      console.log(payload.data);
      const listToRemove = payload.data;
      console.log(state.enveloppes);
      state.enveloppes = state.enveloppes.filter(
        (enveloppe) => !listToRemove.includes(enveloppe.id)
      );
    },
    [signFile01.fulfilled]: (state, { payload }) => {},
  },
});
export default filesSlice.reducer;
export const { deletefile, addFile, updateFileCanSign, setFiles } =
  filesSlice.actions;
