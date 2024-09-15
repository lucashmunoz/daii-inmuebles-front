describe('Página de Lista de Propiedades', () => {
  beforeEach(() => {
    cy.visit('/properties');
  });

  it('Verifica que la página de propiedades carga correctamente', () => {
    cy.get('button').contains('Filtrar').should('be.visible');
  });

  it('Verifica que se muestran las propiedades', () => {
    cy.get('.property-card').should('have.length.at.least', 1); // Verifica que haya al menos una propiedad
  });

  it('Simula el uso de filtros (Precio, Dormitorios, Superficie)', () => {
    cy.get('input[name="minPrice"]').type('100000');
    cy.get('input[name="maxPrice"]').type('500000');
    cy.get('input[name="minBeds"]').type('2');
    cy.get('input[name="maxBeds"]').type('3');
    cy.get('input[name="minSurface"]').type('50');
    cy.get('input[name="maxSurface"]').type('150');
    cy.get('button').contains('Aplicar Filtros').click();
    cy.get('.property-card').should('have.length.at.least', 1); // Al menos una propiedad después de aplicar los filtros
  });

  it('Simula el reinicio de los filtros', () => {
    cy.get('button[aria-label="Reiniciar filtros"]').click();
    cy.get('input[name="minPrice"]').should('have.value', '');
    cy.get('input[name="maxPrice"]').should('have.value', '');
    cy.get('input[name="minBeds"]').should('have.value', '');
    cy.get('input[name="maxBeds"]').should('have.value', '');
  });

  it('Simula la apertura y cierre del Drawer de filtros en mobile', () => {
    cy.viewport('iphone-6');
    cy.get('button').contains('Filtrar').should('be.visible').click();
    cy.get('.MuiDrawer-root').should('be.visible');
    cy.get('button').contains('Cerrar').click();
    cy.get('.MuiDrawer-root').should('not.be.visible');
  });

  it('Verifica que la lista de propiedades maneje el estado de carga (loading)', () => {
    cy.intercept('GET', '/api/properties', {
      delay: 1000,
      statusCode: 200,
      body: []
    }).as('getPropertiesLoading');
    cy.visit('/properties');
    cy.wait('@getPropertiesLoading');
    cy.get('.loading-skeleton').should('be.visible');
  });

  it('Simula un error al cargar las propiedades', () => {
    cy.intercept('GET', '/api/properties', {
      statusCode: 500
    }).as('getPropertiesError');
    cy.visit('/properties');
    cy.wait('@getPropertiesError');
    cy.get('.MuiAlert-root').contains('Ocurrió un error al mostrar los inmuebles').should('be.visible');
  });
});
