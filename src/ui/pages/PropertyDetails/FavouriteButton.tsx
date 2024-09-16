import { useState } from "react";
import SvgIcon from "@mui/material/SvgIcon";
import { styled } from "@mui/material/styles";

interface StyledIconButtonProps {
  liked: boolean;
}

interface HeartIconProps {
    liked: boolean;
}

const StyledIconButton = styled("button")<StyledIconButtonProps>(({ theme, liked }) => ({
  backgroundColor: "transparent",
  border: "none",
  padding: 0,
  cursor: "pointer",
  outline: "none",
  "&:hover svg": {
    color: liked ? theme.palette.primary.light : theme.palette.secondary.lighter
  }
}));

const HeartIcon = styled(SvgIcon)<HeartIconProps>(({ theme, liked }) => ({
  fontSize: "2rem",
  transition: "color 0.3s",
  color: liked ? theme.palette.primary.main : theme.palette.secondary.A100,
  "& path": {
    stroke: "black",
    strokeWidth: "1px",
    fill: "currentColor"
  }
}));

const FavouriteButton = () => {
  const [liked, setLiked] = useState(false);

  const handleClick = () => {
    setLiked(!liked);
  };

  return (
    <StyledIconButton onClick={handleClick} liked={liked} aria-label="like">
      <HeartIcon liked={liked}>
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
          2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09
          3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0
          3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </HeartIcon>
    </StyledIconButton>
  );
};

export default FavouriteButton;
