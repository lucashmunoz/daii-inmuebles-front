import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://98.82.106.250:5173",
    specPattern: "cypress/e2e/**/*.cy.{js,ts}",
    defaultCommandTimeout: 20000,
    pageLoadTimeout: 70000,
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
