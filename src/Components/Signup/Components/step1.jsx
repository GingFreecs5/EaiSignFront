import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { incrementCurrent } from "../../../Redux/currentSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import otpservice from "../../../Services/otpservice";
import { checkEmail } from "../../../Redux/auth";
import { store } from "../../../Redux/transictionidSlice";
import { saveUser } from "../../../Redux/auth";
import "./error.css";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function Step1() {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // const checkmail = (formValue) => {
  //   const { email } = formValue;
  //   setLoading(true);

  //   dispatch(checkEmail(email))
  //     .unwrap()
  //     .then(() => {
  //       dispatch(saveUser(formValue));
  //       dispatch(incrementCurrent());
  //     })
  //     .catch((error) => {
  //       setLoading(false);

  //       setOpen(true);
  //     });
  // };

  const creation_identite = (formValue) => {
    const { email, nom, prenom, num_telephone, piece_justicatif } = formValue;
    setLoading(true);
    otpservice
      .creation_identite(
        email,
        email,
        nom,
        prenom,
        num_telephone,
        piece_justicatif
      )
      .then((ok) => {
        dispatch(checkEmail(email))
          .unwrap()
          .then(() => {
            otpservice
              .sendOtp(email, "sms.fr")
              .then((otp) => {
                dispatch(incrementCurrent());
                dispatch(saveUser(formValue));
                const action = {
                  email: email,
                  transactionId: otp.data.transactionId,
                };
                dispatch(store(action));
              })
              .catch((err) => {
                setLoading(false);
                setOpen(true);
              });
          })
          .catch((error) => {
            setLoading(false);
            setOpen(true);
          });
      })
      .catch((err) => {
        setLoading(false);
        setOpen(true);
      });
  };

  return (
    <Row>
      <Container className=" m-auto col-xl-4 col-lg-7 col-md-12 col-sm-12  align-items-center ">
        <Form onSubmit={handleSubmit(creation_identite)} className="p-4">
          <Row className="mb-3">
            <Col>
              <Form.Control
                {...register("nom", {
                  required: "Required",
                  maxLength: 25,
                  pattern: {
                    value: /^[a-zA-Z]+$/,
                    message: "Juste des lettres",
                  },
                })}
                type="text"
                placeholder="Nom *"
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
              <Form.Control
                {...register("prenom", {
                  required: "Required",
                  maxLength: 25,
                  pattern: {
                    value: /^[a-zA-Z]+$/,
                    message: "Juste des lettres",
                  },
                })}
                type="text"
                placeholder="Prénom *"
              />
              <ErrorMessage
                errors={errors}
                name="prenom"
                render={({ message }) => (
                  <p className="text-start error">{message}</p>
                )}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Control
                {...register("email", {
                  required: "Required",
                  maxLength: 60,
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Email adresse invalide",
                  },
                })}
                type="email"
                placeholder="Email *"
              />
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => (
                  <p className="text-start error">{message}</p>
                )}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Control
                {...register("num_telephone", {
                  required: "Required",
                  maxLength: 10,
                  pattern: {
                    value: /(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}/,
                    message: "Forme invalide",
                  },
                })}
                type="text"
                placeholder="Numéro de téléphone *"
              />
              <ErrorMessage
                errors={errors}
                name="num_telephone"
                render={({ message }) => (
                  <p className="text-start error">{message}</p>
                )}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Select>
                <option>CIN</option>
                <option>Passport</option>
              </Form.Select>
            </Col>
            <Col xs={7}>
              <Form.Control
                {...register("piece_justicatif", {
                  required: "Required",
                  maxLength: 10,
                })}
                type="text"
                placeholder="Piéce justicatif *"
              />
              <ErrorMessage
                errors={errors}
                name="piece_justicatif"
                render={({ message }) => (
                  <p className="text-start error">{message}</p>
                )}
              />
            </Col>{" "}
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
        message="Email déja utilisé"
      />
    </Row>
  );
}
