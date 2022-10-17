import React from "react";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import DeleteIcon from "@mui/icons-material/Delete";

import "./FileItem.css";
import { Checkbox } from "@mui/material";

const FileItem = ({ file, deleteFile }) => {
  console.log(file);
  return (
    <>
      <li className="file-item d-flex align-center" key={file.name}>
        <FilePresentIcon />
        <p>{file.name}</p>
        <div className="actions">
          {file.isUploading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          {!file.isUploading && (
            <DeleteIcon onClick={() => deleteFile(file.name)} />
          )}
        </div>
      </li>
    </>
  );
};

export default FileItem;
