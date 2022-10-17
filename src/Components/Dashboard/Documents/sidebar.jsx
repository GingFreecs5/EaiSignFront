import React from "react";
import { Container, Nav, NavLink } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <Container className="bg-light p-5 sidebarcontainer  ">
      <Nav className="flex-column gy-3 sidebar__container">
        <Col>
          <h5>Documents</h5>
        </Col>
        <NavLink href="/documents">
          <i className="bi bi-box-seam me-3"></i>
          <span>Tous</span>
        </NavLink>
        <NavLink href="/documents/termine">
          <i className="bi bi-arrow-up-right-circle me-3"></i>
          <span>Terminé</span>
        </NavLink>
        <NavLink href="/documents/brouillon">
          <i className="bi bi-journal me-3"></i>
          <span>Brouillon</span>{" "}
        </NavLink>
        <NavLink href="/documents/supprime">
          <i className="bi bi-trash me-3"></i>
          <span>Supprimé</span>
        </NavLink>
      </Nav>
      <Nav className="flex-column mt-3 gy-3 sidebar__container">
        {" "}
        <Col>
          <h5>Accés Rapide</h5>
        </Col>
        <NavLink href="/documents/favoris">
          <i className="bi bi-heart me-3"></i>
          <span>Favoris</span>{" "}
        </NavLink>
        <NavLink href="/documents/encours">
          <i className="bi bi-arrow-clockwise me-3"></i>
          <span>En cours</span>
        </NavLink>
        <NavLink href="/documents/envoye">
          <i className="bi bi-check-circle me-3"></i>
          <span>Envoyé</span>
        </NavLink>
      </Nav>
    </Container>
  );
}
