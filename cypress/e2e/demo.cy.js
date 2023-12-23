///<reference types="cypress"/>
///<reference types="cypress-iframe"/>

import "cypress-iframe";

describe("Sample Demo Suite", () => {
  it.skip("Sample Demo Tests", () => {
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
    cy.get("span.cart-count").should("have.text", 2);
    cy.get(".cart-icon > img").click();
    cy.contains("PROCEED TO CHECKOUT").click();
    cy.contains("Place Order").click();
  });

  it.skip("Sample Demo Element Action Tests", () => {
    //Checkboxes
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
    cy.get("#checkBoxOption1").check().should("be.checked");
    cy.get("#checkBoxOption1").uncheck().should("be.not.checked");
    cy.get("input[type='checkbox']")
      .check(["option2", "option3"])
      .should("be.checked");
    //Static dropdowns
    cy.get("#dropdown-class-example")
      .select("option2")
      .should("have.value", "option2");
    //Dynamic dropdowns
    cy.get("#autocomplete").type("Ind");
    cy.get(".ui-menu-item > div").each(($el, index, $list) => {
      if ($el.text() === "India") {
        cy.wrap($el).click();
      }
    });
    cy.get("#autocomplete").should("have.value", "India");
    //Visibilty and Invisible Elements using Assertions
    cy.get("#displayed-text").should("be.visible");
    cy.get("#hide-textbox").click();
    cy.get("#displayed-text").should("not.be.visible");
    cy.get("#show-textbox").click();
    cy.get("#displayed-text").should("be.visible");
    //cy.get("input[value='radio2']").check().should("be.checked");
    //cy.get("input[name='radioButton']").eq(2).check().should("be.checked");
    cy.get("input[name='radioButton']").each(($el, index, $list) => {
      cy.wrap($el).check().should("be.checked");
    });
  });

  it.skip("Sample Demo Tests on Browser Alerts, Tabs", () => {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
    cy.get("#alertbtn").click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal(
        "Hello , share this practice page and share your knowledge"
      );
    });
    cy.get("#confirmbtn").click();
    cy.on("window:confirm", (str) => {
      expect(str).to.equal("Hello , Are you sure you want to confirm?");
    });
    cy.get("#opentab").invoke("removeAttr", "target").click();
    cy.origin("https://www.qaclickacademy.com/", () => {
      cy.get(".nav-item a[href*='blog']")
        .click()
        .url()
        .should("contain", "blog");
    });
  });

  it("Sample Demo Tests on Mouse Hover, Parse Data Tables, iFrames", () => {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
    cy.get(".mouse-hover-content").invoke("show");
    cy.contains("Top").click();
    cy.contains("Reload").click({ force: true });
    cy.get("div.tableFixHead table tr td:nth-child(3)").each(
      ($el, index, $list) => {
        if ($el.text().includes("Delhi")) {
          cy.get("div.tableFixHead table tr td:nth-child(3)")
            .eq(index)
            .next()
            .then((price) => {
              cy.log(price.text());
              expect(price.text()).to.equal("33");
            });
        }
      }
    );
    cy.frameLoaded("#courses-iframe");
    cy.iframe().find("a[href*='mentorship']").eq(0).click();
  });
});
