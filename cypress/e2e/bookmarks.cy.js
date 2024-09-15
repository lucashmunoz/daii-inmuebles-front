describe("Página de Mis Favoritos", () => {
  beforeEach(() => {
    cy.visit("/bookmarks");
  });

  it("Verifica que la página de 'Mis Favoritos' carga correctamente", () => {
    cy.get("h1").contains("Mis Favoritos").should("be.visible");
  });

  it("Verifica que los bookmarks se muestran", () => {
    cy.get(".property-card").should("have.length.at.least", 1);
  });

  it("Simula la eliminación de un bookmark", () => {
    cy.get(".property-card").first().as("firstBookmark");
    cy.get("@firstBookmark").find("button").contains("Eliminar").click();
    cy.get("@firstBookmark").should("not.exist");
  });
});
