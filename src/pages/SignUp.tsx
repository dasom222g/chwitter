import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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

const SignUp = () => {
  // Logic
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // 에러 초기화

    // 하나라도 빈 값이거나 현재 로딩중이면 실행안함
    if (isLoading || name === "" || email === "" || password === "") return;

    try {
      setIsLoading(true);
      // TODO: 1. 가입 계정 생성
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("🚀 credential:", credential);

      // TODO: 2. 사용자 프로필이름 지정
      await updateProfile(credential.user, {
        displayName: name,
      });

      // TODO: 3. 홈페이지로 리다이렉트
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
        <Title>회원가입</Title>
        <InputGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </InputGroup>
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
          {isLoading ? "Loading.." : "Create Account"}
        </SubmitButton>
        <Switcher>
          이미 계정이 있으신가요?
          <Link to="/login">로그인 하러 가기 &rarr;</Link>
        </Switcher>
      </AuthForm>
    </AuthContainer>
  );
};

export default SignUp;
