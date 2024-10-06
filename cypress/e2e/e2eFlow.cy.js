import "cypress-file-upload";

describe("E2E: Flujo completo de la aplicación de alquiler de inmuebles", () => {
  let firstPropertyId;

  describe("Página de Lista de Propiedades", () => {
    beforeEach(() => {
      cy.visit("/properties");
    });

    it("Debe ordenar las propiedades por mayor precio correctamente", () => {
      cy.get("#select-tipo-inmueble").click();
      cy.contains("Mayor precio").click();
      cy.wait(2500);
      cy.get(".MuiTypography-h4").then(($prices) => {
        const priceArray = [...$prices].map((price) => parseFloat(price.innerText.replace(/\D/g, "")));
        for (let i = 0; i < priceArray.length - 1; i++) {
          expect(priceArray[i]).to.be.gte(priceArray[i + 1]);
        }
      });
      cy.get(".MuiCard-root")
        .first()
        .find("a")
        .invoke("attr", "href")
        .then((href) => {
          const propertyId = href.split("/").pop();
          firstPropertyId = propertyId;
        });
    });
  });

  describe("Página de Detalles de Propiedad", () => {
    beforeEach(() => {
      cy.visit(`/properties/${firstPropertyId}`);
    });

    it("Verifica que la página de detalles carga correctamente", () => {
      cy.get("p").contains("Alquiler").should("be.visible");
      cy.get("h2").contains("Descripción").should("be.visible");
      cy.get("h2").contains("Ubicación").should("be.visible");
      cy.get("button").contains("Alquilar").should("exist");
    });

    it("Verifica que las especificaciones de la propiedad están visibles", () => {
      cy.get("p").contains(/(mes|meses|año|años|hora|horas)/).should("be.visible");
      cy.get("p").contains(/\d+ (dormitorios|dormitorio)/).should("be.visible");
      cy.get("p").contains(/\d+ (ambientes|ambiente)/).should("be.visible");
    });

    it("Simula la interacción con el botón de alquilar si está habilitado", () => {
      cy.get("button").contains("Alquilar").then((button) => {
        if (!button.is(":disabled")) {
          cy.wrap(button).click();
        } else {
          cy.log("El botón está deshabilitado, no se puede presionar.");
        }
      });
    });

    it("Verifica que el carrusel de imágenes funciona correctamente", () => {
      cy.get("button").contains(">").should("be.visible");
      cy.get("button").contains("<").should("be.visible");
    });

    it("Verifica el agregar y eliminar favoritos", () => {
      cy.get("button[aria-label]").as("likeButton");
      cy.get("@likeButton").then(($button) => {
        const label = $button.attr("aria-label");
        if (label === "Agregar a favoritos") {
          cy.wrap($button).click();
          cy.wrap($button).should("have.attr", "aria-label", "Eliminar de favoritos");
        } else if (label === "Eliminar de favoritos") {
          cy.wrap($button).click();
          cy.wrap($button).should("have.attr", "aria-label", "Agregar a favoritos");
          cy.wrap($button).click();
        }
      });
    });
  });

  describe("Agrega un Like para el Test Siguiente", () => {
    beforeEach(() => {
      cy.visit(`/properties/${firstPropertyId}`);
    });

    it("Agrega un like si no está agregado", () => {
      cy.get("button[aria-label=\"Agregar a favoritos\"], button[aria-label=\"Eliminar de favoritos\"]").then(($button) => {
        const label = $button.attr("aria-label");
        if (label === "Agregar a favoritos") {
          cy.wrap($button).click();
          cy.wait(1000);
          cy.wrap($button).should("have.attr", "aria-label", "Eliminar de favoritos");
        } else if (label === "Eliminar de favoritos") {
          cy.log("El botón ya está en favoritos, no se realiza ninguna acción.");
        }
      });
      cy.wait(2000);
    });
  });

  describe("Página de Mis Favoritos", () => {
    beforeEach(() => {
      cy.visit("/bookmarks");
    });

    it("Verifica que la página de 'Mis Favoritos' carga correctamente", () => {
      cy.get("h1").contains("Mis Favoritos").should("be.visible");
    });

    it("Verifica que los bookmarks se muestran", () => {
      cy.get(".MuiCard-root").should("have.length.at.least", 1);
      cy.get(".MuiCard-root").each(($card) => {
        cy.wrap($card).within(() => {
          cy.get("img").should("be.visible");
        });
      });
    });

    it("Simula la eliminación de un bookmark", () => {
      cy.intercept("DELETE", "/properties/*/favorites").as("deleteFavorite");
      cy.get(".MuiCard-root").then((cards) => {
        const initialCount = cards.length;
        cy.get(".MuiCard-root").first().as("firstBookmark");
        cy.get("@firstBookmark").find("button:contains(\"Eliminar\")").click();
        cy.wait("@deleteFavorite").its("response.statusCode").should("eq", 204);
        cy.reload();
        cy.get(".MuiCard-root").should("have.length", initialCount - 1);
      });
    });
  });
});
