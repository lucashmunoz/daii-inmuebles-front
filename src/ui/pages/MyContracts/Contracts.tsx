import { useEffect } from "react";
import { Alert, useMediaQuery } from "@mui/material";
import { formatNumberToCurrency, getRentProcessStatusNameByStatus, getRentStatusNameByStatus, isMobileMediaQuery } from "../../../helpers";
import ContractCard from "./ContractCard";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchRentals, selectRentals, selectRentalsStatus, selectRentalProcesses } from "../../../store/properties/rentalsSlice";
import LoadingSkeleton from "../../components/LoadingSkeleton";

const ContractsContainer = styled.main`
  padding: 16px;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const ContractsSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const SectionTitle = styled.h2`
  width: 100%;
  text-align: left;
`;

const Contracts = () => {
  const dispatch = useAppDispatch();

  const isMobile = useMediaQuery(isMobileMediaQuery);
  const rentalsStatus = useAppSelector(selectRentalsStatus);
  const rentals = useAppSelector(selectRentals);
  const rentProcesses = useAppSelector(selectRentalProcesses);

  console.log(rentProcesses);

  useEffect(() => {
    dispatch(fetchRentals({
      role: "TENANT"
    }));
  }, [dispatch]);

  if (rentalsStatus === "LOADING") {
    return (
      <ContractsContainer>
        <LoadingSkeleton />
      </ContractsContainer>
    );
  }

  if (rentalsStatus === "ERROR") {
    return (
      <ContractsContainer>
        <Alert severity="error">
          Ocurrio un error al mostrar sus contratos.
        </Alert>
      </ContractsContainer>
    );
  }

  return (
    <ContractsContainer>
      <h1>Mis contratos</h1>
      <ContractsSection>
        <SectionTitle>Mis contratos en proceso</SectionTitle>
        {
          rentProcesses.map(contract => {
            const { id, property, status } = contract;
            const { images, price, district, type } = property;
            const image = images[0];
            const formattedPrice = formatNumberToCurrency({
              number: price
            });

            return (
              <ContractCard
                orientation={isMobile ? "vertical" : "horizontal"}
                id={id}
                district={district}
                image={image}
                price={formattedPrice}
                type={type}
                currentStatus={getRentProcessStatusNameByStatus(status)}
              />
            );
          })
        }
      </ContractsSection>

      <ContractsSection>
        <SectionTitle>Mis contratos activos</SectionTitle>
        {
          rentals.map(contract => {
            const { id, property, status } = contract;
            const { images, price, district, type } = property;
            const image = images[0];
            const formattedPrice = formatNumberToCurrency({
              number: price
            });

            return (
              <ContractCard
                orientation={isMobile ? "vertical" : "horizontal"}
                id={id}
                district={district}
                image={image}
                price={formattedPrice}
                type={type}
                currentStatus={getRentStatusNameByStatus(status)}
              />
            );
          })
        }
      </ContractsSection>

    </ContractsContainer>
  );
};

export default Contracts;
