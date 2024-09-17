describe("Página de Mis Publicaciones", () => {
  beforeEach(() => {
    cy.visit("/my-properties");
  });

  it("Verifica que la página de 'Mis Publicaciones' carga correctamente", () => {
    cy.get("h1").contains("Mis Publicaciones").should("be.visible");
  });

  it("Verifica que los inmuebles del usuario se muestran correctamente", () => {
    cy.get(".property-card").should("have.length.at.least", 1);
  });

  it("Verifica que un inmueble contiene los detalles correctos", () => {
    cy.get(".property-card").first().as("firstProperty");
    cy.get("@firstProperty").find("h4").should("not.be.empty");
    cy.get("@firstProperty").find("img").should("have.attr", "src").should("include", "image");
  });

  it("Simula un estado de carga de inmuebles (loading)", () => {
    cy.intercept("GET", "/api/my-properties", {
      statusCode: 200,
      delay: 1000,
      body: []
    }).as("getMyPropertiesLoading");
    cy.visit("/my-properties");
    cy.wait("@getMyPropertiesLoading");
    cy.get(".loading-skeleton").should("be.visible");
  });

  it("Simula un error al cargar inmuebles", () => {
    cy.intercept("GET", "/api/my-properties", {
      statusCode: 500
    }).as("getMyPropertiesError");
    cy.visit("/my-properties");
    cy.wait("@getMyPropertiesError");
    cy.get(".alert-error").should("be.visible").and("contain", "Ocurrió un error al mostrar sus favoritos");
  });
});
