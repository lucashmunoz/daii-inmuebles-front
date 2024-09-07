import { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { paths } from "../../../navigation/paths";
import { Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Wrapper = styled.header`
  height: 60px;
  background-color: "#f0f0f0";
  border-bottom: 1px solid gray;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const Logo = styled.img`
  height: 52px;
`;

const MenuButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;

const Actions = styled.nav<{ $showActions: boolean; }>`
  z-index: 10;
  position: absolute;
  top: 60px;
  right: 0;
  display: ${props => props.$showActions ? "flex" : "none"};
  flex-direction: column;
  background: #fefefe;
  border: 1px solid #cccccc;
`;

const LinkButton = styled(Link)`
  padding: 12px;
  color: #0958d9;
  decoration: none;
  text-align: center;
`;

const Header = (): ReactElement => {
  const [showActions, setShowActions] = useState(false);

  const handleShowActions = () => {
    setShowActions(prev => !prev);
  };

  return (
    <Wrapper>
      <Link to={paths.home}>
        <Logo src="src/assets/logo.png" />
      </Link>
      <MenuButton>
        <MenuIcon fontSize="large" onClick={handleShowActions} />
      </MenuButton>
      <Actions $showActions={showActions}>
        <LinkButton to={paths.myContracts}>
          Mis contratos
        </LinkButton>
        <Divider />
        <LinkButton to={paths.myProperties}>
          Mis publicaciones
        </LinkButton>
        <Divider />
        <LinkButton to={paths.createProperty}>
          Publicar Inmueble
        </LinkButton>
        <Divider />
        <LinkButton to={paths.bookmarks}>
          Mis favoritos
        </LinkButton>
      </Actions>
    </Wrapper>
  );
};

export default Header;
