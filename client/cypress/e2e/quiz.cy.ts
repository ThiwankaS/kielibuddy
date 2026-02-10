describe('Quiz Interaction', () => {

    it('should open modal on word click and handle correct answer', () => {
        cy.visit('/puzzle');

        // Find the first available (unattempted) puzzle button and capture its ID
        cy.get('[data-cy^="puzzle-item-"]').not(':disabled').first().then(($btn) => {

            // Click the button
            cy.wrap($btn).click();

            // Verify modal content
            cy.contains('Select the correct answer').should('be.visible');
            cy.contains('What is the Finnish word').should('be.visible');

            // Select an option
            cy.get('input[type="radio"]').first().check();

            // Submit
            cy.contains('Submit').click();

            // Verify modal closes
            cy.contains('Select the correct answer').should('not.exist');

        });
    });

    it('should validate selection before submitting', () => {
        cy.visit('/puzzle');
        cy.get('button').not(':disabled').first().click();

        // Try submit without selection
        cy.contains('Submit').click();

        // Expect error message
        cy.contains('Please select an option.').should('be.visible');

        // Select option and error should go away (on change or next submit)
        cy.get('input[type="radio"]').first().check();
        cy.contains('Please select an option.').should('not.exist');
    });

});
