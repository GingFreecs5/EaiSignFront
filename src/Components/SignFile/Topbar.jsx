import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "@mui/material/Button";
import AlertDialog from "../../Components/common/Dialog/alertDialog";
import { Input } from "@mui/material";
import { useState } from "react";
import {
  updateEnveloppe,
  deleteDocumentsbyEnvId,
} from "../../Redux/filesSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
export default function Topbar({
  enveloppeName,
  files,
  envId,
  signed,
  saveEnveloppe,
  channel,
  saveDocuments,
  email,
  setEnveloppeName,
  setLoadingValider,
  setMessage,
  setOpenDialog,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const content = (
    <p style={{ textAlign: "center" }}>
      <span>Voulez-vous sauvegarder l'envoloppe : </span> <br />
      <span style={{ color: "#151816" }}>{enveloppeName}</span>
      <span style={{ color: "#8b4c4c" }}> ({files?.length})</span>
    </p>
  );
  const handleClickOpen = () => {
    if (files?.length > 0 && !signed) {
      setOpen(true);
    } else {
      navigate("/documents", { replace: true });
    }
  };
  const agreeButton = () => {
    const enveloppeStatus_ = "Brouillon";
    let filesname = [];

    const favoris = false;
    const _files = files.filter((file) => Object.keys(file).length == 1);
    console.log(_files);
    if (envId == undefined) {
      files.map((file) => {
        filesname.push(file.name);
      });
      dispatch(saveEnveloppe({ enveloppeName, enveloppeStatus_, favoris }))
        .unwrap()
        .then((ok) => {
          const idEnveloppe = ok.data.id;
          const canalUtilise = channel;
          const copyFiles = true;
          console.log(filesname);
          dispatch(
            saveDocuments({
              filesname,
              idEnveloppe,
              canalUtilise,
              email,
              copyFiles,
            })
          )
            .unwrap()
            .then((ok) => {
              setLoadingValider(false);
              setMessage("Enveloppe enregistré en brouillon");
              setOpenDialog(true);
              navigate("/documents", { replace: true });
            })
            .catch((e) => {
              setMessage(
                "Enveloppe n'est pas enregistré, Vous devez ajoutez ajouter au moins un document"
              );
              setOpenDialog(true);
            });
        })
        .catch((e) => {
          setMessage("Error dans le serveur,réessayer une autre fois merci 1");
          setOpenDialog(true);
        });
    } else {
      _files.map((file) => {
        filesname.push(file.name);
      });
      dispatch(
        updateEnveloppe({ envId, enveloppeName, enveloppeStatus_, favoris })
      )
        .unwrap()
        .then((ok) => {
          console.log(ok);
          const idEnveloppe = ok.data.id;
          const canalUtilise = channel;
          const copyFiles = true;
          dispatch(deleteDocumentsbyEnvId(idEnveloppe))
            .unwrap()
            .then((ok) => {
              console.log(ok);

              dispatch(
                saveDocuments({
                  filesname,
                  idEnveloppe,
                  canalUtilise,
                  email,
                  copyFiles,
                })
              )
                .unwrap()
                .then((ok) => {
                  console.log(ok);
                  console.log(files);
                  setLoadingValider(false);
                  setMessage("Enveloppe enregistré en brouillon");
                  setOpenDialog(true);
                  navigate("/documents", { replace: true });
                })
                .catch((e) => {
                  setLoadingValider(false);
                  setMessage(
                    "Error dans le serveur,réessayer une autre fois merci "
                  );
                  setOpenDialog(true);
                });
            })
            .catch((err) => {});
        })
        .catch((e) => {
          setLoadingValider(false);
          setMessage("Error dans le serveur,réessayer une autre fois merci ");
          setOpenDialog(true);
        });
    }
  };

  const disagreeButton = () => {
    navigate("/documents", { replace: true });
  };
  return (
    <div className="bg-light">
      <Container>
        <Row className=" p-3 mb-3 w-100 m-0">
          <Col>
            <Input
              style={{ marginLeft: 30, width: "" }}
              value={enveloppeName}
              onChange={(e) => setEnveloppeName(e.target.value)}
            />
          </Col>
          <Col className="d-flex flex-row-reverse">
            {" "}
            <Button
              onClick={handleClickOpen}
              className="mb-3"
              variant="contained"
              color="error"
            >
              Annuler
            </Button>
          </Col>
        </Row>
      </Container>
      <AlertDialog
        open={open}
        setOpen={setOpen}
        title={"Sauvegarder l'envoloppe ?"}
        content={content}
        agree={"Oui"}
        disagree={"Non"}
        agreeButton={agreeButton}
        disagreeButton={disagreeButton}
      />
    </div>
  );
}
