import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.span`
  font-size: 24px;
`;
const Loading = () => {
  return (
    <Wrapper>
      <Text>Loading..</Text>
    </Wrapper>
  );
};

export default Loading;
