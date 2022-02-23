import React from "react";
import BoardPreview from "../BoardPreview";
import PropTypes from "prop-types";
import CreateBoardForm from "../CreateBoardForm";
import { useParams } from "react-router-dom";

function Home(props) {
  let params = useParams();

  return (
    <div>
      <span>{params.userId}</span>
      <CreateBoardForm createNewBoard={props.createNewBoard} />
      <div className="board-preview-wrapper">
        {props.boards &&
          Object.keys(props.boards).map((key) => (
            <BoardPreview key={key} board={props.boards[key]} />
          ))}
      </div>
    </div>
  );
}

//Prop validation
Home.propTypes = {
  boards: PropTypes.array.isRequired,
  createNewBoard: PropTypes.func.isRequired
};

export default Home;
