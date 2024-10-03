import { useEffect, useMemo, useState } from "react";
import Header from "../../components/Header";
import PageWrapper from "../../components/PageWrapper";
import PropertyForm from "../../components/PropertyForm";
import { FormPropertyData } from "../../components/PropertyForm/PropertyForm";
import styled from "styled-components";
import { Alert, Button, Card as MUICard } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPropertyDetails, selectPropertyDetails, selectPropertyDetailsStatus } from "../../../store/properties/propertyDetailsSlice";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import { isPropertyFormValid } from "../../components/PropertyForm/helpers";
import { isEqual } from "lodash";
import { fetchDistricts } from "../../../store/properties/districtsSlice";
import { editProperty, resetEdiNewPropertyState, selectEditPropertyState } from "../../../store/properties/propertiesSlice";
import { PropertyType } from "../../../models/property";

const Main = styled.main`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Card = styled(MUICard)`
  max-width: 950px;
  padding: 20px;
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 28px 20px;
`;

const ButtonContainer = styled.div`
  text-align: center;
`;

const SpinnerContainer = styled.div`
  height: 100%;
  width: 107px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.span`
  width: 30px;
  height: 30px;
  border: 5px solid black;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
  }
`;

const EditProperty = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();

  const propertyDetails = useAppSelector(selectPropertyDetails);
  const propertyDetailsStatus = useAppSelector(selectPropertyDetailsStatus);
  const editPropertyState = useAppSelector(selectEditPropertyState);

  const { bathrooms, beds, description, district, images, price, rooms, surface_covered, surface_total, title, type, address, longitude, latitude, zipcode } = propertyDetails;

  const originalPropertyValues = useMemo(() => ({
    beds: beds.toString(),
    zipcode,
    bathrooms: bathrooms.toString(),
    country: "Argentina",
    city: "Ciudad Autonoma de Buenos Aires",
    state: "Buenos Aires",
    district,
    rooms: rooms.toString(),
    title,
    description,
    latitude,
    longitude,
    images,
    address,
    price: price.toString(),
    type,
    surface_covered: surface_covered.toString(),
    surface_total: surface_total.toString()
  }), [address, bathrooms, beds, description, district, images, latitude, longitude, price, rooms, surface_covered, surface_total, title, type, zipcode]);

  const [formData, setFormData] = useState<FormPropertyData>({
    beds: "",
    zipcode: "",
    bathrooms: "",
    country: "Argentina",
    city: "Ciudad Autonoma de Buenos Aires",
    state: "Buenos Aires",
    district: "",
    rooms: "",
    title: "",
    description: "",
    latitude: 0,
    longitude: 0,
    images: [],
    address: "",
    price: "",
    type: "",
    surface_covered: "",
    surface_total: ""
  });

  const isPropertyFormDifferent = !isEqual(formData, originalPropertyValues);
  const disableSubmitButton = !isPropertyFormDifferent || !isPropertyFormValid(formData);

  const handleSubmit = () => {
    dispatch(editProperty({
      propertyId: Number(id),
      updatedProperty: {
        beds: parseInt(formData.beds),
        zipcode: formData.zipcode,
        bathrooms: parseInt(formData.bathrooms),
        country: formData.country,
        city: formData.city,
        state: formData.state,
        district: formData.district,
        rooms: parseInt(formData.rooms),
        title: formData.title,
        description: formData.description,
        latitude: formData.latitude,
        longitude: formData.longitude,
        images: formData.images,
        address: formData.address,
        price: parseInt(formData.price),
        type: formData.type as PropertyType,
        surface_covered: parseInt(formData.surface_covered),
        surface_total: parseInt(formData.surface_total)
      }
    })); };

  useEffect(() => {
    if (editPropertyState === "SUCCESS") {
      navigate(-1);
    }
    dispatch(resetEdiNewPropertyState());
  }, [dispatch, editPropertyState, navigate]);

  useEffect(() => {
    dispatch(fetchPropertyDetails({
      propertyId: Number(id)
    }));
    dispatch(fetchDistricts());
  }, [dispatch, id]);

  useEffect(() => {
    if(propertyDetailsStatus === "SUCCESS") {
      setFormData({
        ...originalPropertyValues
      });
    }
  }, [originalPropertyValues, propertyDetails, propertyDetailsStatus]);

  if (propertyDetailsStatus === "LOADING") {
    return (
      <PageWrapper>
        <Header />
        <LoaderContainer>
          <LoadingSkeleton />
        </LoaderContainer>
      </PageWrapper>
    );
  }

  if (propertyDetailsStatus === "ERROR") {
    return (
      <PageWrapper>
        <Header />
        <Alert severity="error">
          Ocurrió un error al recuperar los datos de la propiedad.
        </Alert>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Header />
      <Main>
        <h1>Editar propiedad</h1>
        <Card>
          <PropertyForm
            formData={formData}
            setFormData={setFormData}
          />
        </Card>

        <ButtonContainer>
          {
            editPropertyState === "LOADING"
              ? <SpinnerContainer>
                <Spinner />
              </SpinnerContainer>
              : <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={disableSubmitButton}
                style={{
                  marginTop: "20px"
                }}
              >
              Editar propiedad
              </Button>
          }

        </ButtonContainer>

      </Main>

    </PageWrapper>
  );
};

export default EditProperty;
