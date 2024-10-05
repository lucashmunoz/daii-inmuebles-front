import { useEffect, useState } from "react";
import { Alert, useMediaQuery, Pagination } from "@mui/material";
import { formatNumberToCurrency, isMobileMediaQuery } from "../../../helpers";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import BookmarkCard from "./BookmarkCard";
import {
  deleteBookmark,
  fetchBookmarkedProperties,
  selectBookmarkedProperties,
  selectBookmarksStatus,
  selectDeleteBookmarkStatus,
  selectTotalBookmarksPages
} from "../../../store/properties/bookmarksSlice";
import { useSearchParams } from "react-router-dom";

const BookmarksContainer = styled.main`
  padding: 16px;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  min-height: 100vh;
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

const Bookmarks = () => {
  const dispatch = useAppDispatch();

  const isMobile = useMediaQuery(isMobileMediaQuery);
  const bookmarkedProperties = useAppSelector(selectBookmarkedProperties);
  const bookmarksStatus = useAppSelector(selectBookmarksStatus);
  const deleteBookmarksStatus = useAppSelector(selectDeleteBookmarkStatus);
  const totalBookmarksPages = useAppSelector(selectTotalBookmarksPages); // Get total pages

  const [propertyIdToBeDeleted, setPropertyIdToBeDeleted] = useState(-1);

  const [searchParams, setSearchParams] = useSearchParams(); // Use useSearchParams
  const currentPage = Number(searchParams.get("page")) || 1;

  const onDelete = async (id: number) => {
    setPropertyIdToBeDeleted(id);
    await dispatch(
      deleteBookmark({
        propertyId: id
      })
    );
    setPropertyIdToBeDeleted(-1);
  };

  useEffect(() => {
    dispatch(fetchBookmarkedProperties({
      page: currentPage.toString()
    }));
  }, [dispatch, currentPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    const strPage = page.toString();

    setSearchParams((prev) => {
      prev.set("page", strPage);
      return prev;
    });
  };

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
        <Alert severity="error">Ocurrió un error al mostrar sus favoritos.</Alert>
      </BookmarksContainer>
    );
  }

  if (bookmarksStatus === "SUCCESS" && bookmarkedProperties.length === 0) {
    return (
      <BookmarksContainer>
        <BookmarksPageTitle />
        <Alert severity="info">Todavia no has agregado ninguna propiedad a tus favoritos</Alert>
      </BookmarksContainer>
    );
  }

  return (
    <BookmarksContainer>
      <BookmarksPageTitle />
      <BookmarksSection>
        {bookmarkedProperties.map((bookmark) => {
          const { id, images, price, district, type } = bookmark;
          const image = images[0];
          const formattedPrice = formatNumberToCurrency({
            number: price
          });
          const isLoading =
            deleteBookmarksStatus === "LOADING" && propertyIdToBeDeleted === id;

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
        })}
      </BookmarksSection>
      <Pagination
        count={totalBookmarksPages}
        color="primary"
        onChange={handlePageChange}
        page={currentPage}
      />
    </BookmarksContainer>
  );
};

export default Bookmarks;
