describe('Blogs app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'test-user',
      username: 'test',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000/')
  })

  it('Login form is shown', function() {
    cy.contains('show login').click()
    cy.get('#login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('show login').click()
      cy.get('#username').type('test')
      cy.get('#password').type('password')
      cy.get('#submitLogin').click()
      cy.contains('logout')
    })

    it('fails with correct credentials', function() {
      cy.contains('show login').click()
      cy.get('#username').type('wrongusername')
      cy.get('#password').type('wrongpassword')
      cy.get('#submitLogin').click()
      cy.contains('Login failed!').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})