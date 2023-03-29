import bell from "../assets/BELL.wav";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { FiPlayCircle, FiStopCircle } from "react-icons/fi";

const audioContext = new AudioContext();

const Metronome = () => {
  const request = new XMLHttpRequest();
  const [tempo, setTempo] = useState(100);
  const [isStarted, setIsStarted] = useState(false);
  const [on, setOn] = useState(false);
  const [source, setSource] = useState(audioContext.createBufferSource());

  useEffect(() => {
    source.loopEnd = 1 / (tempo / 60);
  }, [tempo, isStarted]);

  const metro = () => {
    request.open("GET", bell, true);
    request.responseType = "arraybuffer";
    request.onload = () => {
      // Decode the audio into an audio buffer
      audioContext.decodeAudioData(request.response, (buffer) => {
        // const source = audioContext.createBufferSource();
        source.buffer = buffer;

        source.loop = true;
        source.loopEnd = 1 / (tempo / 60);
        // Connect the source node to the audio context's destination node
        source.connect(audioContext.destination);

        // Start playing the audio
        source.start(0);
      });
    };
    request.send();
    setIsStarted(true);
    setOn(true);
  };

  const stop = () => {
    if (audioContext.state === "running") {
      setOn(false);
      audioContext.suspend();
    }
  };

  const start = () => {
    if (!isStarted) {
      metro();
    } else {
      audioContext.resume();
      setOn(true);
    }
  };

  const tempoChange = (value) => {
    setTempo(value);
  };

  return (
    <>
      <Wrapper>
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
      </Wrapper>
    </>
  );
};

export default Metronome;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;

const Btn = styled.button`
  font-size: 8em;
  color: white;
  border: none;
  background-color: #14539a;
`;

const Slider = styled.input`
  width: 25vw;
  color: white;
`;

const Tempo = styled.div`
  color: orange;
  font-size: 3em;
  font-weight: 200;
`;
