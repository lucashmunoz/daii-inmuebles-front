import { ReactElement } from "react";
import Header from "../../components/Header";
import styled from "styled-components";
import MainFilters from "./MainFilters";
import InmueblesRecientes from "./InmueblesRecientes";

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;

  background-image: url("src/assets/background.jpg");
  background-size: contain;
  background-repeat: repeat;
  background-blend-mode: lighten;
`;

const EncontraTuHogarContainer = styled.div`
  background-color: #8174a2;
  min-height: 40px;
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
          Entontrá tu próximo hogar en Smart Move
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
