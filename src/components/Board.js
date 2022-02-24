import React from "react";
import List from "./List";
import { useState, useEffect } from "react";
import data from "../sampleData";

function Board(props) {
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
  return (
    <div className="board-wrapper">
      <div className="lists-wrapper">
        {Object.keys(list.currentLists).map(
          (key) => (
            console.log("KEY: " + JSON.stringify(list.currentLists[key])),
            (
              <List
                key={list.currentLists[key].id}
                list={list.currentLists[key]}
              />
            )
          )
        )}
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
