import React, { useState, useEffect } from "react";
import BoardPreview from "../BoardPreview";
import PropTypes from "prop-types";
import CreateBoardForm from "../CreateBoardForm";
import { useParams } from "react-router-dom";

function Home(props) {
  let params = useParams();
  //console.log("[Home] Props\n" + JSON.stringify(props));

  // Update the state of the boards
  useEffect(() => {
    props.getBoards();
    //setStates({ boards: data.boards });
  }, []);

  return (
    <div>
      <p>User: {params.userId}</p>
      <CreateBoardForm createNewBoard={props.createNewBoard} />
      <div className="board-preview-wrapper">
        {props.boards.map((key) => (
          <BoardPreview key={key} board={key} />
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
