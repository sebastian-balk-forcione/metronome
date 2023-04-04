import { BrowserRouter, Routes, Route } from "react-router-dom";
import Metronome from "./Metronome";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import LoginPage from "./LoginPage";
import LogBook from "./LogBook";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        {!isAuthenticated ? (
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>
        ) : (
          <div>
            <Header />
          </div>
        )}
        <Routes>
          <Route path={"/metronome"} element={<Metronome />} />
          <Route path={"/logbook"} element={<LogBook />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
