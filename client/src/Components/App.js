import { Routes, Route, useNavigate } from "react-router-dom";
import Metronome from "./Metronome/Metronome";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import LoginPage from "./Login/LoginPage";
import LogBook from "./Logbook/LogBook";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import SoundPage from "./Sound Page/SoundPage";

// const audioContext = new AudioContext();

const App = () => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/metronome");
    }
  }, [isAuthenticated]);

  return (
    <>
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
        <Route exact path={"/metronome"} element={<Metronome />} />
        <Route path={"/logbook"} element={<LogBook />} />
        <Route path={"/sounds"} element={<SoundPage />} />
      </Routes>
    </>
  );
};

export default App;
