import React, { useState } from "react";
import Logo from "../../Components/Logo/logo";
import Title from "../../Components/Titles/title";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Link } from "react-router-dom";

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <main className="bg-light h-100 ">
      <Container
        style={{
          paddingTop: 100,
        }}
      >
        <Row>
          <Col className="m-auto col-xl-5 col-lg-7   align-items-center">
            <div style={{ display: "flex", marginLeft: "30%" }}>
              <Logo />
              <Title />
            </div>
          </Col>
        </Row>
        <Row>
          <Col
            className="bodycontainer m-auto col-xl-5 col-lg-7   align-items-center"
            style={{
              backgroundColor: "white",
              padding: 30,
            }}
          >
            {" "}
            <Row className=" text-center mb-4">
              <Col>
                <span style={{ fontSize: 23, color: "silver" }}>
                  Réinstallez votre mot de passe{" "}
                </span>
              </Col>
            </Row>
            <Form>
              <Row className="mb-3">
                <Col>
                  <Form.Control
                    {...register("email", {
                      required: "Required",
                      maxLength: 70,
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Email adresse invalide",
                      },
                    })}
                    type="email"
                    placeholder="Email "
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
              {/* <Row className="mb-5">
                <Col>
                  <Form.Control
                    type="password"
                    {...register("repeatpassword", {
                      required: true,
                      validate: (val) => {
                        if (watch("password") !== val) {
                          return "Vos mots de passe ne correspondent pas";
                        }
                      },
                    })}
                    placeholder="Confirmer le mot de passe "
                  />
                  <ErrorMessage
                    errors={errors}
                    name="repeatpassword"
                    render={({ message }) => (
                      <p className="text-start">{message}</p>
                    )}
                  />
                </Col>
              </Row> */}
              <Row className=" text-center  ">
                <Col className="colmargin">
                  <Button
                    type="submit"
                    style={{ width: 200, height: 50, borderRadius: 0 }}
                    className="primary "
                    disabled={loading}
                  >
                    <span hidden={loading}>Valider</span>
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                  </Button>
                </Col>
                <Col className="colmargin">
                  <Link style={{ fontSize: 13 }} to={"/signup"}>
                    {" "}
                    Renvoyer le code
                  </Link>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
