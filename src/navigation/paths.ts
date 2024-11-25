export const paths = {
  home: "/",
  properties: "/properties",
  myProperties: "/myproperties",
  myContracts: "/mycontracts",
  createProperty: "/createproperty",
  bookmarks: "/bookmarks"
} as const;

export const modules = {
  usuarios: "http://usuarios.smartmove.com.ar/login",
  usuariosMiPerfil: "http://usuarios.smartmove.com.ar/userProfile",
  logisticaHome: "http://logistica.smartmove.com.ar",
  logisticaReservarVisitasInquilino: "http://logistica.smartmove.com.ar/reservar-visita",
  logisticaAdministrarVisitasPropietario: "http://logistica.smartmove.com.ar/administrar-visitas",
  logisticaCargarMudanza: "http://logistica.smartmove.com.ar/administrar-mudanza",
  legales: "http://legales.smartmove.com.ar"
} as const;
