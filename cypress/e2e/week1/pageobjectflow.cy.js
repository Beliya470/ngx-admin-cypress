describe("Page Object Design Pattern Test Suite", () => {
    beforeEach(() => {
      // Increase the default command timeout for this test
      Cypress.config("defaultCommandTimeout", 10000)
      cy.openHomePage()
    })
  
    it("Verify navigation to all app sections", () => {
      cy.origin("https://demo.akveo.com", () => {
        // Increase the default command timeout for this test
        Cypress.config("defaultCommandTimeout", 10000)
  
        // Define all the navigation functions directly inside the callback
        function selectGroupMenuItem(groupName) {
          // Based on the menu HTML structure, find and click the menu item
          cy.get(".menu-items", { timeout: 10000 }).contains(".menu-title", groupName).click({ force: true })
          cy.wait(1000)
        }
  
        function navigateToFormLayoutsPage() {
          selectGroupMenuItem("Forms")
          // Find the Form Layouts menu item by its title attribute
          cy.get('a[title="Form Layouts"]', { timeout: 10000 }).click({ force: true })
          cy.wait(1000)
        }
  
        function navigateToDatepickerPage() {
          selectGroupMenuItem("Forms")
          // Find the Datepicker menu item by its title attribute
          cy.get('a[title="Datepicker"]', { timeout: 10000 }).click({ force: true })
          cy.wait(1000)
        }
  
        function navigateToSmartTablePage() {
          selectGroupMenuItem("Tables & Data")
          cy.contains("Smart Table", { timeout: 10000 }).click({ force: true })
          cy.wait(1000)
        }
  
        function navigateToToasterPage() {
          selectGroupMenuItem("Modal & Overlays")
          cy.contains("Toastr", { timeout: 10000 }).click({ force: true })
          cy.wait(1000)
        }
  
        function navigateToTooltipPage() {
          selectGroupMenuItem("Modal & Overlays")
          cy.contains("Tooltip", { timeout: 10000 }).click({ force: true })
          cy.wait(1000)
        }
  
        // Execute the navigation functions
        navigateToFormLayoutsPage()
        navigateToDatepickerPage()
        navigateToSmartTablePage()
        navigateToToasterPage()
        navigateToTooltipPage()
      })
    })
  
    it("Submit inline and basic forms, pick dates, and interact with smart table", () => {
      cy.origin("https://demo.akveo.com", () => {
        // Increase the default command timeout for this test
        Cypress.config("defaultCommandTimeout", 10000)
  
        // Define all the necessary functions directly inside the callback
        // Navigation functions
        function selectGroupMenuItem(groupName) {
          // Based on the menu HTML structure, find and click the menu item
          cy.get(".menu-items", { timeout: 10000 }).contains(".menu-title", groupName).click({ force: true })
          cy.wait(1000)
        }
  
        function navigateToFormLayoutsPage() {
          selectGroupMenuItem("Forms")
          // Find the Form Layouts menu item by its title attribute
          cy.get('a[title="Form Layouts"]', { timeout: 10000 }).click({ force: true })
          cy.wait(1000)
        }
  
        function navigateToDatepickerPage() {
          selectGroupMenuItem("Forms")
          // Find the Datepicker menu item by its title attribute
          cy.get('a[title="Datepicker"]', { timeout: 10000 }).click({ force: true })
          cy.wait(1000)
        }
  
        function navigateToSmartTablePage() {
          selectGroupMenuItem("Tables & Data")
          cy.contains("Smart Table", { timeout: 10000 }).click({ force: true })
          cy.wait(1000)
        }
  
        // Form functions
        function submitInlineFormWithNameAndEmail(name, email) {
          cy.contains("nb-card", "Inline form", { timeout: 10000 }).then((card) => {
            // Find the form element within the card
            cy.wrap(card)
              .find("form")
              .within(() => {
                cy.get('[placeholder="Jane Doe"]').type(name, { force: true })
                cy.get('[placeholder="Email"]').type(email, { force: true })
                cy.get('[type="checkbox"]').check({ force: true })
                // Use click on the submit button instead of form.submit()
                cy.get('button[type="submit"]').click({ force: true })
              })
          })
        }
  
        function submitBasicFormWithEmailAndPassword(email, password) {
          cy.contains("nb-card", "Basic form", { timeout: 10000 }).then((card) => {
            // Find the form element within the card
            cy.wrap(card)
              .find("form")
              .within(() => {
                cy.get('[placeholder="Email"]').type(email, { force: true })
                cy.get('[placeholder="Password"]').type(password, { force: true })
                cy.get('[type="checkbox"]').check({ force: true })
                // Use click on the submit button instead of form.submit()
                cy.get('button[type="submit"]').click({ force: true })
              })
          })
        }
  
        // Datepicker functions
        function selectCommonDatepickerDateFromToday(daysFromToday) {
          cy.contains("nb-card", "Common Datepicker", { timeout: 10000 })
            .find("input")
            .then((input) => {
              cy.wrap(input).click({ force: true })
  
              const futureDate = new Date()
              futureDate.setDate(futureDate.getDate() + daysFromToday)
              const day = futureDate.getDate()
              const dateAssert = futureDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
  
              cy.get("nb-calendar-day-picker", { timeout: 10000 })
                .contains("nb-calendar-day-cell", day)
                .click({ force: true })
              cy.wrap(input).should("have.value", dateAssert)
            })
        }
  
        function selectDatepickerWithRangeFromToday(start, end) {
          cy.contains("nb-card", "Datepicker With Range", { timeout: 10000 })
            .find("input")
            .then((input) => {
              cy.wrap(input).click({ force: true })
  
              const startDate = new Date()
              const endDate = new Date()
              startDate.setDate(startDate.getDate() + start)
              endDate.setDate(endDate.getDate() + end)
  
              const format = { month: "short", day: "numeric", year: "numeric" }
              const startString = startDate.toLocaleDateString("en-US", format)
              const endString = endDate.toLocaleDateString("en-US", format)
  
              const expectedRange = `${startString} - ${endString}`
  
              cy.get(".day-cell:not(.bounding-month)", { timeout: 10000 })
                .contains(startDate.getDate().toString())
                .click({ force: true })
              cy.get(".day-cell:not(.bounding-month)", { timeout: 10000 })
                .contains(endDate.getDate().toString())
                .click({ force: true })
  
              cy.wrap(input).should("have.value", expectedRange)
            })
        }
  
        // Smart table functions
        function addNewRecordWithFirstAndLastName(firstName, lastName) {
          cy.get("thead", { timeout: 10000 }).find(".nb-plus").click({ force: true })
          cy.get("thead tr", { timeout: 10000 })
            .eq(2)
            .then((row) => {
              cy.wrap(row).find('[placeholder="First Name"]').type(firstName, { force: true })
              cy.wrap(row).find('[placeholder="Last Name"]').type(lastName, { force: true })
              cy.wrap(row).find(".nb-checkmark").click({ force: true })
            })
  
          cy.get("tbody tr", { timeout: 10000 })
            .first()
            .find("td")
            .then((cells) => {
              cy.wrap(cells).eq(2).should("contain", firstName)
              cy.wrap(cells).eq(3).should("contain", lastName)
            })
        }
  
        function updateAgeByFirstName(name, age) {
          cy.get("tbody tr", { timeout: 10000 }).each((row) => {
            cy.wrap(row)
              .find("td")
              .eq(2)
              .then(($cell) => {
                if ($cell.text().includes(name)) {
                  cy.wrap(row).find(".nb-edit").click({ force: true })
                  cy.wrap(row).find('[placeholder="Age"]').clear({ force: true }).type(age, { force: true })
                  cy.wrap(row).find(".nb-checkmark").click({ force: true })
                  cy.wrap(row).find("td").eq(6).should("contain", age)
                }
              })
          })
        }
  
        function deleteRowByIndex(index) {
          cy.get("tbody tr", { timeout: 10000 }).eq(index).find(".nb-trash").click({ force: true })
          cy.on("window:confirm", () => true)
        }
  
        // Execute the test steps
        navigateToFormLayoutsPage()
        submitInlineFormWithNameAndEmail("Anne", "anne@test.com")
        submitBasicFormWithEmailAndPassword("beliya@test.com", "SecurePass123")
  
        navigateToDatepickerPage()
        selectCommonDatepickerDateFromToday(1)
        selectDatepickerWithRangeFromToday(7, 14)
  
        navigateToSmartTablePage()
        addNewRecordWithFirstAndLastName("Artem", "Bondar")
        updateAgeByFirstName("Artem", "35")
        deleteRowByIndex(1)
      })
    })
  })
  