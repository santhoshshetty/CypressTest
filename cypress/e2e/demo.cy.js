///<reference types="cypress"/>

describe("Sample Demo Suite", () => {
  it("Sample Demo Tests", () => {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
    cy.get(".search-keyword").type("ca");
    cy.wait(2000);
    cy.get(".product:visible").should("have.length", 4);
    cy.get("div.products").as("productLocator");
    cy.get("@productLocator")
      .find(".product")
      .eq(1)
      .contains("ADD TO CART")
      .click();
    cy.get("@productLocator")
      .find(".product")
      .each(($el, index, $list) => {
        const linkText = $el.find("h4.product-name").text();
        if (linkText.includes("Cashews")) {
          cy.wrap($el.find("button")).click();
        }
      });
    cy.get(".brand").should("have.text", "GREENKART");
    cy.get(".brand").then((logotxt) => {
      cy.log(logotxt.text());
    });
  });
});
