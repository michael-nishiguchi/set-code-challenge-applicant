import DevicesListPage from '../pages/devices-list.page'
import General from '../pages/general-nav-page'

const general = new General()

const devicesListPage = new DevicesListPage()
describe('Authorization', () => {
  it('requires authorizations', () => {
    cy.visit('/')
    general.username
    general.password
  })

  it('logs in with test user', () => {
    cy.loginAsTestUser()
    devicesListPage.load()
  })


  it('log out affordance exists for users', () => {
    cy.loginAsTestUser()
    devicesListPage.load()
    general.logout
  })

  it('logs out', () => {
    //Can't test Auth0 Pages https://docs.cypress.io/guides/testing-strategies/auth0-authentication#What-you-ll-learn
    cy.loginAsTestUser()
    devicesListPage.load()
    general.logout.click()
    general.username
    general.password
  })
})
