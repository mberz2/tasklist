import React from "react";
import BoardPreview from "../BoardPreview";
import PropTypes from "prop-types";

class Home extends React.Component {
  //Method to create a new board
  newBoard = () => {
    const board = {
      title: "Trips to take this year",
      background: "#80ffaa",
      createdAt: new Date()
    };

    this.props.createNewBoard(board);
  };
  render() {
    return (
      <div>
        <button onClick={this.newBoard}>New Board</button>
        {Object.keys(this.props.boards).map((key) => (
          <BoardPreview key={key} board={this.props.boards[key]} />
        ))}
      </div>
    );
  }
}

//Prop validation
Home.propTypes = {
  boards: PropTypes.array.isRequired,
  createNewBoard: PropTypes.func.isRequired
};

export default Home;
