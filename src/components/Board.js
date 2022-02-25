import React from "react";
import List from "./List";
import { useState, useEffect } from "react";
import data from "../sampleData";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { listsRef } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function Board(props) {
  let params = useParams();

  let { state } = useLocation();
  let background;
  let title = "Error Retrieving Title";
  if (!state) {
    background = "#FF0000";
  } else {
    title = state.title;
    background = state.background;
  }

  const [list, setLists] = useState({ currentLists: [] });

  useEffect(() => {
    setLists({ currentLists: data.lists });
  }, []);

  let addBoardInput = React.createRef();

  const createNewList = async (e) => {
    try {
      e.preventDefault();
      const newList = {
        id: Math.random(),
        title: addBoardInput.current.value,
        board: params.boardId,
        createdAt: new Date()
      };
      console.log(newList.title + " " + list.board);
      if (newList.title && newList.board) {
        console.log("Adding new list");
        await addDoc(listsRef, newList);
      }

      addBoardInput.current.value = "";
    } catch (error) {
      console.error("Error creating new list: ", error);
    }
  };

  return (
    <div className="board-wrapper" style={{ backgroundColor: background }}>
      <div className="board-header">
        <h3>Board Title: {title}</h3>
        <button>Delete Board</button>
      </div>
      <div className="lists-wrapper">
        {Object.keys(list.currentLists).map((key) => (
          <List key={list.currentLists[key].id} list={list.currentLists[key]} />
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
