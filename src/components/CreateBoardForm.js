import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

function CreateBoardForm(props) {
  //Default state
  const [state, setStates] = useState({ title: "", background: "#80ccff" });

  const handleSubmit = (e, userId) => {
    e.preventDefault();
    console.log(state);

    const board = {
      title: state.title,
      background: state.background,
      createdAt: new Date(),
      user: userId
    };
    console.log(
      "Title: " + state.title + " " + "Background: " + state.background
    );
    if (state.title && state.background) {
      console.log("Creating board");
      props.createNewBoard(board);
    } else {
      console.log("Missing params in create board.");
    }
    setStates({ title: "" });
  };

  return (
    <form className="create-board-wrapper" onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        name="name"
        onChange={(e) => setStates({ ...state, title: e.target.value })}
      />
      <select
        name="background"
        onChange={(e) => setStates({ ...state, background: e.target.value })}
      >
        <option value="#80ccff">Blue</option>
        <option value="#80ffaa">Green</option>
        <option value="#f94a1e">Red</option>
        <option value="#ffb3ff">Pink</option>
        <option value="#bf00ff">Purple</option>
        <option value="#ffad33">Orange</option>
      </select>
      <button type="submit">Create new board</button>
    </form>
  );
}

CreateBoardForm.propTypes = {
  createNewBoard: PropTypes.func.isRequired
};

export default CreateBoardForm;
