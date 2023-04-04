import styled from "styled-components";

const Entries = ({ date, entry, subject }) => {
  return (
    <>
      <Wrapper>
        <div>
          <div>{subject}</div>
          <div>{date}</div>
        </div>
        <ButtonWrap>
          <button>View</button>
          <button>Delete</button>
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
  flex-direction: column;
  align-items: center;
  & * {
    margin: 8px 0;
    cursor: pointer;
  }
`;
