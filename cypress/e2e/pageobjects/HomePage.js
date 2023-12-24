///<reference types="cypress"/>

class HomePage {
  getEntrepreneurRadio() {
    return cy.get("#inlineRadio3");
  }
}
export default HomePage;
