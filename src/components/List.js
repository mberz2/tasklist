import React from "react";
import Card from "./Card";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import uuid from "react-uuid";

import { db, listsRef, cardsRef } from "../firebase";
import {
  addDoc,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  deleteDoc,
  ref,
  deleteObject
} from "firebase/firestore";
import { UserImportBuilder } from "firebase-admin/lib/auth/user-import-builder";

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
    getCards(props.list.id);
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
        await addDoc(cardsRef, { card });
        setCards((prevState) => [...prevState, card]);
      }
    } catch (error) {
      console.error(TAG + "Error creating new card: ", error);
    }
  };

  const deleteList = () => {
    const listId = props.list.id;
    props.deleteList(listId);
  };

  const updateList = async (e) => {
    try {
      console.log(TAG + "Updating list");
      const listRef = doc(db, "lists", props.list.id);

      // Set the "capital" field of the city 'DC'
      await updateDoc(listRef, {
        "list.title": e.currentTarget.value
      });
    } catch (error) {
      console.error("Error updating list: ", error);
    }
  };

  return (
    <div className="list">
      <div className="list-header">
        <input
          type="text"
          name="boardTitle"
          onChange={updateList}
          defaultValue={props.list.title}
        />
        <span onClick={deleteList}>&times;</span>
      </div>

      {Object.keys(card).map((key) => (
        <Card key={uuid()} data={card[key]} />
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
  list: PropTypes.object.isRequired,
  deleteList: PropTypes.func.isRequired
};

export default List;
