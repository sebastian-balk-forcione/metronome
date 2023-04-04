import { useContext, useState } from "react";
import { UserContext } from "./Context";
import styled from "styled-components";

const DisplayedEntry = () => {
  const { newEntry, setNewEntry, displayEntry } = useContext(UserContext);
  console.log(displayEntry);
  return (
    <>
      {displayEntry && (
        <div>
          <Wrapper>
            <div></div>
            <Subject>{displayEntry.subject}</Subject>
            <div>{displayEntry.date}</div>
          </Wrapper>
          <div>{displayEntry.entry}</div>
        </div>
      )}
    </>
  );
};

export default DisplayedEntry;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 52vw;
  & div:nth-child(1) {
    margin-left: 50px;
  }
`;

const Subject = styled.div`
  font-size: 1.2em;
  text-decoration: underline;
  margin-bottom: 10px;
`;
