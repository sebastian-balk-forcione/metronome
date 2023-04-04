import { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [newEntry, setNewEntry] = useState(false);
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      console.log(user.name);
      const body = {
        name: user.name,
        email: user.email,
      };
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
          const _id = data._id;
          setClient({ _id, user });
          console.log(data);
        })
        .catch((error) => {
          window.alert(error);
        });
    }
  }, [user, isAuthenticated]);

  return (
    <UserContext.Provider value={{ client, newEntry, setNewEntry }}>
      {children}
    </UserContext.Provider>
  );
};
