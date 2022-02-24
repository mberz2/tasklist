import React from "react";
import Board from "./Board";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function BoardPreview(props) {
  let params = useParams();
  let navigate = useNavigate();

  return (
    <ul
      className="board-preview-item"
      onClick={() => {
        navigate(`/board/${props.board.id}`, {
          state: {
            title: props.board.title,
            background: props.board.background
          }
        });
      }}
      style={{ backgroundColor: props.board.background }}
    >
      <li>{props.board.title}</li>
    </ul>
  );
}

BoardPreview.propTypes = {
  board: PropTypes.object.isRequired
};

export default BoardPreview;
