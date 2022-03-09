import React, { Component } from "react";
import {
  Navbar,
  Nav,
  Button,
  Modal,
  Accordion,
  ListGroup,
  Alert
} from "react-bootstrap";
import HomeIcon from "@mui/icons-material/Home";

class MyNavbar extends React.Component {
  constructor(props) {
    const buttonTxt =
      localStorage.getItem("theme") === `light`
        ? `btn-block mr-1 mt-1 btn-lg bg-light text-dark`
        : `btn-block mr-1 mt-1 btn-lg bg-dark text-white`;
    const classTheme =
      localStorage.getItem("theme") === `light` ? `bg-light` : `bg-dark`;

    super(props);

    this.state = {
      showModal1: false,
      showModal2: false,
      navTheme: localStorage.getItem("theme"),
      modButtonTxt: buttonTxt,
      classNorm: classTheme
    };

    let localStorageTheme = localStorage.getItem("theme");
    if (localStorageTheme !== null)
      document.body.className = `theme_${localStorageTheme}`;
    else document.body.className = `theme_light`;
  }

  componentDidUpdate() {
    if (this.state.navTheme !== localStorage.getItem("theme")) {
      this.setState({ navTheme: localStorage.getItem("theme") });
      let localStorageTheme = localStorage.getItem("theme");
      document.body.className = `theme_${localStorageTheme}`;
      const currTheme = localStorageTheme === `light` ? `bg-light` : `bg-dark`;
      this.setState({ classNorm: currTheme });
      const currButton =
        localStorageTheme === `light`
          ? `btn-block mr-1 mt-1 btn-lg bg-light text-dark`
          : `btn-block mr-1 mt-1 btn-lg bg-dark text-white`;
      this.setState({ modButtonTxt: currButton });
    }
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
        <Navbar
          id="navbar"
          bg={this.state.navTheme}
          variant={this.state.navTheme}
          collapseOnSelect
          sticky="top"
          expand="md"
          className="p-3"
        >
          <Navbar.Brand className="d-none d-sm-block p-3 col-sm-3">
            <Nav.Link href="/home">TaskBoard</Nav.Link>
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
              {/* Button for Information Modal =======*/}
              <Button
                variant={this.state.navTheme}
                onClick={() => {
                  this.handleModal1();
                }}
              >
                Information
              </Button>

              <Modal
                size="lg"
                show={this.state.showModal1}
                className="navbar_modal"
              >
                <div class="information">
                  <Modal.Header class="d-flex pt-3 justify-content-center">
                    <h1>Information</h1>
                  </Modal.Header>
                  <Modal.Body className={this.state.classNorm}>
                    <Accordion className={this.state.classNorm}>
                      <Alert variant="info">
                        <Alert.Heading>
                          <b>Click items below!</b>
                        </Alert.Heading>
                        <hr />
                        <p>Learn how to use our The TaskBoard Application!</p>
                      </Alert>
                      <Accordion.Item
                        className={this.state.classNorm}
                        eventKey="0"
                      >
                        <Accordion.Header className={this.state.classNorm}>
                          Boards
                        </Accordion.Header>
                        <Accordion.Body className={this.state.classNorm}>
                          <li>
                            Title a board i.e., input School, Home, Work, etc.
                          </li>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item
                        className={this.state.classNorm}
                        eventKey="1"
                      >
                        <Accordion.Header>Lists</Accordion.Header>
                        <Accordion.Body>
                          <li>
                            Title a list i.e., if your board is School, input
                            Math, History, Science, etc.
                          </li>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item
                        className={this.state.classNorm}
                        eventKey="2"
                      >
                        <Accordion.Header className={this.state.classNorm}>
                          Cards
                        </Accordion.Header>
                        <Accordion.Body className={this.state.classNorm}>
                          <li>
                            Title a list i.e., if your board is School, input
                            Math, History, Science, etc.
                          </li>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item
                        className={this.state.classNorm}
                        eventKey="3"
                      >
                        <Accordion.Header className={this.state.classNorm}>
                          Further Customization
                        </Accordion.Header>
                        <Accordion.Body className={this.state.classNorm}>
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
                </div>
              </Modal>

              {/* Button for Settings Modal =========*/}
              <Button
                variant={this.state.navTheme}
                onClick={() => {
                  this.handleModal2();
                }}
              >
                Settings
              </Button>
              <Modal
                show={this.state.showModal2}
                className="navbar_modal text-center"
              >
                <div class="information" id="settings">
                  <Modal.Header class="d-flex justify-content-center">
                    <h1>Settings</h1>
                  </Modal.Header>
                  <Modal.Body className={this.state.classNorm}>
                    <ListGroup variant="flush" className={this.state.classNorm}>
                      <ListGroup.Item className={this.state.classNorm}>
                        <Button className={this.state.modButtonTxt}>
                          Edit Profile
                        </Button>
                      </ListGroup.Item>
                      <ListGroup.Item className={this.state.classNorm}>
                        <Button className={this.state.modButtonTxt}>
                          ❤️ Favorites
                        </Button>
                      </ListGroup.Item>
                      <ListGroup.Item className={this.state.classNorm}>
                        <Button className={this.state.modButtonTxt}>
                          💻 Downloads
                        </Button>
                      </ListGroup.Item>
                      <ListGroup.Item className={this.state.classNorm}>
                        <Button className={this.state.modButtonTxt}>
                          🌐 Languages
                        </Button>
                      </ListGroup.Item>
                      <ListGroup.Item className={this.state.classNorm}>
                        <Button className={this.state.modButtonTxt}>
                          🌙 Dark Mode
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Modal.Body>
                  <Modal.Footer
                    style={{
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
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
                </div>
              </Modal>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
