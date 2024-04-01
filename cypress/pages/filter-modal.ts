class FilterModal {
  fillTextFilter(
    filterGroupId: string,
    category: string,
    field: string,
    operator: string,
    input?: string
  ) {
    let filterGroup = cy.get(`[data-testid=filter-${filterGroupId}`)

    fillFilterDropDowns(filterGroup, category, field, operator)

    if (input) {
      filterGroup.within(() => {
        filterGroup.get('[data-testid=filter-input-text]').type(input)
      })
    }
  }
  
  
 
  saveGroup(name: string) {
    cy.contains('Save as group').click()
    cy.get('[data-testid=create-group-name]').type(name)
    cy.get('[data-testid=save-group-button]').click()
  }

  applyFilter() {
    cy.get('[data-testid=apply-button]').click()
  }
  
  verifyFilter(){
    const badData = ["Dummy Data 1", "Dummy Data 2", "Dummy Data 3", "Dummy Data 4", "Dummy Data 5"]
  
    const assertions = badData.map(item => cy.contains(item).should('not.exist'));
    cy.wrap(assertions).each(assertion => assertion);
  }
}
const muiDropDownSelect = (category: string) => {
  cy.get('[class~="MuiMenu-list"]').within(() => {
    cy.contains(new RegExp('^' + category + '$', 'g')).click() //look for an exact match
  })
}

const fillFilterDropDowns = (
  filterGroup: Cypress.Chainable<JQuery<HTMLElement>>,
  category: string,
  field: string,
  operator: string
) => {
  filterGroup.within(() => {
    cy.get('[data-testid=filter-category-selector]').click()
  })

  muiDropDownSelect(category)

  filterGroup.within(() => {
    cy.get('[data-testid=filter-field-selector]').click()
  })

  muiDropDownSelect(field)

  filterGroup.within(() => {
    cy.get('[data-testid=filter-operator-selector]').click()
  })
  muiDropDownSelect(operator)
}
export default FilterModal
