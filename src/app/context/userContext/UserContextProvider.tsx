"use client"

import { useState } from "react";
import { UserContext } from "./UserContext";

export const UserContextProvider = (props: { children: any }) => {
  const [user, setUser] = useState("Hello");

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};
