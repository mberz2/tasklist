import React from "react";
import Card from "./Card";
import PropTypes from "prop-types";

class List extends React.Component {
  //State object to store the current cards
  state = {
    currentCards: []
  };

  //Ref
  nameInput = React.createRef();

  //Method for creating a new card
  createNewCard = (e) => {
    e.preventDefault();
    const card = {
      text: this.nameInput.current.value,
      listId: "abc123",
      labels: [],
      createdAt: new Date()
    };
    //Check if the card is empty
    if (card.text) {
      this.setState({ currentCards: [...this.state.currentCards, card] });
    }
    //Reset input
    this.nameInput.current.value = "";
  };

  render() {
    return (
      <div className="list">
        <div className="list-header">
          <p> {this.props.list.title} </p>
        </div>
        {Object.keys(this.props.list.cards).map((key) => (
          <Card key={key} data={this.props.list.cards[key]} />
        ))}
        <form onSubmit={this.createNewCard} className="new-card-wrapper">
          <input
            ref={this.nameInput}
            type="text"
            name="name"
            placeholder=" + New Card"
          />
        </form>
      </div>
    );
  }
}

List.propTypes = {
  list: PropTypes.object.isRequired
};

export default List;
