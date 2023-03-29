import Metronome from "./Metronome";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Metronome />
    </>
  );
};

export default App;
