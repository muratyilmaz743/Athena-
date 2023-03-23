import { Inter } from "next/font/google";
import styles from "./styles/page.module.css";
import DocumentLister from "./components/DocumentLister";
import UploadModal from "./components/UploadModal";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={styles.main}>
      <DocumentLister/>
      <UploadModal/>
    </main>
  );
}
