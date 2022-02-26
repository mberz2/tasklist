import React from "react";
import PropTypes from "prop-types";
import { cardsRef } from "../firebase";

function Card(props) {
  let TAG = "[Card.js] ";

  const deleteCard = async (e) => {
    try {
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
