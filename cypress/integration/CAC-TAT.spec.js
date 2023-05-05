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

        cy.contains('Enviar')
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

        cy.contains('Enviar')
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

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulario', function () {
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

        cy.get('#phone-checkbox')
            .should('be.visible')
            .click()

        cy.contains('Enviar')
            .should('be.visible')
            .click()

        cy.get('.error')
            .should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e e telefone', function () {
        cy.get('#firstName')
            .should('be.visible')
            .type('Gabriel')
            .should('have.value', 'Gabriel')
            .clear()
            .should('not.have.value')

        cy.get('#lastName')
            .should('be.visible')
            .type('Duarte')
            .should('have.value', 'Duarte')
            .clear()
            .should('not.have.value')

        cy.get('#email')
            .should('be.visible')
            .type('gabrielzito@qa.com.br')
            .should('have.value', 'gabrielzito@qa.com.br')
            .clear()
            .should('not.have.value')

        cy.get('#phone')
            .should('be.visible')
            .type('123456789')
            .should('have.value', '123456789')
            .clear()
            .should('not.have.value')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('Enviar')
            .should('be.visible')
            .click()

        cy.get('.error')
            .should('be.visible')
    })

    it('envia o formulário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit('gabriel', 'ribeiro', 'das@dsa.com')
    })
})
