describe("Página Home", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Verifica que el contenedor de 'Encontrá tu próximo hogar' está presente", () => {
    cy.get("h1").contains("Encontrá tu próximo hogar en Smart Move").should("be.visible");
  });

  it("Verifica que los filtros principales están presentes", () => {
    cy.get("form").should("exist");
    cy.get("button[type='submit']").contains("Buscar").should("be.visible");
  });

  it("Verifica que los inmuebles recientes se muestran", () => {
    cy.get("h2").contains("Inmuebles Publicados Recientemente").should("be.visible");
    cy.get(".property-card").should("have.length.at.least", 1);
  });

  it("Simula la búsqueda de inmuebles", () => {
    cy.get("select").select("APARTMENT");
    cy.get("button[type='submit']").click();
    cy.url().should("include", "/properties?type=APARTMENT");
  });
});
