import styled from "styled-components";
import { Grid2 } from "@mui/material";
import SocialMedia from "./SocialMedia.tsx";

const FooterContainer = styled.footer`
  height: 270px;
  background-color: #2A7CC7;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  bottom: 0;
  width: 100%;
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
      <Grid2 container gap={5} alignItems="center" height="100%">
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
      </Grid2>
    </FooterContainer>
  );
};

export default Footer;
