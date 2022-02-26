import React from "react";
import Card from "./Card";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { db, cardsRef } from "../firebase";
import {
  addDoc,
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  orderBy
} from "firebase/firestore";

function List(props) {
  let TAG = "[List.js] ";
  const [card, setCards] = useState([]);
  let nameInput = React.createRef();
  let params = useParams();
  let { state } = useLocation();

  console.log(TAG + "Props\n" + JSON.stringify(props));
  //console.log(TAG + "State\n" + JSON.stringify(state));
  //console.log(TAG + "Params\n" + JSON.stringify(params));
  //console.log(TAG + "Props\n" + JSON.stringify(props));

  // Update the state of the cards
  useEffect(() => {
    if (!props.list.id) {
      console.log(TAG + "Waiting for list id...");
    } else {
      getCards(props.list.id);
    }
  }, []);

  // Use effect for resetting text box.
  useEffect(() => {
    nameInput.current.value = "";
  });

  const getCards = async (listId) => {
    if (!listId) {
      console.error(TAG + "ListID is undefinied");
    }
    try {
      //Clear the Cards before re-render
      setCards([]);

      console.log(TAG + "Getting cards.");

      const cardQuery = query(
        collection(db, "cards"),
        where("card.listId", "==", listId),
        orderBy("card.createdAt")
      );

      const cards = await getDocs(cardQuery);

      cards.forEach((card) => {
        const data = card.data().card;
        const cardObj = {
          id: card.id,
          ...data
        };

        console.log(TAG + "Pushing to state");
        setCards((prevState) => [...prevState, cardObj]);
      });
    } catch (error) {
      console.error(TAG + "Error fetching cards", error);
    }
  };

  const createNewCard = async (e) => {
    console.log(TAG + "Creating new card.");
    try {
      e.preventDefault();
      const card = {
        text: nameInput.current.value,
        listId: props.list.id,
        labels: [],
        createdAt: new Date()
      };
      if (card.text && card.listId) {
        console.log(TAG + "Adding card.");

        setCards((prevState) => [...prevState, ...card]);
      }
    } catch (error) {
      console.error(TAG + "Error creating new card: ", error);
    }
  };
  return (
    <div className="list">
      <div className="list-header">
        <p>{props.list.title}</p>
      </div>
      {Object.keys(card).map((key) => (
        <Card key={card[key].id} data={card[key]} />
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
