import { ReactElement } from "react";
import styled from "styled-components";

const Wrapper = styled.header`
  height: 60px;
  background-color: "#f0f0f0";
  border-bottom: 1px solid gray;
  padding: 0 20px;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 52px;
`;

const Header = (): ReactElement => {
  return (
    <Wrapper>
      <Logo src="src/assets/logo.png" />
    </Wrapper>
  );
};

export default Header;
