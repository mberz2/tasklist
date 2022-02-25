import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";

function BoardPreview(props) {
  let navigate = useNavigate();

  console.log("[BP] Props\n" + JSON.stringify(props));

  const goToBoard = () => {
    const boardId = props.board.id;
    navigate(`/board/${boardId}`, {});
  };

  return (
    <div>
      <ul
        className="board-preview-item"
        onClick={goToBoard}
        style={{ backgroundColor: props.board.board.background }}
      >
        <li>{props.board.board.title}</li>
      </ul>
    </div>
  );
}

BoardPreview.propTypes = {
  board: PropTypes.object.isRequired
};

export default BoardPreview;
