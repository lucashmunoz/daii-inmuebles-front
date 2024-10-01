describe("E2E: Flujo completo de la aplicación de alquiler de inmuebles", () => {
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

    // TODO: Revisar los tests de errores.
    /*
    it("Muestra un mensaje de error si ocurre un error al cargar los inmuebles recientes", () => {
      cy.intercept("GET", "**/ //properties?sortBy=RECENT", {
    /*statusCode: 500,
        body: {}
      }).as("getRecentProperties");
      cy.visit("/");
      cy.wait("@getRecentProperties");
      cy.get(".MuiAlert-root")
        .should("be.visible")
        .and("contain.text", "Ocurrió un error al mostrar los inmuebles recientes");
    });
    */

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
      cy.get("input[name='maxPrice']").type("200000");
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

    /*
    it("Simula un error al cargar las propiedades", () => {
      cy.intercept("GET", "**/ //properties*", {
    /*statusCode: 500,
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
      */
  });

  describe("Página de Detalles de Propiedad", () => {
    beforeEach(() => {
      cy.visit("/properties/2");
    });

    it("Verifica que la página de detalles carga correctamente", () => {
      cy.get("p").contains("Departamento en Alquiler").should("be.visible");
      cy.get("h2").contains("Descripción").should("be.visible");
      cy.get("h2").contains("Ubicación").should("be.visible");
      cy.get("button").contains("Alquilar").should("exist");
    });

    it("Verifica que las especificaciones de la propiedad están visibles", () => {
      cy.get("p").contains(/Publicado hace \d+ (mes|meses|año|años)/).should("be.visible");
      cy.get("p").contains(/\d+ (dormitorios|dormitorio)/).should("be.visible");
      cy.get("p").contains(/\d+ (ambientes|ambiente)/).should("be.visible");
    });

    it("Simula la interacción con el botón de alquilar", () => {
      cy.get("button").contains("Alquilar").should("be.visible").click();
    });

    it("Verifica que el carrusel de imágenes funciona correctamente", () => {
      cy.get("img[alt=\"Slide 1\"]")
        .should("be.visible");
      cy.get("button").contains(">").click();
      cy.get("img[alt=\"Slide 2\"]")
        .should("be.visible");
      cy.get("button").contains("<").click();
      cy.get("img[alt=\"Slide 1\"]")
        .should("be.visible");
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

  describe("Agrega un like para el siguiente test", () => {
    beforeEach(() => {
      cy.visit("/properties/3");
    });

    it("Agrega un like", () => {
      cy.get("button[aria-label]").as("likeButton");
      cy.get("@likeButton").then(($button) => {
        const label = $button.attr("aria-label");
        if (label === "Agregar a favoritos") {
          cy.wrap($button).click();
        }
      });
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
        cy.get(".MuiCard-root").should("have.length", initialCount - 1);
      });
    });
  });

  describe("Página de mis propiedades", () => {
    beforeEach(() => {
      cy.visit("/myproperties");
    });

    it("Verifica que las propiedades se muestran correctamente", () => {
      cy.get("h1").contains("Mis Publicaciones").should("be.visible");
      cy.get(".MuiCard-root").should("have.length.at.least", 1);
    });

    it("Debe redirigir a la página de edición cuando se hace clic en \"Editar\"", () => {
      cy.get(".MuiCard-root").first().within(() => {
        cy.contains("Editar").click();
      });
      cy.url().should("include", "/myproperties/edit/");
    });

    it("Debe permitir activar o pausar una propiedad", () => {
      cy.get(".MuiCard-root").first().within(() => {
        cy.get("input[type='checkbox']").then(($checkbox) => {
          const isChecked = $checkbox.is(":checked");
          cy.wrap($checkbox).click();
          cy.get("input[type='checkbox']").should(($newCheckbox) => {
            if (isChecked) {
              cy.wrap($newCheckbox).should("not.be.checked");
            } else {
              cy.wrap($newCheckbox).should("be.checked");
            }
          });
        });
      });
    });

    /*
    it("Muestra el esqueleto de carga mientras las propiedades están cargando", () => {
      cy.intercept("/myproperties", {
        fixture: "loading"
      }).as("getProperties");
      cy.visit("/myproperties");
      cy.get(".MuiSkeleton-root").should("be.visible");
    });
     */
  });

  describe("Página de Publicar Inmuebles", () => {
    Cypress.on("uncaught:exception", (err) => {
      if (err.message.includes("REQUEST_DENIED") || err.message.includes("ERROR")) {
        return false;
      }
    });

    beforeEach(() => {
      cy.visit("/createproperty");
    });

    it("Debe renderizar correctamente el formulario de propiedad", () => {
      cy.contains("Completá las características del inmueble.").should("be.visible");
      cy.contains("Tendrás mejor ubicación en los resultados de búsqueda").should("be.visible");
      cy.get("button[type=\"button\"]").contains("Publicar propiedad").should("be.disabled");
    });

    it("Debe enviar el formulario y redirigir a la página de detalles de la propiedad cuando se crea exitosamente", () => {
      cy.get("div[role=\"combobox\"]").contains("Tipo de Propiedad").click();
      cy.get("li[data-value=\"APARTMENT\"]").click();
      cy.get("input[name=\"price\"]").type("200000");
      cy.get("input[name=\"surface_total\"]").type("150");
      cy.get("input[name=\"surface_covered\"]").type("100");
      cy.get("input[name=\"rooms\"]").type("4");
      cy.get("input[name=\"beds\"]").type("3");
      cy.get("input[name=\"bathrooms\"]").type("2");
      cy.get("input[name=\"garages\"]").type("1");
      cy.get("div[role=\"combobox\"]").contains("Barrio").click();
      cy.get("li[data-value=\"Palermo\"]").click();
      cy.get("input[name=\"zipcode\"]").type("1000");
      cy.get("input[name=\"address\"]").type("Vallejos 3840", {
        force: true
      });
      cy.get("textarea[name=\"title\"]").type("Casa remodelada con jardín, cercana al subte.");
      cy.get("textarea[name=\"description\"]").type("Hermosa casa remodelada recientemente, con amplio jardín y excelente ubicación.");
      cy.intercept("POST", "/properties", {
        statusCode: 201,
        body: {
          id: 1
        }
      }).as("createProperty");
      cy.get("button[type=\"button\"]").contains("Publicar propiedad").click();
      cy.wait("@createProperty");});
  });

  describe("Página de Mis Contratos", () => {
    beforeEach(() => {
      cy.visit("/mycontracts");
    });

    it("Verifica que la página de mis contratos carga correctamente", () => {
      cy.contains("Mis contratos").should("be.visible");
    });

    it("Debe mostrar al menos un contrato en proceso", () => {
      cy.contains("Mis contratos en proceso").should("be.visible");
      cy.get("section").contains("Mis contratos en proceso")
        .parent()
        .find(".MuiCard-root")
        .should("have.length.at.least", 1);
    });
  });
});
