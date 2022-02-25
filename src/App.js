import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { boardsRef } from "./firebase";
import { addDoc } from "firebase/firestore";

import "./styles/App.css";
import Board from "./components/Board";
import data from "./sampleData";
import Home from "./components/pages/Home";
import PageNotFound from "./components/pages/PageNotFound";

export default function App() {
  let TAG = "[App.js] ";

  // getter/setter for boards array.
  const [state, setStates] = useState({ boards: [] });

  // Update the state of the boards
  useEffect(() => {
    console.log(TAG + "Setting board states");
    setStates({ boards: data.boards });
  }, []);

  // Method to create a new board
  const createNewBoard = async (board) => {
    try {
      console.log(TAG + "Adding new board");
      // Push board to Firebase and retrieve ID
      const newBoard = await addDoc(boardsRef, board);
      const boardObj = {
        id: newBoard.id,
        ...board
      };

      // Update board state with the new board.
      setStates({ boards: [...state.boards, boardObj] });
    } catch (error) {
      // If there's an error, output to console.
      console.error(TAG + "Error creating new board: ", error);
    }
  };

  // Render the page
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route
              path="/:userId/boards"
              element={
                <Home boards={state.boards} createNewBoard={createNewBoard} />
              }
            ></Route>
            <Route path="/board/:boardId" element={<Board />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
