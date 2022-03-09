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
  constructor(props) {
    const buttonTxt = localStorage.getItem('theme') === `light` ? `btn-block mr-1 mt-1 btn-lg bg-light text-dark` : `btn-block mr-1 mt-1 btn-lg bg-dark text-white`;
    const genTheme = localStorage.getItem('theme') === `light` ? `bg-light text-black` : `bg-dark text-white`;
    const modTheme = localStorage.getItem('theme') === `light` ? `bg-light` : `bg-dark`;
    super(props);
    this.state = {
      showModal1: false,
      showModal2: false,
      navTheme: localStorage.getItem('theme'),
      modButtonTxt: buttonTxt,
      classNorm: genTheme,
      modNorm: modTheme
    };
    let localStorageTheme = localStorage.getItem("theme");
    document.body.className = `theme_${localStorageTheme}`;
  }
  componentDidUpdate() {
    if (this.state.navTheme !== localStorage.getItem("theme")) {
      this.setState({ navTheme: localStorage.getItem("theme") });
      let localStorageTheme = localStorage.getItem("theme");
      document.body.className = `theme_${localStorageTheme}`;
    }
    if (this.state.navThem === `light`){
      
    }
  }
  /*
  componentDidMount(){
    console.log("Mounting");
    let localStorageTheme = localStorage.getItem("theme");
    this.state.navTheme = localStorageTheme;
  }

  componentDidUpdate(){
    
    
    console.log(`update spotted`);
    if(!localStorageTheme){
      console.log(`how did you do that`);
      localStorageTheme = `light`;
    }
    
    let localStorageTheme = localStorage.getItem("theme");
    //if(localStorageTheme === `light`) localStorageTheme = `dark`;
    //else{localStorageTheme = `light`};
    this.state.navTheme = localStorageTheme;
    console.log(localStorageTheme);
    console.log(this.state.navTheme);
  }
  */
  handleModal1() {
    this.setState({ showModal1: !this.state.showModal1 });
  }

  handleModal2() {
    this.setState({ showModal2: !this.state.showModal2 });
  }

  render() {
    return (
      <div>
        <Navbar id="navbar" bg={this.state.navTheme} variant={this.state.navTheme} expand="sm">
          <div class="container-fluid" style={{ margin: 0 }}>
            <Navbar.Brand>TaskBoard</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                {/* Button for Information Modal =======*/}
                <Button variant={this.state.navTheme}
                  onClick={() => {
                    this.handleModal1();
                  }}
                >
                  Information
                </Button>
                
                <Modal size="lg" show={this.state.showModal1}>
                <div id="information">
                  <Modal.Body >
                    <h1>Information</h1>
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
                  <Modal.Footer >
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
                
                {/* =================================== */}

                {/* Button for Settings Modal =========*/}
                <Button variant={this.state.navTheme}
                  onClick={() => {
                    this.handleModal2();
                  }}
                >
                  Settings
                </Button>
                <Modal show={this.state.showModal2}>
                  <Modal.Header class="d-flex justify-content-center">
                      <h1>Settings</h1>
                  </Modal.Header>
                  <Modal.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Button className="btn-block mr-1 mt-1 btn-lg">
                          Edit Profile
                        </Button>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Button className={this.state.modButtonTxt}>
                          ❤️ Favorites
                        </Button>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Button className={this.state.modButtonTxt}>
                          💻 Downloads
                        </Button>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Button className={this.state.modButtonTxt}>
                          🌐 Languages
                        </Button>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Button className={this.state.modButtonTxt}>
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
                  <Button variant={this.state.navTheme}>Log-Out</Button>
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