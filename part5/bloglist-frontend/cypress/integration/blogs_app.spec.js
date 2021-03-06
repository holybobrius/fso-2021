describe('Blogs app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'test-user',
      username: 'test',
      password: 'password'
    }
    const anotherUser = {
      name: 'test-user2',
      username: 'test2',
      password: 'password2'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.request('POST', 'http://localhost:3003/api/users', anotherUser)
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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('show login').click()
      cy.get('#username').type('test')
      cy.get('#password').type('password')
      cy.get('#submitLogin').click()
    })
    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('cypress-blog')
      cy.get('#author').type('cypress-author')
      cy.get('#url').type('cypress-url')
      cy.get('#submitBlog').click()
      cy.contains('cypress-blog cypress-author')
    })
  })

  describe('When logged in and added blog', function() {
    beforeEach(function() {
      cy.contains('show login').click()
      cy.get('#username').type('test')
      cy.get('#password').type('password')
      cy.get('#submitLogin').click()
      cy.contains('create new blog').click()
      cy.get('#title').type('cypress-blog')
      cy.get('#author').type('cypress-author')
      cy.get('#url').type('cypress-url')
      cy.get('#submitBlog').click()
      cy.contains('cypress-blog cypress-author')
    })
    it('a blog can be liked', function() {
      cy.contains('expand').click()
      cy.contains('like').click()
      cy.contains('likes 1')
    })
    it('user can delete the blog he added', function() {
      cy.contains('expand').click()
      cy.contains('delete').click()
      cy.get('.blog').should('have.length', 1)
    })
  })
  describe('When logged in and another user added blog', function() {
    beforeEach(function() {
      cy.contains('show login').click()
      cy.get('#username').type('test2')
      cy.get('#password').type('password2')
      cy.get('#submitLogin').click()
      cy.contains('create new blog').click()
      cy.get('#title').type('cypress-blog')
      cy.get('#author').type('cypress-author')
      cy.get('#url').type('cypress-url')
      cy.get('#submitBlog').click()
      cy.contains('logout').click()
      cy.contains('show login').click()
      cy.get('#username').type('test')
      cy.get('#password').type('password')
      cy.get('#submitLogin').click()
    })
    it('user cannot delete a blog added by another user', function() {
      cy.contains('expand').click()
      cy.contains('delete').click()
      cy.get('.blog').should('have.length', 1)
    })
  })
})