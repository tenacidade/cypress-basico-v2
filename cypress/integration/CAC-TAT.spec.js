/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(() => cy.visit('src/index.html'))

    it('verifica o título da aplicação', function () {
        cy.title()
            .should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy.get('#firstName')
            .should('be.visible')
            .type('Gabriel')
            .should('have.value', 'Gabriel')

        cy.get('#lastName')
            .should('be.visible')
            .type('Duarte')
            .should('have.value', 'Duarte')

        cy.get('#email')
            .should('be.visible')
            .type('gabrielzito@qa.com.br')
            .should('have.value', 'gabrielzito@qa.com.br')

        cy.get('#open-text-area')
            .should('be.visible')
            .type('Socorro meu deus do céu me ajuda pelo amor de deus', {delay: 0} )
            .should('have.value', 'Socorro meu deus do céu me ajuda pelo amor de deus')

        cy.get('.button')
            .should('be.visible')
            .click()

        cy.get('.success')
            .should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName')
            .should('be.visible')
            .type('Gabriel')
            .should('have.value', 'Gabriel')

        cy.get('#lastName')
            .should('be.visible')
            .type('Duarte')
            .should('have.value', 'Duarte')

        cy.get('#email')
            .should('be.visible')
            .type('gabrielzitoinvalido.com.br')
            .should('have.value', 'gabrielzitoinvalido.com.br')

        cy.get('#open-text-area')
            .should('be.visible')
            .type('Socorro meu deus do céu me ajuda pelo amor de deus', {delay: 0} )
            .should('have.value', 'Socorro meu deus do céu me ajuda pelo amor de deus')

        cy.get('.button')
            .should('be.visible')
            .click()

        cy.get('.error')
            .should('be.visible')
    })

    it('tenta inserir texto no campo telefone e valida que nao foi inserido', function () {

        cy.get('#phone')
            .should('be.visible')
            .type('um texto qualquer')
            .should('not.have.value')
    })
})
