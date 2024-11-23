import { useEffect, useState } from "react";
import { Alert, Box, useMediaQuery } from "@mui/material";
import { formatNumberToCurrency, getRentProcessStatusNameByStatus, getRentStatusNameByStatus, isMobileMediaQuery } from "../../../helpers";
import ContractCard from "./ContractCard";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchRentals, selectRentals, selectRentalStatus, selectRentalProcesses } from "../../../store/properties/rentalsSlice";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import SMSelect from "../../components/SMSelect";
import { UserRoleType } from "../../../models/rentals";

const ContractsContainer = styled.main`
  padding: 16px;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;  
  min-height: 100vh;
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

type UserRoleTypes = Array<
  {
    value: UserRoleType,
    label: string
  }
>
const userRoleTypes: UserRoleTypes = [
  {
    value: "TENANT",
    label: "Inquilino"
  },
  {
    value: "OWNER",
    label: "Propietario"
  }
];

const Contracts = () => {
  const dispatch = useAppDispatch();

  const isMobile = useMediaQuery(isMobileMediaQuery);
  const rentalsStatus = useAppSelector(selectRentalStatus);
  const rentals = useAppSelector(selectRentals);
  const rentProcesses = useAppSelector(selectRentalProcesses);

  const [userRole, setUserRole] = useState<UserRoleType>("TENANT");

  useEffect(() => {
    dispatch(fetchRentals({
      role: userRole
    }));
  }, [dispatch, userRole]);

  const UserRoleSelect = () => {
    return(
      <Box sx={{}}>
        <SMSelect
          id="select-user-rol"
          options={userRoleTypes}
          selectedOption={userRole}
          setSelectedOption={(value) => setUserRole(value as UserRoleType)}
        />
      </Box>

    );
  };

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
        <h1>Mis contratos</h1>
        <UserRoleSelect />
        <Alert severity="error">
          Ocurrió un error al mostrar sus contratos.
        </Alert>
      </ContractsContainer>
    );
  }

  return (
    <ContractsContainer>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <h1>Mis contratos</h1>
        <UserRoleSelect />
      </Box>

      <ContractsSection>
        <SectionTitle>Mis contratos en proceso</SectionTitle>
        {
          rentProcesses.length === 0
            ? <Alert severity="info">No tienes contratos en proceso.</Alert>
            : rentProcesses.map(contract => {
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
                  key={id}
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

          rentals.length === 0
            ? <Alert severity="info">No tienes contratos activos.</Alert>
            : rentals.map(contract => {
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
                  isFurnitureMoveStatus={status === "CANCELLED_PENDING_LOGISTIC"}
                />
              );
            })
        }

      </ContractsSection>

    </ContractsContainer>
  );
};

export default Contracts;
