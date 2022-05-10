import * as Chance from "chance";

describe("Assisted families management", () => {
  beforeEach(() => {
    cy.clearIndexedDB();
  });
  it("should register a new family with just the name field", () => {
    const chance = new Chance();
    const voluntaryUserFixture = {
      email: chance.email(),
    };
    const assistedFamilyFixture = {
      name: chance.name({ nationality: "it" }),
    };
    cy.registerNewUser(voluntaryUserFixture.email);
    cy.singInFromEmailLink(voluntaryUserFixture.email);
    cy.contains("Este é o primeiro acesso com o email");
    cy.task("makeUserAdmin", voluntaryUserFixture.email);
    cy.reload();
    cy.findByText("Cadastrar família assistida").click();
    cy.findByLabelText("Nome").type(assistedFamilyFixture.name);
    cy.findByRole("button", { name: "Cadastrar" }).click();
    cy.findByRole("table", { name: "Lista de famílias assistidas" }).contains(
      assistedFamilyFixture.name
    );
  });
});
