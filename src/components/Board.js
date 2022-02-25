import React from "react";
import List from "./List";
import { useState, useEffect } from "react";
import data from "../sampleData";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { listsRef, boardsRef, db } from "../firebase";
import { addDoc, doc, getDoc } from "firebase/firestore";

function Board(props) {
  let TAG = "[Board.js] ";
  let params = useParams();
  let { state } = useLocation();
  let boardId = params.boardId;

  console.log(TAG + "PROPS\n" + JSON.stringify(props));
  console.log(TAG + "PARAMS\n" + JSON.stringify(params));
  console.log(TAG + "STATE\n" + JSON.stringify(state));

  // Variables for background color and title
  let background;
  let title;

  // Attempt to access navigation/state
  if (!state) {
    background = "#FF0000";
    title = "Error Retrieving Title";
  } else {
    title = state.title;
    background = state.background;
  }

  //const [list, setLists] = useState({ currentLists: [] });
  const [list, setLists] = useState([]);
  const [board, setBoard] = useState({ currentBoard: {} });

  // Update the state of the lists
  useEffect(() => {
    getBoard(boardId);
    //setLists({ currentLists: data.lists });
  }, []);

  const getBoard = async (boardId) => {
    console.log("???");
    try {
      console.log(TAG + "Trying to retrieve...");

      console.log("type: " + typeof db);

      const boardRef = doc(db, "boards", boardId);
      const boardSnap = await getDoc(boardRef);
      //console.log(JSON.stringify(boardSnap.data(), null, 3));

      setBoard({ currentBoard: boardSnap.data() });
      console.log(JSON.stringify(board.currentBoard, null, 3));
    } catch (error) {
      console.log(TAG + "Error getting boards", error);
    }
  };

  let addBoardInput = React.createRef();

  const createNewList = async (e) => {
    try {
      e.preventDefault();
      const newList = {
        title: addBoardInput.current.value,
        board: params.boardId,
        createdAt: new Date()
      };

      if (newList.title && newList.board) {
        console.log(TAG + "Adding new list");
        await addDoc(listsRef, newList);
      }
      addBoardInput.current.value = "";
    } catch (error) {
      console.error(TAG + "Error creating new list: ", error);
    }
  };

  console.log(board.currentBoard);

  return (
    <div
      className="board-wrapper"
      style={{ backgroundColor: board.currentBoard.background }}
    >
      <div className="board-header">
        <h3>Board Title: {board.currentBoard.title} </h3>
        <button>Delete Board</button>
      </div>
      <div className="lists-wrapper">
        {Object.keys(list).map((key) => (
          <List key={list[key].id} list={list[key]} />
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

export default Board;
