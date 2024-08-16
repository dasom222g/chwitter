import React from "react";
import PostTweeForm from "../components/PostTweeForm";
import styled from "styled-components";
import Timline from "../components/Timline";

const Wrapper = styled.div``;
const Home = () => {
  // logic

  // view
  return (
    <Wrapper>
      <PostTweeForm />
      <Timline />
    </Wrapper>
  );
};

export default Home;
