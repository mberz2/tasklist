import "./styles/App.css";
import Board from "./components/Board";
import React, { useState, useEffect } from "react";
import data from "./sampleData";
import Home from "./components/pages/Home";
import PageNotFound from "./components/pages/PageNotFound";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  // The 'useState' hook (function) returns a
  // getter (variable) & setter (function) for
  // your state value - and takes the
  // initial/default value for it/to set it to, e.g.
  const [state, setStates] = useState({ boards: [] });

  useEffect(() => {
    setStates({ boards: data.boards });
  }, []);

  const createNewBoard = (board) => {
    setStates({ boards: [...state.boards, board] });
  };

  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <Home boards={state.boards} createNewBoard={createNewBoard} />
              }
            ></Route>
            <Route path="/board" element={<Board />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
