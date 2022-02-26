import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

function BoardPreview(props) {
  let navigate = useNavigate();
  let TAG = "[BP} ";

  let { state } = useLocation();
  let params = useParams();

  //console.log(TAG + "Props\n" + JSON.stringify(props));
  //console.log(TAG + "State\n" + JSON.stringify(state));
  //console.log(TAG + "Params\n" + JSON.stringify(params));

  const goToBoard = () => {
    const boardId = props.board.id;
    navigate(`/board/${boardId}`, {});
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
