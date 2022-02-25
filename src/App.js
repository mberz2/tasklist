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

  // Retrieves boards from the database
  const getBoards = async (userId) => {
    try {
      // Clear the states of the boards
      setStates([]);

      const boards = await getDocs(boardsRef);

      console.log(TAG + "Retrieved boards");
      // Populate state from each Board
      boards.forEach((board) => {
        const data = board.data();
        setStates((state) => [
          ...state,
          {
            id: board.id,
            ...data
          }
        ]);
      });
    } catch (error) {
      console.log(TAG + "Error getting boards", error);
    }
  };

  // Method to create a new board
  const createNewBoard = async (board) => {
    try {
      console.log(TAG + "Adding new board");
      // Push board to Firebase and retrieve ID
      const newBoard = await addDoc(boardsRef, { board });

      // Update board state with the new board.
      setStates((state) => [
        ...state,
        {
          id: newBoard.id,
          ...board
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
