describe("form tests", () => {
  beforeEach(() => {
    cy.visit("/forms");
  });
  it("Test subscribe form", () => {
    cy.contains(/testing forms/i);
    cy.getDataTest("subscribe-form").find("input").as("subscribe-input");
    cy.get("@subscribe-input").type("xxx@yyyyy.com");
    cy.contains(/successfully subbed: xxx@yyyy.com/i).should("not.exist");
    cy.getDataTest("subscribe-button").click();
    cy.contains(/successfully subbed: xxxx@yyyy.com/i).should("exist");

    cy.wait(3000);
    cy.contains(/successfully subbed: xxxx@yyyy.com/i).should("not.exist");

    cy.get("@subscribe-input").type("xxxx@yyyy.io");
    cy.getDataTest("subscribe-button").click();
    cy.contains(/invalid email: xxxx@yyyy.io/i).should("exist");

    cy.wait(3000);
    cy.getDataTest("subscribe-button").click();
    cy.contains(/fail/i).should("exist");
  });
});
