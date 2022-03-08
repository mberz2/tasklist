import React, { useState, useEffect } from "react";
import { db } from "../../firebase";

export const useData = (userId, boardId) => {
  const [board, setBoard] = useState("");
  const [cards, setCards] = useState(null);
  const [lists, setLists] = useState(null);
  const [final, setFinal] = useState(null);

  useEffect(() => {
    return db.collection;
  });
};
