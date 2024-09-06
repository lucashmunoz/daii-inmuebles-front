import { ReactElement, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { paths } from "../../../navigation/paths";
import { Button, Divider } from "@mui/material";
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
  position: absolute;
  top: 60px;
  right: 0;
  display: ${props => props.$showActions ? "flex" : "none"};
  flex-direction: column;
  background: #fefefe;
  border: 1px solid #cccccc;
`;

const ActionButton = styled(Button)`
  padding: 12px;
`;

const Header = (): ReactElement => {
  const navigate = useNavigate();

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
        <ActionButton variant="text" onClick={() => navigate(paths.myContracts)}>
          Mis contratos
        </ActionButton>
        <Divider />
        <ActionButton variant="text" onClick={() => navigate(paths.myProperties)}>
          Mis publicaciones
        </ActionButton>
        <Divider />
        <ActionButton variant="text" onClick={() => navigate(paths.createProperty)}>
          Publicar Inmueble
        </ActionButton>
        <Divider />
        <ActionButton variant="text" onClick={() => navigate(paths.bookmarks)}>
          Mis favoritos
        </ActionButton>
      </Actions>
    </Wrapper>
  );
};

export default Header;
