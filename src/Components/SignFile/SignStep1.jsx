import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { Checkbox, TextField } from "@mui/material";
import FileUpload from "../../Components/SignFile/FileUpload";
import Button from "@mui/material/Button";
import FileList from "../../Components/SignFile/FileList";
import { deletefile, getFilesbyEnvId } from "../../Redux/filesSlice";
import Slide from "@mui/material/Slide";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { incrementCurrent } from "../../Redux/currentSlice";
function SignStep1({
  files,
  setMessage,
  setEmail,
  setNom,
  setPrenom,
  setOpenDialog,
  setChannel,
}) {
  const { email: userEmail } = useSelector((state) => state.auth.user);
  const { nom: userNom } = useSelector((state) => state.auth.user);
  const { prenom: userPrenom } = useSelector((state) => state.auth.user);
  const filesLength = files?.length;
  const [inpEmail, setInpEmail] = useState("");
  const [inpNom, setInpNom] = useState("");
  const [inpPrenom, setInpPrenom] = useState("");
  const validEmail = (email) => {
    return email?.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  const [checked, setChecked] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);
  //JE SUIS LE SIGNATAIRE DE CETTE ENVELOPPE
  const handleChange = (event) => {
    setChecked(event.target.checked);
    setSwitchChecked(false);
  };
  const dispatch = useDispatch();

  const removeFile = (filename) => {
    dispatch(deletefile(filename));
    // setFiles(_files.filter((file) => file.name !== filename));
  };
  const hanleClick = () => {
    if (checked) {
      setEmail(userEmail);
      setNom(userNom);
      setPrenom(userPrenom);
    } else {
      if (validEmail(inpEmail)) {
        setEmail(inpEmail);
        if (inpNom === "") {
          setMessage("Entrez le nom du signataire ");
          setOpenDialog(true);
          return;
        } else {
          setNom(inpNom);
        }
        if (inpPrenom === "") {
          setMessage("Entrez le prenom du signataire ");
          setOpenDialog(true);
          return;
        } else {
          setPrenom(inpPrenom);
        }
      } else {
        setMessage("Entrez un email valide ");
        setOpenDialog(true);
        return;
      }
    }
    if (switchChecked) {
      setChannel("sms");
    } else {
      setChannel("email");
    }
    dispatch(incrementCurrent());
  };
  return (
    <div>
      <div className=" p-3  ">
        <Row className="px-5">
          <Col className="d-flex  my-4 justify-content-center ">
            <FileUpload
              files={files}
              removeFile={removeFile}
              setMessage={setMessage}
              setOpenDialog={setOpenDialog}
            />
          </Col>
          <Col sm={5} className="d-flex flex-column   m-auto ">
            <label className="mb-3">Le signataire :</label>
            <TextField
              className="mb-3"
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
            <TextField
              className="mb-3"
              id="outlined-basic"
              label="Nom"
              variant="outlined"
              size="small"
              value={inpNom}
              onChange={(e) => {
                setInpNom(e.target.value);
              }}
              disabled={checked}
              style={{ maxWidth: 500 }}
            />
            <TextField
              className="mb-3"
              id="outlined"
              label="Prénom"
              variant="outlined"
              size="small"
              value={inpPrenom}
              onChange={(e) => {
                setInpPrenom(e.target.value);
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
          </Col>
        </Row>
        <Row className="">
          <Col className="mb-4">
            <FileList files={files} removeFile={removeFile} />
          </Col>
        </Row>
      </div>
      <div className="signBar">
        <Button
          disabled={filesLength === 0 ? true : false}
          onClick={hanleClick}
          style={{ margin: 10, minWidth: 130 }}
          variant="contained"
        >
          Suivant
        </Button>
      </div>
    </div>
  );
}
export default React.memo(SignStep1);
