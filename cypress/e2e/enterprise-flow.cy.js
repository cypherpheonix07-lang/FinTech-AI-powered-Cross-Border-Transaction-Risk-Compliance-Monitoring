describe('Kubera Enterprise Operation Flow', () => {
  const TEST_TENANT = `QA_BANK_${Date.now()}`;
  const TX_ID = `TX_KAFKA_${Math.floor(Math.random()*1000)}`;

  beforeEach(() => {
    cy.visit('/auth');
    cy.get('input[type="password"]').type('ADMIN_DEMO');
    cy.contains('Initialize Intelligence').click();
  });

  it('executes a full multi-tenant investigation lifecycle', () => {
    // 1. Provision New Institution
    cy.visit('/tenants');
    cy.contains('Provision New Institution').click();
    // (Mocked flow assumed to auto-populate/confirm)
    cy.contains('active').should('be.visible');

    // 2. Start Kafka Consumption
    cy.visit('/dashboard');
    cy.contains('Start Stream').click(); // Hypothetical button added to dash in enterprise
    cy.contains('⚡ Simulation Active').should('be.visible');

    // 3. Trace a Streamed Transaction
    cy.visit('/trace');
    cy.get('input[placeholder*="Transaction ID"]').type(TX_ID);
    cy.contains('Trace Path').click();
    cy.get('.vis-network').should('be.visible');

    // 4. Initialize Forensic Case
    cy.get('button').contains('N').click(); // Using hotkey simulate if possible, or direct click
    cy.contains('Initialize Case').click();
    cy.get('textarea').type('Enterprise E2E validation: Detected layering pattern via Kafka flow.');
    cy.contains('Resolved').should('not.exist'); // Ensure it stays open

    // 5. Verify Immutable Audit Log
    cy.visit('/audit');
    cy.contains('CASE_CREATED').should('be.visible');
    cy.contains('Verified').should('be.visible');

    // 6. Generate SAR Evidence Pack
    cy.visit('/workspace');
    cy.contains('Generate SAR Bundle').click();
    cy.contains('Forensic Investigation Package Generated').should('be.visible');
  });
});
