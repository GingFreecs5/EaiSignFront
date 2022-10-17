import React from "react";
import ReportItem from "./ReportItem";

export default function ReportList({ reports }) {
  // const dispatch = useDispatch();
  // const deleteFileHandler = (_name) => {
  //   fileuploadservice
  //     .delete(_name)
  //     .then((ok) => {
  //       dispatch(deletefile(_name));
  //       removeFile(_name);
  //     })
  //     .catch((error) => {});
  // };
  // const removeReport = (filename) => {
  //   setFiles(reports_.filter((report) => report.reportName !== filename));
  // };
  return (
    <>
      <h5 className="mt-3 ">Liste des rapports générés</h5>
      <ul className="file-list">
        {reports && reports.map((report) => <ReportItem report={report} />)}
      </ul>
    </>
  );
}
