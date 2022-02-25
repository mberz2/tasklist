import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";

function BoardPreview(props) {
  let navigate = useNavigate();

  console.log("[BP] Props\n" + JSON.stringify(props));

  const goToBoard = () => {
    const boardId = props.board.id;
    navigate(`/board/${boardId}`, {
      state: {
        title: props.board.title,
        background: props.board.background
      }
    });
  };

  return (
    <div>
      <ul
        className="board-preview-item"
        onClick={goToBoard}
        style={{ backgroundColor: props.board.background }}
      >
        <li>{props.board.title}</li>
      </ul>
    </div>
  );
}

BoardPreview.propTypes = {
  board: PropTypes.object.isRequired
};

export default BoardPreview;
