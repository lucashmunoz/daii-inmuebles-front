import { ReactElement } from "react";
import Header from "../../components/Header";
import styled from "styled-components";
import MainFilters from "./MainFilters";
import InmueblesRecientes from "./InmueblesRecientes";

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f0f0f0;
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

const Home = (): ReactElement => {
  return (
    <PageWrapper>
      <Header />
      
      <EncontraTuHogarContainer>
        <EncontraTuHogarText>
          Entontrá tu próximo hogar en Smart Move
        </EncontraTuHogarText>
      </EncontraTuHogarContainer>

      <main>
        <MainFilters />
        <InmueblesRecientes />
      </main>
    </PageWrapper>
  );
};

export default Home;
