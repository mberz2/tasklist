import { TimerSharp } from "@material-ui/icons";
import React, { useState } from "react";
import Board from "./components/Board";
import data from "./sampleData";
import Home from "./components/pages/Home";

class App extends React.Component {
  state = {
    boards: []
  };
  componentDidMount() {
    this.setState({ boards: data.boards });
  }
  render() {
    return (
      <div>
        <Home boards={this.state.boards} />
      </div>
    );
  }
}

export default App;
