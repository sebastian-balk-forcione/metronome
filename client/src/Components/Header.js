import styled from "styled-components";

import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { logout } = useAuth0();
  return (
    <>
      <Wrapper>
        <div>METRONOME</div>

        <button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          {" "}
          Sign Out
        </button>
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
