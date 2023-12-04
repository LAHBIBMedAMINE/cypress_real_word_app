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
    routingNumberTxbx(){
        return cy.getBySel("bankaccount-routingNumber-input")
    }
    accountNumberTxbx(){
        return cy.getBySel("bankaccount-accountNumber-input")
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
    onboarding(bankName,routingNumber,accountNumber){
        this.bankNameTxbx().type(bankName)
        this.routingNumberTxbx().type(routingNumber)
        this.accountNumberTxbx().type(accountNumber)
        this.saveBtnBankAcc().click()
        
    }




}
export default OnboardingPgae