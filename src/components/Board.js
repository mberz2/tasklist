import React, { useState, useEffect } from "react";

import uuid from "react-uuid";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import List from "./List";

import { db, listsRef } from "../firebase";
import {
  addDoc,
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  onSnapshot
} from "firebase/firestore";

export default function Board(props) {
  // Console logging for debugging
  let TAG = "[Board.js] ";
  //console.log(TAG + "Props\n" + JSON.stringify(props));
  //console.log(TAG + "State\n" + JSON.stringify(state));
  //console.log(TAG + "Params\n" + JSON.stringify(params));

  // Capture params and boardId from URL
  let params = useParams();

  // Set state objects for lists and boards on the page
  const [list, setLists] = useState({ currentLists: [] });
  const [board, setBoard] = useState({});

  // Board input reference
  let addBoardInput = React.createRef();

  // Update the state of the lists
  useEffect(() => {
    getBoard(params.boardId);
    getLists(params.boardId);
  }, []);

  // Use effect for resetting text box.
  useEffect(() => {
    addBoardInput.current.value = "";
  });

  // Method to get board data from Firebase
  const getBoard = async (boardId) => {
    try {
      console.log(TAG + "Retrieving board information...");
      // Clear board state before rendering
      // setBoard({});

      // Set a firebase reference, await snapshot,
      // Capture data from snapshot and add to state
      const boardRef = doc(db, "boards", boardId);
      const boardSnap = await getDoc(boardRef);
      const data = await boardSnap.data().board;
      setBoard({ ...board, id: board.id, ...data });
    } catch (error) {
      console.log(TAG + "Error getting boards", error);
    }
  };

  // Method to get lists from Firebase
  const getLists = async (boardId) => {
    try {
      // Clear the Lists before re-render
      //setLists({currentLists: []});

      console.log(TAG + "Retrieving lists");
      // Construct firebase query and await response
      const listQuery = query(
        collection(db, "lists"),
        where("list.board", "==", boardId),
        orderBy("list.createdAt")
      );

      onSnapshot(listQuery, (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          console.log(JSON.stringify(change.doc.data(), null, 2));
          console.log(JSON.stringify(change.type));

          if (change.type === "added") {
            const doc = change.doc;
            const listObj = {
              id: doc.id,
              title: doc.data().list.title
            };

            console.log("Adding list to state");
            setLists({ currentLists: [...list.currentLists, listObj] });
          }
          if (change.type === "removed") {
            setLists({
              currentLists: [
                ...list.currentLists.filter((list) => {
                  return list.id !== change.doc.id;
                })
              ]
            });
          }
        });
      });
    } catch (error) {
      console.log(TAG + "Error getting lists", error);
    }
  };

  console.log("After:\n" + JSON.stringify(list, null, 2));

  // Method to create a new List
  const createNewList = async (e) => {
    try {
      e.preventDefault();

      // Populate a list object
      const list = {
        title: addBoardInput.current.value,
        board: params.boardId,
        createdAt: new Date()
      };

      // Check that a title and boardId are present
      if (list.title && list.board) {
        console.log(TAG + "Adding new list");
        await addDoc(listsRef, { list });

        // Update list state with the new board.
        console.log(TAG + "Updating state...");
        //setLists((prevState) => [...prevState, list]);
      }
    } catch (error) {
      console.error(TAG + "Error creating new list: ", error);
    }
  };

  // Method to delete a board
  const deleteBoard = async () => {
    // Capture id and pass to prop method
    const boardId = params.boardId;
    props.deleteBoard(boardId);
  };

  // Method to update a board
  const updateBoard = async (e) => {
    // Capture boardId and title value and pass
    // to prop method.
    const boardId = params.boardId;
    const newTitle = e.currentTarget.value;
    if (boardId && newTitle) {
      props.updateBoard(boardId, newTitle);
    }
  };

  // Render the page
  return (
    <div
      className="board-wrapper"
      style={{ backgroundColor: board.background }}
    >
      <div className="board-header">
        <input
          type="text"
          name="boardTitle"
          onChange={updateBoard}
          defaultValue={board.title}
        />
        <button onClick={deleteBoard}>Delete Board</button>
      </div>
      <div className="lists-wrapper">
        {Object.keys(list.currentLists).map((key) => {
          return (
            <List
              key={uuid()}
              list={list.currentLists[key]}
              deleteList={props.deleteList}
            />
          );
        })}
      </div>

      <form onSubmit={(e) => createNewList(e)} className="new-list-wrapper">
        <input
          type="text"
          ref={addBoardInput}
          name="name"
          placeholder=" + New list"
        />
      </form>
    </div>
  );
}

//Board proptype validation
Board.propTypes = {
  deleteList: PropTypes.func.isRequired,
  deleteBoard: PropTypes.func.isRequired,
  updateBoard: PropTypes.func.isRequired
};
