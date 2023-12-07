class OnboardingPgae
{
    onboarding_dialog_title(){
        return cy.getBySel("user-onboarding-dialog-title")
    }
    
    
    onboarding_nextBtn(){
        return cy.getBySel("user-onboarding-next")
    }
    bankNameTxbx(){
        return cy.getBySel("bankaccount-bankName-input")
    }
    TextHelper_bankName(){
        return cy.getBySel("bankaccount-bankName-input").find("#bankaccount-bankName-input-helper-text")
    }

    routingNumberTxbx(){
        return cy.getBySel("bankaccount-routingNumber-input")
    }
    TextHelper_routingNumber(){
        return cy.getBySel("bankaccount-routingNumber-input").find("#bankaccount-routingNumber-input-helper-text")
    }
    accountNumberTxbx(){
        return cy.getBySel("bankaccount-accountNumber-input")
    }
    TextHelper_accountNumber(){
        return cy.getBySel("bankaccount-accountNumber-input").find("#bankaccount-accountNumber-input-helper-text")
    }
    saveBtnBankAcc(){
        return cy.getBySel("bankaccount-submit")
    }

    onboardingFinishFast(bankName,routingNumber,accountNumber){
        this.onboarding_nextBtn().click()
        this.onboarding(bankName,routingNumber,accountNumber)
        this.onboarding_dialog_title().click()
    
    }
    
    
    
    
    
    //// methodes
    FillNewBankForm(bankName,routingNumber,accountNumber){
        this.bankNameTxbx().type(bankName)
        this.routingNumberTxbx().type(routingNumber)
        this.accountNumberTxbx().type(accountNumber)
        this.saveBtnBankAcc().click()
    }




}
export default OnboardingPgae