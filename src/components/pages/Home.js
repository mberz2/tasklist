import React, { useState, useEffect } from "react";
import BoardPreview from "../BoardPreview";
import PropTypes from "prop-types";
import CreateBoardForm from "../CreateBoardForm";
import { useParams } from "react-router-dom";

function Home(props) {
  let TAG = "[Home.js] ";
  let params = useParams();
  //console.log(TAG + "Props\n" + JSON.stringify(props));
  //console.log(TAG + "Params\n" + JSON.stringify(params));

  // Update the state of the boards
  useEffect(() => {
    props.getBoards();
  }, []);

  return (
    <div>
      <p>User: {params.userId}</p>
      <CreateBoardForm createNewBoard={props.createNewBoard} />
      <div className="board-preview-wrapper">
        {Object.keys(props.boards).map((key) => (
          <BoardPreview key={key} board={props.boards[key]} />
        ))}
      </div>
    </div>
  );
}

export default Home;

Home.propTypes = {
  getBoards: PropTypes.func.isRequired,
  boards: PropTypes.array.isRequired,
  createNewBoard: PropTypes.func.isRequired
};
