import { Card, CardContent, CardMedia, Typography } from "@mui/material";

interface Property {
    id: number;
    price: string;
    location: string;
    lat: number;
    lng: number;
    image: string;
}

interface Props {
    property: Property;
    onClick: (property: Property) => void;
}

function SearchPropertiesCards({ property, onClick }: Props) {
  return (
    <Card
      sx={{
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)"
        }
      }}
      onClick={() => onClick(property)}
      role="button"
      tabIndex={0}
    >
      <CardMedia
        component="img"
        height="140"
        image={property.image}
        alt={`Imagen de la propiedad en ${property.location}`}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {property.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {property.location}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SearchPropertiesCards;
