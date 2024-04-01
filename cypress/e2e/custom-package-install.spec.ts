import CreatePackagePage from '../pages/create-package-page'
import DeployMenu from '../pages/deploy-menu.page'
import DeviceDetailsPage from '../pages/device-details.page'
import DevicesListPage from '../pages/devices-list.page'
import NavBar from '../pages/nav-bar.page'
import PackagesPage from '../pages/packages-page'
import DeviceInfo from '../utils/device-info'
import { Connect } from 'support'

const connect = new Connect()

describe('Custom package install', () => {
  const customPackageName = 'test package installer 12345'
  const customPackageDescription = 'test package made in cypress tests'
  const customPackageVersion = '12'
  const customPackageTimeout = '1'
  const customPackageFilename = 'hello.exe'
  const customePackageScriptFilename = 'hello-world.ps1'
  const customPackageFile = './cypress/resources/' + customPackageFilename
  const customPackageScriptFile = './cypress/resources/' + customePackageScriptFilename
  const customPackageExitcode = '420'
  const customPackageParameter = '/S'
  const customPackageStepname = 'step 1 run hello world'
  before(() => {
    cy.loginAsTestUser()
  })

  beforeEach(() => {
    cy.loginAsTestUser()
    cy.visit('/')
  })

  it('Can create a custom package', () => {
     // create custom package
     connect.navBar.openPackages()
     connect.packagesPage.createPackageButton.click()
     connect.createPackagePage.fillPackageInfo(
       customPackageName,
       customPackageDescription,
       customPackageVersion,
       customPackageTimeout
     )
     connect.createPackagePage.createPackageStep(
       customPackageFile,
       customPackageExitcode,
       customPackageParameter,
       customPackageStepname
     )
     connect.createPackagePage.saveButton.click()
     cy.wait(500)
     cy.get('.MuiLoadingButton-loadingIndicator').should('not.exist');

  })

  it('Custom package saved correctly and delete new package', () => {
    connect.navBar.openPackages()
    connect.packagesPage.searchBox.click().type(customPackageName)
    connect.packagesPage.packagesGrid.contains(customPackageName).click()

    connect.createPackagePage.verifyPackage(
      customPackageName,
      customPackageDescription,
      customPackageVersion,
      customPackageTimeout,
      )

      connect.createPackagePage.verifyPackageStep(
      customPackageFilename,
      customPackageExitcode,
      customPackageParameter,
      customPackageStepname

    )

    //delelete and reset data
    connect.navBar.openPackages()
    connect.packagesPage.searchBox.click().type(customPackageName)
    connect.packagesPage.packagesGrid.contains(customPackageName).click()
    connect.createPackagePage.deletePackage()
    
  })

  it('Can create a package with multiple steps', () => {
    connect.navBar.openPackages()
    connect.packagesPage.createPackageButton.click()
    connect.createPackagePage.fillPackageInfo(
      customPackageName,
      customPackageDescription,
      customPackageVersion,
      customPackageTimeout
    )

    //install step
    connect.createPackagePage.createPackageStep(
      customPackageFile,
      customPackageExitcode,
      customPackageParameter,
      customPackageStepname
    )

    //script step
    connect.createPackagePage.createPackageStep(
      customPackageScriptFile,
      customPackageExitcode,
      customPackageParameter,
      customPackageStepname,
      true
    )
    connect.createPackagePage.saveButton.click()
    cy.wait(500)
    cy.get('.MuiLoadingButton-loadingIndicator').should('not.exist');

    //delelete and reset data
    connect.navBar.openPackages()
    connect.packagesPage.searchBox.click().type(customPackageName)
    connect.packagesPage.packagesGrid.contains(customPackageName).click()
    connect.createPackagePage.deletePackage()
  })

})
