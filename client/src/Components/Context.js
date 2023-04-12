import { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [newEntry, setNewEntry] = useState(false);
  const [newSounds, setNewSounds] = useState(false);
  const { user, isAuthenticated } = useAuth0();
  const [displayEntry, setDisplayEntry] = useState(null);
  const [fetchedSounds, setFetchedSounds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Post when a user intially signs in.
  useEffect(() => {
    if (isAuthenticated) {
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
          return res.json();
        })
        .then((data) => {
          const _id = data._id;
          setClient({ _id, user });
        })
        .catch((error) => {
          window.alert(error);
        });
    }
  }, [user, isAuthenticated]);

  // get fetch for the users save sounds
  useEffect(() => {
    if (client) {
      fetch(`/get-sounds/${client._id}`)
        .then((res) => res.json())
        .then((data) => {
          setFetchedSounds(data.data);
          setLoading(false);
        });
    }
  }, [client, isAuthenticated, newSounds]);

  return (
    <UserContext.Provider
      value={{
        client,
        newEntry,
        setNewEntry,
        displayEntry,
        setDisplayEntry,
        fetchedSounds,
        setFetchedSounds,
        newSounds,
        setNewSounds,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
