// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (firstName, lastName, email) => {
cy.get('#firstName')
    .should('be.visible')
    .type(firstName)
    .should('have.value', firstName)

cy.get('#lastName')
    .should('be.visible')
    .type(lastName)
    .should('have.value', lastName)

cy.get('#email')
    .should('be.visible')
    .type(email)
    .should('have.value', email)

    cy.get('#open-text-area')
    .should('be.visible')
    .type('Socorro meu deus do céu me ajuda pelo amor de deus', {delay: 0} )
    .should('have.value', 'Socorro meu deus do céu me ajuda pelo amor de deus')

cy.contains('button', 'Enviar')
    .should('be.visible')
    .click()

cy.get('.success')
    .should('be.visible')
})
