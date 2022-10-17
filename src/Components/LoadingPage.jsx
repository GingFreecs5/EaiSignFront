import React from "react";
import { Button, Spinner } from "react-bootstrap";
import Logo from "./Logo/logo";

export default function LoadingPage() {
  return (
    <div className="">
      <Logo />
      <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      </Button>
    </div>
  );
}
