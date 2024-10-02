import Header from "../../components/Header";
import PageWrapper from "../../components/PageWrapper";
import Bookmarks from "./Bookmarks";
import Footer from "../../components/Footer/Footer.tsx";

const MyBookmarks = () => {
  return (
    <PageWrapper>
      <Header />
      <Bookmarks />
      <Footer/>
    </PageWrapper>
  );
};

export default MyBookmarks;
