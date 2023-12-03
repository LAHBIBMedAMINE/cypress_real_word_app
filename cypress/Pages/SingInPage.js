class SingInPage
{
    usernameTxBx(){
        return cy.getBySel('signin-username')
    }

    passwordTxBx(){
        return cy.getBySel('signin-password')
    }

    SignInBtn(){
        return cy.getBySel("signin-submit")
    }

    SignUpLink(){
        return cy.getBySel('signup')  
    }

    RememberMe(){
        return cy.getBySel('signin-remember-me')  
    }

    errorMessage(){
        return cy.getBySel("signin-error")
    }
    TextHelper_UserName(){
        return cy.getBySel('signin-username').find("#username-helper-text")
    }

    TextHelper_password(){
        return cy.getBySel('signin-password').find("#password-helper-text")
    }

    Login_UI(username,passord, rememberUser = false ){
        const signinPath = Cypress.env("BaseUrl")+"/signin";

        // any time we call this function it should be on /singin page

        cy.location("pathname").then((currentPath)=>{
            if (currentPath !== signinPath){ cy.visit(signinPath)}
        })
        
        //filling the form 
        this.usernameTxBx().type(username)
        this.passwordTxBx().type(passord)

        //cookies
        if(rememberUser){
            this.RememberMe().find("input").click()
        }
        //intercept the request and check the response
        cy.intercept("POST", "/login").as("loginUser");

        this.SignInBtn().click()
        
        cy.wait("@loginUser").then((loginUser)=>{
            if (loginUser.response.statusCode == 200){
                cy.log(loginUser.response.statusCode,loginUser.response.body.user.id,loginUser.response.body.user.username)
            }else{
                cy.log(loginUser.response.statusCode)
            }
                    
            })

    

 
        





    }


    



}
export default SingInPage