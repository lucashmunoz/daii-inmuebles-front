import { TextField, Button, Typography, Card, Grid, InputAdornment, Divider, CardMedia, CardContent, IconButton } from "@mui/material";
import styled from "styled-components";
import Header from "../../components/Header";
import { useDebounce } from "use-debounce";
import PageWrapper from "../../components/PageWrapper";
import { PropertyType, Property } from "../../../models/property";
import ImageDescription from "../../../assets/property-create-image.svg";
import { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import DeleteIcon from "@mui/icons-material/Close";
import MapAddress from "./MapAddress";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { Coordinates } from "../../../models/address";
import SMSelect from "../../components/SMSelect";
import { fetchDistricts, selectDistricts } from "../../../store/properties/districtsSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getPropertyTypeNameByType } from "../../../helpers";
import { createNewProperty } from "../../../store/properties/propertiesSlice";

const CABA_CENTER_LAT = -34.6144806;
const CABA_CENTER_LNG = -58.4464348;

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

const StyledTextField = styled(TextField)`
  & .MuiInputBase-root {
    background-color: #fefefe;
  }
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

const StyledForm = styled.form`
  border-color: red;
`;

const ImagePreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
`;

const PreviewCard = styled(Card)`
  position: relative;
  max-width: 120px;
  max-height: 120px;
`;

const DeleteButton = styled(IconButton)`
  position: absolute;
  top: -5px;
  right: -5px;
`;

const Select = styled(SMSelect)`
  width: 100%;
  
  & .MuiInputBase-root{
    height: 40px;
  } 
`;

type PropertiesTypes = Array<
  {
    value: PropertyType,
    label: string
  }
>

const propertiesTypes: PropertiesTypes = [
  {
    value: "APARTMENT",
    label: getPropertyTypeNameByType("APARTMENT")
  },
  {
    value: "HOUSE",
    label: getPropertyTypeNameByType("HOUSE")
  },
  {
    value: "PH",
    label: getPropertyTypeNameByType("PH")
  }
];

const CreateProperty = () => {
  const dispatch = useAppDispatch();

  const districts = useAppSelector(selectDistricts);

  const districtsOptions = useMemo(() => {
    return districts.map(district => ({
      value: district,
      label: district
    }));
  }, [districts]);

  const setSelectedDistrict = (selectedDistrict: string) => {
    setFormData({
      ...formData,
      district: selectedDistrict
    });
  };

  const setSelectedPropertyType = (selectedPropertyType: string) => {
    setFormData({
      ...formData,
      type: selectedPropertyType as PropertyType
    });
  };

  const [formData, setFormData] = useState<Property>({
    id: 0,
    beds: 1,
    active: true,
    favorite: false,
    zipcode: "",
    bathrooms: 1,
    country: "Argentina",
    city: "Ciudad Autonoma de Buenos Aires",
    state: "Buenos Aires",
    district: "",
    rooms: 1,
    title: "",
    description: "",
    latitude: 0,
    longitude: 0,
    images: [],
    address: "",
    price: 0,
    garages: 0,
    type: "",
    surface_covered: 0,
    surface_total: 0,
    created_at: ""
  });
  const [addressCoordinates, setAddressCoordinates] = useState<Coordinates>({
    lat: CABA_CENTER_LAT,
    lng: CABA_CENTER_LNG
  });
  const [debouncedAddressCoordinates] = useDebounce(addressCoordinates, 1500, {
    maxWait: 2000
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const showMapMarker = formData.address.length !== 0 && addressCoordinates.lat === debouncedAddressCoordinates.lat && addressCoordinates.lng === debouncedAddressCoordinates.lng;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(createNewProperty({
      property: formData
    }));
  };

  const handleDrop = (acceptedFiles: File[]) => {
    Promise.all(
      acceptedFiles.map(
        (acceptedFile) =>{
          const reader = new FileReader();
          reader.readAsDataURL(acceptedFile as Blob);

          return new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
          });
        }
      )
    ).then((base64Images) => {
      setFormData({
        ...formData,
        images: [...formData.images, ...base64Images as string[]]
      });
    });
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = formData.images.filter((_, imgIndex) => imgIndex !== index);
    setFormData({
      ...formData,
      images: updatedImages as string[]
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": []
    },
    onDrop: handleDrop
  });

  const handleAddressChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const result = await getGeocode({
      address: value + ", CABA"
    }); //get geocoding object
    const { lat, lng } = await getLatLng(result[0]);
    setAddressCoordinates({
      lat, lng
    });

    setFormData({
      ...formData,
      address: value,
      latitude: lat,
      longitude: lng
    });
  };

  useEffect(() => {
    dispatch(fetchDistricts());
  }, [dispatch]);

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

            <StyledForm onSubmit={handleSubmit}>
              {/* Contenedor 3: Todos los textfields en 2 columnas */}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body1" gutterBottom style={{
                    marginBottom: "1px"
                  }}>
                  Tipo de propiedad
                  </Typography>
                  <Select
                    id="select-property-type"
                    options={propertiesTypes}
                    selectedOption={formData.type}
                    setSelectedOption={setSelectedPropertyType}
                    placeholder="Tipo de Propiedad"
                  />
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body1" gutterBottom style={{
                    marginBottom: "1px"
                  }}>
                  Precio <span>*</span>
                  </Typography>
                  <StyledTextField
                    name="price"
                    type="number"
                    onChange={handleInputChange}
                    fullWidth
                    inputProps={{
                      min: 0
                    }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      endAdornment: <InputAdornment position="end">por mes</InputAdornment>
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body1" gutterBottom style={{
                    marginBottom: "1px"
                  }}>
                  Superficie total <span>*</span>
                  </Typography>
                  <StyledTextField
                    name="surface_total"
                    type="number"
                    onChange={handleInputChange}
                    fullWidth
                    inputProps={{
                      min: 0
                    }}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">m²</InputAdornment>
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body1" gutterBottom style={{
                    marginBottom: "1px"
                  }}>
                  Superficie cubierta <span>*</span>
                  </Typography>
                  <StyledTextField
                    name="surface_covered"
                    type="number"
                    onChange={handleInputChange}
                    fullWidth
                    inputProps={{
                      min: 0
                    }}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">m²</InputAdornment>
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body1" gutterBottom style={{
                    marginBottom: "1px"
                  }}>
                  Ambientes <span>*</span>
                  </Typography>
                  <StyledTextField
                    name="rooms"
                    type="number"
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body1" gutterBottom style={{
                    marginBottom: "1px"
                  }}>
                  Dormitorios <span>*</span>
                  </Typography>
                  <StyledTextField
                    name="beds"
                    type="number"
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body1" gutterBottom style={{
                    marginBottom: "1px"
                  }}>
                  Baños <span>*</span>
                  </Typography>
                  <StyledTextField
                    name="bathrooms"
                    type="number"
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body1" gutterBottom style={{
                    marginBottom: "1px"
                  }}>
                  Cocheras <span>*</span>
                  </Typography>
                  <StyledTextField
                    name="garages"
                    type="number"
                    onChange={handleInputChange}
                    fullWidth
                    placeholder="Si no tiene cocheras, indica 0."
                  />
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body1" gutterBottom style={{
                    marginBottom: "1px"
                  }}>
                  Barrio <span>*</span>
                  </Typography>
                  <Select
                    id="select-district"
                    options={districtsOptions}
                    selectedOption={formData.district}
                    setSelectedOption={setSelectedDistrict}
                    placeholder="Barrio"
                  />
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body1" gutterBottom style={{
                    marginBottom: "1px"
                  }}>
                  Código Postal <span>*</span>
                  </Typography>
                  <StyledTextField
                    name="zipcode"
                    type="text"
                    onChange={handleInputChange}
                    fullWidth
                    placeholder="Código Postal"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body1" gutterBottom style={{
                    marginBottom: "1px"
                  }}>
                  Dirección <span>*</span>
                  </Typography>
                  <StyledTextField
                    name="address"
                    onChange={handleAddressChange}
                    fullWidth
                    placeholder="Ej.: Reconquista 123"
                  />
                </Grid>

                <Grid item xs={12}>
                  <MapAddress addressCoordinates={debouncedAddressCoordinates} showMarker={showMapMarker}/>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body1" gutterBottom style={{
                    marginBottom: "1px"
                  }}>
                  Título <span>*</span>
                  </Typography>
                  <StyledTextField
                    name="title"
                    onChange={handleInputChange}
                    multiline
                    fullWidth
                    placeholder="Ej.: Casa remolada con jardín, cercana al subte."
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body1" gutterBottom style={{
                    marginBottom: "1px"
                  }}>
                  Descripción
                  </Typography>
                  <StyledTextField
                    name="description"
                    onChange={handleInputChange}
                    multiline
                    rows={4}
                    fullWidth
                    placeholder="Escribí mas detalles del inmueble."
                  />
                </Grid>

              </Grid>

              {/* Contenedor 4: Subir imágenes */}
              <Typography variant="h6" gutterBottom style={{
                marginTop: "20px"
              }}>
              Subir imágenes
              </Typography>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Button variant="contained" color="primary">
                Seleccionar imágenes
                </Button>
              </div>

              <ImagePreview>
                {formData.images.map((image, index) => (
                  <PreviewCard key={image}>
                    <CardMedia
                      component="img"
                      image={image}
                      title={`Imagen ${index + 1}`}
                    />
                    <DeleteButton
                      aria-label="delete"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <DeleteIcon />
                    </DeleteButton>
                  </PreviewCard>
                ))}
              </ImagePreview>

              {/* Contenedor 5: Botón de enviar */}
              <ButtonContainer>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{
                    marginTop: "20px"
                  }}
                >
                Publicar propiedad
                </Button>
              </ButtonContainer>
            </StyledForm>
          </StyledCardContent>
        </StyledCard>
      </MainContainer>
    </PageWrapper>
  );
};

export default CreateProperty;
