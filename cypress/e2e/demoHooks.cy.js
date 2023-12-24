///<reference types="cypress"/>
import HomePage from "./pageobjects/HomePage";
import CartsPage from "./pageobjects/CartsPage";

describe("Demo FW tests", () => {
  before(function () {
    cy.fixture("example").then((testData) => {
      this.testData = testData;
    });
  });

  it("FW Test - 1", () => {
    const homePage = new HomePage();
    cy.visit("https://rahulshettyacademy.com/angularpractice/");
    cy.get("input[name='name']").eq(0).type("Ishaan");
    cy.get("input[name='name']").should("have.attr", "name", "name");
    cy.get("input[name='name']").should("have.attr", "minlength", "2");
    homePage.getEntrepreneurRadio().should("be.disabled");
  });

  it("FW Test - 2", () => {
    const cartPage = new CartsPage();
    cy.visit("https://rahulshettyacademy.com/angularpractice/shop");
    cy.addProduct("iphone X");
    cy.get("li[class='nav-item active']>a").click();
    cartPage.getCheckoutButton().click();
    cy.get("#country").type("India");
    cy.get(".suggestions > ul > li > a").click();
    cy.get("input[value='Purchase']").click();
    cy.get("div[class*='alert-success'] > strong").should(
      "contain.text",
      "Success"
    );
  });
});
