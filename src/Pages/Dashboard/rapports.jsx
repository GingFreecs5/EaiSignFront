import { Col, Container, Form, Row } from "react-bootstrap";
import React, { useState } from "react";
import TopBar from "../../Components/Dashboard/topbar";
import ReportStandard from "../../Components/Dashboard/Rapports/ReportStandard";
import ReportList from "../../Components/Dashboard/Rapports/ReportList";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initialReportList } from "../../Redux/reportSlice";
import { reportsUpdate } from "../../Redux/reportSlice";
import { Badge, Button, Snackbar } from "@mui/material";
import { useEffect } from "react";
import Slide from "@mui/material/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function Rapports() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [reports, setReports] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState("");
  const lengthReports = (reports) => {
    const _ = require("lodash");
    let reports_ = _.uniqWith(reports, _.isEqual);
    return reports_.length;
  };
  const navigateToRapportList = () => {
    const _ = require("lodash");

    let reports_ = _.uniqWith(reports, _.isEqual);

    reports_ = reports_.map((obj) => ({ ...obj, selected: false }));
    setReports(reports_);
    console.log(reports);
    dispatch(initialReportList(reports_));
    navigate("/rapportsList/");
  };
  return (
    <div>
      <TopBar />
      <Col className="mt-3 text-center">
        <h3>Selectionner les critéres souhaités pour générer le rapport </h3>
      </Col>
      <ReportStandard reports={reports} setReports={setReports} />
      <Col className="mt-5 text-center">
        <Badge badgeContent={lengthReports(reports)} color="warning">
          <Button
            size="large"
            variant="contained"
            endIcon={<ArrowForwardIosIcon />}
            onClick={navigateToRapportList}
          >
            Passer à la liste des rapports
          </Button>{" "}
        </Badge>
      </Col>
      <Snackbar
        open={openDialog}
        TransitionComponent={SlideTransition}
        onClose={() => setOpenDialog(false)}
        message={message}
      />
    </div>
  );
}
