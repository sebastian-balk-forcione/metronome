import LoginBtn from "./LoginBtn";
import styled from "styled-components";

const LoginPage = () => {
  return (
    <>
      <Wrapper>
        <LoginBtn />
      </Wrapper>
    </>
  );
};

export default LoginPage;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
