import React, { useState } from "react";
import styled from "styled-components";

const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SignupForm = styled.form`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  text-align: center;
  color: #1a73e8;
  margin-bottom: 1.5rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #1557b0;
  }
`;

const Error = styled.p`
  color: #d32f2f;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  text-align: center;
`;

const CreateAccount = () => {
  // Logic
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
    } catch (e) {
      // setError()
    } finally {
    }

    // TODO: 1. 가입 계정 생성
    // TODO: 2. 사용자 프로필이름 지정
    // TODO: 3. 홈페이지로 리다이렉트
    console.log("Account creation attempted with:", { name, email, password });
    // Here you would typically handle the signup logic
  };

  return (
    <SignupContainer>
      <SignupForm onSubmit={handleSubmit}>
        <Title>Create Account</Title>
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
      </SignupForm>
    </SignupContainer>
  );
};

export default CreateAccount;
