///<reference types="cypress"/>

class CartsPage {
  getCheckoutButton() {
    return cy.get("button[class='btn btn-success']");
  }
}
export default CartsPage;
