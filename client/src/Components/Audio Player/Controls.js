import {
  IoPlayOutline,
  IoPlaySkipBackOutline,
  IoPlaySkipForwardOutline,
  IoPauseOutline,
} from "react-icons/io5";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { IoVolumeHighOutline, IoVolumeLowOutline } from "react-icons/io5";

const Controls = ({
  trackRef,
  currentTrack,
  setCurrentTrack,
  tracks,
  trackIndex,
  setTrackIndex,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(75);

  useEffect(() => {
    isPlaying ? trackRef.current.play() : trackRef.current.pause();
  }, [trackRef, isPlaying, trackIndex]);

  useEffect(() => {
    trackRef.current.volume = volume / 100;
  }, [volume, trackRef]);

  const handlePlayPause = () => {
    setIsPlaying((state) => !state);
  };

  const handleNextTrack = () => {
    if (trackIndex === tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex((state) => state + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };

  const handlePrevTrack = () => {
    if (trackIndex === 0) {
      setTrackIndex(tracks.length - 1);
      setCurrentTrack(tracks[tracks.length - 1]);
    } else {
      setTrackIndex((state) => state - 1);
      setCurrentTrack(tracks[trackIndex - 1]);
    }
  };

  return (
    <Wrapper>
      <TitleWrap>{currentTrack.title}</TitleWrap>
      <ButtonWrap>
        <SideBtn>
          <IoPlaySkipBackOutline onClick={handlePrevTrack} />
        </SideBtn>

        <Button onClick={handlePlayPause}>
          {isPlaying ? <IoPauseOutline /> : <IoPlayOutline />}
        </Button>

        <SideBtn onClick={handleNextTrack}>
          <IoPlaySkipForwardOutline />
        </SideBtn>
      </ButtonWrap>
      <VolWrap>
        <IoVolumeLowOutline />
        <VolSlider
          min={0}
          max={100}
          type={"range"}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        ></VolSlider>
        <IoVolumeHighOutline />
      </VolWrap>
    </Wrapper>
  );
};

export default Controls;

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  background-color: #ff6b35;
  height: 70px;
  border-radius: 6px;
`;

const VolWrap = styled.div`
  margin: 19px 40px 0 0;
  color: white;
  font-size: 1.5em;
`;

const ButtonWrap = styled.div`
  width: fit-content;
  margin-left: 45px;
`;

const Button = styled.button`
  all: unset;
  height: 5vh;
  color: white;
  background-color: #ff6b35;
  font-size: 2.7em;
  padding: 8px 60px;
`;

const SideBtn = styled.button`
  all: unset;
  height: 5vh;
  color: white;
  background-color: #ff6b35;
  font-size: 2.2em;
  padding: 0 60px;
`;

const TitleWrap = styled.div`
  color: white;
  font-size: 1.5em;
  margin: 15px 0 0 40px;
  font-weight: bold;
  letter-spacing: 5px;
`;

const VolSlider = styled.input`
  margin-bottom: 19px;
`;
