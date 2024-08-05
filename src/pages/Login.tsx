import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  AuthContainer,
  AuthForm,
  Error,
  Input,
  InputGroup,
  Label,
  SubmitButton,
  Switcher,
  Title,
} from "../styles/auth";

const Login = () => {
  // Logic
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // 에러 초기화

    // 하나라도 빈 값이거나 현재 로딩중이면 실행안함
    if (isLoading || email === "" || password === "") return;

    try {
      setIsLoading(true);
      // TODO: 1. 계정 로그인
      await signInWithEmailAndPassword(auth, email, password);

      // TODO: 2. 홈페이지로 리다이렉트
      navigate("/");
    } catch (e) {
      e instanceof FirebaseError && setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthForm onSubmit={handleSubmit}>
        <Title>로그인</Title>
        <InputGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputGroup>
        {error && <Error>{error}</Error>}
        <SubmitButton type="submit">
          {isLoading ? "Loading.." : "Login"}
        </SubmitButton>
        <Switcher>
          아직 계정이 없으신가요?
          <Link to="/signup">회원가입 &rarr;</Link>
        </Switcher>
      </AuthForm>
    </AuthContainer>
  );
};

export default Login;
