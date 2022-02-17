import React from "react";
import { Paper, Typography, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import { createMuiTheme } from "@material-ui/core";
import Title from "./Title";
import Card from "./Card";
import InputContainer from "./InputContainer";

const theme = createMuiTheme({
  spacing: 1
});

const userStyles = makeStyles((theme) => ({
  root: {
    width: "300px",
    backgroundColor: "#EBECF0"
  }
}));

export default function List({ list }) {
  const classes = userStyles();
  return (
    <div>
      <Paper className={classes.root}>
        <CssBaseline />
        <Title title={list.title} />
        {list.cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
        <InputContainer />
      </Paper>
    </div>
  );
}
