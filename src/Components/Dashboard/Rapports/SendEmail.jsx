import { Button, TextField } from "@mui/material";
import React from "react";
import { sendReportsperEmail } from "../../../Redux/reportSlice";
import { useDispatch } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
export default function SendEmail({ reports, setMessage, setOpenDialog }) {
  const [email, setInpEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const validEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  const sendReports = () => {
    reports = reports.filter((report) => report.selected === true);
    console.log(reports);
    setLoading(true);
    if (validEmail(email)) {
      if (reports.length !== 0) {
        dispatch(sendReportsperEmail({ email, reports }))
          .unwrap()
          .then((ok) => {
            setMessage("Les rapports sont envoyés");
            setOpenDialog(true);
            setLoading(false);
          })
          .catch((e) => {
            setMessage("Erreur dans le serveur");
            setOpenDialog(true);
            setLoading(false);
          });
      } else {
        setMessage("Selectionnez d'abord les rapports à envoyer");
        setOpenDialog(true);
        setLoading(false);
      }
    } else {
      setMessage("Email Invalide");
      setOpenDialog(true);
      setLoading(false);

      console.log("Invalid email");
    }
  };
  return (
    <>
      <h5 className="mt-5  mb-3 ">
        Selectionnez les rapports à envoyer par email :
      </h5>
      <div className="d-flex row mx-5">
        <div className="d-flex col col-3 ">
          <TextField
            sx={{ width: 300 }}
            variant="outlined"
            value={email}
            onChange={(e) => {
              setInpEmail(e.target.value);
            }}
            size="small"
            id="outlined-basic"
            label="Email"
          ></TextField>
        </div>
        <div className="d-flex col">
          <Button
            style={{ minWidth: 188 }}
            variant="contained"
            onClick={sendReports}
            disabled={loading}
            endIcon={
              loading ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                <SendIcon />
              )
            }
          >
            {" "}
            {!loading ? <span>Envoyer</span> : <></>}
          </Button>
        </div>
      </div>
    </>
  );
}
