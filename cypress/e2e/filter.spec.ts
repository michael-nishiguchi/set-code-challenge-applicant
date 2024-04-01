import DeployMenu from '../pages/deploy-menu.page'
import DevicesListPage from '../pages/devices-list.page'
import FilterModal from '../pages/filter-modal'
import DeviceInfo from '../utils/device-info'
import { filter } from 'cypress/types/bluebird'

const devicesListPage = new DevicesListPage()
const filterModal = new FilterModal()
describe('filter', () => {
  let deviceInfo: DeviceInfo

  before(() => {
    cy.loginAsTestUser()
  })

  beforeEach(() => {
    cy.loginAsTestUser()
    devicesListPage.load()
    cy.get('#debug-header').click()
    cy.get('button').contains('Reset fixed demo data').click()
  })

  it('Can create a filter', () => {
    devicesListPage.openFilterModal()
    filterModal.fillTextFilter('0', 'Software', 'Name', 'contains', 'empty memory')
    filterModal.applyFilter()
    filterModal.verifyFilter
  })

  it('Can save a group', () => {
    let groupName = 'empty memory dummy data'
    devicesListPage.openFilterModal()
    filterModal.fillTextFilter('0', 'Software', 'Name', 'contains', 'empty memory')
    filterModal.saveGroup(groupName)
    devicesListPage.getGroupTab(groupName)
    filterModal.verifyFilter
  })
})
