import React, { useState } from "react";
import PropTypes from "prop-types";

function CreateBoardForm(props) {
  //Default state
  const [val, setVal] = useState({ title: "", background: "#80ccff" });

  //Method to handle form submission
  const handleSubmit = (e) => {
    console.log("Handling submit");
    e.preventDefault();
    const board = {
      title: val.title,
      background: val.background,
      createdAt: new Date(),
      user: "abc123"
    };
    if (board.title && board.background) {
      props.createNewBoard(board);
    } else {
      console.log(board.title + " " + board.background);
      console.log("Missing parameters");
    }
    //Reset form value
    setVal({ ...val, title: "" });
  };

  //Render page
  return (
    <div>
      <form className="create-board-wrapper" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Board name"
          value={val.title}
          onChange={(e) => setVal({ ...val, title: e.target.value })}
        />
        <select
          name="background"
          onChange={(e) => setVal({ ...val, background: e.target.value })}
        >
          <option value="#80ccff">Blue</option>
          <option value="#80ffaa">Green</option>
          <option value="#f94a1e">Red</option>
          <option value="#ffb3ff">Pink</option>
          <option value="#bf00ff">Purple</option>
          <option value="#ffad33">Orange</option>
        </select>
        <button type="submit">Create New Board</button>
      </form>
    </div>
  );
}

CreateBoardForm.propTypes = {
  createNewBoard: PropTypes.func.isRequired
};

export default CreateBoardForm;
