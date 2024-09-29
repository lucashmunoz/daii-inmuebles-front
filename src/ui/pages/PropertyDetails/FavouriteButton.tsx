import { useTheme } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { finishToggleBookmarkUpdates, selectToggleBookmarkStatus, toggleBookmark } from "../../../store/properties/bookmarksSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect } from "react";
import { bookmarkProperty, unbookmarkProperty } from "../../../store/properties/propertyDetailsSlice";
import styled from "styled-components";

const StyledIconButton = styled.button`
  background: none;
  border: none;
  padding: 0 0 0 8px;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
`;

interface FavouriteButtonProps {
  propertyId: number;
  favorite: boolean;
}

const FavouriteButton = ({ propertyId, favorite }: FavouriteButtonProps) => {
  const theme = useTheme();

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
    <StyledIconButton onClick={handleClick} aria-label={favorite ? "Eliminar de favoritos" : "Agregar a favoritos"}>
      {
        favorite
          ? <FavoriteIcon
            sx={{
              color: theme.palette.primary.light
            }}
          />
          : <FavoriteBorderIcon />
      }
    </StyledIconButton>
  );
};

export default FavouriteButton;
