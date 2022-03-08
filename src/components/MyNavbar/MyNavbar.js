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
import {
  flattenDiagnosticMessageText,
  isConstructorDeclaration,
} from "typescript";
// import { MenuItems } from "./MenuItems";

class MyNavbar extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal1: false,
      showModal2: false,
    };
  }

  handleModal1() {
    this.setState({ showModal1: !this.state.showModal1 });
  }

  handleModal2() {
    this.setState({ showModal2: !this.state.showModal2 });
  }

  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand className="ml-auto">TaskBoard</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mx-auto">
                {/* Button for Information Modal =======*/}
                <Button
                  onClick={() => {
                    this.handleModal1();
                  }}
                >
                  Information
                </Button>
                <Modal show={this.state.showModal1}>
                  <Modal.Header>Information</Modal.Header>
                  <Modal.Body>Modal Body</Modal.Body>
                  <Modal.Footer>
                    <Button
                      onClick={() => {
                        this.handleModal1();
                      }}
                    >
                      Close Modal
                    </Button>
                  </Modal.Footer>
                </Modal>
                {/* =================================== */}

                {/* Button for Settings Modal =========*/}
                <Button
                  onClick={() => {
                    this.handleModal2();
                  }}
                >
                  Settings
                </Button>
                <Modal show={this.state.showModal2}>
                  <Modal.Header>Settings</Modal.Header>
                  <Modal.Body>Modal Body</Modal.Body>
                  <Modal.Footer>
                    <Button
                      onClick={() => {
                        this.handleModal2();
                      }}
                    >
                      Close Modal
                    </Button>
                  </Modal.Footer>
                </Modal>
                {/* =================================== */}

                <a href="/">
                  <Button>Log-Out</Button>
                </a>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
