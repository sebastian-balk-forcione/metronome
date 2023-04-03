import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LoginBtn = () => {
  const { loginWithRedirect, user } = useAuth0();

  console.log(user);

  return (
    <>
      <Button onClick={() => loginWithRedirect()}>
        <div>Sign In</div>
      </Button>
    </>
  );
};

export default LoginBtn;

const Button = styled.button`
  font-size: 6em;
  background-color: #14539a;
  color: white;
  border: 5px dotted #f95700ff;
  border-radius: 15px;
  width: 20vw;
  margin-top: 33vh;
  padding: 20px;
  cursor: pointer;
  &:hover {
    border: 5px solid #f95700ff;
  }
`;
