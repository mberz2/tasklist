import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { db, boardsRef } from "./firebase";
import {
  addDoc,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  collection,
  query,
  where,
  updateDoc
} from "firebase/firestore";

import "./styles/App.css";
import "./styles/Nav.css";
import "./styles/List.css";
import "./styles/Board.css";
import "./styles/Card.css";
import "./styles/Normalize.css";

import Board from "./components/Board";
import Home from "./components/pages/Home";
import PageNotFound from "./components/pages/PageNotFound";
import Main from "./components/Main";
import Navbar from "./components/MyNavbar/MyNavbar";
import Footer from "./components/Footer";
import {ThemeProvider} from "styled-components";
import  {useDarkMode} from "./components/UseDarkMode";
import { GlobalStyles } from "./components/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Themes";
import Toggle from "./components/Toggler"

export default function App() {
  let TAG = "[App.js] ";
  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  // Method to create a new board
  const createNewBoard = async (board) => {
    try {
      console.log(TAG + "Adding new board");

      // Push board to Firebase and retrieve ID
      await addDoc(boardsRef, { board });
    } catch (error) {
      // If there's an error, output to console.
      console.error(TAG + "Error creating new board: ", error);
    }
  };

  // Method to Update a Board
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

  //Method to delete a board
  const deleteBoard = async (boardId) => {
    console.log("Deleting: " + boardId);

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
        //Delete from firebase
        console.log(TAG + "Deleting board.");
        await deleteDoc(doc(db, "boards", boardId));
        console.log(TAG + "Deletion complete.");
      } else {
        // doc.data() will be undefined in this case
        console.log(TAG + "No such document!");
      }

      //console.log(JSON.stringify(board, null, 2));
    } catch (error) {
      console.error(TAG + "Error deleting board.", error);
    }
  };

  // Method to delete a list
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
  if(!mountedComponent) return <div/>
  // Render the page
  return (
    <div>
      <ThemeProvider theme={themeMode}>
        <>
          <GlobalStyles/>
          <Toggle theme={theme} toggleTheme={themeToggler} />
          <Navbar dataFromApp = {theme}/>
          <Router>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route
                path="/:userId/boards"
                element={
                  <>
                    <Home
                      createNewBoard={createNewBoard}
                      deleteBoard={deleteBoard}
                    />
                  </>
                }
              />
              <Route
                path="/board/:boardId"
                element={
                  <Board dataFromApp = {theme}
                    deleteBoard={deleteBoard}
                    deleteList={deleteList}
                    updateBoard={updateBoard}
                  />
                }
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer dataFromApp = {theme} />
          </Router>
        </>
      </ThemeProvider>
    </div>
  );
}
