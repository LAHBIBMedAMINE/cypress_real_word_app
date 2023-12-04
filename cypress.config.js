const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    BaseUrl: "http://localhost:3000",
    ApiUrl:"http://localhost:3001"
  },
  e2e: {
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
