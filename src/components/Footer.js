import React from "react";
import { Button, Modal, Container, Navbar, Nav } from "react-bootstrap";
/* 
function About(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Deleting Board
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Warning!</h4>
        <p>
          You are about to delete this board and all its associated lists and
          cards. This action is irreversible, are you sure you want to proceed?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.deleteBoard}>Yes</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
 */
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
            <Nav.Link>About</Nav.Link>
            <Nav.Link href="#github">Github</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      {/* 
      <About show={modalShow} onHide={() => setModalShow(false)} /> */}
    </Navbar>
  );
}
export default Footer;
