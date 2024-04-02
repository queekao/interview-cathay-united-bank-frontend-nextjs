describe('E2E Template Spec', () => {
  it('runs', () => {
    cy.viewport(1440, 720) // Sets the dimensions to a desktop view
    cy.visit('/')
  })
})
