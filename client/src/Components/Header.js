import styled from "styled-components";

const Header = () => {
  return (
    <>
      <Wrapper>
        <div>METRONOME</div>
        <div>User</div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 200;
  font-size: 3em;
  color: white;
  padding: 15px;
`;

export default Header;
