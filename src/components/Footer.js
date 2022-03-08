import React from "react";
import { Button, Modal, Container, Navbar, Nav } from "react-bootstrap";

function About(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">About Us</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          This website was created as a final project for CS465P Full Stack Web
          Development, at Portland State University.
        </p>
      </Modal.Body>
      <Modal.Body>
        <h4>Who We Are</h4>
        <p>This project was a collaborative effort between:</p>
        <ul>
          <li>Matthew Berzinskas</li>
          <ul>
            <li>Email: mberz2@pdx.edu</li>
            <li>Github: github.com/mberz2/</li>
          </ul>

          <li>"Tommy Nguyen</li>
          <ul>
            <li>Email: ntommy@pdx.ed</li>
          </ul>
          <li>Nick Morales</li>
          <ul>
            <li>Email: nimora2@pdx.edu</li>
          </ul>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Footer(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Navbar
      id="footer"
      fixed="bottom"
      bg="light"
      expand="sm"
      className="container-fluid text-center"
    >
      <Container>
        <Navbar.Toggle className="container-fluid text-center" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto me-auto gap-4">
            <Button variant="primary" onClick={() => setModalShow(true)}>
              About
            </Button>
            <Button variant="primary">Github</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <About show={modalShow} onHide={() => setModalShow(false)} />
    </Navbar>
  );
}
export default Footer;
