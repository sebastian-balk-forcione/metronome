import styled from "styled-components";
import Loading from "../Loading";
import { useContext } from "react";
import { UserContext } from "../Context";

const SoundChoice = ({ setChoiceIndex, setChoice, sounds, fetchedSounds }) => {
  const clickHandler = (index) => {
    setChoiceIndex(index);
    fetchedSounds.length > 0
      ? setChoice(fetchedSounds[index].src)
      : setChoice(sounds[index].src);
  };
  const { loading } = useContext(UserContext);
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Wrapper>
        {fetchedSounds.length === 0
          ? sounds.map((sound, index) => {
              return (
                index <= 3 && (
                  <Button
                    key={index}
                    onClick={() => {
                      clickHandler(index);
                    }}
                  >
                    {sound.name}
                  </Button>
                )
              );
            })
          : fetchedSounds.map((sound, index) => {
              return (
                <Button
                  key={index}
                  onClick={() => {
                    clickHandler(index);
                  }}
                >
                  {sound.name}
                </Button>
              );
            })}
      </Wrapper>
    </>
  );
};

export default SoundChoice;

const Wrapper = styled.div`
  display: flex;
`;

const Button = styled.button`
  cursor: pointer;
  letter-spacing: 6px;
  padding: 3px;
  margin: 5px;
  &:focus {
    border: 3px solid #ff6b35;
  }
`;
