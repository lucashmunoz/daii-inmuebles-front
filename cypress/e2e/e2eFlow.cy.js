describe("E2E: Flujo completo de la aplicación de alquiler de inmuebles", () => {
  describe("Página Home", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("Verifica que el contenedor de 'Encontrá tu próximo hogar' está presente", () => {
      cy.get("h1").contains("Entontrá tu próximo hogar en Smart Move").should("be.visible");
    });

    it("Verifica que los filtros principales están presentes", () => {
      cy.get("form").should("exist");
      cy.get("button[type='submit']").contains("Buscar").should("be.visible");
    });

    it("Verifica que los inmuebles recientes se muestran", () => {
      cy.get("h2").contains("Inmuebles Publicados Recientemente").should("be.visible");
      cy.get(".MuiCard-root").should("have.length.at.least", 1);
    });

    it("Simula la búsqueda de inmuebles", () => {
      cy.get(".MuiCard-root").first().within(() => {
        cy.get("a").click();
      });
      cy.url().should("include", "/properties/");
    });

    it("Verifica que los inmuebles recientes se muestran correctamente", () => {
      cy.get(".MuiCard-root").should("have.length.at.least", 1);
    });

    it("Muestra un mensaje de error si ocurre un error al cargar los inmuebles recientes", () => {
      cy.intercept("GET", "**/ //properties?sortBy=RECENT", {
        statusCode: 500,
        body: {}
      }).as("getRecentProperties");
      cy.visit("/");
      cy.wait("@getRecentProperties");
      cy.get(".MuiAlert-root")
        .should("be.visible")
        .and("contain.text", "Ocurrió un error al mostrar los inmuebles recientes");
    });

    it("Verifica que cada tarjeta de propiedad contiene la información correcta", () => {
      cy.get(".MuiCard-root").first().within(() => {
        cy.get("img").should("have.attr", "alt", "inmueble publicado recientemente");
        cy.get(".MuiTypography-h4").should("contain.text", "$");
        cy.get("p").should("contain.text", "m² tot.");
        cy.get("p").should("contain.text", "dorm.");
        cy.get("p").should("contain.text", "baño");
        cy.get("p").should("contain.text", "EN ALQUILER");
      });
    });

    it("Verifica que el carrusel se muestra en dispositivos de escritorio", () => {
      cy.viewport(1280, 720);
      cy.get(".react-multi-carousel-track").should("exist");
      cy.get(".react-multi-carousel-item").should("have.length.at.least", 1);
    });

    it("Verifica que las propiedades se muestran en formato horizontal en dispositivos móviles", () => {
      cy.viewport("iphone-6");
      cy.get(".MuiCard-root").first().should("have.css", "flex-direction", "row");
    });

    it("Verifica que el botón 'Buscar' esté visible y sea clicable", () => {
      cy.get("button[type='submit']").should("be.visible").click();
    });

    it("Cambia el tipo de propiedad y realiza una búsqueda", () => {
      cy.get("#select-tipo-inmueble").click();
      cy.get("[role='listbox']").within(() => {
        cy.contains("Casa").click();
      });
      cy.get("button[type='submit']").click();
      cy.url().should("include", "/properties?type=HOUSE");
    });
  });

  describe("Página de Lista de Propiedades", () => {
    beforeEach(() => {
      cy.visit("/properties");
    });

    it("Verifica que la página de propiedades carga correctamente", () => {
      cy.get("button").contains("Aplicar Filtros").should("be.visible");
    });

    it("Verifica que se muestran las propiedades", () => {
      cy.get(".MuiCard-root").should("have.length.at.least", 1);
    });

    it("Simula el uso de filtros (Precio, Dormitorios, Superficie)", () => {
      cy.get("input[name='minSurface']").type("1");
      cy.get("input[name='maxSurface']").type("2000");
      cy.get("input[name='minPrice']").type("100");
      cy.get("input[name='maxPrice']").type("2000");
      cy.get("input[name='minBeds']").type("1");
      cy.get("input[name='maxBeds']").type("4");
      cy.get("input[name='minRooms']").type("1");
      cy.get("input[name='maxRooms']").type("4");
      cy.get("input[name='minBathrooms']").type("1");
      cy.get("input[name='maxBathrooms']").type("4");
      cy.get("button").contains("Aplicar Filtros").click();
      cy.get(".MuiCard-root").should("have.length.at.least", 1);
    });

    it("Simula el reinicio de los filtros", () => {
      cy.get("button[aria-label='Reiniciar filtros']").click();
      cy.get("input[name='minSurface']").should("have.value", "");
      cy.get("input[name='maxSurface']").should("have.value", "");
      cy.get("input[name='minPrice']").should("have.value", "");
      cy.get("input[name='maxPrice']").should("have.value", "");
      cy.get("input[name='minBeds']").should("have.value", "");
      cy.get("input[name='maxBeds']").should("have.value", "");
      cy.get("input[name='minRooms']").should("have.value", "");
      cy.get("input[name='maxRooms']").should("have.value", "");
      cy.get("input[name='minBathrooms']").should("have.value", "");
      cy.get("input[name='maxBathrooms']").should("have.value", "");
    });

    it("Simula la apertura y cierre del Drawer de filtros en mobile", () => {
      cy.viewport("iphone-6");
      cy.get("button").contains("Filtrar").should("be.visible").click();
      cy.get(".MuiDrawer-root").should("be.visible");
      cy.get("[data-testid=\"CloseOutlinedIcon\"]").closest("button").click();
      cy.get("button").contains("Filtrar").should("be.visible");
    });

    // TODO: Implementar test de loading skeleton

    it("Simula un error al cargar las propiedades", () => {
      cy.intercept("GET", "**/properties*", {
        statusCode: 500,
        body: {}
      }).as("getPropertiesError");
      cy.request({
        url: "/properties",
        failOnStatusCode: false
      });
      cy.wait("@getPropertiesError");
      cy.get(".MuiAlert-root")
        .should("be.visible")
        .and("contain.text", "Ocurrió un error al mostrar los inmuebles");
    });
  });
});
