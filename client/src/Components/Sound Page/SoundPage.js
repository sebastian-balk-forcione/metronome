import { Sounds } from "../Assets/Sounds";
import { useState, useContext } from "react";
import { UserContext } from "../Context";
import styled from "styled-components";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
const SoundPage = () => {
  const [addSound, setAddSound] = useState([]);
  const [add, setAdd] = useState(false);
  const { client, newSounds, setNewSounds } = useContext(UserContext);

  // Handles users selection of sounds.
  const handleClick = (sound) => {
    if (addSound.length > 0) {
      const check = addSound.find((i) => i === sound);
      if (!check) {
        setAddSound((addSound) => [...addSound, sound]);
      }
    } else {
      setAddSound((addSound) => [...addSound, sound]);
    }
  };

  // post fetch for new sounds
  const submitChanges = () => {
    const body = [{ _id: client._id }, addSound];
    fetch("/add-sounds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAddSound([]);
        setNewSounds(!newSounds);
        setAdd(true);
      })
      .catch((error) => {
        window.alert(error);
      });
  };

  return (
    <Page>
      <Title>Sounds</Title>
      <Wrapper>
        {Sounds.map((sound, index) => {
          return (
            <Sound key={index}>
              <BigWrap>
                <SmallWrap>
                  {sound.name}
                  <audio src={sound.src} controls />
                </SmallWrap>
                <Button sound={sound} handleClick={handleClick} />
              </BigWrap>
            </Sound>
          );
        })}
      </Wrapper>
      <SaveButton onClick={submitChanges}>
        {add ? "Saved!" : "Save Changes"}
      </SaveButton>
    </Page>
  );
};
export default SoundPage;

const Page = styled.div`
  height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  width: 80vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`;

const Sound = styled.div`
  color: white;
  font-size: 2em;
`;

const BigWrap = styled.div`
  display: flex;
  padding: 20px 40px;
  border: 1px solid #ff6b35;
  margin: 10px;
`;

const SmallWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  color: white;
  font-size: 3em;
`;

const SaveButton = styled.button`
  border-radius: 6px;
  border: none;
  width: 8vw;
  font-size: 1.5em;
  margin-bottom: 100px;
  cursor: pointer;
  &:hover {
    background-color: #ff6b35;
    color: #14539a;
    font-weight: bold;
  }
`;
