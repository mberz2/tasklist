import React, { useState, useEffect } from "react";
import BoardPreview from "../BoardPreview";
import PropTypes from "prop-types";
import CreateBoardForm from "../CreateBoardForm";
import { useParams } from "react-router-dom";

import { db } from "../../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

function Home(props) {
  let TAG = "[Home.js] ";
  let params = useParams();
  //console.log(TAG + "Props\n" + JSON.stringify(props));
  //console.log(TAG + "Params\n" + JSON.stringify(params));

  // getter/setter for boards array.
  const [state, setState] = useState([]);

  useEffect(() => {
    // Base query to cards
    const q = query(
      collection(db, "boards"),
      where("board.user", "==", params.userId)
    );

    // Update the cards in real time
    const unsubscribe = onSnapshot(q, (snapshot) => {
      try {
        const postData = [];
        snapshot.forEach((doc) =>
          postData.push({
            id: doc.id,
            ...doc.data().board
          })
        );
        setState(postData);
      } catch (error) {
        console.error(TAG + "Error fetching cards", error);
      }
    });

    return () => {
      console.log("unsubscribe");
      unsubscribe();
    };
  }, []);

  return (
    <div className="homepage">
      <p>User: {params.userId}</p>
      <CreateBoardForm createNewBoard={props.createNewBoard} />
      <div className="board-preview-wrapper">
        {Object.keys(state).map((key) => (
          <BoardPreview
            key={key}
            board={state[key]}
            deleteBoard={props.deleteBoard}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;

Home.propTypes = {
  getBoards: PropTypes.func.isRequired,
  boards: PropTypes.array.isRequired,
  createNewBoard: PropTypes.func.isRequired
};
