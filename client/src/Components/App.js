import { BrowserRouter, Routes, Route } from "react-router-dom";
import Metronome from "./Metronome";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import LoginPage from "./LoginPage";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { user, isAuthenticated } = useAuth0();
  console.log(user);
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        {!isAuthenticated ? (
          <Routes>
            <Route path="/" element={<LoginPage />}></Route>
          </Routes>
        ) : (
          <div>
            <Header />
            <Metronome />
          </div>
        )}
      </BrowserRouter>
    </>
  );
};

export default App;
