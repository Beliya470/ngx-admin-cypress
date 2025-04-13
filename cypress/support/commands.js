// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
Cypress.Commands.add("openHomePage", () => {
    // First visit the landing page
    cy.visit("https://akveo.github.io/ngx-admin/")
  
    // Click the Demo button to access the themes page
    cy.contains("Demo").click()
  
    // Handle the cross-origin navigation
    cy.origin("https://demo.akveo.com", () => {
      // Wait for the themes page to load
      cy.wait(2000)
  
      // Click specifically on the Material Light theme
      cy.contains("Material Light").click()
  
      // Wait for the application to load
      cy.wait(5000)
    })
  })
  
  // -- This is a child command --
  // Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
  //
  // -- This is a dual command --
  // Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
  //
  // -- This will overwrite an existing command --
  // Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
  