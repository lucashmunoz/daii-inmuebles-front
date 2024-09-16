import { ReactElement } from "react";
import styled from "styled-components";
import LocalHotelOutlinedIcon from "@mui/icons-material/LocalHotelOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";

const MainWrapper = styled.main`
  display: flex;
  max-width: 1280px;
  margin: 0 auto;
  padding: 16px;
  gap: 20px;
  flex-direction: column;
  @media only screen and (min-width: 600px) {
    flex-direction: row;
  }
  border: 1px solid red;
`;

const PropertyDescriptionContainer = styled.div`
    flex: 3;
    border: 1px solid blue;
`;

const PropertyCharacContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
  border: 1px solid red;
`;

const PropertyCharacteristics = styled.div`
  font-size: 18px;
  color: #000;
  display: flex;
  gap: 8px;
  align-items: center;
`;

const PropertySecondaryDetails = (): ReactElement => {
  return (
    <MainWrapper>

      <PropertyDescriptionContainer>
        <h2> Descripcion</h2>
        <p> DEPARTAMENTO 3 AMBIENTES NUÑEZ ALQUILER<br/>MUY LUMINOSO - BALCON FRANCES 2 Dormitorios - Pisos de parquet Cocina y Lavadero independiente Losa radiante<br/>EXCELENTE UBICACIÓN  A METROS DE AV. DEL LIBERTADOR ESTACION NUÑEZ (TREN) A CUADRAS<br/>OPORTUNIDAD!!!!!!!<br/>CONDICIONES DE ALQUILER:<br/>Contrato 36 meses.<br/>1 mes de adelanto <br/>1 mes de depósito <br/>Recibos de sueldo / Ingresos demostrables.<br/>El valor de alquiler no incluye impuestos.<br/>Garantía propietaria CABA - PROVINCIA<br/>NO ACEPTA MASCOTAS<br/>*IMPORTANTE : Les sugerimos si está interesado en dicha propiedad que nos envíe un mail a  con la siguiente información foto DNI, RECIBO DE SUELDO/MONOTRIBUTO, TITULO DE LA PROPIEDAD EN GARANTIA, o Pre Aprobación de Seguro de caución para poder ir avanzando con la operación.<br/><br/>Llame ya para coordinar una visita !!!<br/><br/><br/>“Para los casos de alquiler de vivienda, el monto máximo de comisión que se le puede requerir a los propietarios será el equivalente al cuatro con quince centésimos por ciento (4,15%) del valor total del respectivo contrato. Se encuentra prohibido cobrar a los inquilinos que sean personas físicas comisiones inmobiliarias y gastos de gestoría de informes”.<br/><br/>AMPLIA DISPONIBILIDAD HORARIA PARA VISITARLO.<br/>INDICAR EN SU CONSULTA EL DÍA Y HORA QUE DESEA COORDINAR LA VISITA.  <br/><br/>Se aceptan propiedades en parte pago, permuta.<br/>Propiedad no condicionada a la compra. Operaciones simultaneas. <br/><br/>Tasaciones profesionales.<br/>Vivir Propiedades - Desde 1985 -  MATRICULA CUCICBA N° 189<br/>Horarios de atención en Of: Lunes a Viernes de 10 a 13 Hs.  y de 16 a 20 Hs. Sábados de 10 a 13 Hs.<br/>MOSTRAMOS DE LUNES A LUNES COORDINANDO HORARIOS </p>
      </PropertyDescriptionContainer>

      <PropertyCharacContainer>

        <h2> Caracteristicas</h2>

        <PropertyCharacteristics>
          <LocalHotelOutlinedIcon/>
          <p> 2 dormitorios</p>
        </PropertyCharacteristics>

        <PropertyCharacteristics>
          <BathtubOutlinedIcon/>
          <p> 1 Baño</p>
        </PropertyCharacteristics>

        <PropertyCharacteristics>
          <OpenInNewOutlinedIcon/>
          <p> 1 ambiente</p>
        </PropertyCharacteristics>

        <PropertyCharacteristics>
          <Inventory2OutlinedIcon/>
          <p> 1 baulera</p>
        </PropertyCharacteristics>

        <PropertyCharacteristics>
          <p> 60m² cubiertos</p>
        </PropertyCharacteristics>

        <PropertyCharacteristics>
          <p> 82m² totales</p>
        </PropertyCharacteristics>

      </PropertyCharacContainer>
    </MainWrapper>
  );
};

export default PropertySecondaryDetails;
