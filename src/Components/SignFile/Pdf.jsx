import React from "react";
import { Viewer } from "@react-pdf-viewer/core";
import { Worker } from "@react-pdf-viewer/core";

function Pdf({ url }) {
  return (
    <Worker>
      <Viewer fileUrl={url}></Viewer>
    </Worker>
  );
}

export default Pdf;
