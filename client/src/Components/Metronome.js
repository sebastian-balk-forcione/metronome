import bell from "../assets/BELL.wav";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import ReactSwitch from "react-switch";
import { FiPlayCircle, FiStopCircle } from "react-icons/fi";

const audioContext = new AudioContext();
const timeSignatures = [3, 4, 5, 7, 9];
const bars = [1, 2, 3, 4, 5];

const Metronome = () => {
  const request = new XMLHttpRequest();
  const [tempo, setTempo] = useState(120);
  const [on, setOn] = useState(false);
  // State when the metro has initially started
  const [hasStarted, setHasStarted] = useState(false);
  const [source, setSource] = useState(audioContext.createBufferSource());
  const [source2, setSource2] = useState(audioContext.createBufferSource());
  const [turnOnGap, setTurnOnGap] = useState(false);
  const [timeSig, setTimeSig] = useState(3);
  const [metroA, setMetroA] = useState(1);
  const [metroB, setMetroB] = useState(1);

  const beatDuration = 1 / (tempo / 60);

  const gappedTime = {
    "| X | |": (beatDuration / 4) * 1,
    "| | X |": (beatDuration / 4) * 2,
    "| | | X": (beatDuration / 4) * 3,
    "| X |": (beatDuration / 3) * 1,
    "| | X": (beatDuration / 3) * 2,
  };

  const [gap, setGap] = useState(gappedTime["| X | |"]);

  useEffect(() => {
    source.loopEnd = beatDuration;
  }, [tempo, on, source, turnOnGap]);

  useEffect(() => {
    source2.loopEnd = beatDuration;
  }, [tempo, on, source2, turnOnGap]);

  const gapTime = (delay, newSource) => {
    console.log("gap time called", newSource);
    request.open("GET", bell, true);
    request.responseType = "arraybuffer";
    request.onload = () => {
      audioContext.decodeAudioData(request.response, (buffer) => {
        if (newSource) {
          setSource2(newSource);
          newSource.buffer = buffer;
          newSource.loop = true;
          newSource.loopEnd = beatDuration;
          newSource.connect(audioContext.destination);
          newSource.start(delay + audioContext.currentTime);
          newSource.stop(
            metroB * timeSig * newSource.loopEnd + audioContext.currentTime
          );
          newSource.onended = () => {
            metro(audioContext.createBufferSource());
          };
        }
      });
    };
    request.send();
  };

  const metro = (newSource) => {
    console.log(newSource);
    request.open("GET", bell, true);
    request.responseType = "arraybuffer";
    request.onload = () => {
      audioContext.decodeAudioData(request.response, (buffer) => {
        if (newSource === undefined && !turnOnGap) {
          console.log("if", turnOnGap);
          source.buffer = buffer;
          source.loop = true;
          source.loopEnd = beatDuration;
          source.connect(audioContext.destination);
          source.start(0);
        } else if (turnOnGap) {
          if (newSource === undefined) {
            console.log("hdllo");
            newSource = audioContext.createBufferSource();
            setSource(newSource);
          } else {
            setSource(newSource);
          }
          console.log("else if", turnOnGap);
          newSource.buffer = buffer;
          newSource.loop = true;
          newSource.loopEnd = beatDuration;
          newSource.connect(audioContext.destination);
          newSource.start(audioContext.currentTime);
          newSource.stop(
            metroA * timeSig * newSource.loopEnd + audioContext.currentTime
          );
          newSource.onended = () => {
            gapTime(gap, audioContext.createBufferSource());
          };
        }
      });
    };
    request.send();
    setOn(true);
    setHasStarted(true);
  };

  // const mute = () => {
  //   if (gainNode.gain.value === 0) {
  //     console.log("on");
  //     gainNode.gain.value = "1";
  //   } else {
  //     console.log("off");
  //     gainNode.gain.value = "0";
  //   }
  // };

  const stop = () => {
    if (audioContext.state === "running") {
      setOn(false);
      audioContext.suspend();
    }
  };

  const start = () => {
    if (!hasStarted) {
      console.log("0", on);
      metro();
    } else {
      console.log("2");
      setOn(true);
      audioContext.resume();
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
        <ReactSwitch
          onChange={(e) => {
            setTurnOnGap(e);
            // setHasStarted(false);
            // audioContext.close();
            // maybe create a new audio context here????
          }}
          checked={turnOnGap}
        />

        {turnOnGap && (
          <GapWrap>
            <div>
              <div>Time Sig</div>
              <select onChange={(i) => setTimeSig(i.target.value)}>
                {timeSignatures.map((i) => {
                  return (
                    <option key={i} value={i}>
                      {i}/4
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <div>Side A</div>
              <select onChange={(e) => setMetroA(e.target.value)}>
                {bars.map((bar, index) => {
                  return (
                    <option value={bar} key={index}>
                      {bar}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <div>Side B</div>
              <select onChange={(e) => setMetroB(e.target.value)}>
                {bars.map((bar, index) => {
                  return (
                    <option key={index} value={bar}>
                      {bar}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <div>G_A_P</div>
              <select onChange={(e) => setGap(gappedTime[e.target.value])}>
                {Object.keys(gappedTime).map((i, index) => {
                  return (
                    <option key={index} value={i}>
                      {i}
                    </option>
                  );
                })}
              </select>
            </div>
          </GapWrap>
        )}
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
  -webkit-appearance: none;
  width: 25vw;
  color: white;
  background-color: white;
  border-radius: 10px;
  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: 1px solid #000000;

    background-size: cover;
    cursor: pointer;
    position: relative;
    z-index: 2;
    height: 36px;
    width: 16px;
    border-radius: 3px;
  }
`;

const Tempo = styled.div`
  color: #30d5c8;
  font-size: 3em;
  font-weight: 200;
`;

const GapWrap = styled.div`
  margin-top: 25px;
  display: flex;
  font-size: 2em;
  width: 25vw;
  justify-content: space-between;
  color: white;
`;
