import React from "react";
import List from "./List";
import data from "../sampleData";

class Board extends React.Component {
  state = {
    currentLists: []
  };

  //Immediately sets the state after the
  //component is mounted.
  componentDidMount() {
    this.setState({ currentLists: data.lists });
  }

  //Method to create a new List
  createNewList = () => {
    const list = {
      id: Math.random(),
      title: "My amazing list",
      board: 300,
      createdAt: new Date()
    };
    this.setState({ currentLists: [...this.state.currentLists, list] });
  };

  //Render the page
  render() {
    return (
      <div className="lists-wrapper">
        <button onClick={this.createNewList}>New List</button>
        {Object.keys(this.state.currentLists).map((key) => (
          <List
            key={this.state.currentLists[key].id}
            list={this.state.currentLists[key]}
          />
        ))}
      </div>
    );
  }
}

export default Board;
