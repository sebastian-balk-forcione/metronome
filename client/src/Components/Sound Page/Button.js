import styled from "styled-components";
import { useState } from "react";
import { IoAdd, IoCheckmark } from "react-icons/io5";

const Button = ({ sound, handleClick }) => {
  const [added, setAdded] = useState(false);

  const buttonClick = (sound) => {
    handleClick(sound);
    setAdded(!added);
  };

  return (
    <AddBtn onClick={() => buttonClick(sound)}>
      {added ? <IoCheckmark /> : <IoAdd />}
    </AddBtn>
  );
};

const AddBtn = styled.button`
  border: none;
  height: fit-content;
  width: fit-content;
  background-color: #14539a;
  color: white;
  font-size: 0.8em;
  margin: 10px 0 0 10px;
  cursor: pointer;
  /* &:hover {
    background-color: #ff6b35;
    color: #14539a;
    font-weight: bold;
  } */
`;
export default Button;
