
describe("Test del mapa para buscar propiedad", () => {
  beforeEach(() => {
    cy.visit("/properties");
  });

  it("Debería abrir el mapa y seleccionar una propiedad", () => {
    cy.get("button.MuiButtonBase-root")
      .contains("mapa")
      .click();
    cy.get("div[role=\"region\"][aria-roledescription=\"map\"]").should("be.visible");
    cy.wait(2000);
    cy.get("area[title=\"Departamento - Palermo\"]").click({
      multiple: true,
      force: true
    });
    cy.get("h3").should("contain", "Departamento - Palermo");
  });
});
