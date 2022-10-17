import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import StepField from "./stepfield";
import { ErrorMessage } from "@hookform/error-message";
import { reInit } from "../../../Redux/transictionidSlice";
import { useForm } from "react-hook-form";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import { incrementCurrent } from "../../../Redux/currentSlice";
import { useDispatch } from "react-redux";
import otpservice from "../../../Services/otpservice";

import { useSelector } from "react-redux";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
export default function Step3() {
  const [loading, setLoading] = useState(false);
  const transactionid = useSelector((state) => state.value.transactionId);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const verifyotp = (formValue) => {
    const { otp } = formValue;
    otpservice
      .verifyOtp(otp, transactionid, "email.fr")
      .then((ok) => {
        console.log(ok.data);
        dispatch(incrementCurrent());
        dispatch(reInit());
      })
      .catch((err) => {
        console.log(err);
        setOpen(true);
      });
  };
  return (
    <Row>
      <Container className=" m-auto col-xl-4 col-lg-7 col-md-12 col-sm-12  align-items-center ">
        <Form onSubmit={handleSubmit(verifyotp)} className="p-4">
          <Row className="mb-5">
            <Col>
              <Form.Control
                {...register("otp", {
                  required: "Required",
                  maxLength: 25,
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Juste des nombres",
                  },
                })}
                type="text"
                placeholder="Entrez le code reçu ici "
              />
              <ErrorMessage
                errors={errors}
                name="nom"
                render={({ message }) => (
                  <p className="text-start error">{message}</p>
                )}
              />
            </Col>
            <Col>
              <StepField color={"white"} bgcolor={"#308ad9"} number={"?"} />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Link to="">Renvoyer le code</Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                type="submit"
                style={{ width: 200, height: 50, borderRadius: 0 }}
                className="primary "
              >
                <span hidden={loading}>Suivant</span>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <Snackbar
        open={open}
        TransitionComponent={SlideTransition}
        onClose={() => setOpen(false)}
        message="Code invalide"
      />
    </Row>
  );
}
