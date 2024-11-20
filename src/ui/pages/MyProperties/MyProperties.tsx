import Header from "../../components/Header";
import PageWrapper from "../../components/PageWrapper";
import Properties from "./Properties";
import Footer from "../../components/Footer/Footer.tsx";
import { modules } from "../../../navigation/paths.ts";
import { Button } from "@mui/material";

const MyProperties = () => {
  const handleNavigateToLegales = () => {
    window.location.replace(modules.legales);
  };

  return (
    <PageWrapper>
      <Header />
      <Properties />
      <Button onClick={handleNavigateToLegales} style={{
        margin: "16px", padding: "8px 16px", fontSize: "16px", cursor: "pointer"
      }}>
                Ir a Legales
      </Button>
      <Footer />
    </PageWrapper>
  );
};

export default MyProperties;
