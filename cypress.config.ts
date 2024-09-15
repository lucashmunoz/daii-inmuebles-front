import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5175",
    specPattern: "cypress/e2e/**/*.cy.{js,ts}",
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    setupNodeEvents(on) {
      on("before:run", (details) => {
        console.log("Cypress está por iniciar los tests", details);
      });
    },
    screenshotOnRunFailure: true,
    video: true,
    retries: {
      runMode: 2,
      openMode: 0
    },
    chromeWebSecurity: false,
    viewportWidth: 1280,
    viewportHeight: 720
  }
});
