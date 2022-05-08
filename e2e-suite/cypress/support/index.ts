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
