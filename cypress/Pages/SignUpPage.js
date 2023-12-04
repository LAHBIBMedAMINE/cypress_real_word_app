class SignUpPage 
{
    firstNameTxBx(){
        return cy.getBySel("signup-first-name")
    }
    
    LastNameTxBx(){
        return cy.getBySel("signup-last-name")
    }
    
    UserNameTxBx(){
        return cy.getBySel("signup-username")
    }
    PasswordTxBx(){
        return cy.getBySel("signup-password")
    }
    confirmPasswordTxBx(){
        return cy.getBySel("signup-confirmPassword")
    }
    
    SignUpBtn(){
        return cy.getBySel("signup-submit")
    }

    signUpTitle(){
        return cy.getBySel("signup-title")
    }

    TextHelper_firstName(){
        return this.firstNameTxBx().find("#firstName-helper-text")
    }
    TextHelper_LastName(){
        return this.LastNameTxBx().find("#lastName-helper-text")
    }
    TextHelper_UserName(){
        return this.UserNameTxBx().find("#username-helper-text")
    }
    TextHelper_Password(){
        return this.PasswordTxBx().find("#password-helper-text")
    }
    TextHelper_confirmPassword(){
        return this.confirmPasswordTxBx().find("#confirmPassword-helper-text")
    }





    signUp(firstName,LastName,userName,password){
        this.firstNameTxBx().type(firstName)
        this.LastNameTxBx().type(LastName)
        this.UserNameTxBx().type(userName)
        this.PasswordTxBx().type(password)
        this.confirmPasswordTxBx().type(password)
        this.SignUpBtn().click()
    }



}
export default SignUpPage