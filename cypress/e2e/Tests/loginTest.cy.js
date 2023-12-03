/// <reference types="Cypress" />

import { default as SingInPage } from "../../Pages/SingInPage"
import { default as HomePage_authenticatedUser } from "../../Pages/HomePage_authenticatedUser"

describe("loginTests",function(){
    this.beforeEach(function(){
        cy.visit(Cypress.env("BaseUrl"))
    })
    


    const SingInPgObj = new SingInPage()
    const homePage_AuthUser = new HomePage_authenticatedUser()

    it("login with valid cridentiel",function(){
        
        
        SingInPgObj.Login_UI("Katharina_Bernier","s3cret", true)
        homePage_AuthUser.sidenav().should('be.visible')
        SingInPgObj.errorMessage().should('not.exist')
 
    })

    it("should redirect unauthenticated user to signin page", function () {
        cy.visit(Cypress.env("BaseUrl")+"/personal");
        cy.location("pathname").should("equal", "/signin");
      })

    it("login with unvalid cridentiel",function(){
        SingInPgObj.Login_UI("wrong_user","wrong_password", true)
        homePage_AuthUser.sidenav().should('not.exist')
        SingInPgObj.errorMessage().should('be.visible').and("have.text", "Username or password is invalid")
    })

    it("showing textHelper",function(){
        SingInPgObj.usernameTxBx().find("#username").clear().blur()
        SingInPgObj.TextHelper_UserName().should('be.visible').and("have.text","Username is required")

        const passwords = ["abc","abcd"]

        passwords.forEach(function(password, index, array){
            SingInPgObj.passwordTxBx().find("#password").clear().type(password).blur()
            if (password.length < 4){
                SingInPgObj.TextHelper_password().should('be.visible').and("have.text","Password must contain at least 4 characters")
            }else{
                SingInPgObj.TextHelper_password().should('not.exist')
            }
        })
    })

    it.only("Sign in enable/disable",function(){
        // check for  user name input only
        SingInPgObj.usernameTxBx().type("Katharina_Bernier")
        SingInPgObj.SignInBtn().should("be.disabled")
        // check for  password input only
        SingInPgObj.usernameTxBx().find("#username").clear()
        const passwords = ["abc","abcd"]
        passwords.forEach(function(password, index, array){
            SingInPgObj.passwordTxBx().find("#password").clear().type(password)
            if (password.length < 4){
                SingInPgObj.SignInBtn().should("be.disabled")
            }else{
                SingInPgObj.SignInBtn().should("be.disabled")
            }
        })

        // check for both
        SingInPgObj.usernameTxBx().type("Katharina_Bernier")
        passwords.forEach(function(password, index, array){
            SingInPgObj.passwordTxBx().find("#password").clear().type(password)
            if (password.length < 4){
                SingInPgObj.SignInBtn().should("be.disabled")
            }else{
                SingInPgObj.SignInBtn().should("be.enabled")
            }
        })


    })
































    })