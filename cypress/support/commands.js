import { default as SingInPage } from "../Pages/SingInPage"



const SingInPgObj = new SingInPage()


Cypress.Commands.add('getBySel',(selector,...args)=>{
    return cy.get(`[data-test=${selector}]`,...args)
})

Cypress.Commands.add("getBySelLike", (selector, ...args) => {
    return cy.get(`[data-test*=${selector}]`, ...args);
  });

Cypress.Commands.add('Login_session', (userName,Password)=>{
    const log = Cypress.log({
        name: "login",
        displayName: "LOGIN",
        message: [`🔐 Authenticating | ${userName}`],

        autoEnd: false,
      });
    cy.session(["user "+userName], ()=>{
        SingInPgObj.Login_UI(userName,Password)
    })

})