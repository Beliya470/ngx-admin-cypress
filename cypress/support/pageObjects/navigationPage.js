import "cypress-wait-until"

export class NavigationPage {
  selectGroupMenuItem(groupName) {
    // Based on the screenshot, we can see the sidebar menu is visible
    // Let's try different selectors to find and click the menu item
    cy.get("body").then(($body) => {
      // Log what we see for debugging
      cy.log("Looking for menu item:", groupName)

      if ($body.find(".menu-sidebar span").filter((_, el) => el.textContent.includes(groupName)).length > 0) {
        cy.log("Found in .menu-sidebar")
        cy.get(".menu-sidebar").contains("span", groupName).click({ force: true })
      } else if ($body.find("nb-sidebar span").filter((_, el) => el.textContent.includes(groupName)).length > 0) {
        cy.log("Found in nb-sidebar")
        cy.get("nb-sidebar").contains("span", groupName).click({ force: true })
      } else if ($body.find("nb-menu span").filter((_, el) => el.textContent.includes(groupName)).length > 0) {
        cy.log("Found in nb-menu")
        cy.get("nb-menu").contains("span", groupName).click({ force: true })
      } else {
        cy.log("Using generic selector")
        cy.contains(groupName).click({ force: true })
      }
    })
    cy.wait(1000)
  }

  navigateToFormLayoutsPage() {
    this.selectGroupMenuItem("Forms")
    cy.contains("Form Layouts").click({ force: true })
    cy.wait(1000)
  }

  navigateToDatepickerPage() {
    this.selectGroupMenuItem("Forms")
    cy.contains("Datepicker").click({ force: true })
    cy.wait(1000)
  }

  navigateToSmartTablePage() {
    this.selectGroupMenuItem("Tables & Data")
    cy.contains("Smart Table").click({ force: true })
    cy.wait(1000)
  }

  navigateToToasterPage() {
    this.selectGroupMenuItem("Modal & Overlays")
    cy.contains("Toastr").click({ force: true })
    cy.wait(1000)
  }

  navigateToTooltipPage() {
    this.selectGroupMenuItem("Modal & Overlays")
    cy.contains("Tooltip").click({ force: true })
    cy.wait(1000)
  }
}

export const navigationPage = new NavigationPage()
