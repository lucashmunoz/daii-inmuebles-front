describe("Página de Detalles de Propiedad", () => {
  beforeEach(() => {
    cy.visit("/property/1");
  });

  it("Verifica que la página de detalles carga correctamente", () => {
    cy.get("p").contains("Departamento en Alquiler").should("be.visible");
    cy.get("h1").contains("Departamento amoblado en Puerto Madero").should("be.visible");
    cy.get("h2").contains("$ 650.000").should("be.visible");
  });

  it("Verifica que las especificaciones de la propiedad están visibles", () => {
    cy.get("span").contains("100 m² totales").should("be.visible");
    cy.get("span").contains("2 Baños").should("be.visible");
  });

  it("Simula la interacción con el botón de alquilar", () => {
    cy.get("button").contains("Alquilar").should("be.visible").click();
  });

  it("Verifica que el carrusel de imágenes funciona correctamente", () => {
    cy.get("img").first().should("have.attr", "src").and("include", "property-carrousel.jpg");
    cy.get("button").contains(">").click();
    cy.get("img").first().should("have.attr", "src").and("include", "property-carrousel2.jpg");
    cy.get("button").contains("<").click();
    cy.get("img").first().should("have.attr", "src").and("include", "property-carrousel.jpg");
  });
});
