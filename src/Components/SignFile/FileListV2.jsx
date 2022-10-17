import * as React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import DeleteIcon from "@mui/icons-material/Delete";
import "./FileItem.css";
const FileListV2 = ({ pdfList, setPdfFile }) => {
  return (
    <ul className="m-0 p-0">
      {pdfList &&
        pdfList.map((f) => (
          <li>
            <a onClick={() => setPdfFile(f)}>{f.name}</a>
            <div className="actions">
              <DeleteIcon />
              <ErrorIcon />
            </div>
          </li>
        ))}
    </ul>
  );
};

export default FileListV2;
