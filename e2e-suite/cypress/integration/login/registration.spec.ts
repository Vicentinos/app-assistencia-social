describe("registration", () => {
  it("should register a new user", () => {
    cy.task("getAuthUsers", null, { log: true }).then((authUsers) => {
      expect(authUsers).to.eq(0);
    });
    cy.visit("/");
    cy.contains("Entre utilizando seu email abaixo:");
    cy.findByLabelText("Email").type("admin@example.com");
    cy.findByText("Enviar link mágico para o meu email").click();
    cy.contains(
      "Enviamos um link mágico para o endereço eletrônico admin@example.com. Clique no link para entrar automaticamente no App Vicentino."
    );
    cy.task("getAuthUsers", null, { log: true }).then((userCount) => {
      expect(userCount).to.eq(1);
    });
  });
});
