import Header from "../../components/Header";
import PageWrapper from "../../components/PageWrapper";
import Contracts from "./Contracts";
import Footer from "../../components/Footer/Footer.tsx";

const MyContracts = () => {
  return (
    <PageWrapper>
      <Header />
      <Contracts />
      <Footer />
    </PageWrapper>
  );
};

export default MyContracts;
