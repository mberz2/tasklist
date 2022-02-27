import React from "react";
import Card from "./Card";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import uuid from "react-uuid";

import { db, listsRef, cardsRef } from "../firebase";
import {
  addDoc,
  doc,
  updateDoc,
  onSnapshot,
  collection,
  query,
  where,
  orderBy
} from "firebase/firestore";

function List(props) {
  let TAG = "[List.js] ";
  const [card, setCards] = useState({ currentCards: [] });

  console.log(TAG + "Props\n" + JSON.stringify(props));
  //console.log(TAG + "Props\n" + JSON.stringify(props));

  // Update the state of the cards
  useEffect(() => {
    getCards(props.list.id);
  }, []);

  const getCards = async (listId) => {
    try {
      // Clear the Cards before re-render
      // setCards([]);

      console.log(TAG + "Getting cards.");

      // Construct firebase query and await response
      const cardQuery = query(
        collection(db, "cards"),
        where("card.listId", "==", listId),
        orderBy("card.createdAt")
      );

      onSnapshot(cardQuery, (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          //console.log(JSON.stringify(change.doc.data(), null, 2));

          const doc = change.doc;
          const cardObj = {
            id: doc.id,
            text: doc.data().card.text,
            labels: doc.data().card.labels
          };
          if (change.type === "added") {
            setCards({ currentCards: [...card.currentCards, cardObj] });
          }
          if (change.type === "removed") {
            this.setState({
              currentCards: [
                ...card.currentCards.filter((card) => {
                  return card.id !== change.doc.id;
                })
              ]
            });
          }
          if (change.type === "modified") {
            const index = card.currentCards.findIndex((item) => {
              return item.id === change.doc.id;
            });
            const cards = [...card.currentCards];
            cards[index] = card;
            this.setState({ currentCards: cards });
          }
        });
      });
    } catch (error) {
      console.error("Error fetching cards: ", error);
    }
  };

  let nameInput = React.createRef();
  const createNewCard = async (e, userId) => {
    try {
      e.preventDefault();
      const card = {
        text: nameInput.current.value,
        listId: props.list.id,
        labels: [],
        createdAt: new Date(),
        user: userId
      };
      if (card.text && card.listId) {
        console.log(TAG + "Adding card.");
        await addDoc(cardsRef, { card });
      }
      this.nameInput.current.value = "";
    } catch (error) {
      console.error("Error creating new card: ", error);
    }
  };

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

  const deleteList = () => {
    const listId = props.list.id;
    props.deleteList(listId);
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

      {Object.keys(card.currentCards).map((key) => (
        <Card
          //key={uuid()}
          key={card.currentCards[key].id}
          data={card.currentCards[key]}
        />
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
