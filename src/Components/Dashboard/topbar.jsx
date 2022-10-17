import React from "react";
import {
  Container,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "react-bootstrap";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import Logo from "../Logo/logo";
import Title from "../Titles/title";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { Button } from "bootstrap";
import { deleteUser, logout } from "../../Redux/auth";
import { useLocation } from "react-router-dom";
import "./topbar.css";
import { useDispatch } from "react-redux";
export default function TopBar() {
  let location = useLocation();
  const dispatch = useDispatch();
  const Logout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    dispatch(deleteUser);
  };
  return (
    <>
      <Navbar
        style={{ backgroundColor: "#F8F1FA" }}
        expand="lg"
        variant="light"
      >
        <Container>
          <NavbarBrand href="/documents">
            <div style={{ display: "flex" }}>
              <Logo />
              <Title />
            </div>
          </NavbarBrand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <NavbarCollapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink href="/documents" className="m-3">
                <i className="bi bi-file-text"></i> Documents
              </NavLink>
              <NavLink href="/rapports" className="m-3">
                <i className="bi bi-clipboard-data"></i> Rapports
              </NavLink>
              <NavLink href="/contacts" className="m-3">
                <i className="bi bi-person-lines-fill"></i> Contacts
              </NavLink>
              <NavLink href="/modeles" className="m-3">
                <i className="bi bi-box-seam"></i> Modeles
              </NavLink>
            </Nav>
          </NavbarCollapse>

          <Nav className="di-flex">
            <NavLink href="/contacts">
              <SettingsIcon />
            </NavLink>
            <NavLink href="/contacts">
              <NotificationsIcon />
            </NavLink>
            <NavLink href="/contacts">
              {" "}
              <PersonIcon />
            </NavLink>
            <NavLink href="/login" onClick={Logout}>
              {" "}
              <LogoutIcon />
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
