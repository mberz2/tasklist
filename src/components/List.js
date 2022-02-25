import React from "react";
import Card from "./Card";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { cardsRef } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function List(props) {
  const [card, setCards] = useState({ currentCards: [] });
  let nameInput = React.createRef();

  const createNewCard = async (e) => {
    try {
      e.preventDefault();
      const newCard = {
        text: nameInput.current.value,
        listId: props.list.id,
        labels: [],
        createdAt: new Date()
      };
      if (newCard.text && newCard.listId) {
        await addDoc(cardsRef, newCard);
      }

      nameInput.current.value = "";
    } catch (error) {
      console.error("Error creating new card: ", error);
    }
  };
  return (
    <div className="list">
      <div className="list-header">
        <p>{props.list.title}</p>
      </div>
      {Object.keys(props.list.cards).map((key) => (
        <Card key={key} data={props.list.cards[key]} />
      ))}
      <form onSubmit={createNewCard} className="new-card-wrapper">
        <input
          type="text"
          ref={nameInput}
          name="name"
          placeholder=" + New Card"
        />
      </form>
    </div>
  );
}

/* List.propTypes = {
  List: PropTypes.object.isRequired
}; */

export default List;
