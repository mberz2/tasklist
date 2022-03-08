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
      <Navbar
        id="navbar"
        bg="light"
        collapseOnSelect
        sticky="top"
        expand="sm"
        className="p-3"
      >
        <Navbar.Brand className="d-none d-sm-block p-3 col-sm-3">
          TaskBoard
        </Navbar.Brand>
        <Navbar.Brand className="d-sm-none col-3">
          <Nav.Link href="/">
            <HomeIcon id="Home_Icon" />
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="container-fluid text-center">
            <Nav.Item className="ms-auto" />
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
      </Navbar>
    </div>
  );
};

export default MyNavbar;
