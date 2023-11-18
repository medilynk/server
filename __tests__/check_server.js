describe("Test the server", () => {
  describe("Check if the server is up and running", () => {
    test("Should respond with HTTP 200", async () => {
      const response = await fetch("http://localhost:4000/test/ping");
      expect(response.status).toBe(200);
    });
  });
});
