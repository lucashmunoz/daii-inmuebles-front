import { ReactElement } from "react";
import Header from "../../components/Header";
import styled from "styled-components";

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f0f0f0;
`;

const PropertiesList = (): ReactElement => {
  return (
    <PageWrapper>
      <Header />
      <main>
      </main>
    </PageWrapper>
  );
};

export default PropertiesList;
