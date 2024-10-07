import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    VITE_GOOGLE_MAPS_API_KEY: process.env.VITE_GOOGLE_MAPS_API_KEY,
    VITE_MAP_ID: process.env.VITE_MAP_ID
  },
  e2e: {
    baseUrl: "http://localhost:5173/",
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
