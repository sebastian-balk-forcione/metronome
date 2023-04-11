import { useState, useRef } from "react";
import { tracks } from "../Assets/Tracks";
import DisplayTrack from "./TrackInfo";
import Controls from "./Controls";
import styled from "styled-components";

const Player = () => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);
  const trackRef = useRef();

  return (
    <Wrapper>
      <DisplayTrack currentTrack={currentTrack} trackRef={trackRef} />
      <Controls
        trackRef={trackRef}
        trackIndex={trackIndex}
        currentTrack={currentTrack}
        setTrackIndex={setTrackIndex}
        setCurrentTrack={setCurrentTrack}
        tracks={tracks}
      />
    </Wrapper>
  );
};

export default Player;

const Wrapper = styled.div`
  width: 100vw;
`;
