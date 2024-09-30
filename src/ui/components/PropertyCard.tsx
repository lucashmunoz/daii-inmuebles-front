import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { getPropertyTypeNameByType } from "../../helpers";
import { PropertyType } from "../../models/property";
import { Link } from "react-router-dom";
import { paths } from "../../navigation/paths";

interface PropertyCardProps {
  orientation: "vertical" | "horizontal"
  id: string | number
  district: string
  image: string
  price: string
  rooms: number
  beds: number
  bathrooms: number
  surfaceTotal: number
  type: PropertyType
}

export const PropertyCard = ({ orientation, id, district, image, price, rooms, beds, bathrooms, surfaceTotal, type }: PropertyCardProps) => {
  const roomsText = `${rooms} ${rooms > 1 ? "ambs." : "amb."}`;
  const bedsText = `${beds} dorm.`;
  const bathroomsText = `${bathrooms} ${bathrooms > 1 ? "baños" : "baño"}`;
  const surfaceTotalText = `${surfaceTotal} m² tot.`;
  const propertype = getPropertyTypeNameByType(type).toUpperCase();

  const isHorizontal = orientation === "horizontal";

  const detailsPageLink = `${paths.properties}/${id}`;

  return (
    <Card
      key={id}
      sx={{
        width: isHorizontal ? "100%" : 220, height: 280,
        marginBottom: "6px"
      }}
    >
      <CardActionArea component={Link} to={detailsPageLink}>
        <CardMedia
          component="img"
          height="120"
          image={image}
          alt="inmueble publicado recientemente"
        />
        <CardContent sx={{
          height: 160, justifyContent: "space-between", display: "flex", flexDirection: "column", padding: "16px 20px"
        }}>
          <Typography variant="body2" sx={{
            color: "text.secondary", textAlign: "left", paddingBottom: "8px"
          }}>
            {propertype} EN ALQUILER
          </Typography>
          <Typography gutterBottom variant="h4" component="div">
              ${price}
          </Typography>
          <Typography variant="body1" sx={{
            color: "text.secondary"
          }}>
            {surfaceTotalText}
          </Typography>
          <Typography variant="body1" sx={{
            color: "text.secondary"
          }}>
            {roomsText} | {bedsText} | {bathroomsText}
          </Typography>
          <Typography variant="body2" sx={{
            color: "text.secondary", textAlign: "right"
          }}>
            {district}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

