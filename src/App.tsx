import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Loading from "./components/Loading";
import { auth } from "./firebase";

// router 정의
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
]);

// global 스타일 정의
const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;;
  }
  body {
    background-color: #2b2b2b;
    color: white;
  }
`;

function App() {
  // logic
  // login시 로딩
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    // firebase에서 로그인 데이터 가져오기
    await auth.authStateReady(); // 인증상태가 준비 되었는지

    // 준비된 이후 실행
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  // view
  return (
    <>
      <GlobalStyles />
      {isLoading ? <Loading /> : <RouterProvider router={router} />}
    </>
  );
}

export default App;
