
import styled from "styled-components";
import { useAppSelector } from "../../../store/hooks";
import { selectIsPropertiesError, selectLoadingProperties, selectProperties, selectTotalPropertiesPages } from "../../../store/properties/propertiesSlice";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import Alert from "@mui/material/Alert";
import { formatNumberToCurrency, isMobileMediaQuery } from "../../../helpers";
import { PropertyCard } from "../../components/PropertyCard";
import { Pagination, useMediaQuery } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const PropertiesContainer = styled.div`
  display: flex; 
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
`;

const PropertiesListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 24px;
`;

interface PropertiesProps {
  handlePageChange: (page: number) => void
  handleDeleteProperty: (propertyId: number) => void
}

const Properties = ({ handlePageChange, handleDeleteProperty }:PropertiesProps) => {
  const [filtersParams] = useSearchParams();

  const properties = useAppSelector(selectProperties);
  const loadingProperties = useAppSelector(selectLoadingProperties);
  const isPropertiesError = useAppSelector(selectIsPropertiesError);
  const totalPropertiesPages = useAppSelector(selectTotalPropertiesPages);

  const currentPage = Number(filtersParams.get("page")) || 1;

  const isMobile = useMediaQuery(isMobileMediaQuery);

  if (loadingProperties) {
    return (
      <LoadingSkeleton />
    );
  }

  if (isPropertiesError) {
    return (
      <Alert severity="error">
          Ocurrió un error al mostrar los inmuebles.
      </Alert>
    );
  }

  if (properties.length === 0) {
    return (
      <Alert severity="info">
        No se encontraron inmuebles para esos criterios de búsqueda
      </Alert>
    );
  }
  return (
    <PropertiesContainer>
      <PropertiesListWrapper>
        {
          properties.map(property => {
            const { id, images, price, district, rooms, surface_total, beds, bathrooms, type, deleteEnabled = false } = property;
            const image = images[0];
            const formattedPrice = formatNumberToCurrency({
              number: price
            });

            return (
              <PropertyCard
                key={id}
                orientation={isMobile ? "horizontal" : "vertical"}
                id={id}
                image={image}
                district={district}
                price={formattedPrice}
                rooms={rooms}
                beds={beds}
                bathrooms={bathrooms}
                surfaceTotal={surface_total}
                type={type}
                showDeleteButton={deleteEnabled}
                handleDeleteProperty={() => handleDeleteProperty(id)}
              />
            );
          })
        }
      </PropertiesListWrapper>
      <Pagination
        count={totalPropertiesPages}
        color="primary"
        onChange={(_, page) => handlePageChange(page)}
        defaultPage={currentPage}
      />
    </PropertiesContainer>

  );
};

export default Properties;
