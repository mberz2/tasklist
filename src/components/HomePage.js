import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(user);
  return (
    <>
      <div className="p-4 box mt-3 text-center">
        Hello Welcome <br />
        {user.displayName}
        {/*         {user.displayName && user && user.email} */}
      </div>
      <div className="d-grid gap-2">
        {console.log(JSON.stringify(user.uid, null, 2))}
        <div id="homepage_buttons">
          <Link to={`/${user.displayName}/boards`}>
            <Button variant="primary">Go to Boards</Button>
          </Link>
          <Button variant="primary" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
