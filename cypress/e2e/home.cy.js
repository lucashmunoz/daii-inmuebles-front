describe('Página Home', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Verifica que el contenedor de "Encontrá tu próximo hogar" está presente', () => {
    cy.get('h1').contains('Encontrá tu próximo hogar en Smart Move').should('be.visible');
  });

  it('Verifica que los filtros principales están presentes', () => {
    cy.get('form').should('exist');  // Verifica que el formulario de filtros esté presente
    cy.get('button[type="submit"]').contains('Buscar').should('be.visible');
  });

  it('Verifica que los inmuebles recientes se muestran', () => {
    cy.get('h2').contains('Inmuebles Publicados Recientemente').should('be.visible');  // Verifica el título
    cy.get('.property-card').should('have.length.at.least', 1);  // Verifica que haya al menos un inmueble
  });

  it('Simula la búsqueda de inmuebles', () => {
    // Selecciona el tipo de propiedad y hace clic en "Buscar"
    cy.get('select').select('APARTMENT');  // Cambia según el select de tu página
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/properties?type=APARTMENT');
  });
});
