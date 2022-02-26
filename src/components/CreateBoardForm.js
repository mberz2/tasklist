import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function CreateBoardForm(props) {
  let TAG = "[CreateBoardForm.js] ";
  let params = useParams();
  console.log(TAG + "Props\n" + JSON.stringify(props));
  console.log(TAG + "Params\n" + JSON.stringify(params));

  //Default state
  const [state, setState] = useState({ title: "", background: "" });
  let titleInput = React.createRef();
  let bgInput = React.createRef();

  const handleInputChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e, userId) => {
    e.preventDefault();

    const board = {
      title: state.title,
      background: state.background,
      createdAt: new Date(),
      user: params.userId
    };
    if (state.title && state.background) {
      console.log("Creating board");
      props.createNewBoard(board);
    } else if (state.background === "default") {
      console.log("Invalid background");
    } else {
      console.log("Missing params in create board.");
    }
    titleInput.current.value = "";
    bgInput.current.value = "default";

    //ToDo use proper state assignment
    state.title = "";
    state.background = "";
  };

  return (
    <form className="create-board-wrapper" onSubmit={(e) => handleSubmit(e)}>
      <input
        ref={titleInput}
        type="text"
        name="title"
        onChange={handleInputChange}
      />
      <select name="background" ref={bgInput} onChange={handleInputChange}>
        <option value="default">Select a color</option>
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
