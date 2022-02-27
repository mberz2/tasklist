import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";

function BoardPreview(props) {
  let TAG = "[BoardPreview.js] ";
  console.log(TAG + "Props\n" + JSON.stringify(props));

  let navigate = useNavigate();

  const goToBoard = () => {
    const boardId = props.board.id;
    navigate(`/board/${boardId}`, {});
  };

  // Sends the board info to caller for board delete
  const deleteBoard = async () => {
    const boardId = props.board.id;
    props.deleteBoard(boardId);
  };

  return (
    <div className="board-preview-container">
      <ul
        className="board-preview-item"
        onClick={goToBoard}
        style={{ backgroundColor: props.board.background }}
      >
        <li>{props.board.title}</li>
      </ul>
      <button onClick={deleteBoard}>Delete Board</button>
    </div>
  );
}

BoardPreview.propTypes = {
  board: PropTypes.object.isRequired,
  deleteBoard: PropTypes.func.isRequired
};

export default BoardPreview;
