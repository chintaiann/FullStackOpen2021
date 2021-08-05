describe('Blog app',function () {
    beforeEach(function() {
        cy.request('POST','http://localhost:3003/api/testing/reset')
        
        const user = {
            name: 'taiann',
            username: 'taiann',
            password: 'password'
          }
          cy.request('POST', 'http://localhost:3003/api/users', user) 
          cy.visit('http://localhost:3000')

    })

    it('login form is shown',function (){
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
    })

    describe('multiple blogs', function (){
      beforeEach(function (){
        cy.get('#username').type('taiann')
        cy.get('#password').type('password')
        cy.contains('login').click()
      })

      it('posts are ordered in terms of like',function(){
        cy.get('#show').click()
        cy.get('#titleid').type('first title')
        cy.get('#authorid').type('first author')
        cy.get('#urlid').type('www.first.com')
        cy.get('#addblog').click()
        cy.get('#titleid').type('second title')
        cy.get('#authorid').type('second author')
        cy.get('#urlid').type('www.second.com')
        cy.get('#addblog').click()
        cy.get('#titleid').type('third title')
        cy.get('#authorid').type('third author')
        cy.get('#urlid').type('www.third.com')
        cy.get('#addblog').click()
        
        cy.contains('first title').parent().contains('Show').click()
        cy.contains('first title').parent().contains('Like!').click()

        cy.contains('third title').parent().contains('Show').click()
        cy.contains('third title').parent().contains('Like!').click()
        cy.contains('third title').parent().contains('Like!').click()

        cy.contains('second title').parent().contains('Show').click()
        cy.contains('second title').parent().contains('Like!').click()
        cy.contains('second title').parent().contains('Like!').click()
        cy.contains('second title').parent().contains('Like!').click()
        cy.contains('second title').parent().contains('Like!').click()
        cy.wait(500)

        cy.get(".blog").first().should("contain.text", 'first title')
        cy.get(".blog").last().should("contain.text", 'second title')



    })

  })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
          cy.get('#username').type('taiann')
          cy.get('#password').type('password')
          cy.contains('login').click()

          cy.get('html').should('contain', 'taiann logged in')
        })
    
        it('fails with wrong credentials', function() {
          cy.get('#username').type('taiann')
          cy.get('#password').type('wrongpassword')
          cy.contains('login').click()
          cy.get('html').should('not.contain', 'taiann logged in')
        })
      })


    describe('when logged in', function (){
        beforeEach(function (){
          cy.get('#username').type('taiann')
          cy.get('#password').type('password')
          cy.contains('login').click()
        })

        it('blog can be created',function (){
            cy.get('#show').click()
            cy.get('#titleid').type('first title')
            cy.get('#authorid').type('first author')
            cy.get('#urlid').type('www.first.com')
            cy.get('#addblog').click()
            cy.get('html').should('contain', 'first title by first author')
        })

        it('created blog can be liked',function(){
            cy.get('#show').click()
            cy.get('#titleid').type('first title')
            cy.get('#authorid').type('first author')
            cy.get('#urlid').type('www.first.com')
            cy.get('#addblog').click()
            cy.contains('Show').click()
            cy.contains('Like!').click()
            cy.get('html').should('contain','first title by first author has 1 likes!')
            cy.contains('Like!').click()
            cy.get('html').should('contain','first title by first author has 2 likes!')
        })

        it('user can delete his own blog', function (){
            cy.get('#show').click()
            cy.get('#titleid').type('first title')
            cy.get('#authorid').type('first author')
            cy.get('#urlid').type('www.first.com')
            cy.get('#addblog').click()
            cy.contains('Show').click()
            cy.contains('Delete this blog.').click()
            cy.get('html').should('not.contain', 'first title by first author')
        })
    })

     
})

