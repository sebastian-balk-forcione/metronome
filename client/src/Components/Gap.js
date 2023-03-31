import bell from "../assets/BELL.wav";
import { useState, useEffect } from "react";

const Gap = ({ audioContext, tempo, count }) => {
  const request = new XMLHttpRequest();

  const gapTime = () => {
    console.log("gap time called");
    request.open("GET", bell, true);
    request.responseType = "arraybuffer";
    request.onload = () => {
      const source = audioContext.createBufferSource();
      audioContext.decodeAudioData(request.response, (buffer) => {
        source.buffer = buffer;
        source.loop = true;
        source.loopEnd = 1 / (tempo / 60);
        source.connect(audioContext.destination);
        source.start(0, 0.33);
      });
    };
    request.send();
  };

  useEffect(() => {
    console.log("in useEffect");
    if (count.current === 1) {
      console.log("useeffect if statement");
      gapTime();
    }
  }, [count.current]);

  return <></>;
};

export default Gap;
