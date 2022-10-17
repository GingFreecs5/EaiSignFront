import React from "react";
import { useState, useEffect } from "react";
import "./dashboard.css";
import { useParams, useNavigate } from "react-router-dom";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container, Navbar, NavItem } from "react-bootstrap";
import { Checkbox, Input, TextField } from "@mui/material";
import FileUpload from "../../Components/SignFile/FileUpload";
import CheckIcon from "@mui/icons-material/Check";
import Button from "@mui/material/Button";
import FileList from "../../Components/SignFile/FileList";
import HorizontalStepper from "../../Components/Signup/Components/stepper";
import AlertDialog from "../../Components/common/Dialog/alertDialog";

import {
  signFile01,
  signFile02,
  signFile03,
  getFilesbyEnvId,
  updateEnveloppe,
  deleteDocumentsbyEnvId,
  setFiles,
} from "../../Redux/filesSlice";
import { saveEnveloppe, saveDocuments } from "../../Redux/filesSlice";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Topbar from "../../Components/SignFile/Topbar";
import PdfViewer from "../../Components/SignFile/PdfViewer";
import FileListV2 from "../../Components/SignFile/FileListV2";
import SignDocument from "../../Components/SignFile/SignDocument";
import SignStep1 from "../../Components/SignFile/SignStep1";
import SignStep2 from "../../Components/SignFile/SignStep2";
import SignStep3 from "../../Components/SignFile/SignStep3";
import { incrementCurrent } from "../../Redux/currentSlice";
import StepField from "../../Components/Signup/Components/stepfield";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
function SignaturePage() {
  const current = useSelector((state) => state.current.value);
  console.log(current);

  // const [_files, setFiles] = useState([]); //files in list
  const { files } = useSelector((state) => state.files);
  let { envId, envName } = useParams();
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingValider, setLoadingValider] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState("");
  const [pjList, setPjlist] = useState(""); // last service signfile03 needs pdfs as string (pdjb64Signed+= ";").tostring()
  const [transactionid, setTransactionid] = useState("");
  const [enveloppeName, setEnveloppeName] = useState("");
  const [enveloppeStatus, setEnveloppeStatus] = useState("Brouillon");
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [overFlow, setOverflow] = useState("scroll");
  const [channel, setChannel] = useState("sms");
  const dispatch = useDispatch();

  const content = (
    <p style={{ textAlign: "center" }}>
      <span>Voulez-vous sauvegarder l'envoloppe : </span> <br />
      <span style={{ color: "#151816" }}>{enveloppeName}</span>
      <span style={{ color: "#8b4c4c" }}> ({files.length})</span>
    </p>
  );
  const navigate = useNavigate();
  useEffect(() => {
    if ((envId == undefined) & (signed == false)) {
    } else {
      setEnveloppeName(envName);

      setEnveloppeStatus("Brouillon");
      dispatch(getFilesbyEnvId(envId))
        .unwrap()
        .then((ok) => {
          const pdfFiles = ok.data;
          const pdfFiles_ = pdfFiles.map((pdf) => {
            return { ...pdf, b64: "data:application/pdf;base64," + pdf.b64 };
          });
          dispatch(setFiles(pdfFiles_));
        })
        .catch((e) => {
          console.log(e);
        });
      //  setFiles(files);
    }
  }, []);

  const steps = ["Importation des documents", "Signature des documents"];
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

  function titleUsed() {
    if (current === 0) {
      return {
        title: steps[0],
        number: "1",
      };
    } else {
      return {
        title: steps[1],
        number: "2",
      };
    }
  }
  const handleClickOpen = () => {
    if (files.length > 0 && !signed) {
      setOpen(true);
    } else {
      navigate("/documents", { replace: true });
    }
  };
  return (
    <div
      className="signaturePage"
      style={{ height: "100%", overflowY: overFlow }}
    >
      <Container style={{ margin: 0, padding: 0 }}>
        <Row>
          <Navbar style={{ backgroundColor: "#edf3f3", minWidth: 1800 }}>
            <Container className="gap-3 flex-column m-0 mx-3 p-0 flex-md-column flex-lg-row flex-sm-column allign-items-baseline">
              <NavItem>
                <StepField
                  title={titleUsed().title}
                  number={titleUsed().number}
                />
              </NavItem>
              <NavItem>
                <TextField
                  id="outlined-basic"
                  label="Nom d'enveloppe"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  value={enveloppeName}
                  className="mt-3"
                  onChange={(e) => setEnveloppeName(e.target.value)}
                  size="small"
                />
              </NavItem>
              <NavItem>
                <Button
                  onClick={handleClickOpen}
                  variant="contained"
                  color="error"
                >
                  Annuler
                </Button>
              </NavItem>
            </Container>
          </Navbar>
          <Col></Col>
        </Row>
        <Row style={{ marginTop: 50 }}>
          <Col>
            <HorizontalStepper steps={steps} />
          </Col>
        </Row>
        <Row>
          {current === 0 ? (
            <SignStep1
              setEmail={setEmail}
              setNom={setNom}
              setPrenom={setPrenom}
              files={files}
              setMessage={setMessage}
              setOpenDialog={setOpenDialog}
              setChannel={setChannel}
            />
          ) : (
            <SignStep2
              signed={signed}
              setSigned={setSigned}
              email={email}
              nom={nom}
              prenom={prenom}
              channel={channel}
              enveloppeName={enveloppeName}
            />
          )}
        </Row>
      </Container>

      <Snackbar
        style={{ zIndex: "999" }}
        open={openDialog}
        TransitionComponent={SlideTransition}
        onClose={() => setOpenDialog(false)}
        message={message}
      />
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
export default React.memo(SignaturePage);
