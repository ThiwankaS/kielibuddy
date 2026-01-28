describe('Status Indicator', function () {
    it('should show "Online" (Green) when API is healthy', function () {
        // Intercept the health check to return 200 OK
        cy.intercept('GET', '/api/v1/health', {
            statusCode: 200,
            body: { status: 'ok' },
        }).as('getHealthOnline');
        cy.visit('/');
        cy.wait('@getHealthOnline');
        // Check for the text "Online" and the green pulsing dot
        cy.contains('Online').should('be.visible');
        cy.get('[title="Backend Connected"]').should('have.class', 'bg-green-500');
    });
    it('should show "Local Mode" (Yellow) when API fails', function () {
        // Intercept to return 500 Error
        cy.intercept('GET', '/api/v1/health', {
            statusCode: 500,
        }).as('getHealthOffline');
        cy.visit('/');
        cy.wait('@getHealthOffline');
        // Check for "Local Mode" and yellow dot
        cy.contains('Local Mode').should('be.visible');
        cy.get('[title="Local Mode"]').should('have.class', 'bg-yellow-400');
    });
});
