import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { db } from "../firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { Draggable } from "react-beautiful-dnd";
import { Button, Modal } from "react-bootstrap";

function Card(props) {
  let TAG = "[Card.js] ";

  const [modalShow, setModalShow] = React.useState(false);
  const [select, setSelect] = useState({ selectedLabels: [] });
  const [state, setState] = useState({
    availableLabels: [
      "#80ccff",
      "#80ffaa",
      "#f94a1e",
      "#ffb3ff",
      "#bf00ff",
      "#ffad33"
    ]
  });

  useEffect(() => {
    setSelect({ selectedLabels: props.data.labels });
  }, []);

  const textInput = React.createRef();
  async function updateCard() {
    try {
      const cardId = props.data.id;
      const newText = textInput.current.value;
      const labels = select.selectedLabels;

      console.log(TAG + "Updating card");
      const cardRef = doc(db, "cards", cardId);

      await updateDoc(cardRef, {
        "card.text": newText,
        "card.labels": labels
      });
    } catch (error) {
      console.error("Error updating card: ", error);
    }
  }

  const deleteCard = async (e) => {
    try {
      e.preventDefault();
      console.log(TAG + "Deleting :" + props.data.id);
      const cardId = props.data.id;
      await deleteDoc(doc(db, "cards", cardId));

      console.log(TAG + "Deletion complete.");
    } catch (error) {
      console.log(TAG + "Error deleting card", error);
    }
  };

  const setLabel = (label) => {
    const labels = [...select.selectedLabels];

    if (labels.includes(label)) {
      const newLabels = labels.filter((element) => {
        return element !== label;
      });
      setSelect({ selectedLabels: newLabels });
    } else {
      labels.push(label);
      setSelect({ selectedLabels: labels });
    }
  };

  function EditModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="edit_modal contained-modal-title-vcenter">
            Edit Card Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div>
              <p className="label-title">add/remove labels</p>
              {state.availableLabels.map((label) => {
                return (
                  <span
                    className="label"
                    onClick={() => setLabel(label)}
                    key={label}
                    style={{ background: label }}
                  ></span>
                );
              })}
              <hr />
              <div className="edit-area">
                <span className="edit-icon">&#x270E;</span>
                <textarea
                  className="textbox-edit"
                  defaultValue={props.data}
                  ref={textInput}
                ></textarea>
              </div>
              <div>
                <p className="label-title">labels:</p>
                {select.selectedLabels.map((label) => {
                  return (
                    <span
                      className="label"
                      style={{ background: label }}
                      key={label}
                    ></span>
                  );
                })}
              </div>
            </div>
            <div id="submit">
              <Button
                onClick={() => {
                  updateCard();
                  props.onHide();
                }}
              >
                Update
              </Button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }

  return (
    <Draggable draggableId={props.data.id} index={props.index}>
      {(provided) => (
        <>
          <div
            className="card"
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div className="card-labels">
              {props.data.labels.map((label) => {
                return (
                  <span
                    key={label}
                    style={{ background: label }}
                    className="label"
                  ></span>
                );
              })}
            </div>
            <div className="card-body">
              <textarea readOnly value={props.data.text}></textarea>
              <ul>
                <li>
                  <Button id="delete" onClick={deleteCard}>
                    <CloseIcon />
                  </Button>
                </li>
                <li>
                  <Button>
                    <EditIcon onClick={() => setModalShow(true)} />
                  </Button>
                  <EditModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    data={props.data.text}
                  />
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </Draggable>
  );
}

Card.propTypes = {
  data: PropTypes.object.isRequired
};

export default Card;
