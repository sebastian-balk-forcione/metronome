import { useAuth0 } from "@auth0/auth0-react";

const LogoutBtn = () => {
  const { logout } = useAuth0();
  return (
    <>
      <button onClick={() => logout()}> Sign Out</button>
    </>
  );
};

export default LogoutBtn;
