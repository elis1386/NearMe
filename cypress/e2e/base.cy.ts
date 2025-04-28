describe("base tests", () => {
  it("passes", () => {
    cy.visit("https://nearme-b6f9d.web.app/");
    cy.get(":nth-child(1) > .dropdown-toggle").type("places{click}");
  });
});
