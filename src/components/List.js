import React from "react";
import Card from "./Card";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import uuid from "react-uuid";

import { db, cardsRef } from "../firebase";
import {
  addDoc,
  doc,
  updateDoc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot
} from "firebase/firestore";

export default function List(props) {
  let TAG = "[List.js] ";
  const [card, setCards] = useState([]);
  let params = useParams();
  let { state } = useLocation();

  //console.log(TAG + "Props\n" + JSON.stringify(props));
  //console.log(TAG + "State\n" + JSON.stringify(state));
  //console.log(TAG + "Params\n" + JSON.stringify(params));

  //To-Do find a more efficient way
  useEffect(() => {
    // Use effect for reset cardInput on re-render
    cardInput.current.value = "";
  });

  useEffect(() => {
    // Base query to cards
    const q = query(
      collection(db, "cards"),
      where("card.listId", "==", props.list.id),
      orderBy("card.createdAt")
    );

    // Update the cards in real time
    const unsubscribe = onSnapshot(q, (snapshot) => {
      try {
        const postData = [];
        snapshot.forEach((doc) =>
          postData.push({ id: doc.id, ...doc.data().card })
        );
        setCards(postData);
      } catch (error) {
        console.error(TAG + "Error fetching cards", error);
      }
    });

    return () => {
      console.log("unsubscribe");
      unsubscribe();
    };
  }, []);

  // Reference for cardInput
  let cardInput = React.createRef();

  // Method for creating a new card
  const createNewCard = async (e) => {
    console.log(TAG + "Creating new card.");
    try {
      e.preventDefault();
      const card = {
        text: cardInput.current.value,
        listId: props.list.id,
        labels: [],
        createdAt: new Date()
      };
      if (card.text && card.listId) {
        console.log(TAG + "Adding card.");
        await addDoc(cardsRef, { card });
        //setCards((prevState) => [...prevState, card]);
      }
    } catch (error) {
      console.error(TAG + "Error creating new card: ", error);
    }
  };

  // Method for updating a list
  const updateList = async (e) => {
    try {
      console.log(TAG + "Updating list");
      const listRef = doc(db, "lists", props.list.id);

      await updateDoc(listRef, {
        "list.title": e.currentTarget.value
      });
    } catch (error) {
      console.error("Error updating list: ", error);
    }
  };

  // Method for deleting a list, passes Id up
  const deleteList = () => {
    const listId = props.list.id;
    props.deleteList(listId);
  };

  // Render the page
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
          ref={cardInput}
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
