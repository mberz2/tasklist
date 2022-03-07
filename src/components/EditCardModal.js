import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
/* import uuid from "react-uuid";
import TextareaAutosize from "react-autosize-textarea"; */

import { db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";

export default function EditCardModal(props) {
  let TAG = "[EditCardModal.js] ";

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

  const [select, setSelect] = useState({ selectedLabels: [] });

  useEffect(() => {
    setSelect({ selectedLabels: props.cardData.labels });
  }, []);

  const textInput = React.createRef();
  const updateCard = async (e) => {
    try {
      e.preventDefault();
      const cardId = props.cardData.id;
      const newText = textInput.current.value;
      const labels = select.selectedLabels;

      console.log(TAG + "Updating card");
      const cardRef = doc(db, "cards", cardId);

      await updateDoc(cardRef, {
        "card.text": newText,
        "card.labels": labels
      });

      props.toggleModal();
    } catch (error) {
      console.error("Error updating card: ", error);
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

  return (
    <div
      className="modal-wrapper"
      style={{ display: props.modalOpen ? "block" : "none" }}
    >
      <div className="modal-body">
        <form onSubmit={updateCard}>
          <div>
            <span className="modal-close" onClick={props.toggleModal}>
              &times;
            </span>
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
              {/*               <TextareaAutosize
                className="textbox-edit"
                defaultValue={props.cardData.text}
                ref={textInput}
              ></TextareaAutosize> */}
              <textarea
                className="textbox-edit"
                defaultValue={props.cardData.text}
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
            <button type="submit">Save Changes </button>
          </div>
        </form>
      </div>
    </div>
  );
}

EditCardModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  cardData: PropTypes.object.isRequired
};
