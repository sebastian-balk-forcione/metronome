import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "./Context";

const Header = () => {
  const { logout } = useAuth0();
  const [isOpen, setIsOpen] = useState({ open: false });
  const { client } = useContext(UserContext);

  const handleClick = () => {
    setIsOpen((state) => {
      return {
        open: !state.open,
      };
    });
  };

  return (
    <>
      <Wrapper>
        <Title to={"/metronome"}>METRONOME</Title>
        <Container>
          {client && (
            <div>
              <Dropdown onClick={handleClick}>
                {client.user.given_name}
              </Dropdown>
            </div>
          )}

          {isOpen.open && (
            <Menu>
              <LogBook to={"/logbook"}>Log Book</LogBook>
              <div
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Sign Out
              </div>
            </Menu>
          )}
        </Container>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 200;
  font-size: 1em;
  color: white;
  padding: 15px;
`;

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const Title = styled(Link)`
  font-size: 2.5em;
  color: white;
`;

const Dropdown = styled.button`
  width: 8vw;
  height: fit-content;
  font-size: 2em;
  color: white;
  background: #ff6b35;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const Menu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 115px;
  font-size: 2em;
  text-align: center;
  color: white;
  background-color: #ff6b35;
  & * {
    &:hover {
      color: #14539a;
      font-weight: bold;
    }
  }
  &:nth-child(2) {
    cursor: pointer;
  }
`;

const LogBook = styled(Link)`
  color: white;
`;

export default Header;
