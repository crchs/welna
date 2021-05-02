// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })

declare namespace Cypress {
    interface Chainable<Subject> {
        fetchSizes: typeof fetchSizes
    }
}

function fetchSizes() {
    cy.intercept('https://api.ravelry.com/needles/sizes.json', { fixture: 'example.json' })
}

Cypress.Commands.add('fetchSizes', fetchSizes)