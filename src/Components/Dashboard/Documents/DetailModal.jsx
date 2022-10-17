import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}
function formatDate(date) {
  return (
    [
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
      date.getFullYear(),
    ].join("/") +
    " " +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(":")
  );
}
export default function DetailModal({ show, enveloppe, handleClose }) {
  const documents = enveloppe.documents;
  const dateAjout = formatDate(new Date(enveloppe.dateAjout));
  const dateDerniermodification = formatDate(
    new Date(enveloppe.derniereModification)
  );
  //   const listItems = documents.map((doc) => <li>{doc}</li>);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5 className="text-center">Enveloppes details</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {" "}
            <span>Id : {enveloppe.id}</span>
            <br />
            <span>Nom : {enveloppe.nom}</span>
            <br />
            <span>Status :{enveloppe.status}</span>
            <br />
            <span>Date d'ajout : {dateAjout}</span>
            <br />
            <span>
              Date de derniére modification : {dateDerniermodification}
            </span>
            <br />
            <span>Nombre des documents: {documents?.length}</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
