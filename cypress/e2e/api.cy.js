///<reference types="cypress"/>

describe("API Testing", () => {
  it("GET Operation", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users?page=2",
      failOnStatusCode: false,
      headers: {
        accept: "application/json",
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.be.an("object");
      //expect(response.body).to.deep.include({name: 'test'});
    });
  });
  it("POST Operation", () => {
    cy.fixture("api").then((data) => {
      cy.request({
        method: "POST",
        url: "https://reqres.in/api/users",
        headers: {
          accept: "application/json",
        },
        body: data,
      }).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.headers["content-type"]).to.contain("application/json");
        expect(response.body).to.be.an("object");
      });
    });
  });
});
