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
    // Increase the default command timeout for this test
    Cypress.config("defaultCommandTimeout", 10000)
  
    // First visit the landing page
    cy.visit("https://akveo.github.io/ngx-admin/")
  
    // Click the Demo button to access the themes page
    cy.contains("Demo").click()
  
    // Handle the cross-origin navigation with a more robust approach
    cy.origin("https://demo.akveo.com", () => {
      // Increase the default command timeout for this test
      Cypress.config("defaultCommandTimeout", 10000)
  
      // Wait for the page to load
      cy.get("body", { timeout: 10000 }).should("be.visible")
  
      // Check the current URL to determine where we landed
      cy.url().then((url) => {
        cy.log(`Current URL: ${url}`)
  
        if (url.includes("/themes")) {
          // If we're on the themes page, click on Material Light
          cy.contains("Material Light", { timeout: 10000 }).click({ force: true })
        } else if (url.includes("/ngx-admin")) {
          // If we're already on the dashboard, we don't need to do anything
          cy.log("Already on the dashboard, skipping theme selection")
        } else {
          // If we're on an unknown page, try to navigate to the dashboard
          cy.log("Unknown page, attempting to navigate to dashboard")
          cy.visit("https://demo.akveo.com/ngx-admin/pages/dashboard", { failOnStatusCode: false })
        }
  
        // Wait for the application to load
        cy.get("body", { timeout: 15000 }).should("be.visible")
      })
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
  