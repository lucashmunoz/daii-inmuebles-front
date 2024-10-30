import { useEffect, useState } from "react";
import { Alert, useMediaQuery, Pagination } from "@mui/material";
import { isMobileMediaQuery } from "../../../helpers";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import MyPropertyCard from "./MyPropertyCard";
import {
  fetchMyProperties,
  selectMyProperties,
  selectMyPropertiesStatus,
  selectTogglePropertyActiveStatus,
  togglePropertyActiveStatus,
  selectTotalMyPropertiesPages
} from "../../../store/properties/myPropertiesSlice";
import { Property } from "../../../models/property";
import { deleteProperty } from "../../../store/properties/propertiesSlice";
import { useSearchParams } from "react-router-dom";
import { fetchUserDetails } from "../../../store/userSlice";

const PropertiesContainer = styled.main`
  padding: 16px;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  min-height: 100vh;
  height: 100%;
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 28px 20px;
`;

const PropertiesSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const MyPropertiesPageTitle = () => <h1>Mis Publicaciones</h1>;

const Contracts = () => {
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery(isMobileMediaQuery);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const myProperties = useAppSelector(selectMyProperties);
  const myPropertiesStatus = useAppSelector(selectMyPropertiesStatus);
  const togglePropertyActiveState = useAppSelector(selectTogglePropertyActiveStatus);
  const totalMyPropertiesPages = useAppSelector(selectTotalMyPropertiesPages);

  const [propertyIdToBeToggle, setPropertyIdToBeToggle] = useState(-1);

  const handlePropertyStatusChange = async (property: Property, newStatus: boolean) => {
    const { id } = property;
    setPropertyIdToBeToggle(id);
    const updatedProperty = {
      ...property,
      active: newStatus
    };
    await dispatch(
      togglePropertyActiveStatus({
        propertyId: id,
        updatedProperty
      })
    );
    setPropertyIdToBeToggle(-1);
  };

  const handleDeleteProperty = async (propertyId: number, page: number) => {
    await dispatch(deleteProperty({
      propertyId
    }));

    const strPage = page.toString();

    setSearchParams((prev) => {
      prev.set("page", strPage);
      return prev;
    });

    dispatch(fetchMyProperties({
      page: strPage
    }));
  };

  const handlePageChange = (page: number) => {
    const strPage = page.toString();

    setSearchParams((prev) => {
      prev.set("page", strPage);
      return prev;
    });

    dispatch(
      fetchMyProperties({
        page: strPage
      })
    );
  };

  useEffect(() => {
    const fetchUserProperties = async () => {
      await dispatch(
        fetchUserDetails()
      );

      dispatch(
        fetchMyProperties({
          page: currentPage.toString()
        })
      );
    };

    fetchUserProperties();
  }, [dispatch, currentPage]);

  if (myPropertiesStatus === "LOADING") {
    return (
      <PropertiesContainer>
        <MyPropertiesPageTitle />
        <LoaderContainer>
          <LoadingSkeleton />
        </LoaderContainer>
      </PropertiesContainer>
    );
  }

  if (myPropertiesStatus === "ERROR") {
    return (
      <PropertiesContainer>
        <MyPropertiesPageTitle />
        <Alert severity="error">Ocurrió un error al mostrar sus propiedades.</Alert>
      </PropertiesContainer>
    );
  }

  if (myPropertiesStatus === "SUCCESS" && myProperties.length === 0) {
    return (
      <PropertiesContainer>
        <MyPropertiesPageTitle />
        <Alert severity="info">No se encontraron propiedades.</Alert>
      </PropertiesContainer>
    );
  }

  return (
    <PropertiesContainer>
      <MyPropertiesPageTitle />
      <PropertiesSection>
        {myProperties.map((property) => {
          const isToggleLoading =
            togglePropertyActiveState === "LOADING" && propertyIdToBeToggle === property.id;

          return (
            <MyPropertyCard
              orientation={isMobile ? "vertical" : "horizontal"}
              key={property.id}
              property={property}
              isToggleLoading={isToggleLoading}
              handlePropertyStatusChange={handlePropertyStatusChange}
              handleDeleteProperty={handleDeleteProperty}
              page={currentPage}
            />
          );
        })}
      </PropertiesSection>
      <Pagination
        count={totalMyPropertiesPages}
        color="primary"
        onChange={(_, page) => handlePageChange(page)}
        defaultPage={currentPage}
      />
    </PropertiesContainer>
  );
};

export default Contracts;
