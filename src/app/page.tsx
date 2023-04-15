"use client"

import styles from "./styles/page.module.css";
import DocumentLister from "./components/DocumentLister";
import { UserContext } from "./context/Context/UserContext";
import { useContext } from "react";

export default function Home() {
  const auth = useContext(UserContext);
  console.log(auth);

  return (
    <main className={styles.main}>
      <DocumentLister />
    </main>
  );
}
