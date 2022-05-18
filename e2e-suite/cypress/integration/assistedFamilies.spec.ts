import * as Chance from "chance";

describe("Assisted families management", () => {
  let assistedFamilyFixture: {
    neighborhood: string;
    cpf: string;
    phone: string;
    name: string;
  };
  beforeEach(() => {
    cy.clearIndexedDB();
    const chance = new Chance();
    const voluntaryUserFixture = {
      email: chance.email(),
    };
    assistedFamilyFixture = {
      name: chance.name({ nationality: "it" }),
      phone: chance.phone(),
      cpf: chance.cpf(),
      neighborhood: chance.word(),
    };
    cy.registerNewUser(voluntaryUserFixture.email);
    cy.singInFromEmailLink(voluntaryUserFixture.email);
    cy.contains("Este é o primeiro acesso com o email");
    cy.task("makeUserAdmin", voluntaryUserFixture.email);
    cy.reload();
  });
  it("should register a new family with just the name field", () => {
    cy.pathnameShouldBe("/assistidos");
    cy.findByText("Cadastrar pessoa assistida").click();
    cy.pathnameShouldBe("/assistidos/cadastro");
    cy.contains("Cadastro de pessoa assistida");
    cy.findByLabelText("Nome").type(assistedFamilyFixture.name);
    cy.findByRole("button", { name: "Cadastrar" }).click();
    cy.findByRole("table", { name: "Lista de pessoas assistidas" }).contains(
      assistedFamilyFixture.name
    );
  });
  it("should register a new family with all fields", () => {
    cy.pathnameShouldBe("/assistidos");
    cy.findByText("Cadastrar pessoa assistida").click();
    cy.pathnameShouldBe("/assistidos/cadastro");
    cy.contains("Cadastro de pessoa assistida");

    // type fields
    cy.findByLabelText("Nome").type(assistedFamilyFixture.name);
    cy.findByLabelText("Telefone").type(assistedFamilyFixture.phone);
    cy.findByLabelText("CPF").type(assistedFamilyFixture.cpf);
    cy.findByLabelText("Bairro").type(assistedFamilyFixture.neighborhood);
    // click submit
    cy.findByRole("button", { name: "Cadastrar" }).click();

    // expectations on the table line
    cy.findByRole("table", { name: "Lista de pessoas assistidas" })
      .contains(assistedFamilyFixture.name)
      .parent("tr")
      .as("added-person-line");
    cy.get("@added-person-line").contains(assistedFamilyFixture.phone);
    cy.get("@added-person-line").contains(assistedFamilyFixture.cpf);
    cy.get("@added-person-line").contains(assistedFamilyFixture.neighborhood);
  });
});
