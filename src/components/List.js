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
  const [card, setCards] = useState({ currentCards: [] });
  let nameInput = React.createRef();
  let params = useParams();
  let { state } = useLocation();

  let listId = props.list.id;

  //console.log(TAG + "Props\n" + JSON.stringify(props));
  //console.log(TAG + "State\n" + JSON.stringify(state));
  //console.log(TAG + "Params\n" + JSON.stringify(params));

  //console.log(TAG + "Props\n" + JSON.stringify(props));
  // Update the state of the cards
  useEffect(() => {
    getCards(listId);
  }, []);

  const getCards = async (listId) => {
    try {
      //Clear the Cards before re-render
      setCards([]);

      const cardQuery = query(
        collection(db, "cards"),
        where("card.listId", "==", listId),
        orderBy("card.createdAt")
      );

      const cards = await getDocs(cardQuery);

      cards.forEach((card) => {
        const data = card.data().card;
        let id = card.id;

        setCards((card) => [
          ...card,
          {
            id: id,
            ...data
          }
        ]);
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
        await addDoc(cardsRef, {
          card
        });
      }

      nameInput.current.value = "";
    } catch (error) {
      console.error(TAG + "Error creating new card: ", error);
    }
  };
  return (
    <div className="list">
      <div className="list-header">
        <p>{props.list.title}</p>
      </div>
      {/*       {Object.keys(props.list.cards).map((key) => (
        <Card key={key} data={props.list.cards[key]} />
      ))} */}
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
