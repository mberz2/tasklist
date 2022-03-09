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
  ListGroup,
  ButtonGroup,
  Alert,
} from "react-bootstrap";

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
        <Navbar id="navbar" bg="light" expand="sm">
          <div class="container-fluid" style={{ margin: 0 }}>
            <Navbar.Brand>TaskBoard</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                {/* Button for Information Modal =======*/}
                <Button
                  onClick={() => {
                    this.handleModal1();
                  }}
                >
                  Information
                </Button>
                <Modal size="lg" show={this.state.showModal1}>
                  <Modal.Header>
                    <h1>Information</h1>
                  </Modal.Header>
                  <Modal.Body>
                    <Accordion>
                      <Alert variant="info">
                        <Alert.Heading>
                          <b>Click items below!</b>
                        </Alert.Heading>
                        <hr />
                        <p>Learn how to use our The TaskBoard Application!</p>
                      </Alert>
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
                  <Modal.Header class="d-flex justify-content-center">
                    <div>
                      <h1>Settings</h1>
                    </div>
                  </Modal.Header>
                  <Modal.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Button className="btn-block mr-1 mt-1 btn-lg">
                          Edit Profile
                        </Button>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Button className="btn-block mr-1 mt-1 btn-lg bg-light text-dark">
                          ❤️ Favorites
                        </Button>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Button className="btn-block mr-1 mt-1 btn-lg bg-light text-dark">
                          💻 Downloads
                        </Button>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Button className="btn-block mr-1 mt-1 btn-lg bg-light text-dark">
                          🌐 Languages
                        </Button>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Button className="btn-block mr-1 mt-1 btn-lg bg-light text-dark">
                          🌙 Dark Mode
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Modal.Body>
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
          </div>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;