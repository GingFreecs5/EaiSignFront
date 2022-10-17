import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { signup, createfolder } from "../../../Redux/auth";
import { useNavigate } from "react-router-dom";

import { ErrorMessage } from "@hookform/error-message";
import "./error.css";
export default function Step4() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const handleRegister = (formValue) => {
    const { password } = formValue;
    setLoading(true);
    const { nom, prenom, email, num_telephone, piece_justicatif } = user;
    dispatch(
      signup({ nom, prenom, email, num_telephone, piece_justicatif, password })
    )
      .unwrap()
      .then((ok) => {
        dispatch(createfolder(ok))
          .then((ok) => {
            setLoading(false);
            navigate("/login");
          })
          .catch((e) => {
            setLoading(false);
          });
      })
      .catch(() => {
        setLoading(false);
        console.log("noo");
      });
  };
  return (
    <Row>
      <Container className=" col-xl-4 col-lg-7 col-md-12 col-sm-12   ">
        <Form onSubmit={handleSubmit(handleRegister)} className="p-4">
          <Row className="mb-3">
            <Col>
              <Form.Control
                {...register("password", {
                  required: "This is required.",
                  minLength: {
                    value: 8,
                    message: "Mot de passe doit contenir plus de 8 caractéres",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Mot de passe doit contenir au moins un majuscule et un lettre et un caractére spécial",
                  },
                })}
                type="password"
                placeholder="Mot de passe *"
              />
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => (
                  <p className="text-start error">{message}</p>
                )}
              />
            </Col>
          </Row>

          <Row className="mb-5">
            <Col>
              <Form.Control
                type="password"
                {...register("repeatpassword", {
                  required: "This is required.",
                  validate: (val) => {
                    if (watch("password") !== val) {
                      return "Vos mots de passe ne correspondent pas";
                    }
                  },
                })}
                placeholder="Confirmer le mot de passe *"
              />
              <ErrorMessage
                errors={errors}
                name="repeatpassword"
                render={({ message }) => (
                  <p className="text-start error">{message}</p>
                )}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                type="submit"
                style={{ width: 200, height: 50, borderRadius: 0 }}
                className="primary "
              >
                <span hidden={loading}>Valider</span>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Row>
  );
}
