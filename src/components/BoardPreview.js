import React from "react";
import PropTypes from "prop-types";

function BoardPreview(props) {
  return (
    <div>
      {console.log("BoardPROPS\n" + JSON.stringify(props))}
      <p> {props.board.title} </p>
    </div>
  );
}

BoardPreview.propTypes = {
  board: PropTypes.object.isRequired
};

export default BoardPreview;
