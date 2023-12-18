/// <reference types="cypress" />

describe("Demo App Login", () => {
  const login = () => {
    cy.session("login", () => {
      cy.visit("https://katalon-demo-cura.herokuapp.com/");
      cy.contains("Make Appointment").click();
      cy.fixture("login").then((login) => {
        cy.get("input#txt-username").type(login.userName);
        cy.get("input#txt-password").type(login.password);
        cy.get("button#btn-login").click();
      });
    });
  };
  beforeEach(() => {
    login();
    cy.visit("https://katalon-demo-cura.herokuapp.com/");
  });
  it("Perform User Login", () => {
    cy.screenshot("appLoadPage", {
      capture: "fullPage",
    });
  });
});
