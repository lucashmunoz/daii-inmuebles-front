import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    VITE_GOOGLE_MAPS_API_KEY: process.env.VITE_GOOGLE_MAPS_API_KEY || "default-api-key", // Puedes poner un valor por defecto si lo prefieres
    VITE_MAP_ID: process.env.VITE_MAP_ID || "default-map-id"
  },
  e2e: {
    baseUrl: "http://localhost:8080/",
    specPattern: "cypress/e2e/**/*.cy.{js,ts}",
    defaultCommandTimeout: 20000,
    pageLoadTimeout: 70000,
    setupNodeEvents(on) {
      on("before:run", (details) => {
        console.log("Cypress está por iniciar los tests", details);
      });
    },
    screenshotOnRunFailure: false,
    video: false,
    retries: {
      runMode: 2,
      openMode: 0
    },
    chromeWebSecurity: false,
    viewportWidth: 1280,
    viewportHeight: 720
  }
});
