import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { db, cardsRef } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import EditCardModal from "./EditCardModal";

function Card(props) {
  let TAG = "[Card.js] ";

  const [modal, setModal] = useState({ modalOpen: false });

  useEffect(() => {
    console.log(modal);
  }, [modal]);

  const toggleModal = () => {
    setModal({ modalOpen: !modal.modalOpen });
  };

  const deleteCard = async (e) => {
    try {
      e.preventDefault();
      console.log(TAG + "Deleting :" + props.data.id);
      const cardId = props.data.id;
      const card = await deleteDoc(doc(db, "cards", cardId));

      console.log(TAG + "Deletion complete.");
    } catch (error) {
      console.log(TAG + "Error deleting card", error);
    }
  };
  return (
    <React.Fragment>
      <div className="card">
        <div className="card-body">
          <p onClick={toggleModal}>{props.data.text}</p>
          <span onClick={deleteCard}>&times;</span>
        </div>
      </div>
      <EditCardModal modalOpen={modal.modalOpen} toggleModal={toggleModal} />
    </React.Fragment>
  );
}

Card.propTypes = {
  data: PropTypes.object.isRequired
};

export default Card;
