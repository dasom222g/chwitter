import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Loading from "./components/Loading";
import { auth } from "./firebase";
import ProtectPage from "./pages/ProtectPage";

// router 정의
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectPage>
        <Layout />
      </ProtectPage>
    ),
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
    path: "/signup",
    element: <SignUp />,
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
    await auth.authStateReady(); // 로그인상태 변화 감지하여 감지가 끝나면 로딩 false
    console.log("인증 완료", auth);

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
