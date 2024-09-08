import { useState } from "react";
import Header from "../../components/Header";
import PageWrapper from "../../components/PageWrapper";
import SelectPropertyType from "../../components/SelectPropertyType";
import { TextField, Button, Grid, Card, CardContent, Typography } from "@mui/material";

const CreateProperty = () => {
  const [selectedPropertyType, setSelectedPropertyType] = useState<PropertyType>("APARTMENT");

  const [formData, setFormData] = useState({
    beds: 1,
    bathrooms: 1,
    district: "",
    city: "",
    rooms: 1,
    title: "",
    description: "",
    latitude: 0,
    longitude: 0,
    images: [""],
    address: "",
    price: 0,
    type: selectedPropertyType,
    currency: "",
    surface_covered: 0,
    surface_total: 0
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <PageWrapper>
      <Header />

      <Grid container justifyContent="center" style={{
        marginTop: "20px"
      }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Completar las características del inmueble
              </Typography>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  {/* SelectPropertyType Component */}
                  <Grid item xs={12}>
                    <SelectPropertyType
                      selectedPropertyType={selectedPropertyType}
                      setSelectedPropertyType={setSelectedPropertyType}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      label="Superficie total"
                      name="surface_total"
                      value={formData.surface_total}
                      onChange={handleInputChange}
                      fullWidth
                      size="small"
                      required
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      label="Superficie cubierta"
                      name="surface_covered"
                      value={formData.surface_covered}
                      onChange={handleInputChange}
                      fullWidth
                      size="small"
                      required
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      label="Ambientes"
                      name="rooms"
                      value={formData.rooms}
                      onChange={handleInputChange}
                      fullWidth
                      size="small"
                      required
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      label="Dormitorios"
                      name="beds"
                      value={formData.beds}
                      onChange={handleInputChange}
                      fullWidth
                      size="small"
                      required
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      label="Baños"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleInputChange}
                      fullWidth
                      size="small"
                      required
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      label="Cocheras"
                      name="garages"
                      value={formData.garages}
                      onChange={handleInputChange}
                      fullWidth
                      size="small"
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Dirección"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      fullWidth
                      size="small"
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Descripción"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      multiline
                      rows={4}
                      fullWidth
                      size="small"
                      required
                    />
                  </Grid>

                  <Grid item xs={12} style={{
                    textAlign: "center"
                  }}>
                    <Button type="submit" variant="contained" color="primary">
                      Enviar
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default CreateProperty;
