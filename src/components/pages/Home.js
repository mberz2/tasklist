import React, { useEffect } from "react";
import BoardPreview from "../BoardPreview";
import PropTypes from "prop-types";
import CreateBoardForm from "../CreateBoardForm";
import { useParams } from "react-router-dom";

export default function Home(props) {
  // Console logging for debugging
  //let TAG = "[Home.js] ";
  //console.log(TAG + "Props\n" + JSON.stringify(props));
  //console.log(TAG + "Params\n" + JSON.stringify(params));

  // Capture params
  let params = useParams();

  // Update the state of the boards
  useEffect(() => {
    props.getBoards();
  }, []);

  // Render the page
  return (
    <div>
      <p>User: {params.userId}</p>
      <CreateBoardForm createNewBoard={props.createNewBoard} />
      <div className="board-preview-wrapper">
        {Object.keys(props.boards).map((key) => (
          <BoardPreview key={key} board={props.boards[key]} />
        ))}
      </div>
    </div>
  );
}

// PropType Validation
Home.propTypes = {
  getBoards: PropTypes.func.isRequired,
  boards: PropTypes.array.isRequired,
  createNewBoard: PropTypes.func.isRequired
};
