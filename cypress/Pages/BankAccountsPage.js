class BankAccountsPage
{
    createNewbtn(){
        return cy.getBySel("bankaccount-new")
    }

    bankaccountList(){
        return cy.getBySel("bankaccount-list")
    }
    bankaccountitems(){
        return cy.getBySelLike("bankaccount-list-item")
    }

    bankaccountdelete(){
        return cy.getBySel("bankaccount-delete")
    }
}
export default BankAccountsPage