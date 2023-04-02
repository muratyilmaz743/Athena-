import { Inter } from "next/font/google";
import styles from "./styles/page.module.css";
import DocumentLister from "./components/DocumentLister";
import UploadModal from "./components/UploadModal";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { UserContextProvider } from "./context/Provider/UserContextProvider";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <UserContextProvider>
      <>
        <Header />
        <main className={styles.main}>
          <DocumentLister />
        </main>
        <Footer />
      </>
    </UserContextProvider>
  );
}
