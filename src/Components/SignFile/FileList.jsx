import axios from "axios";
import React from "react";
import FileItem from "./FileItem";
import fileuploadservice from "../../Services/FileUpload/FileUploadService";
import { useDispatch } from "react-redux";
import { deletefile } from "../../Redux/filesSlice";
const FileList = ({ files, removeFile }) => {
  const dispatch = useDispatch();
  console.log(files);
  const deleteFileHandler = (_name) => {
    fileuploadservice
      .delete(_name)
      .then((ok) => {
        removeFile(_name);
      })
      .catch((error) => {});
  };
  return (
    <ul className="file-list">
      {files &&
        files.map((f) => (
          <FileItem key={f.id} file={f} deleteFile={deleteFileHandler} />
        ))}
    </ul>
  );
};

export default FileList;
