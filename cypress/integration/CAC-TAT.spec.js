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

        cy.contains('button', 'Enviar')
            .should('be.visible')
            .click()

        cy.get('.success')
            .should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        const textoLongo = 'LOREM IPSUMLOREM IPSUMLOREM IPSUMLOREM IPSUMLOREM IPSUMLOREM IPSUMLOREM IPSUMLOREM IPSUMLOREM IPSUMLOREM IPSUMLOREM IPSUMLOREM IPSUMLOREM IPSUMLOREM IPSUMLOREM IPSUMLOREM IPSUMLOREM IPSUMLOREM IPSUMLOREM IPSUMLOREM IPSUMLOREM IPSUM'
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
            .type( textoLongo, {delay: 0} )
            .should('have.value', textoLongo)

        cy.contains('button', 'Enviar')
            .should('be.visible')
            .click()

        cy.get('.error')
            .should('be.visible')
    })

    it('tenta inserir texto no campo telefone e valida que nao foi inserido', function () {

        cy.get('#phone')
            .should('be.visible')
            .type('um texto qualquer')
            .should('have.value', '')
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
            .check()

        cy.contains('button', 'Enviar')
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
            .should('have.value', '')

        cy.get('#lastName')
            .should('be.visible')
            .type('Duarte')
            .should('have.value', 'Duarte')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .should('be.visible')
            .type('gabrielzito@qa.com.br')
            .should('have.value', 'gabrielzito@qa.com.br')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .should('be.visible')
            .type('123456789')
            .should('have.value', '123456789')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar')
            .should('be.visible')
            .click()

        cy.get('.error')
            .should('be.visible')
    })

    it('envia o formulário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit('gabriel', 'ribeiro', 'das@dsa.com')
    })

    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product')
            .select('youtube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o ultimo, usando chai.js', function () {
        cy.get('input[type="checkbox"]')
            .as('checkboxes')
            .check()

        cy.get('@checkboxes')
            .each(checkbox => {
                expect(checkbox[0].checked).to.equal(true)
            })

        cy.get('@checkboxes')
            .last()
            .uncheck()
    })

    it('marca ambos checkboxes, depois desmarca o ultimo, sem alias e sem chai.js', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
    })

    it('seleciona um arquivo da pasta fixture, realizando upload', function() {      
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/teste.txt')
            .then(input => {
                expect(input[0].files[0].name).to.equal('teste.txt')
            })
    })

    it('seleciona um arquivo da pasta fixture, realizando upload com drag and drop', function() {      
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/teste.txt', 
            { action: 'drag-drop'})
            .then(input => {
                expect(input[0].files[0].name).to.equal('teste.txt')
            })
    })

    it.skip('seleciona multiplos arquivos, realizando upload com drag and drop', function() {      
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile([
                'cypress/fixtures/teste.txt', 
                'cypress/fixtures/example.json'
            ], { action: 'drag-drop'})
            .then(input => {
                expect(input[0].files[0].name).to.equal('teste.txt')
                expect(input[0].files[1].name).to.equal('example.json')
            })

            //not working in this cypress version, fixed in 9.4 version, so we'll skip this.
    })

    it.only('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {      
        cy.fixture('teste.txt')
            .as('testetxt')
            
        cy.get('input[type="file"]')
            .selectFile('@testetxt', 
            { action: 'drag-drop'})
            .then(input => {
                expect(input[0].files[0].name).to.equal('teste.txt')
            })
    })


})
