import { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  // fetch("", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({  }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {

  //     })
  //     .catch((error) => {
  //       window.alert(error);
  //     });

  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};
