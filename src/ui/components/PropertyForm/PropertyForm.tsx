import { Button, Card, CardMedia, Grid, IconButton, InputAdornment, TextField, Typography, useMediaQuery } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import SMSelect from "../SMSelect";
import { useDropzone } from "react-dropzone";
import { propertiesTypes } from "./helpers";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { isMobileMediaQuery, isNumber } from "../../../helpers";
import MapAddress from "./MapAddress";
import { useDebouncedCallback } from "use-debounce";
import { PropertyType } from "../../../models/property";
import { useAppSelector } from "../../../store/hooks";
import { selectDistricts } from "../../../store/properties/districtsSlice";

const StyledForm = styled.form`
  border-color: red;
`;

const StyledTextField = styled(TextField)`
  & .MuiInputBase-root {
    background-color: #fefefe;
  }
`;

const Select = styled(SMSelect)`
  width: 100%;
  
  & .MuiInputBase-root{
    height: 40px;
  } 
`;

const PreviewCard = styled(Card)`
  position: relative;
  max-width: 120px;
  max-height: 120px;
`;

const ImagePreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
`;

const DeleteButton = styled(IconButton)`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #ffffffD0;
  transition: background-color 0.3s ease-out;

  &:hover {
  background-color: #ffffff;
  }
`;

export interface FormPropertyData {
  beds: string;
  zipcode: string;
  bathrooms: string;
  country: string;
  city: string;
  state: string;
  district: string;
  rooms: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  images: string[];
  address: string;
  price: string;
  type: string;
  surface_covered: string;
  surface_total: string;
}

interface PropertyFormProps {
  setFormData: (formData: FormPropertyData) => void
  formData: FormPropertyData
}

const PropertyForm = ({ formData, setFormData }: PropertyFormProps) => {
  const districts = useAppSelector(selectDistricts);
  const isMobile = useMediaQuery(isMobileMediaQuery);

  const districtsOptions = districts.map(district => ({
    value: district,
    label: district
  }));

  const debouncedAddress = useDebouncedCallback(
    // function
    async (value: string) => {
      const result = await getGeocode({
        address: value + ", CABA Argentina"
      }); //get geocoding object
      const { lat, lng } = await getLatLng(result[0]);

      setFormData({
        ...formData,
        latitude: lat,
        longitude: lng
      });
    },
    // delay in ms
    1500
  );

  const setSelectedDistrict = (selectedDistrict: string) => {
    setFormData({
      ...formData,
      district: selectedDistrict
    });
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = formData.images.filter((_, imgIndex) => imgIndex !== index);
    setFormData({
      ...formData,
      images: updatedImages as string[]
    });
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

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": []
    },
    onDrop: handleDrop
  });

  const setSelectedPropertyType = (selectedPropertyType: string) => {
    setFormData({
      ...formData,
      type: selectedPropertyType as PropertyType
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericInputs = [
      "price",
      "surface_total",
      "surface_covered",
      "rooms",
      "beds",
      "bathrooms"
    ];

    if(numericInputs.includes(name) && !isNumber(value)) {
      return;
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const showMapMarker = formData.address.length !== 0;

  return (
    <StyledForm>
      {/* Contenedor 3: Todos los textfields en 2 columnas */}
      <Grid container spacing={2}>
        <Grid item xs={isMobile ? 12 : 6}>
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
        {!isMobile && <Grid item xs={6}></Grid>}

        <Grid item xs={6}>
          <Typography variant="body1" gutterBottom style={{
            marginBottom: "1px"
          }}>
            Precio <span>*</span>
          </Typography>
          <StyledTextField
            name="price"
            onChange={handleInputChange}
            value={formData.price}
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
            onChange={handleInputChange}
            value={formData.surface_total}
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
            onChange={handleInputChange}
            value={formData.surface_covered}
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
            onChange={handleInputChange}
            value={formData.rooms}
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
            onChange={handleInputChange}
            value={formData.beds}
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
            onChange={handleInputChange}
            value={formData.bathrooms}
            fullWidth
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
            value={formData.zipcode}
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(e);
              debouncedAddress(e.target.value);
            }}
            value={formData.address}
            fullWidth
            placeholder="Ej.: Reconquista 123"
          />
        </Grid>

        <Grid item xs={12}>
          <MapAddress addressCoordinates={{
            lat: formData.latitude,
            lng: formData.longitude
          }} showMarker={showMapMarker}/>
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
            value={formData.title}
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
            value={formData.description}
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

    </StyledForm>
  );
};

export default PropertyForm;
