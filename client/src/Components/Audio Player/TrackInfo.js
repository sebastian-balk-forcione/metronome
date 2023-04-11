const TrackInfo = ({ currentTrack, trackRef }) => {
  return (
    <div>
      <audio src={currentTrack.src} ref={trackRef} />
    </div>
  );
};

export default TrackInfo;
