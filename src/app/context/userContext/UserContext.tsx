import { auth } from "../../../firebase";
import React from "react";

export const UserContext = React.createContext("auth.currentUser");
