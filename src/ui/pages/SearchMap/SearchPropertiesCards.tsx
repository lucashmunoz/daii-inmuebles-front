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
    <div
      style={{
        marginBottom: "10px",
        padding: "10px",
        border: "1px solid #ddd",
        cursor: "pointer",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#fff",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s, box-shadow 0.2s"
      }}
      onClick={() => onClick(property)}
      onKeyDown={() => onClick(property)}
      role="button"
      tabIndex={0}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0px 6px 12px rgba(0, 0, 0, 0.15)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)"; }}
    >
      <img
        src={property.image}
        alt={`Imagen de la propiedad en ${property.location}`}
        style={{
          width: "100px", height: "100px", marginRight: "15px", borderRadius: "4px", marginLeft: "4px" 
        }}
      />
      <div>
        <h3 style={{
          fontSize: "1.1em", margin: 0, color: "#333" 
        }}>{property.price}</h3>
        <p style={{
          fontSize: "0.9em", margin: 0, color: "#666" 
        }}>{property.location}</p>
      </div>
    </div>
  );
}

export default SearchPropertiesCards;
