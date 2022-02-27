import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { db, boardsRef } from "./firebase";
import {
  addDoc,
  doc,
  getDoc,
  getDocFromCache,
  getDocs,
  deleteDoc,
  collection,
  query,
  where,
  orderBy,
  updateDoc
} from "firebase/firestore";

import "./styles/App.css";
import Board from "./components/Board";
import Home from "./components/pages/Home";
import PageNotFound from "./components/pages/PageNotFound";

export default function App() {
  let TAG = "[App.js] ";

  // Use effect for resetting text box.
  useEffect(() => {});

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
        const data = board.data().board;

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

  const deleteList = async (listId) => {
    try {
      console.log(TAG + "Deleting ID:" + listId);
      console.log(TAG + "Getting cards from " + listId);

      const cardQuery = query(
        collection(db, "cards"),
        where("card.listId", "==", listId)
      );

      const cards = await getDocs(cardQuery);

      await cards.forEach((card) => {
        console.log(card.id);
        deleteDoc(doc(db, "cards", card.id));
      });

      console.log(TAG + "Deletion card complete.");
      await deleteDoc(doc(db, "lists", listId));
      console.log(TAG + "Deletion complete.");
    } catch (error) {
      console.log(TAG + "Error deleting list.", error);
    }
  };

  const deleteBoard = async (boardId) => {
    try {
      //Get/Delete the lists and cards
      const listQuery = query(
        collection(db, "lists"),
        where("list.board", "==", boardId)
      );

      const lists = await getDocs(listQuery);

      //Check if query is empty
      if (lists.docs.length !== 0) {
        lists.forEach((list) => {
          deleteList(list.ref.id);
        });
      }

      //Get/delete the board
      const board = doc(db, "boards", boardId);
      const docSnap = await getDoc(board);

      //Check for data returned
      if (docSnap.exists()) {
        console.log(TAG + "Document data:", docSnap.data());
        setState((prevState) =>
          // Filter out the item with the matching index
          prevState.filter((board) => board.id !== boardId)
        );
      } else {
        // doc.data() will be undefined in this case
        console.log(TAG + "No such document!");
      }

      //Delete from firebase
      console.log(TAG + "Deleting board.");
      await deleteDoc(doc(db, "boards", boardId));
      console.log(TAG + "Deletion complete.");

      //console.log(JSON.stringify(board, null, 2));
    } catch (error) {
      console.error(TAG + "Error deleting board.", error);
    }
  };

  const updateBoard = async (boardId, newTitle) => {
    try {
      console.log(TAG + "Updating board");
      const boardRef = doc(db, "boards", boardId);

      // Set the "capital" field of the city 'DC'
      await updateDoc(boardRef, {
        "board.title": newTitle
      });
    } catch (error) {
      console.error("Error updating board: ", error);
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
            <Route
              path="/board/:boardId"
              element={
                <Board
                  deleteBoard={deleteBoard}
                  deleteList={deleteList}
                  updateBoard={updateBoard}
                />
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
