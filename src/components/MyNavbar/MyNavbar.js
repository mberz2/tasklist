import React, { Component } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Button,
  Modal,
  ModalBody,
  Accordion,
} from "react-bootstrap";
// import {
//   flattenDiagnosticMessageText,
//   isConstructorDeclaration,
// } from "typescript";
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
                <Modal size="lg" show={this.state.showModal1}>
                  <Modal.Header>Information</Modal.Header>
                  <Modal.Body>
                    <Accordion>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Boards</Accordion.Header>
                        <Accordion.Body>
                          <li>
                            Title a board i.e., input School, Home, Work, etc.
                          </li>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>Lists</Accordion.Header>
                        <Accordion.Body>
                          <li>
                            Title a list i.e., if your board is School, input
                            Math, History, Science, etc.
                          </li>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="2">
                        <Accordion.Header>Cards</Accordion.Header>
                        <Accordion.Body>
                          <li>
                            Title a list i.e., if your board is School, input
                            Math, History, Science, etc.
                          </li>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="3">
                        <Accordion.Header>
                          Further Customization
                        </Accordion.Header>
                        <Accordion.Body>
                          <li>Cards titles can edited.</li>
                          <li>Cards can be color labeled.</li>
                          <li>Cards can be deleted.</li>
                          <li>Cards are draggable between lists.</li>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="danger"
                      onClick={() => {
                        this.handleModal1();
                      }}
                    >
                      Close
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
                  <Modal.Body></Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="danger"
                      onClick={() => {
                        this.handleModal2();
                      }}
                    >
                      Close
                    </Button>
                    <Button
                      onClick={() => {
                        this.handleModal2();
                      }}
                    >
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
                {/* =================================== */}

                <a href="/">
                  <Button variant="danger">Log-Out</Button>
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
