import { Chance } from "chance";

describe("registration", () => {
  const chance = new Chance();
  const name = chance.name({ middle: true });
  const email = `${name.split(" ").join(".").toLocaleLowerCase()}@example.com`;

  it("should register a new user", () => {
    cy.clearIndexedDB();
    cy.visit("/");
    cy.contains("Entre utilizando seu email abaixo:");
    cy.findByLabelText("Email").type(email);
    cy.findByText("Enviar link mágico para o meu email").click();
    cy.contains(
      `Enviamos um link mágico para o email ${email}. Clique no link para entrar automaticamente no App Vicentino.`
    );
    cy.getOobCodes().should((oobCodes) => {
      const myOobCode = oobCodes.find((oobCode) => oobCode.email === email);
      if (!myOobCode) throw "oob code not found";
      expect(myOobCode).to.have.property("requestType", "EMAIL_SIGNIN");
      cy.visit(myOobCode.oobLink);
    });
    cy.contains(
      `Este é o primeiro acesso com o email ${email}, que ainda não está associado a nenhuma conferência.`
    );
    cy.contains(
      `Solicite acesso à pessoa na sua conferência responsável pelo Aplicativo Vicentino.`
    );
  });
});
