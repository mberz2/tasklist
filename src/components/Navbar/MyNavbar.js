import React, { Component } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Button,
  Modal,
  ModalBody,
} from "react-bootstrap";
// import { MenuItems } from "./MenuItems";

const MyNavbar = () => {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand className="ml-auto">TaskBoard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              {/* <Nav.Link href="#settings">Settings</Nav.Link> */}
              {/* <Nav.Link href="/">Information</Nav.Link> */}
              <Button>Information</Button>
              <Modal show={false}>
                <Modal.Header>Modal Head</Modal.Header>
                <Modal.Body>Modal Body</Modal.Body>
                <Modal.Footer>Modal Footer</Modal.Footer>
              </Modal>
              <Button>Settings</Button>
              <a href="/">
                <Button>Log-Out</Button>
              </a>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default MyNavbar;
