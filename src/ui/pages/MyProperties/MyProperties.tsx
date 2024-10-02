import Header from "../../components/Header";
import PageWrapper from "../../components/PageWrapper";
import Properties from "./Properties";
import Footer from "../../components/Footer/Footer.tsx";

const MyProperties = () => {
  return (
    <PageWrapper>
      <Header />
      <Properties />
      <Footer/>
    </PageWrapper>
  );
};

export default MyProperties;
