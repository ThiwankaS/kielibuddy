describe('Navigation', () => {
    it('should navigate to puzzle page on button click', () => {
        cy.visit('/');
        cy.contains('try now').click();
        cy.url().should('include', '/puzzle');
        cy.contains('Moi, Welcome back !').should('be.visible');
    });
});
