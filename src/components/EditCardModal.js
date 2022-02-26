import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { cardsRef } from "../firebase";
import TextareaAutosize from "react-autosize-textarea";

export default function EditCardModal(props) {
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

  // Update the state of the cards
  useEffect(() => {}, []);

  const textInput = React.createRef();
  const updateCard = async (e) => {
    try {
      e.preventDefault();
      const cardId = props.cardData.id;
      const newText = textInput.current.value;
      const labels = state;
      const card = await cardsRef.doc(cardId);
      card.update({
        "card.text": newText,
        "card.labels": labels
      });
      this.props.toggleModal();
    } catch (error) {
      console.error("Error updating card: ", error);
    }
  };

  return (
    <div
      className="modal-wrapper"
      style={{ display: props.modalOpen ? "block" : "none" }}
    >
      <div className="modal-body">
        <form>
          <div>
            <span className="modal-close" onClick={props.toggleModal}>
              &times;
            </span>
            <p className="label-title">add/remove labels</p>
            {state.availableLabels.map((label) => {
              return (
                <span className="label" style={{ background: label }}></span>
              );
            })}
            <hr />
            <div className="edit-area">
              <span className="edit-icon">&#x270E;</span>
              <input className="textbox-edit"></input>
            </div>

            <div>
              <p className="label-title">labels:</p>
              {/* TODO: display laels */}
            </div>
            <button type="submit">Save Changes </button>
          </div>
        </form>
      </div>
    </div>
  );
}
