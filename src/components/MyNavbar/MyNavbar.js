import React, { Component } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Button,
  Modal,
  ModalBody
} from "react-bootstrap";
import HomeIcon from "@mui/icons-material/Home";
// import { MenuItems } from "./MenuItems";

const MyNavbar = () => {
  return (
    <div>
      <Navbar id="navbar" bg="light" expand="sm">
        <Container>
          <Navbar.Brand className="d-none d-sm-block">TaskBoard</Navbar.Brand>
          <Navbar.Brand className="d-sm-none col-3">
            <Nav.Link href="/">
              <HomeIcon id="Home_Icon" />
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
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
