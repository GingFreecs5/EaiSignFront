import React, { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import Documents from "./documents";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import { useLocation } from "react-router-dom";
import EnhancedTable from "./documents";
import DetailModal from "./DetailModal";

export default function Body(props) {
  const [searchedVal, setSearchVal] = useState("");
  const [show, setShow] = useState(false);
  const [enveloppe, setEnveloppe] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let location = useLocation();
  let enveloppes = props.docs;
  const filterDocuments = () => {
    if (searchedVal.includes("@")) {
      let enveloppesSigned = enveloppes.filter(
        (doc) => doc.status === "Terminé"
      );
      let enveloppesSearched = [];
      for (let i = 0; i < enveloppesSigned?.length; i++) {
        const documents = enveloppesSigned[i].documents;

        for (let j = 0; j < documents?.length; j++) {
          const email = documents[j]?.signataire?.email;
          if (email) {
            const el = email
              .toString()
              .toLowerCase()
              .includes(searchedVal.toString().toLowerCase());
            if (el) {
              enveloppesSearched.push(enveloppesSigned[i]);
              break;
            }
          }
        }
      }
      enveloppes = enveloppesSearched;
    } else {
      enveloppes = enveloppes.filter(
        (row) =>
          // note that I've incorporated the searchedVal length check here
          !searchedVal?.length ||
          (row.nom &&
            row?.nom
              .toString()
              .toLowerCase()
              .includes(searchedVal.toString().toLowerCase()))
      );
    }
  };

  filterDocuments();

  switch (location.pathname) {
    case "/documents/termine":
      enveloppes = enveloppes.filter((d) => d.status === "Terminé");
      break;
    case "/documents/encours":
      enveloppes = enveloppes.filter((d) => d.status === "En cours");
      break;

    case "/documents/expire": {
      enveloppes = enveloppes.filter((d) => d.status === "Expiré");
      break;
    }
    case "/documents/brouillon": {
      enveloppes = enveloppes.filter((d) => d.status === "Brouillon");
      break;
    }
    case "/documents/supprime": {
      enveloppes = enveloppes.filter((d) => d.status === "Supprimé");
      break;
    }
    case "/documents/envoye": {
      enveloppes = enveloppes.filter((d) => d.status === "Envoyé");
      break;
    }
  }
  return (
    <>
      <Topbar setSearchVal={setSearchVal} />
      <Container>
        <Row>
          <Col>
            <Sidebar />
          </Col>
          <Col className="col-xl-9">
            <EnhancedTable
              docs={enveloppes}
              setEnveloppe={setEnveloppe}
              handleShow={handleShow}
            />
          </Col>
        </Row>
      </Container>
      <DetailModal
        enveloppe={enveloppe}
        show={show}
        handleClose={handleClose}
      />
    </>
  );
}
