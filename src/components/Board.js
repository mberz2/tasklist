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

  addBoardInput = React.createRef();

  //Method to create a new List
  createNewList = (e) => {
    //Prevent default form submission behavior
    e.preventDefault();

    //Create a list
    const list = {
      id: Math.random(),
      title: this.addBoardInput.current.value,
      board: 300,
      createdAt: new Date(),
      cards: [
        {
          id: 1,
          text: "Card 1"
        },
        {
          id: 2,
          text: "Card 2"
        }
      ]
    };

    //Check if the list title is present
    //Avoids creating empty lists
    if (list.title) {
      this.setState({ currentLists: [...this.state.currentLists, list] });
    }

    //Reset the list title after submitting
    this.addBoardInput.current.value = "";
  };

  //Render the page
  render() {
    return (
      <div>
        <div className="lists-wrapper">
          {Object.keys(this.state.currentLists).map((key) => (
            <List
              key={this.state.currentLists[key].id}
              list={this.state.currentLists[key]}
            />
          ))}
        </div>
        <form onSubmit={this.createNewList} className="new-list-wrapper">
          <input
            ref={this.addBoardInput}
            type="text"
            name="name"
            placeholder=" + New List"
          />
        </form>
      </div>
    );
  }
}

export default Board;
