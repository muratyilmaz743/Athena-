"use client";

import { getAuth, signOut } from "firebase/auth";
import { UserContext } from "../context/Context/UserContext";

export default function Header() {
  const onLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (

    <UserContext.Consumer>{(value) => <p>{value?.email}</p>}</UserContext.Consumer>
  );
}
