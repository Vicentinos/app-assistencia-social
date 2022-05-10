import "@testing-library/cypress/add-commands";

Cypress.Commands.add("getOobCodes", () => {
  return cy.request("./__/firebase/init.json").then((res) => {
    const { projectId } = res.body;
    return cy
      .request<{ oobCodes: ReturnType<typeof cy.getOobCodes> }>(
        `http://localhost:9099/emulator/v1/projects/${projectId}/oobCodes`
      )
      .then((res) => {
        return res.body.oobCodes;
      });
  });
});
Cypress.Commands.add("clearIndexedDB", async () => {
  const databases = await window.indexedDB.databases();

  await Promise.all(
    databases.map(
      ({ name }) =>
        new Promise((resolve, reject) => {
          if (name) {
            const request = window.indexedDB.deleteDatabase(name);
            request.addEventListener("success", resolve);
            // Note: we need to also listen to the "blocked" event
            // (and resolve the promise) due to https://stackoverflow.com/a/35141818
            request.addEventListener("blocked", resolve);
            request.addEventListener("error", reject);
          }
        })
    )
  );
});
Cypress.Commands.add("registerNewUser", (email: string) => {
  cy.visit("/");
  cy.contains("Entre utilizando seu email abaixo:");
  cy.findByLabelText("Email").type(email);
  cy.findByText("Enviar link mágico para o meu email").click();
});
Cypress.Commands.add("singInFromEmailLink", (email: string) => {
  cy.getOobCodes().should((oobCodes) => {
    const myOobCode = oobCodes.find((oobCode) => oobCode.email === email);
    if (!myOobCode) throw "oob code not found";
    expect(myOobCode).to.have.property("requestType", "EMAIL_SIGNIN");
    cy.visit(myOobCode.oobLink);
  });
});
