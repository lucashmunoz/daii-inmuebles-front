import styled from "styled-components";

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  background-image: url("src/assets/background.jpg");
  background-size: contain;
  background-repeat: repeat;
  background-blend-mode: lighten;
`;

export default PageWrapper;
