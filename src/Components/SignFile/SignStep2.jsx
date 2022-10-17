import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { TextField } from "@mui/material";

import Button from "@mui/material/Button";

import swal from "sweetalert";
import {
  signFile01,
  signFile02,
  signFile03,
  updateEnveloppe,
  deleteDocumentsbyEnvId,
} from "../../Redux/filesSlice";
import { saveEnveloppe, saveDocuments } from "../../Redux/filesSlice";

import PdfViewer from "../../Components/SignFile/PdfViewer";

function SignStep2({
  signed,
  setSigned,
  channel,
  email,
  nom,
  prenom,
  enveloppeName,
}) {
  const dispatch = useDispatch();
  const { files } = useSelector((state) => state.files);
  const [disabled, setDisabled] = useState(true);
  console.log(email, nom, prenom);
  const filesLength = files?.length;
  const [index, setIndex] = useState(0);
  let { envId, envName } = useParams();
  const [loading, setLoading] = useState(false);
  const [loadingValider, setLoadingValider] = useState(false);
  const [pdfFile, setPdfFile] = useState(files[0]);
  const [hidden, setHidden] = useState(true); //w8 user to receive OTP
  const [pjList, setPjlist] = useState(""); // last service signfile03 needs pdfs as string (pdjb64Signed+= ";").tostring()
  const [otp, setOtp] = useState("");
  const [transactionid, setTransactionid] = useState("");

  console.log(files);
  // pdf file onChange state

  const navigate = useNavigate();

  const validEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const onSignClick = () => {
    if (!hidden) {
    } else {
      setLoading(true);
      setDisabled(true);
      let files_ = [];
      files.map((file) => {
        const file_ = { b64: base64WithoutPrefix(file.b64) };
        console.log(file_);
        files_.push(file_);
      });
      console.log(files_);
      if (enveloppeName !== "") {
        dispatch(signFile01(files_))
          .unwrap()
          .then((ok) => {
            const data = ok.data;
            setLoading(false);
            const transactionId = data.transactionId;
            setTransactionid(transactionId);
            const pdfSigned = Object.values(data).filter((p) => p.length > 60); //Filter pdfb64 only without transactionid and status
            var pdfs = "";
            pdfSigned.map((p) => {
              //Create pjList
              pdfs += p + ";";
            });
            pdfs = pdfs.substring(0, pdfs.length - 1); //Delete last ";" from pjList
            setPjlist(pdfs);

            dispatch(signFile02({ email, transactionId, channel }))
              .unwrap()
              .then((ok) => {
                setLoading(false);
                setDisabled(false);
                setHidden(false);
              })
              .catch((error) => {
                setDisabled(false);
                setLoading(false);
                swal({
                  title: "Error!",
                  text: "Erreur dans le serveur. Esssayez une autre fois svp !",
                  icon: "error",
                  timer: 3000,
                  button: false,
                });
              });
          })
          .catch((error) => {
            setDisabled(false);
            setLoading(false);
            swal({
              title: "Error!",
              text: "Erreur dans le serveur. Esssayez une autre fois svp !",
              icon: "error",
              timer: 3000,
              button: false,
            });
          });
      } else {
        setDisabled(false);

        setLoading(false);
        swal({
          title: "Warning!",
          text: "Entrez un nom pour l'enveloppe !",
          icon: "warning",
          timer: 3000,
          button: false,
        });
      }
    }
  };
  const base64WithoutPrefix = (base64withPrefix) => {
    const pdfContentType = "application/pdf";
    const result = base64withPrefix.substr(
      `data:${pdfContentType};base64,`.length
    );
    return result;
  };

  const verifyOtp = () => {
    if (signed) {
    } else {
      setLoadingValider(true);
      const canalUtilise = channel;
      const favoris = false;
      let filesname = [];
      const signataireEmail = email;
      const signataireNom = nom;
      const signatairePrenom = prenom;
      files.map((file) => {
        filesname.push(file.name);
      });

      console.log((pjList.match(/;/g) || []).length);
      const otp_ = otp.trim();
      dispatch(signFile03({ otp_, transactionid, pjList, channel }))
        .unwrap()
        .then((ok) => {
          let enveloppeStatus_ = "Terminé";
          files.map((file) => {
            filesname.push(file.name);
          });
          if (envId == undefined) {
            dispatch(
              saveEnveloppe({ enveloppeName, enveloppeStatus_, favoris })
            )
              .unwrap()
              .then((ok) => {
                const idEnveloppe = ok.data.id;
                const copyFiles = false;

                dispatch(
                  saveDocuments({
                    filesname,
                    idEnveloppe,
                    canalUtilise,
                    signataireEmail,
                    signataireNom,
                    signatairePrenom,
                    copyFiles,
                  })
                )
                  .unwrap()
                  .then(() => {
                    setLoadingValider(false);

                    setSigned(true);
                    swal({
                      title: "Done!",
                      text: "Les documents signés sont envoyés à votre email !",
                      icon: "success",
                      timer: 3000,
                      button: false,
                    });
                    setTimeout(() => navigate("/documents/"), 3000);
                  })
                  .catch((e) => {
                    setLoadingValider(false);
                    swal({
                      title: "Error!",
                      text: "Les documents ne sont pas sauvegardés !",
                      icon: "error",
                      timer: 3000,
                      button: false,
                    });
                  });
              })
              .catch((e) => {
                setLoading(false);
                setLoadingValider(false);

                swal({
                  title: "Error!",
                  text: "L'enveloppe n'est pas enregistré !",
                  icon: "error",
                  timer: 3000,
                  button: false,
                });
              });
          } else {
            dispatch(
              updateEnveloppe({
                envId,
                enveloppeName,
                enveloppeStatus_,
                favoris,
              })
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
                        signataireEmail,
                        signataireNom,
                        signatairePrenom,
                        copyFiles,
                      })
                    )
                      .unwrap()
                      .then(() => {
                        setLoadingValider(false);
                        setSigned(true);
                        swal({
                          title: "Done!",
                          text: "Les documents signés sont envoyés à votre email !",
                          icon: "success",
                          timer: 3000,
                          button: false,
                        });
                        setTimeout(() => navigate("/documents/"), 3000);
                      })
                      .catch((e) => {
                        setLoading(false);
                        setLoadingValider(false);
                        swal({
                          title: "Error!",
                          text: "Les documents signés sont envoyés à votre email !",
                          icon: "error",
                          timer: 3000,
                          button: false,
                        });
                      });
                  })
                  .catch((err) => {
                    setLoadingValider(false);
                  });
              })
              .catch((e) => {
                setLoadingValider(false);
              });
          }
        })
        .catch((e) => {
          setLoadingValider(false);
          swal({
            title: "Error!",
            text: "CODE INVALIDE !",
            icon: "error",
            timer: 3000,
            button: false,
          });
        });
    }
  };

  const handleClick = () => {
    if (index < filesLength - 1) {
      setIndex((prevState) => prevState + 1);
      const index_ = index + 1;
      setPdfFile(files[index_]);
      console.log(index);
      setDisabled(true);
    } else {
      onSignClick();
    }
  };

  return (
    <>
      <Col className="my-4 col-9">
        <PdfViewer
          setDisabled={setDisabled}
          filesLength={filesLength}
          index={index}
          setIndex={setIndex}
          pdfFile={pdfFile}
        />
      </Col>
      <Col style={{ marginTop: 200 }}>
        <Row>
          <Col>
            <Button
              onClick={handleClick}
              className="mb-3"
              disabled={disabled}
              style={
                { minWidth: 130, minHeight: 37 }
                // index < filesLength - 1 ? { minWidth: 130 } : { minWidth: 297 }
              }
              variant="contained"
            >
              {index < filesLength - 1 ? (
                <span>Suivant</span>
              ) : (
                <span hidden={loading}>Signer</span>
              )}{" "}
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
            </Button>{" "}
          </Col>
          <Col>
            {" "}
            <TextField
              id="outlined-basic"
              label="OTP"
              InputLabelProps={{ shrink: true }}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              variant="outlined"
              hidden={hidden}
              size="small"
              style={{ maxHeight: 20 }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {" "}
            <Button
              hidden={hidden}
              onClick={verifyOtp}
              color="success"
              style={{ minWidth: 307, minHeight: 40 }}
              disabled={loadingValider}
              variant="contained"
            >
              <span hidden={loadingValider}>Valider</span>
              {loadingValider && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
            </Button>
          </Col>
        </Row>
      </Col>
    </>
  );
}
export default SignStep2;
