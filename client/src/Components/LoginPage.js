import LoginBtn from "./LoginBtn";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const LoginPage = () => {
  const { isAuthenticated } = useAuth0();

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
