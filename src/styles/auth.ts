import styled from "styled-components";

export const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
export
  const AuthForm = styled.form`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;
export
  const Title = styled.h2`
  text-align: center;
  color: #1a73e8;
  margin-bottom: 1.5rem;
`;
export
  const InputGroup = styled.div`
  margin-bottom: 1rem;
`;
export
  const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
`;
export
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
export
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
export
  const Error = styled.p`
  color: #d32f2f;
  font-size: 0.875rem;
  margin: 0.5rem 0;
  text-align: center;
`;
export
  const Switcher = styled.div`
  text-align: center;
  font-size: 14px;
  margin-top: 20px;
  color: black;
  a {
    color: blue;
  }
`;