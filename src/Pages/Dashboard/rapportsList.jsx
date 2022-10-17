import React from "react";
import ReportList from "../../Components/Dashboard/Rapports/ReportList";
import { useSelector } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import TopBar from "../../Components/Dashboard/topbar";
import SendEmail from "../../Components/Dashboard/Rapports/SendEmail";
import { Snackbar } from "@mui/material";
import { useState } from "react";
import Slide from "@mui/material/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
export default function RapportsList({}) {
  let { reports } = useSelector((state) => state.report);
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState("");
  return (
    <>
      <TopBar />
      <Container>
        <Row>
          <Col>
            <ReportList reports={reports} />
          </Col>
        </Row>
        <Row>
          <Col className="">
            <SendEmail
              reports={reports}
              setMessage={setMessage}
              setOpenDialog={setOpenDialog}
            />
          </Col>
        </Row>
        <Snackbar
          open={openDialog}
          TransitionComponent={SlideTransition}
          onClose={() => setOpenDialog(false)}
          message={message}
        />
      </Container>
    </>
  );
}
