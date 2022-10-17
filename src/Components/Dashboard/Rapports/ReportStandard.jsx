import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button } from "@mui/material";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";

export default function ReportStandard({
  reports,
  setReports,
  setMessage,
  setOpenDialog,
}) {
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleChange2 = (event) => {
    setDate(event.target.value);
  };
  const reportName = (report) => {
    let reportName_ = "";
    if (report.status === "All") {
      reportName_ = reportName_.concat("Tous les ", report.type, " manipulés ");
    } else if (report.status === "Terminé") {
      reportName_ = reportName_.concat("Tous les " + report.type + " signés ");
    }
    if (report.date === "Day") {
      reportName_ = reportName_.concat("aujourdhui");
    } else if (report.date === "Month") {
      reportName_ = reportName_.concat("ce mois");
    } else if (report.date === "Week") {
      reportName_ = reportName_.concat("cette semaine");
    } else if (report.date === "All") {
    }
    return reportName_;
  };
  const generateReportforEnvelope = () => {
    let report = { type: "Enveloppes", status: status, date: date };
    const reportname = reportName(report);
    report.reportName = reportname;
    setReports([...reports, report]);
  };
  const generateReportforDocuments = () => {
    const report = { type: "Documents", status: status, date: date };
    const reportname = reportName(report);
    report.reportName = reportname;
    setReports([...reports, report]);
  };
  const generateReportforUser = () => {
    const report = { type: "User", date: date };
    report.reportName = "Résumé d'utilisateur";
    setReports([...reports, report]);
  };
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Status d'enveloppe :
            </FormLabel>
            <RadioGroup
              onChange={handleChange}
              aria-labelledby="demo-radio-buttons-group-label"
              value={status}
              defaultValue="female"
              name="radio-buttons-group"
              className="mx-4"
            >
              <FormControlLabel
                value="All"
                control={<Radio />}
                label="Tous les documents"
              />
              <FormControlLabel
                value="Terminé"
                control={<Radio />}
                label="Les documents signés seulement"
              />
            </RadioGroup>
          </FormControl>
        </Col>
        <Col>
          <Row>
            <Col className=" text-center">
              <Button
                onClick={generateReportforUser}
                style={{ width: 400, height: 70 }}
                variant="contained"
                color="success"
              >
                Génerer un résumé de votre profil
              </Button>
            </Col>
            <Col className="mt-5 text-center">
              <Button
                onClick={generateReportforEnvelope}
                style={{ width: 400, height: 70 }}
                variant="contained"
                disabled={!(status && date)}
              >
                Génrer un rapport des enveloppes
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col className="mt-5 ">
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Les enveloppes manipulé depuis la :
            </FormLabel>
            <RadioGroup
              onChange={handleChange2}
              value={date}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              className="mx-4"
            >
              <FormControlLabel
                value="Day"
                control={<Radio />}
                label="Derniére 24 heures"
              />
              <FormControlLabel
                value="Week"
                control={<Radio />}
                label="Derniére semaine"
              />
              <FormControlLabel
                value="Month"
                control={<Radio />}
                label="Dernier mois"
              />{" "}
              <FormControlLabel
                value="All"
                control={<Radio />}
                label="Création"
              />
            </RadioGroup>
          </FormControl>
        </Col>{" "}
        <Col className="mt-5 text-center">
          <Button
            onClick={generateReportforDocuments}
            style={{ width: 400, height: 70 }}
            variant="contained"
            disabled={!(status && date)}
          >
            Génrer un rapport des documents
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
