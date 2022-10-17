import React from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "./style.css";
export default function Topbar({ setSearchVal }) {
  return (
    <Container className="    ">
      <Row className="d-flex justify-content-between">
        <Col className="m-3 ">
          <TextField
            id="outlined-basic"
            label="Rechercher"
            variant="outlined"
            size="small"
            onChange={(e) => {
              setSearchVal(e.target.value);
            }}
          />{" "}
        </Col>
        <Col className="m-3 d-flex justify-content-end ">
          <Button
            href="/signature"
            size="lg"
            style={{ width: 250 }}
            variant="primary"
          >
            Signer maintenat
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
