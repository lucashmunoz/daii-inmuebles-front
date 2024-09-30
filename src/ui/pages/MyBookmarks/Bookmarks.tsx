import { useEffect, useState } from "react";
import { Alert, useMediaQuery } from "@mui/material";
import { formatNumberToCurrency, isMobileMediaQuery } from "../../../helpers";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import BookmarkCard from "./BookmarkCard";
import { deleteBookmark, fetchBookmarkedProperties, selectBookmarkedProperties, selectBookmarksStatus, selectDeleteBookmarkStatus } from "../../../store/properties/bookmarksSlice";

const BookmarksContainer = styled.main`
  padding: 16px;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  height: 300px;
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 28px 20px;
`;

const BookmarksSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const BookmarksPageTitle = () => <h1>Mis Favoritos</h1>;

const Contracts = () => {
  const dispatch = useAppDispatch();

  const isMobile = useMediaQuery(isMobileMediaQuery);
  const bookmarkedProperties = useAppSelector(selectBookmarkedProperties);
  const bookmarksStatus = useAppSelector(selectBookmarksStatus);
  const deleteBookmarksStatus = useAppSelector(selectDeleteBookmarkStatus);

  const [propertyIdToBeDeleted, setPropertyIdToBeDeleted] = useState(-1);

  const onDelete = async (id: number) => {
    setPropertyIdToBeDeleted(id);
    await dispatch(deleteBookmark({
      propertyId: id
    }));
    setPropertyIdToBeDeleted(-1);
  };

  useEffect(() => {
    dispatch(fetchBookmarkedProperties());
  }, [dispatch]);

  if (bookmarksStatus === "LOADING") {
    return (
      <BookmarksContainer>
        <BookmarksPageTitle />
        <LoaderContainer>
          <LoadingSkeleton />
        </LoaderContainer>
      </BookmarksContainer>
    );
  }

  if (bookmarksStatus === "ERROR") {
    return (
      <BookmarksContainer>
        <BookmarksPageTitle />
        <Alert severity="error">
          Ocurrió un error al mostrar sus favoritos.
        </Alert>
      </BookmarksContainer>
    );
  }

  return (
    <BookmarksContainer>
      <BookmarksPageTitle />
      <BookmarksSection>
        {
          bookmarkedProperties.map(bookmark => {
            const { id, images, price, district, type } = bookmark;
            const image = images[0];
            const formattedPrice = formatNumberToCurrency({
              number: price
            });
            const isLoading = deleteBookmarksStatus === "LOADING" && propertyIdToBeDeleted === id;

            return (
              <BookmarkCard
                orientation={isMobile ? "vertical" : "horizontal"}
                key={id}
                id={id}
                district={district}
                image={image}
                price={formattedPrice}
                type={type}
                onDelete={onDelete}
                loading={isLoading}
              />
            );
          })
        }
      </BookmarksSection>
    </BookmarksContainer>
  );
};

export default Contracts;
