describe('Kubera Trace End-to-End Flow', () => {
  beforeEach(() => {
    cy.visit('/auth');
    cy.get('input[type="password"]').type('ADMIN_DEMO');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('completes a full trace and export workflow', () => {
    // 1. Ingestion
    cy.visit('/upload');
    cy.get('input[type="file"]').selectFile({
      contents: Cypress.Buffer.from('account_id,amount,country\nACC_1,5000,UK\nACC_2,10000,Germany'),
      fileName: 'test_transactions.csv',
      mimeType: 'text/csv',
    }, { force: true });
    
    cy.contains('Start Ingestion').click();
    cy.contains('Total Records').should('be.visible');
    
    cy.contains('Build Neural Graph').click();
    cy.url().should('include', '/explorer');

    // 2. Exploration
    cy.get('.vis-network').should('be.visible');
    cy.contains('Cluster by Bank').click();
    cy.contains('Uncluster').should('be.visible');

    // 3. Trace Analysis
    cy.visit('/trace');
    cy.get('input[placeholder*="Transaction ID"]').type('TX_SAMPLE_001');
    cy.contains('Start Intelligent Trace').click();
    
    cy.contains('Path Diagnostics').should('be.visible');
    cy.contains('High Path Risk').should('be.visible');

    // 4. Report Generation
    cy.contains('PDF Report').click();
    cy.contains('PDF Generated Successfully').should('be.visible');
  });
});
