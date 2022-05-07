describe("registration", () => {
  it("should register a new user", () => {
    cy.task("getAuthUsers", null, { log: true }).then((authUsers) => {
      expect(authUsers.length).to.eq(0);
    });
    cy.visit("/");
    cy.contains("Entre utilizando seu email abaixo:");
    cy.findByLabelText("Email").type("newuser@example.com");
    cy.findByText("Enviar link mágico para o meu email").click();
    cy.contains(
      "Enviamos um link mágico para o email newuser@example.com. Clique no link para entrar automaticamente no App Vicentino."
    );
    cy.task("getAuthUsers", null, { log: true }).then((authUsers) => {
      expect(authUsers.length).to.eq(1);
    });
  });
});
