import React, { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Viewer } from "@react-pdf-viewer/core";
import { Worker } from "@react-pdf-viewer/core";

import { Button } from "@mui/material";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import * as PDFJS from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker;
function areEqual(prevProps, nextProps) {
  return false;
}
function PdfViewer({ pdfFile, setDisabled, index, setIndex }) {
  const dispatch = useDispatch();
  const pdfContentType = "application/pdf";
  console.log(pdfFile);

  const base64toBlob = (data) => {
    // Cut the prefix `data:application/pdf;base64` from the raw base 64
    const base64WithoutPrefix = data.substr(
      `data:${pdfContentType};base64,`.length
    );
    const bytes = atob(base64WithoutPrefix);
    let length = bytes.length;
    let out = new Uint8Array(length);

    while (length--) {
      out[length] = bytes.charCodeAt(length);
    }

    return new Blob([out], { type: pdfContentType });
  };
  let url;
  if (pdfFile) {
    url = URL.createObjectURL(base64toBlob(pdfFile.b64));
  }
  let firstVisit = false;
  const handleScroll = (e) => {
    let bottom =
      e.target.scrollHeight - Math.ceil(e.target.scrollTop) ===
      e.target.clientHeight;
    if (bottom && firstVisit) {
      setDisabled(false);
    } else {
      firstVisit = true;
    }
  };

  return (
    <>
      {pdfFile && (
        <div
          onScroll={handleScroll}
          style={{
            overflowY: "scroll",
            maxHeight: "510px",
          }}
        >
          <Worker>
            <Viewer fileUrl={pdfFile.b64}></Viewer>
          </Worker>
        </div>
      )}
    </>
  );
}
export default PdfViewer;
