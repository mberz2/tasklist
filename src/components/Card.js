import React from "react";
import PropTypes from "prop-types";
import { db, cardsRef } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";

function Card(props) {
  let TAG = "[Card.js] ";

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
    <div className="card">
      <div className="card-body">
        <p>{props.data.text}</p>
        <span onClick={deleteCard}>&times;</span>
      </div>
    </div>
  );
}

Card.propTypes = {
  data: PropTypes.object.isRequired
};

export default Card;
