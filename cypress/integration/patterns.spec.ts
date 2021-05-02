describe('Test test', () => {
    it('Customer visits the main page and is redirected to the patterns page', () => {
        cy.visit('/')
        cy.url().should('include', 'schemat')
    });

    it('Customer selects pattern search attributes', () => {
        cy.get('mat-select[formcontrolname="needleSize"]').should('not.be.exist')
        cy.get('mat-select[formcontrolname="categories"]').should('not.be.exist')

        cy.get('mat-select[formcontrolname="crafts"]').click()
        cy.get('mat-option').contains('Druty').click()
        cy.get('body').click()

        cy.get('mat-select[formcontrolname="needleSize"]').should('be.visible')
        cy.get('mat-select[formcontrolname="categories"]').should('be.visible')

        cy.get('mat-select[formcontrolname="categories"]').click()
        cy.get('mat-option').contains('Czapki').click()

        cy.get('mat-select[formcontrolname="needleSize"]').click()
        cy.get('mat-option').contains('4.0mm').click()

        cy.get('.mat-slide-toggle-label').click()
        
        cy.get('.button').click()

        cy.get('mat-card').should('be.visible')
    })
})