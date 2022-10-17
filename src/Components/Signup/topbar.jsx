import React from "react";
import Logo from "../Logo/logo";
import Title from "../Titles/title";
import { Container, Navbar, NavbarBrand, NavItem } from "react-bootstrap";
import StepField from "./Components/stepfield";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Topbar() {
  const current = useSelector((state) => state.current.value);
  function titleused() {
    if (current === 0) {
      return {
        title: "Les données personnels",
        number: "1",
      };
    } else if (current === 1) {
      return {
        title: "Validation d'email",
        number: "2",
      };
    } else if (current === 2) {
      return {
        title: "Validation du numéro de téléphone",
        number: "3",
      };
    } else if (current === 3) {
      return {
        title: "Chosir votre mot de passe",
        number: "4",
      };
    }
  }
  return (
    <Navbar>
      <Container className="gap-3 flex-column flex-md-column flex-lg-row  flex-sm-column allign-items-baseline">
        {" "}
        <NavbarBrand>
          <div style={{ display: "flex" }}>
            <Logo />
            <Title />
          </div>
        </NavbarBrand>
        <NavItem className="">
          <StepField title={titleused().title} number={titleused().number} />
        </NavItem>
        <NavItem className="">
          <Link to="/login">
            Vous avez déja un compte ? Connectez maintenat
          </Link>
        </NavItem>
      </Container>
    </Navbar>
  );
}
