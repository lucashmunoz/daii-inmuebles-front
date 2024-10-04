import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Property } from "../../../models/property";
import { formatNumberToCurrency, getPropertyTypeNameByType } from "../../../helpers";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../../navigation/paths";
import { Box, Button, Divider, FormControlLabel, Modal, Switch } from "@mui/material";
import { useState } from "react";

const DesktopCardContentWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const CardDetailsContainer = styled.div`
 height: 100%;
 width: 100%;
 justify-content: space-between;
 align-content: space-between;
 display: flex;
 flex-direction: row;
 padding: 16px;
`;

const PropertyDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const CardDataRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 8px;

  @media only screen and (min-width: 600px) {
    flex-direction: column;
    justify-content: space-between;
  }
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

const DeleteModal = (
  {
    isOpen,
    onClose,
    handleDelete
  }: {
    isOpen: boolean,
    onClose: () => void,
    handleDelete: () => void
  }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
    >
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        borderRadius: "8px"
      }}>
        <Typography variant="h6" component="h2" fontWeight={700}
          sx={{
            p: 1,
            backgroundColor: "other.A100",
            borderRadius: "8px"
          }}>
        ¿Eliminar publicación?
        </Typography>
        <Divider />
        <Typography sx={{
          p: 1
        }}>
        Esta acción no puede deshacerse.
        </Typography>
        <Divider />
        <Box sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 1,
          gap: 2
        }}>
          <Button onClick={onClose} variant="outlined" color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} variant="contained" sx={{
            color: "white",
            backgroundColor: "error.darker"
          }}
          >
            Eliminar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

interface PropertyCardProps {
  orientation: "vertical" | "horizontal"
  property: Property
  isToggleLoading: boolean
  handlePropertyStatusChange: (property: Property, newStatus: boolean) => void
  handleDeleteProperty: (propertyId: number, page: number) => void
  page: number
}

const MyPropertyCard = ({ orientation, property, isToggleLoading, handlePropertyStatusChange, handleDeleteProperty, page }: PropertyCardProps) => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { id, images, price, district, type, active } = property;

  const image = images[0];
  const formattedPrice = formatNumberToCurrency({
    number: price
  });

  const propertyType = getPropertyTypeNameByType(type).toUpperCase();
  const isHorizontal = orientation === "horizontal";

  const detailsPageLink = `${paths.properties}/${id}`;

  const handleEditClick = () => {
    navigate(`${paths.myProperties}/edit/${id}`);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  if(isHorizontal) {
    return (
      <>
        <Card
          key={id}
          sx={{
            maxWidth: 1024,
            width: "100%",
            height: 180
          }}
        >
          <CardActionArea component={Link} to={detailsPageLink} sx={{
            width: "100%",
            height: "100%"
          }}>
            <DesktopCardContentWrapper>
              <CardMedia
                component="img"
                height="100%"
                sx={{
                  width: 270
                }}
                image={image}
                alt="inmueble publicado recientemente"
              />
              <CardContent sx={{
                width: "100%", height: "100%"
              }}>
                <CardDetailsContainer>
                  <PropertyDetails>
                    <Typography variant="body2" sx={{
                      color: "text.secondary", textAlign: "left", paddingBottom: "8px"
                    }}>
                      {propertyType}
                    </Typography>
                    <Typography gutterBottom variant="h4" component="div">
                  ${formattedPrice}
                    </Typography>
                    <Typography variant="body2" sx={{
                      color: "text.secondary"
                    }}>
                      {district}
                    </Typography>
                  </PropertyDetails>

                  <ActionsContainer>
                    <Button
                      onMouseDown={e => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleEditClick();
                      }}
                    >
                    Editar
                    </Button>

                    {
                      isToggleLoading
                        ? <SpinnerContainer>
                          <Spinner />
                        </SpinnerContainer>
                        : <FormControlLabel
                          control={<Switch defaultChecked={active} />}
                          label={active ? "Pausar" : "Activar"}
                          checked={active}
                          onMouseDown={e => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            handlePropertyStatusChange(property, !active);
                          }}
                        />
                    }

                    <Button
                      onMouseDown={e => e.stopPropagation()}
                      sx={{
                        color: "error.main",
                        "&:hover": {
                          color: "error.darker"
                        }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        openDeleteModal();
                      }}
                    >
                    Eliminar
                    </Button>
                  </ActionsContainer>

                </CardDetailsContainer>
              </CardContent>
            </DesktopCardContentWrapper>
          </CardActionArea>
        </Card>
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          handleDelete={() => handleDeleteProperty(id, page)}
        />
      </>

    );
  }

  return (
    <>
      <Card
        key={id}
        sx={{
          width: "100%"
        }}
      >
        <CardActionArea component={Link} to={detailsPageLink} sx={{
          width: "100%",
          height: "100%"
        }}>
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
              {propertyType} ALQUILADO
            </Typography>
            <Typography gutterBottom variant="h4" component="div">
              ${formattedPrice}
            </Typography>
            <CardDataRow>
              <Typography variant="body2" sx={{
                color: "text.secondary"
              }}>
                {district}
              </Typography>

              <ActionsContainer>
                <Button
                  onMouseDown={e => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleEditClick();
                  }}
                >
                Editar
                </Button>

                {
                  isToggleLoading
                    ? <SpinnerContainer><Spinner /></SpinnerContainer>
                    : <FormControlLabel
                      control={<Switch defaultChecked={active} />}
                      label={active ? "Pausar" : "Activar"}
                      checked={active}
                      onMouseDown={e => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handlePropertyStatusChange(property, !active);
                      }}
                    />
                }
              </ActionsContainer>

            </CardDataRow>
          </CardContent>
        </CardActionArea>
      </Card>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        handleDelete={() => handleDeleteProperty(id, page)}
      />
    </>

  );
};

export default MyPropertyCard;
