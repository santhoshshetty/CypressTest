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
    Cypress.b;
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
    cy.addProduct("Samsung Note 8");
    cy.get("li[class='nav-item active']>a").click();
    var sum = 0;
    cy.get("tr td:nth-child(3) strong")
      .each(($el, index, $list) => {
        const price = $el.text().split(" ")[1].trim();
        cy.log(price);
        sum = Number(sum) + Number(price);
      })
      .then(() => {
        cy.log(sum);
      });
    cy.get("td h3 strong").then((element) => {
      expect(Number(element.text().split(" ")[1].trim())).to.equal(sum);
    });
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
