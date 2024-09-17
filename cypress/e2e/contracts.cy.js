describe("Página de Mis Contratos", () => {
  beforeEach(() => {
    cy.visit("/my-contracts");
  });

  it("Verifica que la página de 'Mis Contratos' carga correctamente", () => {
    cy.get("h1").contains("Mis contratos").should("be.visible");
  });

  it("Verifica que los contratos en proceso se muestran correctamente", () => {
    cy.get("h2").contains("Mis contratos en proceso").should("be.visible");
    cy.get(".contract-card").should("have.length.at.least", 1);
  });

  it("Verifica que los contratos activos se muestran correctamente", () => {
    cy.get("h2").contains("Mis contratos activos").should("be.visible");
    cy.get(".contract-card").should("have.length.at.least", 1);
  });

  it("Verifica que un contrato individual contiene los detalles correctos", () => {
    cy.get(".contract-card").first().as("firstContract");
    cy.get("@firstContract").find("h4").should("not.be.empty");
    cy.get("@firstContract").find("p").contains("ALQUILADO").should("exist");
    cy.get("@firstContract").find("img").should("have.attr", "src").should("include", "image");
  });
});
