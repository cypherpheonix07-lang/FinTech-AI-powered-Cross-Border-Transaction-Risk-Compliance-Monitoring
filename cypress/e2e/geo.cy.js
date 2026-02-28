describe('Geo-Trace & Temporal Playback', () => {
  beforeEach(() => {
    cy.visit('/auth');
    cy.get('input[type="password"]').type('ADMIN_DEMO');
    cy.contains('Initialize Intelligence').click();
    cy.visit('/trace');
  });

  it('renders the map and allows timeline control', () => {
    // Select a trace first
    cy.get('input[placeholder*="Transaction ID"]').type('TX_123');
    cy.contains('Trace Path').click();
    
    // Check for map container
    cy.get('.leaflet-container').should('be.visible');
    
    // Play the timeline
    cy.get('button').find('svg').filter((i, el) => el.getAttribute('data-lucide') === 'play').parent().click();
    cy.wait(2000);
    cy.contains('Step').should('not.contain', 'Standby');
  });
});
