describe('Kielibuddy Alpha', () => {
  it('displays the correct tagline and coming soon message', () => {
    cy.visit('/')
    cy.get('.tagline').should('contain', 'Finnish vocabulary, simplified')
    cy.contains('Coming Soon').should('be.visible')
  })
})