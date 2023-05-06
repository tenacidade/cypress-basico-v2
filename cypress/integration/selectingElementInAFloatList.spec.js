describe('Duck Duck Go Search', () => {
  beforeEach(() => {
    cy.visit('http://www.duckduckgo.com')
    cy.get('input[type="text"]')
      .as('searchField')
      .should('be.visible')
  })

  it('searches by typing and selecting the first option from the list', () => {
    cy.get('@searchField')
      .type('cypress.io{downarrow}{enter}', { delay: 250 })

    cy.get('.nrn-react-div')
      .should('have.length', 11)

    cy.get('.result--more__btn')
      .should('contain', 'Mais resultados')
  })

  it('searches by typing and selecting the second option from the list', () => {
    cy.get('@searchField')
      .type('cypress.io{downarrow}{downarrow}{enter}', { delay: 250 })

    cy.get('.nrn-react-div')
      .should('have.length', 11)

    cy.get('.result--more__btn')
      .should('contain', 'Mais resultados')
  })

  it('searches by typing and selecting the third option from the list', () => {
    cy.get('@searchField')
      .type('cypress.io{downarrow}{downarrow}{downarrow}{enter}', { delay: 250 })

    cy.get('.nrn-react-div')
      .should('have.length', 11)

    cy.get('.result--more__btn')
      .should('contain', 'Mais resultados')
  })
})