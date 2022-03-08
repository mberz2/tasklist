import React from "react";
import { Modal, Container, Navbar, Nav } from "react-bootstrap";

function About(props) {
  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">About Us</Modal.Title>
      </Modal.Header>
      <Modal.Body closeButton>
        <h4>Error!</h4>
        <p>
          Please ensure you have both a name and default color set for the
          board.
        </p>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
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
            <Nav.Link onClick={setModalShow(true)}>About</Nav.Link>
            <Nav.Link href="#link">Github</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <About show={modalShow} onHide={() => setModalShow(false)} />
    </Navbar>
  );
}
export default Footer;
