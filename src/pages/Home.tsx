import React from "react";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const Home = () => {
  // logic
  const handleLogout = () => {
    auth.signOut();
    console.log("logout");
  };

  const resetPassword = () => {
    sendPasswordResetEmail(auth, "chutzrit@gmail.com");
  };
  // view
  return (
    <div>
      Home
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
      <button type="button" onClick={resetPassword}>
        비밀번호 재설정 (임시)
      </button>
    </div>
  );
};

export default Home;
