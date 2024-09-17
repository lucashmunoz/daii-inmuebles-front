import SvgIcon from "@mui/material/SvgIcon";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { finishToggleBookmarkUpdates, selectToggleBookmarkStatus, toggleBookmark } from "../../../store/properties/bookmarksSlice";
import { useEffect } from "react";
import { bookmarkProperty, unbookmarkProperty } from "../../../store/properties/propertyDetailsSlice";

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

interface FavouriteButtonProps {
  propertyId: number;
  favorite: boolean;
}

const FavouriteButton = ({ propertyId, favorite }: FavouriteButtonProps) => {
  const dispatch = useAppDispatch();
  const toggleBookmarkStatus = useAppSelector(selectToggleBookmarkStatus);

  const handleClick = () => {
    if(favorite) {
      dispatch(toggleBookmark({
        propertyId, operation: "DELETE"
      }));
      return;
    }
    dispatch(toggleBookmark({
      propertyId, operation: "ADD"
    }));
  };

  useEffect(() => {
    if(toggleBookmarkStatus === "ADDED") {
      dispatch(bookmarkProperty());
      dispatch(finishToggleBookmarkUpdates());
      return;
    }
    if(toggleBookmarkStatus === "DELETED") {
      dispatch(unbookmarkProperty());
      dispatch(finishToggleBookmarkUpdates());
      return;
    }
  }, [dispatch, toggleBookmarkStatus]);

  return (
    <StyledIconButton onClick={handleClick} liked={favorite} aria-label="like">
      <HeartIcon liked={favorite}>
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
