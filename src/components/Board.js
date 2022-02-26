import React from "react";
import List from "./List";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import uuid from "react-uuid";

import { db, listsRef } from "../firebase";
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

function Board(props) {
  let TAG = "[Board.js] ";
  let params = useParams();
  let { state } = useLocation();
  let boardId = params.boardId;

  console.log(TAG + "Props\n" + JSON.stringify(props));
  console.log(TAG + "State\n" + JSON.stringify(state));
  console.log(TAG + "Params\n" + JSON.stringify(params));

  const [list, setLists] = useState([]);
  const [board, setBoard] = useState({});

  // Update the state of the lists
  useEffect(() => {
    getBoard(boardId);
    getLists(boardId);
  }, []);

  // Use effect for resetting text box.
  useEffect(() => {
    addBoardInput.current.value = "";
  });

  // Method to get board data from Firebase
  const getBoard = async (boardId) => {
    try {
      console.log(TAG + "Retrieving board information...");
      setBoard({});

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
      console.log(TAG + "Retrieving lists");

      //Clear the Lists before re-render
      setLists([]);

      const listQuery = query(
        collection(db, "lists"),
        where("list.board", "==", boardId),
        orderBy("list.createdAt")
      );

      const lists = await getDocs(listQuery);

      lists.forEach((list) => {
        const data = list.data().list;
        const listObj = {
          id: list.id,
          ...data
        };

        console.log(TAG + "Pushing to state");
        setLists((prevState) => [...prevState, listObj]);
      });
    } catch (error) {
      console.log(TAG + "Error getting lists", error);
    }
  };

  let addBoardInput = React.createRef();

  // Method to create a new List
  const createNewList = async (e) => {
    try {
      e.preventDefault();
      const list = {
        title: addBoardInput.current.value,
        board: params.boardId,
        createdAt: new Date()
      };

      if (list.title && list.board) {
        console.log(TAG + "Adding new list");
        await addDoc(listsRef, { list });

        // Update list state with the new board.
        console.log(TAG + "Updating state...");
        setLists((prevState) => [...prevState, list]);
      }
    } catch (error) {
      console.error(TAG + "Error creating new list: ", error);
    }
  };

  const deleteBoard = async () => {
    const boardId = params.boardId;
    props.deleteBoard(boardId);
  };

  const updateBoard = async (e) => {
    const boardId = params.boardId;
    const newTitle = e.currentTarget.value;
    if (boardId && newTitle) {
      props.updateBoard(boardId, newTitle);
    }
  };

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
        {Object.keys(list).map((key) => (
          <List key={uuid()} list={list[key]} deleteList={props.deleteList} />
        ))}
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

Board.propTypes = {
  deleteList: PropTypes.func.isRequired,
  deleteBoard: PropTypes.func.isRequired,
  updateBoard: PropTypes.func.isRequired
};

export default Board;
