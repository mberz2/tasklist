import React, { useEffect, useState } from "react";
import Board from "./components/Board";
import data from "./sampleData";
import Home from "./components/pages/Home";
import "./styles/App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams
} from "react-router-dom";

import PageNotFound from "./components/pages/PageNotFound";

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
      <Router>
        <div>
          <Routes>
            <Route
              path="/:userId/boards"
              element={
                <Home
                  boards={this.state.boards}
                  createNewBoard={this.createNewBoard}
                />
              }
            ></Route>
            <Route path="/board" element={<Board />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
