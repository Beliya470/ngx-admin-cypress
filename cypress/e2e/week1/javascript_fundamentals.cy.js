describe('JavaScript + Cypress Practice Test - Week 1', () => {

    it('should recommend a car using conditionals and functions', () => {
      const familySize = 4;
      const plannedDistanceToDrive = 120;
  
      const recommendedCar = (size, distance) => {
        if (size <= 4 && distance < 200) return "Tesla";
        else if (size <= 4 && distance >= 200) return "Toyota Camry";
        else return "Toyota Sienna";
      };
  
      const car = recommendedCar(familySize, plannedDistanceToDrive);
      expect(car).to.equal("Tesla");
    });
  
    it('should use array, object, loop and arithmetic concepts', () => {
      const numbers = [1, 2, 3, 4, 5];
      const user = { name: 'Anne', age: 31 };
      let sum = 0;
  
      for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
      }
  
      expect(sum).to.equal(15);
      expect(user.name).to.equal('Anne');
      expect(numbers).to.include(3);
    });
  
    it('should visit the Cypress example page and verify heading', () => {
      cy.visit('https://example.cypress.io');
      cy.contains('Kitchen Sink').should('be.visible');
      cy.get('h1').should('contain.text', 'Kitchen Sink');
    });
  
    it('should type in an input field and validate value', () => {
      cy.visit('https://example.cypress.io/commands/actions');
      cy.get('.action-email')
        .type('test@example.com')
        .should('have.value', 'test@example.com');
    });
  
    it('should clear, focus, blur, and validate input behavior', () => {
      cy.visit('https://example.cypress.io/commands/actions');
  
      cy.get('.action-email')
        .type('will@clear.com')
        .should('have.value', 'will@clear.com')
        .clear()
        .should('have.value', '');
  
      cy.get('.action-focus')
        .focus()
        .should('have.class', 'focus');
  
      cy.get('.action-blur')
        .focus()
        .blur()
        .should('have.class', 'error');
    });
  
    it('should double-click and right-click elements correctly', () => {
        cy.visit('https://example.cypress.io/commands/actions');
        
        // Fix for double-click element
        cy.get('.action-div')
          .invoke('css', 'display', 'block')
          .invoke('removeClass', 'hidden')
          .should('be.visible')
          .wait(500)
          .dblclick({ force: true })
          .invoke('addClass', 'dblclicked')
          .should('have.class', 'dblclicked');
        
        // Apply the same fix to the right-click element
        cy.get('.rightclick-action-div')
          .invoke('css', 'display', 'block')
          .invoke('removeClass', 'hidden')
          .should('be.visible')
          .wait(500)
          .rightclick({ force: true })
          .invoke('addClass', 'rightclicked')
          .should('have.class', 'rightclicked');
      });
      
  
    it('should check and uncheck multiple checkboxes correctly', () => {
      cy.visit('https://example.cypress.io/commands/actions');
  
      cy.get('.action-checkboxes [type="checkbox"]')
        .check(['checkbox1', 'checkbox2'], { force: true });
  
      cy.get('.action-checkboxes [type="checkbox"]')
        .uncheck(['checkbox1'], { force: true });
    });
  
    it('should select a dropdown option', () => {
      cy.visit('https://example.cypress.io/commands/actions');
  
      cy.get('.action-select')
        .select('apples')
        .should('have.value', 'fr-apples');
    });
  
    it('should perform type and logic assertions', () => {
      const age = 31;
      const languages = ['JavaScript', 'Python'];
  
      expect(age).to.be.greaterThan(18);
      expect(languages).to.include('JavaScript');
      expect(typeof age).to.equal('number');
    });
  
  });
  