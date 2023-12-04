/// <reference types="Cypress" />

import { default as SingInPage } from "../../Pages/SingInPage"
import { default as HomePage_authenticatedUser } from "../../Pages/HomePage_authenticatedUser"
import { default as SignUpPage } from "../../Pages/SignUpPage"
import { default as OnboardingPage } from "../../Pages/OnboardingPage"

describe("testing signUp & login & logout", function(){
    let user0;
    const GraphplApi = Cypress.env("ApiUrl")+"/graphql";

    this.beforeEach(function(){
        cy.visit(Cypress.env("BaseUrl"))
        cy.intercept("POST", "/users").as("signup");
        cy.intercept("POST", GraphplApi, (req)=>{
            const {body} = req;
            // we look for the step of creation of bankAccount
            if (body.hasOwnProperty("operationName") && body.operationName === "CreateBankAccount") {
                req.alias = "CreateBankAccount";
              } 
        })
        cy.fixture('fakeUsers').then((data)=>{
            cy.log(data[0])
            user0=data[0]
        })
        
    })

    const SingInPgObj = new SingInPage()
    const homePage_AuthUser = new HomePage_authenticatedUser()
    const SingUpPgObj = new SignUpPage()
    const OnboardingPgObj = new OnboardingPage()

    it('TextHelper in signUp Page',function(){
        // signUp page
        SingInPgObj.SignUpLink().click()
        cy.location("pathname").should("eq", "/signup");

        //Firstname TextHelper
        SingUpPgObj.firstNameTxBx().find("#firstName").clear().blur()
        SingUpPgObj.TextHelper_firstName().should('be.visible').and("have.text","First Name is required")
        SingUpPgObj.firstNameTxBx().type("myName")
        // Sign Up remain disable
        SingUpPgObj.SignUpBtn().should("be.disabled")
        //Last Name TextHelper
        SingUpPgObj.LastNameTxBx().find("#lastName").clear().blur()
        SingUpPgObj.TextHelper_LastName().should('be.visible').and("have.text","Last Name is required")
        SingUpPgObj.LastNameTxBx().type("myLastName")
        // Sign Up remain disable
        SingUpPgObj.SignUpBtn().should("be.disabled")
        //UserName TextHelper
        SingUpPgObj.UserNameTxBx().find("#username").clear().blur()
        SingUpPgObj.TextHelper_UserName().should('be.visible').and("have.text","Username is required")
        SingUpPgObj.UserNameTxBx().type("myuserName")
        // Sign Up remain disable
        SingUpPgObj.SignUpBtn().should("be.disabled")
        // Password TextHelper
        SingUpPgObj.PasswordTxBx().find("#password").clear().blur()
        SingUpPgObj.TextHelper_Password().should('be.visible').and("have.text","Enter your password")
        // check for password lenght
        const passwords = ["abc","abcd"]
        passwords.forEach(function(password, index, array){
            SingUpPgObj.PasswordTxBx().find("#password").clear().type(password)
            
            if (password.length < 4){
                SingUpPgObj.TextHelper_Password().should('be.visible').and("have.text","Password must contain at least 4 characters")
            }else{
                SingUpPgObj.TextHelper_Password().should('not.exist')
            }
        })
        // Sign Up remain disable
        SingUpPgObj.SignUpBtn().should("be.disabled")
        // confirm password TextHelper
        SingUpPgObj.confirmPasswordTxBx().find("#confirmPassword").clear().blur()
        SingUpPgObj.TextHelper_confirmPassword().should('be.visible').and("have.text","Confirm your password")
        // check for password match
        passwords.forEach(function(password, index, array){
            SingUpPgObj.confirmPasswordTxBx().find("#confirmPassword").clear().type(password)
            if (password !== passwords[1] ){
                SingUpPgObj.TextHelper_confirmPassword().should('be.visible').and("have.text","Password does not match")
            }else{
                SingUpPgObj.TextHelper_confirmPassword().should('not.exist')
            }
        })
        // Sign Up should be enabled
        SingUpPgObj.SignUpBtn().should("be.enabled")
    })
    


    it('signUp',function(){
        SingInPgObj.SignUpLink().click()
        cy.location("pathname").should("eq", "/signup");
        SingUpPgObj.signUpTitle().should("be.visible").and("contain", "Sign Up");
        SingUpPgObj.signUp(user0.FirstName,user0.lastName,user0.userName,user0.password)
        cy.wait("@signup");
    })

    it("login & setup account", function(){
        //sinIn page
        cy.location("pathname").should("equal", "/signin");
        SingInPgObj.Login_UI(user0.userName,user0.password,false)
        // Onboarding
        OnboardingPgObj.onboarding_dialog_title().find("h2").contains("Get Started with Real World App")
        OnboardingPgObj.onboarding_nextBtn().click()
        OnboardingPgObj.onboarding_dialog_title().should("contain", "Create Bank Account")
        OnboardingPgObj.onboarding(user0.BankName,user0.routingNumber,user0.accountNumber)
        cy.wait('@CreateBankAccount')
        OnboardingPgObj.onboarding_dialog_title().find("h2").contains("Finished")
        OnboardingPgObj.onboarding_nextBtn().click()
        homePage_AuthUser.sidenav_user_full_name().should("have.text",user0.FirstName+" "+user0.lastName[0])
        homePage_AuthUser.sidenav_username().should("have.text","@"+user0.userName)
        homePage_AuthUser.signOut()
        cy.location("pathname").should("eq", "/signin");
    })

})