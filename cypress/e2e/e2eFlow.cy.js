import "cypress-file-upload";

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

    it("Muestra el esqueleto de carga mientras las propiedades están cargando", () => {
      cy.intercept("GET", "/api/properties?sortBy=RECENT", (req) => {
        req.on("response", (res) => {
          res.setDelay(2000); // Simula retraso de 2 segundos
        });
      }).as("fetchRecentProperties");
      cy.get(".react-loading-skeleton").should("be.visible"); // Cambiado a la clase correcta
      cy.get(".react-loading-skeleton").should("not.exist");
    });

    it("Muestra un mensaje de error si hay un problema al cargar las propiedades recientes", () => {
      cy.intercept("GET", "**/properties?sortBy=RECENT", {
        statusCode: 500
      }).as("fetchRecentPropertiesError");
      cy.visit("/");
      cy.wait("@fetchRecentPropertiesError");
      cy.contains("Ocurrió un error al mostrar los inmuebles recientes.").should("be.visible");
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

  describe("Header", () => {
    beforeEach(() => {
      cy.visit("/");
    });
    it("Verifica que renderiza el logo y el botón de menú", () => {
      cy.get("img[alt=\"Smart Move logo\"]").should("be.visible");
      cy.get("button[aria-label=\"Menu\"]").should("be.visible");
    });

    it("Verifica que muestra y oculta el menú de acciones al hacer clic en el botón", () => {
      cy.get("nav").should("not.be.visible");
      cy.get("button[aria-label=\"Menu\"]").click();
      cy.get("nav").should("be.visible");
      cy.get("body").click(0, 0);
      cy.get("nav").should("not.be.visible");
    });

    it("Verifica que tiene los enlaces correctos en el menú", () => {
      cy.get("button[aria-label=\"Menu\"]").click();
      cy.get("nav").within(() => {
        cy.contains("Buscar Propiedades").should("have.attr", "href", "/properties");
        cy.contains("Mis Contratos").should("have.attr", "href", "/mycontracts");
        cy.contains("Mis Publicaciones").should("have.attr", "href", "/myproperties");
        cy.contains("Publicar Inmueble").should("have.attr", "href", "/createproperty");
        cy.contains("Mis Favoritos").should("have.attr", "href", "/bookmarks");
      });
    });

    it("Verifica que cierra el menú cuando se hace clic afuera", () => {
      cy.get("button[aria-label=\"Menu\"]").click();
      cy.get("nav").should("be.visible");
      cy.get("body").click(0, 0);
      cy.get("nav").should("not.be.visible");
    });
  });

  let firstPropertyId;

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

    it("Debe ordenar las propiedades por mayor precio correctamente", () => {
      cy.get("#select-tipo-inmueble").click();
      cy.contains("Mayor precio").click();
      cy.wait(4500);
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

    it("Debe ordenar las propiedades por menor precio correctamente", () => {
      cy.get("#select-tipo-inmueble").click();
      cy.contains("Menor precio").click();
      cy.wait(4500);
      cy.get(".MuiTypography-h4").then(($prices) => {
        const priceArray = [...$prices].map((price) => parseFloat(price.innerText.replace(/\D/g, "")));
        for (let i = 0; i < priceArray.length - 1; i++) {
          expect(priceArray[i]).to.be.lte(priceArray[i + 1]);
        }
      });
    });
  });

  describe("Página de Detalles de Propiedad", () => {
    beforeEach(() => {
      cy.visit(`/properties/${firstPropertyId}`); // Usar el ID de la propiedad guardada
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

  describe("Página de mis propiedades", () => {
    beforeEach(() => {
      cy.visit("/myproperties");
    });

    it("Verifica que las propiedades se muestran correctamente", () => {
      cy.get("h1").contains("Mis Publicaciones").should("be.visible");
      cy.get(".MuiCard-root").should("have.length.at.least", 1);
    });

    it("Debe redirigir a la página de edición cuando se hace clic en \"Editar\" si está disponible", () => {
      cy.get(".MuiCard-root").first().within(() => {
        cy.get("button:contains(\"Editar\")").then(($editButton) => {
          if ($editButton.length > 0) {
            cy.wrap($editButton).click();
            cy.url().should("include", "/myproperties/edit/");
          } else {
            cy.log("La opción 'Editar' no está disponible para esta propiedad.");
          }
        });
      });
    });
  });

  describe("Página de Publicar Inmuebles", () => {
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
      cy.get("div[role=\"combobox\"]").contains("Barrio").click();
      cy.get("li[data-value=\"Palermo\"]").click();
      cy.get("input[name=\"zipcode\"]").type("1000");
      cy.wait(1000);
      cy.get("input[name=\"address\"]").type("Vallejos 3840");
      cy.get("textarea[name=\"title\"]").type("Casa remodelada con jardín, cercana al subte.");
      cy.get("textarea[name=\"description\"]").type("Hermosa casa remodelada recientemente.");
      cy.wait(1500);
      cy.get(".MuiButtonBase-root")
        .contains("Seleccionar imágenes")
        .click();
      const imagePath = "/test.jpg";
      cy.get("input[type=\"file\"]").attachFile(imagePath);
      cy.get(".MuiButtonBase-root.MuiButton-root").contains("Publicar").click();
      cy.wait(5000);
      cy.url().should("include", "/properties/");
      cy.wait(5000);
    });
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

  describe("Edición de propiedad", () => {
    beforeEach(() => {
      cy.visit("/myproperties");
    });

    it("Debe editar la primera propiedad, modificando su precio", () => {
      cy.get("button").contains("Editar").first().click();
      cy.wait(1500);
      cy.get("input[name=\"price\"]").invoke("val").then((price) => {
        cy.wait(1500);

        const newPrice = `${price}0`;
        cy.get("input[name=\"price\"]").clear().type(newPrice);
      });
      cy.wait(1500);
      cy.get("button").contains("Editar propiedad").click();
      cy.contains("h1", "Mis Publicaciones").should("be.visible");
    });
  });
});
