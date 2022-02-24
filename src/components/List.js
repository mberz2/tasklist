import React from "react";
import Card from "./Card";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function List(props) {
  const [card, setCards] = useState({ currentCards: [] });
  let nameInput = React.createRef();

  const createNewCard = (e) => {
    e.preventDefault();
    const newCard = {
      text: nameInput.current.value,
      listId: "abc123",
      labels: [],
      createdAt: new Date()
    };
    if (newCard.text) {
      setCards({ currentCards: [...card.currentCards, newCard] });
    }

    nameInput.current.value = "";
  };
  return (
    <div className="list">
      {console.log("ListPROPS\n" + JSON.stringify(props))}
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

List.propTypes = {
  List: PropTypes.object.isRequired
};

export default List;
