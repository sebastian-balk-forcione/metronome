import styled, { keyframes } from "styled-components";

// 3:2 polyrhythmic loading state

const Loading = () => {
  return (
    <Wrapper>
      <Circle1></Circle1>
      <Circle2></Circle2>
    </Wrapper>
  );
};

export default Loading;

const Wrapper = styled.div`
  display: flex;
`;

const ColorChange = keyframes`
    0%{ background-color: white}
    50%{background-color: #ff6b35}
    100%{background-color: white}
`;

const Circle1 = styled.div`
  height: 5vh;
  width: 2.5vw;
  border-radius: 50px;
  animation-name: ${ColorChange};
  animation-iteration-count: infinite;
  animation-duration: 0.5s;
  margin: 2px;
`;

const Circle2 = styled.div`
  margin: 2px;
  background-color: #ff6b35;
  height: 5vh;
  width: 2.5vw;
  border-radius: 50px;
  animation-name: ${ColorChange};
  animation-iteration-count: infinite;
  animation-duration: 0.75s;
`;
