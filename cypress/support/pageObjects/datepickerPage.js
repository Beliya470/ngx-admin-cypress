export class DatepickerPage {
    selectCommonDatepickerDateFromToday(daysFromToday) {
      cy.contains("nb-card", "Common Datepicker")
        .find("input")
        .then((input) => {
          cy.wrap(input).click()
  
          const futureDate = new Date()
          futureDate.setDate(futureDate.getDate() + daysFromToday)
          const day = futureDate.getDate()
          const dateAssert = futureDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  
          cy.get("nb-calendar-day-picker").contains("nb-calendar-day-cell", day).click()
          cy.wrap(input).should("have.value", dateAssert)
        })
    }
  
    selectDatepickerWithRangeFromToday(start, end) {
      cy.contains("nb-card", "Datepicker With Range")
        .find("input")
        .then((input) => {
          cy.wrap(input).click()
  
          const startDate = new Date()
          const endDate = new Date()
          startDate.setDate(startDate.getDate() + start)
          endDate.setDate(endDate.getDate() + end)
  
          const format = { month: "short", day: "numeric", year: "numeric" }
          const startString = startDate.toLocaleDateString("en-US", format)
          const endString = endDate.toLocaleDateString("en-US", format)
  
          const expectedRange = `${startString} - ${endString}`
  
          cy.get(".day-cell:not(.bounding-month)").contains(startDate.getDate().toString()).click()
          cy.get(".day-cell:not(.bounding-month)").contains(endDate.getDate().toString()).click()
  
          cy.wrap(input).should("have.value", expectedRange)
        })
    }
  }
  
  export const datepickerPage = new DatepickerPage()
  