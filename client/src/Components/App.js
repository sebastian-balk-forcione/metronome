import Metronome from "./Metronome";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Metronome />
    </>
  );
};

const Wrapper = styled.div`
  background-color: #14539a;
  height: 100vh;
  width: 100vw;
  margin: 0px;
  padding: 0px;
`;
export default App;
