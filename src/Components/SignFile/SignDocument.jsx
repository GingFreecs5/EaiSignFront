import React from "react";
import { Button } from "@mui/material";
export default function SignDocument({ pdfFile, setPdfFile }) {
  const signed = pdfFile?.signed;
  const canSign = pdfFile?.canSign;
  if (!signed) {
    return (
      <div className="signBar">
        <Button
          disabled={!canSign}
          style={{ marginLeft: 100, margin: 30, minWidth: 130 }}
          variant="contained"
          onClick={() => setPdfFile({ ...pdfFile, signed: true })}
        >
          Signer
        </Button>
      </div>
    );
  } else {
    return;
  }
}
