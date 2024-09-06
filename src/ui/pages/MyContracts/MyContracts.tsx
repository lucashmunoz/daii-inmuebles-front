import { useMediaQuery } from "@mui/material";
import { formatNumberToCurrency, isMobileMediaQuery } from "../../../helpers";
import Header from "../../components/Header";
import PageWrapper from "../../components/PageWrapper";
import ContractCard from "./ContractCard";
import { PropertyContractStatus, PropertyType } from "../../../models/property";
import styled from "styled-components";

const ContractsContainer = styled.div`
  padding: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

type ContractsList = Array<
  {
    id: string | number
    district: string
    images: string[]
    price: number
    type: PropertyType
    currentState: PropertyContractStatus
  }
>

const contracts: ContractsList = [
  {
    id: 0,
    district: "Puerto Madero",
    images: ["https://imgar.zonapropcdn.com/avisos/1/00/54/35/30/04/360x266/1928978716.jpg?isFirstImage=true"],
    price: 500,
    type: "APARTMENT",
    currentState: "VENCIDO"
  },
  {
    id: 1,
    district: "Flores",
    images: ["https://imgar.zonapropcdn.com/avisos/1/00/54/35/30/04/360x266/1928978716.jpg?isFirstImage=true"],
    price: 500,
    type: "HOUSE",
    currentState: "AL_DIA"
  }
];

const MyContracts = () => {
  const isMobile = useMediaQuery(isMobileMediaQuery);

  return (
    <PageWrapper>
      <Header />
      <ContractsContainer>
        {
          contracts.map(contract => {
            const { id, images, price, district, type, currentState } = contract;
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
                currentState={currentState}
              />
            );
          })
        }
      </ContractsContainer>

    </PageWrapper>
  );
};

export default MyContracts;
