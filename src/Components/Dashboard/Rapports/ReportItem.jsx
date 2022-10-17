import React from "react";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import DeleteIcon from "@mui/icons-material/Delete";
import { Checkbox } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import NearMeIcon from "@mui/icons-material/NearMe";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  exportReport,
  exportUserReport,
  removeReport,
  selectReport,
} from "../../../Redux/reportSlice";
import "./ReportList.css";
import { Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
export default function ReportItem({ report }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState("");
  const downloadDocument = () => {
    setLoading(true);
    const status = report.status;
    const date = report.date;
    const reportName = report.reportName;
    const type = report.type;
    const link = document.createElement("a");
    link.target = "_blank";
    link.download = reportName;
    if (type == "User") {
      dispatch(exportUserReport())
        .unwrap()
        .then((res) => {
          link.href = URL.createObjectURL(
            new Blob([res.data], { type: "application/pdf" })
          );
          link.click();
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      dispatch(exportReport({ status, date, type, reportName }))
        .unwrap()
        .then((res) => {
          link.href = URL.createObjectURL(
            new Blob([res.data], { type: "application/pdf" })
          );
          link.click();
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          if (err.message != "Network Error") {
            setMessage("Enveloppe vide");
            setOpenDialog(true);
          }
          setLoading(false);
        });
    }
  };

  const deleteReport = (reportName) => {
    dispatch(removeReport(reportName));
  };
  return (
    <>
      <li className="file-item" key={report.name}>
        <Checkbox onChange={() => dispatch(selectReport(report.reportName))} />
        <p>{report.reportName}</p>
        <div className="actions">
          {loading ? (
            <span className="spinner-border spinner-border-sm"></span>
          ) : (
            <DownloadIcon onClick={downloadDocument} />
          )}

          <DeleteIcon onClick={() => deleteReport(report.reportName)} />
        </div>
      </li>
      <Snackbar
        open={openDialog}
        TransitionComponent={SlideTransition}
        onClose={() => setOpenDialog(false)}
        message={message}
      />
    </>
  );
}
