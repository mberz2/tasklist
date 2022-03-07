import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { Modal, Button } from "react-bootstrap";

function DeleteModal(props) {
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

function BoardPreview(props) {
  let TAG = "[BoardPreview.js] ";
  //console.log(TAG + "Props\n" + JSON.stringify(props));

  let navigate = useNavigate();

  const [modalShow, setModalShow] = React.useState(false);

  const goToBoard = () => {
    const boardId = props.board.id;
    navigate(`/board/${boardId}`, { props });
  };

  // Sends the board info to caller for board delete
  const deleteBoard = async () => {
    setModalShow(false);
    const boardId = props.board.id;
    props.deleteBoard(boardId);
  };

  return (
    <div className="board-preview-container">
      <ul
        className="board-preview-item"
        onClick={goToBoard}
        style={{ backgroundColor: props.board.background }}
      >
        <li>{props.board.title}</li>
      </ul>
      <Button
        className="btn"
        variant="primary"
        onClick={() => setModalShow(true)}
      >
        Delete Board
      </Button>

      <DeleteModal
        show={modalShow}
        deleteBoard={deleteBoard}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

BoardPreview.propTypes = {
  board: PropTypes.object.isRequired,
  deleteBoard: PropTypes.func.isRequired
};

export default BoardPreview;
