import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import { login } from "../../Redux/auth";
import Logo from "../../Components/Logo/logo";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import Title from "../../Components/Titles/title";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "../../Components/Signup/Components/error.css";
import "./login.css";
import CryptoJS from "crypto-js";
function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
const encryptFun = (data) => {
  var key = CryptoJS.enc.Latin1.parse("1234567812345678");
  var iv = CryptoJS.enc.Latin1.parse("1234567812345678");
  var encrypted = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  });
  return encrypted;
};

export default function Login(props) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/documents";
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogin = (formValue) => {
    let { email, password } = formValue;
    setLoading(true);
    const enCrypted = encryptFun(password);
    password = "" + enCrypted;
    password = password.trim();

    dispatch(login({ email, password, checked }))
      .unwrap()
      .then((ok) => {
        navigate(from, { replace: true });
      })
      .catch(() => {
        setOpen(true);
        setLoading(false);
      });
  };
  if (isLoggedIn) {
    return <Navigate to="/documents" />;
  }
  return (
    <main className="bg-light h-100  ">
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
            <Row className=" text-center">
              <Col>
                <span style={{ fontSize: 23, color: "silver" }}>
                  Connectez -vous{" "}
                </span>
              </Col>
            </Row>
            <Form onSubmit={handleSubmit(handleLogin)}>
              <Row>
                <Col className="colmargin">
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
              <Row>
                <Col className="colmargin">
                  <Form.Control
                    {...register("password", {
                      required: "Required",
                    })}
                    type="password"
                    placeholder="Mot de passe "
                  />
                  <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ message }) => (
                      <p className="error text-start">{message}</p>
                    )}
                  />
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col className="colmargin">
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                      checked={checked}
                      onChange={(event) => {
                        setChecked(event.target.checked);
                      }}
                      type="checkbox"
                      label="Restez connecté"
                    />
                  </Form.Group>
                </Col>
                <Col className="colmargin">
                  <a style={{ fontSize: 13 }} href="/forgetpassword">
                    Mot de passe oublié
                  </a>
                </Col>
              </Row>
              <Row className=" text-center ">
                <Col className="colmargin">
                  <Button
                    type="submit"
                    style={{ width: 200, height: 50, borderRadius: 0 }}
                    className="primary "
                    disabled={loading}
                    onClick={() => handleLogin}
                  >
                    <span hidden={loading}>Connectez-vous</span>
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                  </Button>
                </Col>
              </Row>
              <Row className=" text-center ">
                <Col className="colmargin">
                  <Link style={{ fontSize: 13 }} to={"/signup"}>
                    {" "}
                    Pas encore de compte ? Inscrivez maintenant
                  </Link>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <Col className="m-auto col-xl-4 col-lg-7 col-md-8 col-sm-9   align-items-center">
            <p style={{ fontSize: 10, color: "gray", textAlign: "center" }}>
              En vous connectant, vous acceptez les Conditions Générales
              d'Utilisation du service et la Politique de Confidentialité.
            </p>
          </Col>
        </Row>
        <Snackbar
          open={open}
          TransitionComponent={SlideTransition}
          onClose={() => setOpen(false)}
          message="Email ou mot de passe incorrect"
        />
      </Container>
    </main>
  );
}
