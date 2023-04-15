"use client";

import { getAuth, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";

export const UserContextProvider = (props: { children:any }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    console.log(123);
    
    const auth = getAuth();
    auth.onAuthStateChanged(setUser);
  }, []);

  return (
    <UserContext.Provider value={user}> {props.children} </UserContext.Provider>
  );
};
