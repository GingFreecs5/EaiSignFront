import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { addFile, deletefile, uploadfile } from "../../Redux/filesSlice";
import "./FileUpload.css";
import axios from "axios";

const FileUpload = ({ files, removeFile, setMessage, setOpenDialog }) => {
  const dispatch = useDispatch();
  const [id, setId] = useState(0);
  // const upload=()=>{
  //       return new Promise((resolve, reject){
  //     if (somethingWasSuccesful) {
  //        resolve();
  //     } else {
  //        reject()
  //     }
  //  });
  // }
  const uploadHandler = (event) => {
    const file = event.target.files[0];
    file.isUploading = true;
    if (!file) return;
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = (e) => {
      const _file = {
        isUploading: true,
        name: file.name,
        b64: e.target.result,
      };

      dispatch(uploadfile(file))
        .unwrap()
        .then(() => {
          _file.isUploading = false;
          console.log(_file);
          dispatch(addFile(_file));
        })
        .catch(() => {
          setMessage("Fichier du grand taille");
          removeFile(_file.name);
          setOpenDialog(true);
        });
    };
  };

  return (
    <>
      <div className="file-card">
        <div className="file-inputs">
          <input
            accept="application/pdf"
            type="file"
            onChange={uploadHandler}
          />
          <button>
            <i>
              <AddIcon />
            </i>
            Upload
          </button>
        </div>

        <p className="main">Supported files</p>
        <p className="info">PDF Only</p>
      </div>
    </>
  );
};

export default FileUpload;
