export {}; // file needs to export something under --isolatedModules
describe("Smoke test for Jest", () => {
  it("should pass", () => {
    expect(false).not.toBe(true);
  });
});
