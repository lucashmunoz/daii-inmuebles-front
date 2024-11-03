import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { getPropertyTypeNameByType } from "../../helpers";
import { PropertyType } from "../../models/property";
import { Link } from "react-router-dom";
import { paths } from "../../navigation/paths";
import DeletePropertyModal from "./DeletePropertyModal";
import { useState } from "react";
import styled from "styled-components";
import { noop } from "lodash";

const DeleteButton = styled.button`
  position: absolute;
  top: 4px;
  right: 8px;
  z-index: 1;

  width: 28px;
  height: 28px;

  cursor: pointer;
  background: #b2b2b2;
  border: 3px black solid;;
  border-radius: 50%;

  font-weight: 600;
  font-size: 18px;
  color: black;
`;

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
  showDeleteButton: boolean
  handleDeleteProperty?: () => void
}

export const PropertyCard = ({ orientation, id, district, image, price, rooms, beds, bathrooms, surfaceTotal, type, showDeleteButton = false, handleDeleteProperty = noop }: PropertyCardProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const roomsText = `${rooms} ${rooms > 1 ? "ambs." : "amb."}`;
  const bedsText = `${beds} dorm.`;
  const bathroomsText = `${bathrooms} ${bathrooms > 1 ? "baños" : "baño"}`;
  const surfaceTotalText = `${surfaceTotal} m² tot.`;
  const propertype = getPropertyTypeNameByType(type).toUpperCase();

  const isHorizontal = orientation === "horizontal";

  const detailsPageLink = `${paths.properties}/${id}`;

  return (
    <>
      <Card
        key={id}
        sx={{
          width: isHorizontal ? "100%" : 220, height: 280,
          marginBottom: "6px",
          position: "relative"
        }}
      >
        {showDeleteButton && (
          <DeleteButton
            aria-label="eliminar publicacion"
            onClick={() => setIsDeleteModalOpen(true)}
          >
          X
          </DeleteButton>
        )}
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

      <DeletePropertyModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        handleDelete={handleDeleteProperty}
      />
    </>

  );
};

