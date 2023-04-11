import styled from "styled-components";
import { useContext, useState } from "react";
import { UserContext } from "../Context";
import { TfiTrash } from "react-icons/tfi";
import { AiOutlineFolderView } from "react-icons/ai";

const Entries = ({ date, entry, subject, id, clientId }) => {
  const { newEntry, setNewEntry, setDisplayEntry } = useContext(UserContext);

  const handleClick = () => {
    fetch(`/delete-entry/${id}/${clientId}`, { method: "DELETE" }).then(() => {
      setNewEntry(!newEntry);
    });
  };

  const handleEntryClick = () => {
    setDisplayEntry({ entry: entry, date: date, subject: subject });
  };

  return (
    <>
      <Wrapper>
        <div>
          <div>{subject}</div>
          <div>{date}</div>
        </div>
        <ButtonWrap>
          <button
            onClick={() => {
              handleEntryClick();
            }}
          >
            <AiOutlineFolderView />
          </button>
          <button onClick={() => handleClick()}>
            <TfiTrash />
          </button>
        </ButtonWrap>
      </Wrapper>
    </>
  );
};

export default Entries;

const Wrapper = styled.div`
  padding: 10px;
  min-height: 100px;
  font-size: 1.9em;
  margin: 10px 20px;
  border: 1px solid #ff6b35;
  border-radius: 6px;
  color: white;
  display: flex;
  justify-content: space-between;
`;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;

  & * {
    margin: 8px 0;
    cursor: pointer;
    border: none;
    color: white;
    background-color: #14539a;
    font-size: 0.9em;
  }
`;
