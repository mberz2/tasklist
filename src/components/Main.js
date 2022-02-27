import React from "react";
import { useNavigate } from "react-router";

export default function Main() {
  let navigate = useNavigate();
  let userInput = React.createRef();

  const redirect = () => {
    //console.log("??? " + JSON.stringify(userInput.current.value));
    let userId = userInput.current.value;
    userInput.current.value = "";
    navigate(`/${userId}/boards`, {});
  };

  return (
    <div>
      <span>To-Do, add login</span>
      <div>
        <input
          type="text"
          ref={userInput}
          name="name"
          placeholder="Enter UserID"
        />
        <button onClick={redirect}>Go to Boards</button>
      </div>
    </div>
  );
}
