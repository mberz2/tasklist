const boards = [
  {
    id: 1000,
    title: "Course Ideas",
    background: "#ffad33"
  },
  {
    id: 2000,
    title: "House Ideas",
    background: "#80ccff"
  },
  {
    id: 3000,
    title: "Garden Ideas",
    background: "#ff3300"
  }
];

const lists = [
  {
    id: 100,
    title: "House ideas",
    board: 1000,
    cards: [
      {
        id: 1,
        text: "Clean up the house"
      },
      {
        id: 2,
        text: "Install new things"
      }
    ]
  },
  {
    id: 200,
    title: "Travel ideas",
    board: 2000,
    cards: [
      {
        id: 11,
        text: "Go to Europe"
      },
      {
        id: 22,
        text: "RoadTrip USA"
      }
    ]
  },
  {
    id: 300,
    title: "Travel ideas 2",
    board: 3000,
    cards: [
      {
        id: 11,
        text: "Visit friends"
      },
      {
        id: 22,
        text: "Visit family"
      }
    ]
  }
];

const data = {
  boards,
  lists
};

export default data;
