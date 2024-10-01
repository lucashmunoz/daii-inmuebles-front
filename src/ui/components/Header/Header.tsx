import { ReactElement, useState, useRef, useEffect } from "react";
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
  const menuRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleShowActions = () => {
    setShowActions(prev => !prev);
  };

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if(!menuRef.current?.contains(e.target as HTMLElement) && !menuButtonRef.current?.contains(e.target as HTMLElement)) {
        setShowActions(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  return (
    <Wrapper>
      <Link to={paths.home}>
        <Logo src="/src/assets/logo.png" alt="Smart Move logo" />
      </Link>
      <MenuButton aria-label="Menu" ref={menuButtonRef}>
        <MenuIcon fontSize="large" onClick={handleShowActions} />
      </MenuButton>
      <Actions $showActions={showActions} ref={menuRef}>
        <LinkButton to={paths.properties}>
          Buscar Propiedades
        </LinkButton>
        <Divider />
        <LinkButton to={paths.myContracts}>
          Mis Contratos
        </LinkButton>
        <Divider />
        <LinkButton to={paths.myProperties}>
          Mis Publicaciones
        </LinkButton>
        <Divider />
        <LinkButton to={paths.createProperty}>
          Publicar Inmueble
        </LinkButton>
        <Divider />
        <LinkButton to={paths.bookmarks}>
          Mis Favoritos
        </LinkButton>
      </Actions>
    </Wrapper>
  );
};

export default Header;
