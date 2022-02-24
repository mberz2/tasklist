import React from "react";
import BoardPreview from "../BoardPreview";
import PropTypes from "prop-types";
import CreateBoardForm from "../CreateBoardForm";

function Home(props) {
  const newBoard = () => {
    const board = {
      title: "New Task",
      background: "#80ffaa",
      createdAt: new Date()
    };

    props.createNewBoard(board);
  };

  return (
    <div>
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
  boards: PropTypes.array.isRequired,
  createNewBoard: PropTypes.func.isRequired
};
