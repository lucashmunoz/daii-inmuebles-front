import { ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { paths } from "../../../navigation/paths";
import { Button } from "@mui/material";

const Wrapper = styled.header`
  height: 60px;
  background-color: "#f0f0f0";
  border-bottom: 1px solid gray;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  height: 52px;
`;

const Action = styled.div`
  display: flex;
  gap: 16px;
`;

const Header = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Link to={paths.home}>
        <Logo src="src/assets/logo.png" />
      </Link>
      <Action>
        <Button variant="contained" onClick={() => navigate(paths.myContracts)}>
          Mis contratos
        </Button>
        <Button variant="contained" onClick={() => navigate(paths.myProperties)}>
          Mis publicaciones
        </Button>
      </Action>
    </Wrapper>
  );
};

export default Header;
