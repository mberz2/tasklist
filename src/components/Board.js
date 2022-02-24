import React from "react";
import List from "./List";
import { useState, useEffect } from "react";
import data from "../sampleData";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Board(props) {
  let params = useParams();

  let { state } = useLocation();
  let background;
  if (!state) {
    background = "#FF0000";
  } else {
    background = state.background;
  }
  console.log(state);
  console.log(background);

  const [list, setLists] = useState({ currentLists: [] });

  useEffect(() => {
    setLists({ currentLists: data.lists });
  }, []);

  let addBoardInput = React.createRef();

  const createNewList = (e) => {
    e.preventDefault();
    const newList = {
      id: Math.random(),
      title: addBoardInput.current.value,
      board: 500,
      createdAt: new Date(),
      cards: [
        {
          id: 1,
          text: "Card 1"
        },
        {
          id: 2,
          text: "Card 2"
        }
      ]
    };
    if (newList.title) {
      setLists({ currentLists: [...list.currentLists, newList] });
    }
    addBoardInput.current.value = "";
  };

  console.log(params.state);
  return (
    <div className="board-wrapper" style={{ backgroundColor: background }}>
      <div className="board-header">
        <h3>Board Title: {params.boardId}</h3>
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
