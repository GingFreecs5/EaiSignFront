import React from "react";
import Topbar from "../../Components/Signup/topbar";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import HorizontalStepper from "../../Components/Signup/Components/stepper";
import Step1 from "../../Components/Signup/Components/step1";
import Step2 from "../../Components/Signup/Components/step2";
import Step3 from "../../Components/Signup/Components/step3";
import Step4 from "../../Components/Signup/Components/step4";

export default function Signup() {
  const current = useSelector((state) => state.current.value);
  console.log(current);
  const steps = [
    "Les données personels",
    "Validation du numéro de téléphone",
    "Validation d'email",
    "Chosir un mot de passe",
  ];
  console.log(current);
  function Stepused() {
    if (current === 0) {
      return <Step1></Step1>;
    } else if (current === 1) {
      return <Step2></Step2>;
    } else if (current === 2) {
      return <Step3></Step3>;
    } else if (current === 3) {
      return <Step4></Step4>;
    }
  }

  return (
    <Container>
      <Topbar />
      <hr></hr>

      <Container className="justify-content-center text-center">
        <Row className="mb-5 mt-5">
          <Col>
            <HorizontalStepper steps={steps} />
          </Col>
        </Row>
        <Stepused />
      </Container>
    </Container>
  );
}
