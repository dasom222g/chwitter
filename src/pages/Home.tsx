import React from "react";
import { auth } from "../firebase";

const Home = () => {
  // logic
  const handleLogout = () => {
    auth.signOut();
  };
  // view
  return (
    <div>
      Home
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
