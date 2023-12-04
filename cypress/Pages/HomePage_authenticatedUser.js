class HomePage_authenticatedUser {

sidenav(){
    return cy.getBySel("sidenav-signout")
}

signOut(){
    this.sidenav().click()
}


sidenav_user_full_name(){
    return cy.getBySel("sidenav-user-full-name")
}
sidenav_username(){
    return cy.getBySel("sidenav-username")
}





    



















}
export default HomePage_authenticatedUser