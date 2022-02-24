import "./styles/App.css";
import Board from "./components/Board";
import React, { useState, useEffect } from "react";
import data from "./sampleData";
import Home from "./components/pages/Home";
import PageNotFound from "./components/pages/PageNotFound";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { boardsRef, db } from "./Firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function App() {
  // The 'useState' hook (function) returns a
  // getter (variable) & setter (function) for
  // your state value - and takes the
  // initial/default value for it/to set it to, e.g.
  const [state, setStates] = useState({ boards: [] });

  useEffect(() => {
    setStates({ boards: data.boards });
  }, []);

  const createNewBoard = async (board) => {
    try {
      console.log("Adding new board");
      const newBoard = await addDoc(collection(db, "boards"), board);
      const boardObj = {
        id: newBoard.id,
        ...board
      };
      setStates({ boards: [...state.boards, boardObj] });
    } catch (error) {
      console.error("Error creating new board: ", error);
    }
  };

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
