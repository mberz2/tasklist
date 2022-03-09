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

let navTheme = "";
const identTheme = () => {
  const saved = localStorage.getItem('theme');
  const initialValue = JSON.stringify(saved);
  navTheme = initialValue;
  console.log(navTheme);
}
const navTest = "dark"

const MyNavbar = (props) => {
  identTheme();
  return (
    <div>
      <Navbar id="navbar" bg={props.dataFromApp} variant={props.dataFromApp} expand="sm">
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
              <Button variant={props.dataFromApp}>Information</Button>
              <Modal show={false}>
                <Modal.Header>Modal Head</Modal.Header>
                <Modal.Body>Modal Body</Modal.Body>
                <Modal.Footer>Modal Footer</Modal.Footer>
              </Modal>
              <Button variant={props.dataFromApp}>Settings</Button>
              <a href="/">
                <Button variant={props.dataFromApp}>Log-Out</Button>
              </a>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default MyNavbar;
