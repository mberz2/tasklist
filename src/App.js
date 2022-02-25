import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { boardsRef } from "./firebase";
import { addDoc, getDocs } from "firebase/firestore";

import "./styles/App.css";
import Board from "./components/Board";
import Home from "./components/pages/Home";
import PageNotFound from "./components/pages/PageNotFound";

export default function App() {
  let TAG = "[App.js] ";

  // getter/setter for boards array.
  const [state, setStates] = useState([]);

  const getBoards = async (userId) => {
    try {
      // Clear the states of the boards
      setStates([]);

      const FSboards = await getDocs(boardsRef);

      console.log(TAG + "Retrieved boards");
      // Populate state from each Board
      FSboards.forEach((board) => {
        const data = board.data();
        const boardObj = {
          id: board.id,
          ...data
        };

        setStates((state) => [
          ...state,
          {
            board: boardObj
          }
        ]);

        //console.log("2\n" + JSON.stringify(state, null, 4));
      });
    } catch (error) {
      console.log(TAG + "Error getting boards", error);
    }
  };

  //getBoards();

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
      setStates((state) => [
        ...state,
        {
          board: boardObj
        }
      ]);
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
                <Home
                  boards={state}
                  createNewBoard={createNewBoard}
                  getBoards={getBoards}
                />
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
