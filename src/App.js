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
  const [state, setState] = useState([]);

  // Retrieves boards from the database
  const getBoards = async (userId) => {
    try {
      // Clear the states of the boards
      setState([]);
      const boards = await getDocs(boardsRef);

      //Populate state from each Board
      boards.forEach((board) => {
        console.log("RETRIEVED\n" + JSON.stringify(board.data(), null, 2));
        const data = board.data().board;

        console.log("??: " + JSON.stringify(board, null, 2));

        const boardObj = {
          id: board.id,
          ...data
        };

        console.log(TAG + "Pushing to state");
        setState((prevState) => [...prevState, boardObj]);
      });
    } catch (error) {
      console.log(TAG + "Error getting boards", error);
    }
  };

  // Method to create a new board
  const createNewBoard = async (board) => {
    try {
      console.log(TAG + "Adding new board");

      console.log("INC Board:\n" + JSON.stringify(board, null, 2));
      // Push board to Firebase and retrieve ID
      const data = await addDoc(boardsRef, { board });

      console.log("ID " + data.id);
      const boardObj = {
        id: data.id,
        ...board
      };

      setState((prevState) => [...prevState, boardObj]);
    } catch (error) {
      // If there's an error, output to console.
      console.error(TAG + "Error creating new board: ", error);
    }
  };

  //console.log("AFTER:\n" + JSON.stringify(state, null, 2));

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
