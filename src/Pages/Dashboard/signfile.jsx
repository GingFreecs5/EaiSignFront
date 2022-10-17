import React from "react";
import { useState, useEffect } from "react";
import "./dashboard.css";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { Checkbox, Input, TextField } from "@mui/material";
import FileUpload from "../../Components/SignFile/FileUpload";
import CheckIcon from "@mui/icons-material/Check";
import Button from "@mui/material/Button";
import FileList from "../../Components/SignFile/FileList";
import {
  signFile01,
  signFile02,
  signFile03,
  getFilesbyEnvId,
  updateEnveloppe,
  deleteDocumentsbyEnvId,
} from "../../Redux/filesSlice";
import { saveEnveloppe, saveDocuments } from "../../Redux/filesSlice";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Topbar from "../../Components/SignFile/Topbar";
import HorizontalStepper from "../../Components/Signup/Components/stepper";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
export default function Signfile() {
  const steps = [
    "Importation des documents",
    "Vérification des documents",
    "Finalisation",
  ];
  const [_files, setFiles] = useState([]); //files in list
  const { files } = useSelector((state) => state.files);
  let { envId, envName } = useParams();
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingValider, setLoadingValider] = useState(false);
  const [hidden, setHidden] = useState(true); //w8 user to receive OTP
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState("");
  const [inpEmail, setInpEmail] = useState("");
  const [pjList, setPjlist] = useState(""); // last service signfile03 needs pdfs as string (pdjb64Signed+= ";").tostring()
  const [otp, setOtp] = useState("");
  const [transactionid, setTransactionid] = useState("");
  const [enveloppeName, setEnveloppeName] = useState("Nouveau Enveloppe");
  const [enveloppeStatus, setEnveloppeStatus] = useState("Brouillon");
  const { email } = useSelector((state) => state.auth.user);
  const [checked, setChecked] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [channel, setChannel] = useState("sms");
  const navigate = useNavigate();
  useEffect(() => {
    if ((envId == undefined) & (signed == false)) {
    } else {
      setEnveloppeName(envName);
      setEnveloppeStatus("Brouillon");
      dispatch(getFilesbyEnvId(envId))
        .unwrap()
        .then((ok) => {
          console.log(ok);
          setFiles(ok.data);
        })
        .catch((e) => {
          console.log(e);
        });
      setFiles(files);
    }
  }, []);

  const validEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
    setSwitchChecked(false);
  };
  const dispatch = useDispatch();

  const removeFile = (filename) => {
    setFiles(_files.filter((file) => file.name !== filename));
  };

  const onSignClick = () => {
    if (signed) {
    } else {
      setHidden(false);
      setLoading(true);
      console.log(files);
      console.log(_files);
      if (hidden) setLoading(false);
      // dispatch(signFile01(files))
      //   .unwrap()
      //   .then((ok) => {
      //     const data = ok.data;
      //     setLoading(false);

      //     const transactionId = data.transactionId;
      //     setTransactionid(transactionId);
      //     const pdfSigned = Object.values(data).filter((p) => p.length > 60); //Filter pdfb64 only without transactionid and status
      //     var pdfs = "";
      //     pdfSigned.map((p) => {
      //       //Create pjList
      //       pdfs += p + ";";
      //     });
      //     pdfs = pdfs.substring(0, pdfs.length - 1); //Delete last ";" from pjList
      //     setPjlist(pdfs);
      //     var emailUsed = "";
      //     if (!checked) {
      //       if (validEmail(inpEmail)) {
      //         emailUsed = inpEmail.trim();
      //       } else {
      //         setMessage("Entrez un email invalide svp");
      //         setOpenDialog(true);
      //         setLoading(false);
      //         return;
      //       }
      //     } else {
      //       emailUsed = email;
      //     }
      //     let channel_ = "";
      //     if (switchChecked) {
      //       channel_ = "sms";
      //       setChannel("sms");
      //     } else {
      //       channel_ = "email";
      //       setChannel("email");
      //     }
      //     dispatch(signFile02({ emailUsed, transactionId, channel_ }))
      //       .unwrap()
      //       .then((ok) => {
      //         console.log(channel_);
      //         setMessage(
      //           "Entrez Otp reçu dans votre " +
      //             channel_ +
      //             " pour finissez la signature"
      //         );

      //         setOpenDialog(true);
      //         setHidden(false);
      //         setLoading(false);
      //       })
      //       .catch((error) => {
      //         console.log(channel_);

      //         setMessage("Error dans le serveur,réessayer une autre fois merci");
      //         setOpenDialog(true);
      //         setLoading(false);
      //       });
      //   })
      //   .catch((error) => {
      //     setMessage("Error dans le serveur,réessayer une autre fois merci");
      //     setOpenDialog(true);
      //     setLoading(false);
      //   });
    }
  };

  const verifyOtp = () => {
    if (signed) {
    } else {
      const enveloppeStatus_ = "Terminé";
      const canalUtilise = channel;
      const favoris = false;
      let filesname = [];
      let emailUsed = "";
      if (!checked) {
        if (validEmail(inpEmail)) {
          emailUsed = inpEmail.trim();
        } else {
          setMessage("Entrez un email invalide svp");
          setOpenDialog(true);
          setLoading(false);
          return;
        }
      } else {
        emailUsed = email;
      }
      _files.map((file) => {
        filesname.push(file.name);
      });
      if (envId == undefined) {
        dispatch(saveEnveloppe({ enveloppeName, enveloppeStatus_, favoris }))
          .unwrap()
          .then((ok) => {
            const idEnveloppe = ok.data.id;
            const copyFiles = true;

            dispatch(
              saveDocuments({
                filesname,
                idEnveloppe,
                canalUtilise,
                emailUsed,
                copyFiles,
              })
            )
              .unwrap()
              .then(() => {
                setLoadingValider(false);
                setMessage(
                  "Vérifier votre email pour télécharger les documents signés"
                );
                setLoading(false);
                setOpenDialog(true);
                setSigned(true);
                setTimeout(() => navigate("/documents/"), 1000);
              })
              .catch((e) => {});
          })
          .catch((e) => {
            setLoading(false);

            setLoadingValider(false);
            setMessage("Error dans le serveur,réessayer une autre fois merci ");
            setOpenDialog(true);
          });
      } else {
        dispatch(
          updateEnveloppe({ envId, enveloppeName, enveloppeStatus_, favoris })
        )
          .unwrap()
          .then((ok) => {
            console.log(ok);
            const idEnveloppe = ok.data.id;
            console.log(idEnveloppe);
            const copyFiles = false;
            dispatch(deleteDocumentsbyEnvId(idEnveloppe))
              .unwrap()
              .then((ok) => {
                dispatch(
                  saveDocuments({
                    filesname,
                    idEnveloppe,
                    canalUtilise,
                    emailUsed,
                    copyFiles,
                  })
                )
                  .unwrap()
                  .then(() => {
                    setLoadingValider(false);
                    setMessage(
                      "Vérifier votre email pour télécharger les documents signés"
                    );
                    setLoading(false);
                    setOpenDialog(true);
                    setSigned(true);
                    setTimeout(() => navigate("/documents/"), 1000);
                  })
                  .catch((e) => {
                    setLoading(false);
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
            setLoading(false);

            setLoadingValider(false);
            setMessage("Error dans le serveur,réessayer une autre fois merci ");
            setOpenDialog(true);
          });
      }

      // console.log((pjList.match(/;/g) || []).length);
      // const otp_ = otp.trim();
      // dispatch(signFile03({ otp_, transactionid, pjList, channel }))
      //   .unwrap()
      //   .then((ok) => {
      //     setLoadingValider(true);
      //     let enveloppeStatus_ = "Terminé";
      //     _files.map((file) => {
      //       filesname.push(file.name);
      //     });
      //     if (envId == undefined) {
      //       dispatch(saveEnveloppe({ enveloppeName, enveloppeStatus_, favoris }))
      //         .unwrap()
      //         .then((ok) => {
      //           const idEnveloppe = ok.data.id;
      //           const copyFiles = true;

      //           dispatch(
      //             saveDocuments({
      //               filesname,
      //               idEnveloppe,
      //               canalUtilise,
      //               emailUsed,
      //               copyFiles,
      //             })
      //           )
      //             .unwrap()
      //             .then(() => {
      //               setLoadingValider(false);
      //               setMessage(
      //                 "Vérifier votre email pour télécharger les documents signés"
      //               );
      //               setLoading(false);
      //               setOpenDialog(true);
      //               setSigned(true);
      //             })
      //             .catch((e) => {});
      //         })
      //         .catch((e) => {
      //           setLoading(false);

      //           setLoadingValider(false);
      //           setMessage(
      //             "Error dans le serveur,réessayer une autre fois merci "
      //           );
      //           setOpenDialog(true);
      //         });
      //     } else {
      //       dispatch(
      //         updateEnveloppe({ envId, enveloppeName, enveloppeStatus_, favoris })
      //       )
      //         .unwrap()
      //         .then((ok) => {
      //           console.log(ok);
      //           const idEnveloppe = ok.data.id;
      //           console.log(idEnveloppe);
      //           const copyFiles = false;
      //           dispatch(deleteDocumentsbyEnvId(idEnveloppe))
      //             .unwrap()
      //             .then((ok) => {
      //               dispatch(
      //                 saveDocuments({
      //                   filesname,
      //                   idEnveloppe,
      //                   canalUtilise,
      //                   emailUsed,
      //                   copyFiles,
      //                 })
      //               )
      //                 .unwrap()
      //                 .then((ok) => {
      //                   setLoadingValider(false);
      //                   setMessage(
      //                     "Vérifier votre email pour télécharger les documents signés"
      //                   );
      //                   setLoading(false);
      //                   setOpenDialog(true);
      //                   setSigned(true);
      //                 })
      //                 .catch((e) => {
      //                   setLoading(false);
      //                   setLoadingValider(false);
      //                   setMessage(
      //                     "Error dans le serveur,réessayer une autre fois merci "
      //                   );
      //                   setOpenDialog(true);
      //                 });
      //             })
      //             .catch((err) => {});
      //         })
      //         .catch((e) => {
      //           setLoading(false);

      //           setLoadingValider(false);
      //           setMessage(
      //             "Error dans le serveur,réessayer une autre fois merci "
      //           );
      //           setOpenDialog(true);
      //         });
      //     }
      //   })
      //   .catch((e) => {
      //     setLoadingValider(false);
      //     setMessage("Error dans le serveur,réessayer une autre fois merci");
      //     setOpenDialog(true);
      //   });
    }
  };

  return (
    <div className="" style={{ height: "100%" }}>
      <Topbar
        envId={envId}
        files={_files}
        setEnveloppeName={setEnveloppeName}
        enveloppeName={enveloppeName}
        signed={signed}
        setLoadingValider={setLoadingValider}
        setOpenDialog={setOpenDialog}
        email={email}
        saveDocuments={saveDocuments}
        saveEnveloppe={saveEnveloppe}
        channel={channel}
        setMessage={setMessage}
      />
      <Row>
        <Col className="my-4">
          <HorizontalStepper steps={steps} />
        </Col>
      </Row>
      <div style={{ height: "100%" }} className=" p-3  ">
        <Row className="px-5">
          <Col className="d-flex  my-4 justify-content-center ">
            <FileUpload
              signed={signed}
              files={_files}
              setFiles={setFiles}
              removeFile={removeFile}
              setMessage={setMessage}
              setOpenDialog={setOpenDialog}
            />
          </Col>
          <Col sm={5} className="d-flex flex-column   m-auto ">
            <label className="mb-3">Entrez l'email de signataire :</label>
            <TextField
              error={!validEmail(inpEmail) && !checked}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              size="small"
              value={inpEmail}
              onChange={(e) => {
                setInpEmail(e.target.value);
              }}
              disabled={checked}
              style={{ maxWidth: 500 }}
            />
            <Col className="my-3 mx-3">
              <label>
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
                Je suis le signataire de cet enveloppe
              </label>
            </Col>

            <Button
              style={{ maxWidth: 500, minHeight: 50, marginBottom: 30 }}
              onClick={onSignClick}
              variant="contained"
              disabled={_files.length === 0 ? true : false}
              endIcon={
                loading ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  <CheckIcon />
                )
              }
            >
              {!loading ? <span>Signer </span> : <span></span>}
            </Button>
            <Col>
              <TextField
                id="outlined-basic"
                label="OTP           "
                placeholder="valable en 15 minutes"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                size="small"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                hidden={hidden}
                style={{ width: 200, marginRight: 30 }}
              />
              <Button
                onClick={verifyOtp}
                className="mb-3 mx-4"
                variant="contained"
                color="success"
                style={{ width: 100 }}
                hidden={hidden}
              >
                {!loadingValider ? (
                  <span>Valider </span>
                ) : (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
              </Button>
              <Button
                className="mb-3"
                variant="contained"
                color="warning"
                hidden={hidden}
              >
                Renvoyer
              </Button>
            </Col>
          </Col>
          <Col className="mt-3">
            <label>Channel utilisé pour reçovoir l'Otp :</label>
            <FormGroup>
              <FormControlLabel
                disabled={!checked}
                control={
                  <Switch
                    checked={!switchChecked}
                    onChange={() => {
                      setSwitchChecked(!switchChecked);
                    }}
                  />
                }
                label="Email"
              />
              <FormControlLabel
                disabled={!checked}
                control={
                  <Switch
                    checked={switchChecked}
                    onChange={() => {
                      setSwitchChecked(!switchChecked);
                    }}
                  />
                }
                label="SMS"
              />
            </FormGroup>

            <img
              style={{ marginLeft: 50 }}
              src={"../../assets/checked.png"}
              width="130"
              hidden={!signed}
            />
          </Col>
        </Row>
        <Row className="">
          <Col className="">
            <FileList files={_files} removeFile={removeFile} />
          </Col>
        </Row>
      </div>

      <Snackbar
        open={openDialog}
        TransitionComponent={SlideTransition}
        onClose={() => setOpenDialog(false)}
        message={message}
      />
    </div>
  );
}
