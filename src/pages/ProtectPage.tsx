import React, { FC } from "react";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

interface ProtectPageProps {
  children: React.ReactNode;
}

const ProtectPage: FC<ProtectPageProps> = ({ children }) => {
  // logic
  // user를 state로 관리해서 리다이렉트 시키면 currentUser데이터를 가져오기 전에 null로 인식해서 로그인 유저들을 리다이렉트 시킬수 있음

  const user = auth.currentUser;
  console.log("🚀 ~ user:", user);

  // view
  return user ? <>protect!! {children}</> : <Navigate to="/login" />;
};

export default ProtectPage;
