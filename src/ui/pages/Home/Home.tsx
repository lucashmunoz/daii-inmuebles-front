import { ReactElement } from "react";
import Header from "../../components/Header";
import styled from "styled-components";
import MainFilters from "./MainFilters";
import InmueblesRecientes from "./InmueblesRecientes";
import PageWrapper from "../../components/PageWrapper";

const EncontraTuHogarContainer = styled.div`
  background-color: #1890ff;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EncontraTuHogarText = styled.h1`
  font-size: 20px;
  color: #fefefe;
  text-align: center;
`;

const Main = styled.main`
  display: flex;
  align-self: center;
  flex-direction: column;
  width: 100%;
  padding: 0;
  @media only screen and (min-width: 600px) {
    max-width: 1280px;
    padding: 0 20px;
  }
`;

const Home = (): ReactElement => {
  return (
    <PageWrapper>
      <Header />

      <EncontraTuHogarContainer>
        <EncontraTuHogarText>
          Encontrá tu próximo hogar en Smart Move
        </EncontraTuHogarText>
      </EncontraTuHogarContainer>

      <Main>
        <MainFilters />
        <InmueblesRecientes />
      </Main>
    </PageWrapper>
  );
};

export default Home;
