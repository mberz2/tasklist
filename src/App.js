import { TimerSharp } from "@material-ui/icons";
import React, { useState } from "react";
import Board from "./components/Board";
import data from "./sampleData";
import Home from "./components/pages/Home";

class App extends React.Component {
  state = {
    boards: []
  };

  //Immediately sets the state after the
  //component is mounted.
  componentDidMount() {
    this.setState({ boards: data.boards });
  }

  //Method for creating a new board
  createNewBoard = (board) => {
    this.setState({ boards: [...this.state.boards, board] });
  };

  //Render the page
  render() {
    return (
      <div>
        <Home boards={this.state.boards} createNewBoard={this.createNewBoard} />
        <Board />
      </div>
    );
  }
}

export default App;
