import styled from "styled-components";

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  background-image: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url("src/assets/background.jpg");
  background-size: 100% 100%
  background-repeat: repeat;
  background-blend-mode: lighten;
`;

export default PageWrapper;
