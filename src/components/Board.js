import React from "react";
import List from "./List";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import uuid from "react-uuid";

import { db, listsRef } from "../firebase";
import {
  addDoc,
  doc,
  getDoc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot
} from "firebase/firestore";

function Board(props) {
  let TAG = "[Board.js] ";
  let params = useParams();
  let boardId = params.boardId;

  //console.log(TAG + "Props\n" + JSON.stringify(props));
  //console.log(TAG + "State\n" + JSON.stringify(state));
  //console.log(TAG + "Params\n" + JSON.stringify(params));

  const [list, setLists] = useState([]);
  const [board, setBoard] = useState({});

  // Update the state of the board when the page renders
  useEffect(() => {
    // Resets the listInput on re-render
    listInput.current.value = "";
  });

  useEffect(() => {
    getBoard(boardId);

    // Base query for the lists
    const q = query(
      collection(db, "lists"),
      where("list.board", "==", boardId),
      orderBy("list.createdAt")
    );

    // Update the lists in real time
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postData = [];
      snapshot.forEach((doc) =>
        postData.push({ id: doc.id, title: doc.data().list.title })
      );
      //console.log(postData);
      setLists(postData);
    });

    return () => {
      console.log("Unsubscribing");
      unsubscribe();
    };
  }, []);

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
      console.log(TAG + "Error getting board", error);
    }
  };

  // Reference for list title
  let listInput = React.createRef();
  // Method to create a new List
  const createNewList = async (e) => {
    try {
      e.preventDefault();
      const list = {
        title: listInput.current.value,
        board: params.boardId,
        createdAt: new Date()
      };

      if (list.title && list.board) {
        console.log(TAG + "Adding new list");
        await addDoc(listsRef, { list });
      }
    } catch (error) {
      console.error(TAG + "Error creating new list: ", error);
    }
  };

  // Sends the board info to caller for board updates
  const updateBoard = async (e) => {
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
        <div>
          Created by: <span id="user">{board.user}</span>
        </div>
      </div>
      <div className="lists-wrapper">
        {Object.keys(list).map((key) => (
          <List key={uuid()} list={list[key]} deleteList={props.deleteList} />
        ))}
      </div>

      <form onSubmit={(e) => createNewList(e)} className="new-list-wrapper">
        <input
          type="text"
          ref={listInput}
          name="name"
          placeholder=" + New list"
        />
      </form>
    </div>
  );
}

Board.propTypes = {
  deleteList: PropTypes.func.isRequired,
  updateBoard: PropTypes.func.isRequired
};

export default Board;
