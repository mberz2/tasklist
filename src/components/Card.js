import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import EditCardModal from "./EditCardModal";

import { Draggable } from "react-beautiful-dnd";

function Card(props) {
  let TAG = "[Card.js] ";

  const [modal, setModal] = useState({ modalOpen: false });

  const toggleModal = () => {
    setModal({ modalOpen: !modal.modalOpen });
  };

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
              <textarea
                onClick={toggleModal}
                readOnly
                value={props.data.text}
              ></textarea>
              <span onClick={deleteCard}>&times;</span>
            </div>
          </div>
          <EditCardModal
            modalOpen={modal.modalOpen}
            toggleModal={toggleModal}
            cardData={props.data}
          />
        </>
      )}
    </Draggable>
  );
}

Card.propTypes = {
  data: PropTypes.object.isRequired
};

export default Card;
