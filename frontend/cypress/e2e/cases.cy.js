describe('Investigator Case Management', () => {
  beforeEach(() => {
    cy.visit('/auth');
    cy.get('input[type="password"]').type('ADMIN_DEMO');
    cy.contains('Initialize Intelligence').click();
    cy.visit('/cases');
  });

  it('allows creating a new case and adding a comment', () => {
    cy.contains('Initialize Case').click();
    cy.contains('New Forensic Investigation').click();
    cy.get('input[placeholder="Add observation..."]').type('Mule pattern confirmed across UK-CH corridor.{enter}');
    cy.contains('Mule pattern confirmed').should('be.visible');
    cy.get('select').select('in_progress');
    cy.get('select').should('have.value', 'in_progress');
  });

  it('filters cases by search term', () => {
    cy.get('input[placeholder*="Search"]').type('CASE_101');
    cy.get('.bg-dark-800').should('contain', 'CASE_101');
  });
});
