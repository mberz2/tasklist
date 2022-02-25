import React from "react";
import PropTypes from "prop-types";

function Card(props) {
  return (
    <div className="card">
      <div className="card-body">
        <p>{props.data.text}</p>
      </div>
    </div>
  );
}

Card.propTypes = {
  data: PropTypes.object.isRequired
};

export default Card;
