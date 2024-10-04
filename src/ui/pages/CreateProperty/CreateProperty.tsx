import { Typography, Card, Divider, CardContent, Button } from "@mui/material";
import styled from "styled-components";
import Header from "../../components/Header";
import PageWrapper from "../../components/PageWrapper";
import type { PropertyType } from "../../../models/property";
import ImageDescription from "../../../assets/property-create-image.svg";
import { useEffect, useState } from "react";
import { fetchDistricts } from "../../../store/properties/districtsSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { createNewProperty, resetCreateNewPropertyState, selectCreatedPropertyId, selectCreatePropertyState } from "../../../store/properties/propertiesSlice";
import PropertyForm from "../../components/PropertyForm";
import type { FormPropertyData } from "../../components/PropertyForm/PropertyForm";
import { isPropertyFormValid } from "../../components/PropertyForm/helpers";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../navigation/paths";
import Footer from "../../components/Footer/Footer.tsx";

const MainContainer = styled.main`
  padding: 16px;
  display: flex;
  justify-content: center;
`;

const StyledCard = styled(Card)`
  max-width: 950px;
`;

const StyledCardContent = styled(CardContent)`
  padding: 20px;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column-reverse;

  @media only screen and (min-width: 600px) {
    flex-direction: row;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleContainer = styled.div`
  margin-top: 20px;
`;

const ButtonContainer = styled.div`
  text-align: center;
`;

const CreateProperty = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const createPropertyState = useAppSelector(selectCreatePropertyState);
  const createdPropertyId = useAppSelector(selectCreatedPropertyId);

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

  const handleSubmit = () => {
    dispatch(createNewProperty({
      property: {
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
    }));
  };

  useEffect(() => {
    dispatch(fetchDistricts());
  }, [dispatch]);

  useEffect(() => {
    if(createPropertyState === "CREATED") {
      navigate(`${paths.properties}/${createdPropertyId}`);
    }
    dispatch(resetCreateNewPropertyState());
  }, [createPropertyState, createdPropertyId, dispatch, navigate]);

  return (
    <PageWrapper>
      <Header />
      <MainContainer>
        <StyledCard>
          <StyledCardContent>
            {/* Contenedor 1: Título y subtítulo */}
            <FormContainer>
              <TitleContainer>
                <Typography variant="h5" gutterBottom fontSize={20}>
                    Completá las características del inmueble.
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Tendrás mejor ubicación en los resultados de búsqueda y <br />
                    los interesados tendrán toda la información que <br />
                    necesitan.
                </Typography>
              </TitleContainer>

              {/* Contenedor 2: Imagen */}
              <ImageContainer>
                <img src={ImageDescription} alt="" style={{
                  height: "80%"
                }} />
              </ImageContainer>
            </FormContainer>

            {/* Línea divisoria gris */}
            <Divider style={{
              backgroundColor: "#e0e0e0", margin: "20px 0"
            }} />

            <PropertyForm
              formData={formData}
              setFormData={setFormData}
            />

            {/* Contenedor 5: Botón de enviar */}
            <ButtonContainer>
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={!isPropertyFormValid(formData)}
                style={{
                  marginTop: "20px"
                }}
              >
                  Publicar propiedad
              </Button>
            </ButtonContainer>
          </StyledCardContent>
        </StyledCard>
      </MainContainer>
      <Footer/>
    </PageWrapper>
  );
};

export default CreateProperty;
