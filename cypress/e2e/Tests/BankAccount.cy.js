import { default as OnboardingPage } from "../../Pages/OnboardingPage"
import { default as HomePage_authenticatedUser } from "../../Pages/HomePage_authenticatedUser"
import { default as BankAccountsPage } from "../../Pages/BankAccountsPage"
describe("bank account",function(){
    let user0
    const GraphplApi = Cypress.env("ApiUrl")+"/graphql";
    this.beforeEach(function(){

        
        cy.Login_session("Katharina_Bernier","s3cret")
        cy.fixture('fakeUsers').then((data)=>{
            cy.log(data[0])
            user0=data[0]
        })

        cy.intercept("POST", GraphplApi, (req) => {
            const { body } = req;
      
            if (body.hasOwnProperty("operationName") && body.operationName === "ListBankAccount") {
              req.alias = "gqlListBankAccountQuery";
            }
      
            if (body.hasOwnProperty("operationName") && body.operationName === "CreateBankAccount") {
              req.alias = "gqlCreateBankAccountMutation";
            }
      
            if (body.hasOwnProperty("operationName") && body.operationName === "DeleteBankAccount") {
              req.alias = "gqlDeleteBankAccountMutation";
            }
        })
    })

    

    const homePage_AuthUser = new HomePage_authenticatedUser()
    const OnboardingPgObj = new OnboardingPage()
    const BankAccountsPgObj = new BankAccountsPage()
    it("adding and removing bank account",function(){
        
        cy.visit(Cypress.env("BaseUrl"))
        // enter the bank account list
        homePage_AuthUser.sidenav_bankaccounts().click()
        cy.wait("@gqlListBankAccountQuery");
        cy.location("pathname").should("eq", "/bankaccounts");
        // check the addition of baank
        let bankAccountNumbBeforeAdd 
        BankAccountsPgObj.bankaccountitems().its('length').then((lenght)=>{ 
            bankAccountNumbBeforeAdd = lenght
            BankAccountsPgObj.createNewbtn().click()
            cy.location("pathname").should("eq", "/bankaccounts/new");
            OnboardingPgObj.FillNewBankForm(user0.BankName,user0.routingNumber,user0.accountNumber)
            cy.wait("@gqlCreateBankAccountMutation");
            BankAccountsPgObj.bankaccountitems().should("have.length", bankAccountNumbBeforeAdd+1)
                                        .eq(bankAccountNumbBeforeAdd).should("contain", user0.BankName);

        })
        //removing bank account
        homePage_AuthUser.sidenav_bankaccounts().click()
        cy.wait("@gqlListBankAccountQuery");
        cy.location("pathname").should("eq", "/bankaccounts");
        BankAccountsPgObj.bankaccountdelete().its('length').then((lenght)=>{
            BankAccountsPgObj.bankaccountdelete().eq(lenght-1).click()
            cy.wait("@gqlDeleteBankAccountMutation");
            BankAccountsPgObj.bankaccountitems().eq(lenght-1).should('contain', "(Deleted)")
        })
 
    })

    it("error display Bank account creation form",function(){
        cy.visit(Cypress.env("BaseUrl"))
        homePage_AuthUser.sidenav_bankaccounts().click() 
        cy.location("pathname").should("eq", "/bankaccounts");
        BankAccountsPgObj.createNewbtn().click()
        cy.location("pathname").should("eq", "/bankaccounts/new");
        // //****check BankName****
        OnboardingPgObj.bankNameTxbx().find("#bankaccount-bankName-input").clear().blur()
        OnboardingPgObj.TextHelper_bankName().should("be.visible").and("contain", "Enter a bank name")
        // enter 4 char only
        OnboardingPgObj.bankNameTxbx().find("#bankaccount-bankName-input").type("abcd").blur()
        OnboardingPgObj.TextHelper_bankName().should("be.visible").and("contain", "Must contain at least 5 characters")
        // enter 5 char +
        OnboardingPgObj.bankNameTxbx().find("#bankaccount-bankName-input").clear().type("abcde").blur()
        OnboardingPgObj.TextHelper_bankName().should("not.exist")
        // *save button remain disabled*
        OnboardingPgObj.saveBtnBankAcc().should("be.disabled")
        OnboardingPgObj.bankNameTxbx().find("#bankaccount-bankName-input").clear()
        // // ****check routing number****
        OnboardingPgObj.routingNumberTxbx().find("#bankaccount-routingNumber-input").clear().blur()
        OnboardingPgObj.TextHelper_routingNumber().should("be.visible").and("contain", "Enter a valid bank routing number")
        // Min 9 digits
        // enter number 8 digits
        OnboardingPgObj.routingNumberTxbx().find("#bankaccount-routingNumber-input").type("12345678").blur()
        OnboardingPgObj.TextHelper_routingNumber().should("be.visible").and("contain", "Must contain a valid routing number")
        OnboardingPgObj.routingNumberTxbx().find("#bankaccount-routingNumber-input").clear()
        // enter 9 digits
        OnboardingPgObj.routingNumberTxbx().find("#bankaccount-routingNumber-input").clear().type("123456789").blur()
        OnboardingPgObj.TextHelper_routingNumber().should("not.exist")
        // *save button remain disabled*
        OnboardingPgObj.saveBtnBankAcc().should("be.disabled")
        //***check Account number ***
        // Required field
        OnboardingPgObj.accountNumberTxbx().find("#bankaccount-accountNumber-input").clear().blur();
        OnboardingPgObj.TextHelper_accountNumber().should("be.visible").and("contain", "Enter a valid bank account number");
        // Min 9 digits & max 12
        // enter 8 digits
        OnboardingPgObj.accountNumberTxbx().find("#bankaccount-accountNumber-input").clear().type("12345678").blur();
        OnboardingPgObj.TextHelper_accountNumber().should("be.visible").and("contain", "Must contain at least 9 digits");
        // enter 9 digits
        OnboardingPgObj.accountNumberTxbx().find("#bankaccount-accountNumber-input").clear().type("123456789").blur();
        OnboardingPgObj.TextHelper_accountNumber().should("not.exist");
        // enter 12 gdigit
        OnboardingPgObj.accountNumberTxbx().find("#bankaccount-accountNumber-input").clear().type("123456789111").blur();
        OnboardingPgObj.TextHelper_accountNumber().should("not.exist");
        // enter more than 12 digits
        OnboardingPgObj.accountNumberTxbx().find("#bankaccount-accountNumber-input").clear().type("1234567891111").blur();
        OnboardingPgObj.TextHelper_accountNumber().should("be.visible").and("contain", "Must contain no more than 12 digits");
        // *save button remain disabled*
        OnboardingPgObj.saveBtnBankAcc().should("be.disabled")
        OnboardingPgObj.accountNumberTxbx().find("#bankaccount-accountNumber-input").clear()

        // save button enabled when all field are properly filled
        OnboardingPgObj.bankNameTxbx().find("#bankaccount-bankName-input").clear().type("abcde")
        OnboardingPgObj.routingNumberTxbx().find("#bankaccount-routingNumber-input").clear().type("123456789")
        OnboardingPgObj.accountNumberTxbx().find("#bankaccount-accountNumber-input").clear().type("123456789")
        OnboardingPgObj.saveBtnBankAcc().should("be.enabled")









        
    })
})