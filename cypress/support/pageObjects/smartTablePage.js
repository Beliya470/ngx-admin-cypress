export class SmartTablePage {
    updateAgeByFirstName(name, age) {
      cy.get("tbody tr").each((row) => {
        cy.wrap(row)
          .find("td")
          .eq(2)
          .then(($cell) => {
            if ($cell.text().includes(name)) {
              cy.wrap(row).find(".nb-edit").click()
              cy.wrap(row).find('[placeholder="Age"]').clear().type(age)
              cy.wrap(row).find(".nb-checkmark").click()
              cy.wrap(row).find("td").eq(6).should("contain", age)
            }
          })
      })
    }
  
    addNewRecordWithFirstAndLastName(firstName, lastName) {
      cy.get("thead").find(".nb-plus").click()
      cy.get("thead tr")
        .eq(2)
        .then((row) => {
          cy.wrap(row).find('[placeholder="First Name"]').type(firstName)
          cy.wrap(row).find('[placeholder="Last Name"]').type(lastName)
          cy.wrap(row).find(".nb-checkmark").click()
        })
  
      cy.get("tbody tr")
        .first()
        .find("td")
        .then((cells) => {
          cy.wrap(cells).eq(2).should("contain", firstName)
          cy.wrap(cells).eq(3).should("contain", lastName)
        })
    }
  
    deleteRowByIndex(index) {
      cy.get("tbody tr").eq(index).find(".nb-trash").click()
      cy.on("window:confirm", () => true)
    }
  }
  
  export const smartTablePage = new SmartTablePage()
  