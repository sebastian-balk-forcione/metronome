import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { IoVolumeHighOutline, IoVolumeLowOutline } from "react-icons/io5";
import { FiPlayCircle, FiStopCircle } from "react-icons/fi";
import Player from "../Audio Player/Player";
import SoundChoice from "./SoundChoice";
import { Sounds } from "../Assets/Sounds";
import { UserContext } from "../Context";

let audioContext = new AudioContext();
const gainNode = audioContext.createGain();

const Metronome = () => {
  const request = new XMLHttpRequest();
  const { fetchedSounds } = useContext(UserContext);

  const [tempo, setTempo] = useState(80);
  const [on, setOn] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [source, setSource] = useState(audioContext.createBufferSource());
  const [choiceIndex, setChoiceIndex] = useState(0);
  const [choice, setChoice] = useState(Sounds[choiceIndex].src);
  const [gain, setGain] = useState(50);

  // if the user has sounds saved, the first sound from that list will be set as the default before playing.
  useEffect(() => {
    if (fetchedSounds.length > 0) {
      setChoice(fetchedSounds[choiceIndex].src);
    }
  }, [fetchedSounds]);

  // sets the amount of time one beep will last (in seconds) depending on the set tempo
  const beatDuration = 1 / (tempo / 60);

  // creates the (one beat) loop time based on the beat duration. Having this variable outside of metro() enables th user to changes while it's playing.
  useEffect(() => {
    source.loopEnd = beatDuration;
  }, [tempo, on, source]);

  // Enables user to change sound while playing
  useEffect(() => {
    if (hasStarted && on) {
      const newSource = audioContext.createBufferSource();
      source.stop(audioContext.currentTime);
      metro(newSource);
      setSource(newSource);
    }
  }, [choice, choiceIndex]);

  // Fires when you leave the page so that metronome stops playing.
  useEffect(() => {
    return () => {
      if (source.loop === true) {
        if (audioContext.state === "suspended") {
          source.stop(audioContext.currentTime);
          audioContext.resume();
        } else {
          source.stop(audioContext.currentTime);
        }
      }
    };
  }, []);

  // Metronome function
  const metro = (newSource) => {
    request.open("GET", choice, true);
    request.responseType = "arraybuffer";
    request.onload = () => {
      audioContext.decodeAudioData(request.response, (buffer) => {
        if (newSource === undefined) {
          source.buffer = buffer;
          source.loop = true;
          source.loopEnd = beatDuration;
          source.connect(gainNode);
          gainNode.connect(audioContext.destination);
          source.start(audioContext.currentTime);
        } else if (newSource) {
          newSource.buffer = buffer;
          newSource.loop = true;
          newSource.loopEnd = beatDuration;
          newSource.connect(gainNode);
          gainNode.connect(audioContext.destination);
          newSource.start(audioContext.currentTime);
        }
      });
    };
    request.send();
    setOn(true);
    setHasStarted(true);
    gainNode.gain.value = gain / 100;
  };

  const stop = () => {
    if (audioContext.state === "running") {
      setOn(false);
      audioContext.suspend();
    }
  };

  const start = () => {
    if (!hasStarted) {
      metro();
    } else {
      setOn(true);
      audioContext.resume();
    }
  };

  const tempoChange = (value) => {
    setTempo(value);
  };

  const handleVolumeChange = (e) => {
    gainNode.gain.value = e.target.value / 100;
    setGain(e.target.value);
  };
  return (
    <BigWrapper>
      {!on ? (
        <Btn onClick={start}>
          <FiPlayCircle />
        </Btn>
      ) : (
        <Btn onClick={stop}>
          <FiStopCircle />
        </Btn>
      )}
      <Slider
        type="range"
        min="30"
        max="300"
        value={tempo}
        onChange={(e) => tempoChange(e.target.valueAsNumber)}
      ></Slider>
      <Tempo>{tempo}</Tempo>
      <SoundTitle>Sounds</SoundTitle>
      <SoundWrap>
        <SoundChoice
          choice={choice}
          setChoice={setChoice}
          choiceIndex={choiceIndex}
          setChoiceIndex={setChoiceIndex}
          sounds={Sounds}
          fetchedSounds={fetchedSounds}
        />
      </SoundWrap>
      <VolWrap>
        <Volume>
          <IoVolumeLowOutline />
        </Volume>
        <VolSlider
          type={"range"}
          min={0}
          max={100}
          value={gain}
          onChange={(e) => handleVolumeChange(e)}
        ></VolSlider>
        <Volume>
          <IoVolumeHighOutline />
        </Volume>
      </VolWrap>
      <div>
        <Player />
      </div>
    </BigWrapper>
  );
};

export default Metronome;

const BigWrapper = styled.div`
  margin-top: 85px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
`;

const Btn = styled.button`
  font-size: 8em;
  color: white;
  border: none;
  background-color: #14539a;
`;

const Slider = styled.input`
  -webkit-appearance: none;
  width: 25vw;
  color: white;
  background-color: #eef4ed;
  border-radius: 100px;
  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: 1px solid #14539a;
    background-color: #eef4ed#14539a;
    background-size: cover;
    cursor: pointer;
    position: relative;
    z-index: 2;
    height: 20px;
    width: 20px;
    border-radius: 100px;
  }
`;

const SoundTitle = styled.div`
  color: white;
  font-size: 2.2em;
  font-weight: bold;
  letter-spacing: 6px;
  margin: 0 0 15px;
  width: 20vw;
  display: flex;
  justify-content: center;
`;

const SoundWrap = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 5px;
  display: flex;
  & * {
    font-size: 1.5em;
  }
`;

const Tempo = styled.div`
  color: #ff6b35;
  font-size: 3.3em;
  font-weight: 200;
  margin: 20px 0;
`;

const VolWrap = styled.div`
  display: flex;
  margin-top: 25px;
`;

const VolSlider = styled.input`
  margin-bottom: 9px;
`;

const Volume = styled.div`
  color: white;
  font-size: 1.5em;
`;
