import React from "react";
import Board from "./components/Board";
import data from "./sampleData";
import Home from "./components/pages/Home";
import "./styles/App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch
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
            <Route path="/board" element={<Board />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>

          {/*         <Home boards={this.state.boards} createNewBoard={this.createNewBoard} />
        <Board /> */}
        </div>
      </Router>
    );
  }
}

export default App;
