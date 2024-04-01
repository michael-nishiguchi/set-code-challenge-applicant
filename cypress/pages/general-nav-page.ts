export default class General {
    get logout() {
      return cy.get('[data-testid="LogoutIcon"]')
    }
    get username() {
      return cy.get('#username')
    }
    get password() {
      return cy.get('#password')
    }
  }
  