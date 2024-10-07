import styled from "styled-components";
import { Grid2 } from "@mui/material";
import SocialMedia from "./SocialMedia.tsx";

const FooterContainer = styled.footer`
  min-height: 250px;
  background-color: #2A7CC7;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 24px;
  @media only screen and (min-width: 600px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  justify-content: space-around;
`;

const FooterColumnTittle = styled.p`
  font-size: 26px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <ContentContainer>
        <Grid2 size="grow" textAlign="center">
          <div>
            <FooterColumnTittle>Contáctanos</FooterColumnTittle>
            <SocialMedia />
          </div>
        </Grid2>
        <Grid2 size="grow">
          <FooterColumn>
            <div>
              <FooterColumnTittle>Compañía</FooterColumnTittle>
              <p>Sobre nosotros</p>
              <p>Trabaja con nosotros</p>
              <p>Blog</p>
            </div>
          </FooterColumn>
        </Grid2>
        <Grid2 size="grow">
          <FooterColumn>
            <div>
              <FooterColumnTittle>Legales</FooterColumnTittle>
              <p>Términos y condiciones</p>
              <p>¿Cómo cuidamos tu privacidad?</p>
              <p>Defensa del Consumidor</p>
            </div>
          </FooterColumn>
        </Grid2>
      </ContentContainer>
    </FooterContainer>
  );
};

export default Footer;
