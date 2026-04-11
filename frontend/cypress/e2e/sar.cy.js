describe('GDPR Privacy Workflows', () => {
  const TEST_USER = 'USER_DATA_001';

  beforeEach(() => {
    cy.visit('/auth');
    cy.get('input[type="password"]').type('ADMIN_DEMO');
    cy.contains('Initialize Intelligence').click();
  });

  it('triggers a Subject Access Request (SAR) and monitors progress', () => {
    cy.visit('/governance/privacy');
    cy.contains('Subject Access Request').click();
    cy.get('input#user_id_field').type(TEST_USER);
    cy.contains('Start Data Export').click();

    cy.contains('Processing export...').should('be.visible');
    
    // Simulate waiting for async completion (mock response change)
    cy.wait(5000); 
    cy.contains('Download Request Package').should('be.visible');
  });

  it('verifies legal-hold block on deletion requests', () => {
    cy.visit('/governance/privacy');
    cy.contains('Initiate Deletion').click();
    cy.get('input#target_id').type('TX_FRAUD_LITIGATION');
    cy.contains('Confirm Erasure').click();

    cy.contains('Deletion blocked by active legal hold').should('be.visible');
    cy.get('.text-risk-high').should('contain', 'Policy Enforcement');
  });
});
