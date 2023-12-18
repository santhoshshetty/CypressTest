const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    experimentalStudio: true,
    projectId: "dbaxpy",
    retries: {
      runMode: 1,
      openMode: 1,
    },
    reporterOptions: {
      charts: true,
      reportPageTitle: "custom-title",
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: true,
    },
    video: false,
    videoCompression: 32,
    trashAssetsBeforeRuns: true,
    baseUrl: "https://www.google.com",
    reporter: "cypress-mochawesome-reporter",
    setupNodeEvents(on, config) {
      const appUrl = config.env.type || "localhost";
      const allUrls = {
        localhost: "https://katalon-demo-cura.herokuapp.com/",
        staging: "https://katalon-demo-cura.herokuapp.com/",
        prod: "https://katalon-demo-cura.herokuapp.com/",
      };
      config.baseUrl = allUrls[appUrl];
      require("cypress-mochawesome-reporter/plugin")(on);
      on("after:spec", (spec, results) => {
        if (results && results.video && results.stats.failures === 0) {
          fs.unlinkSync(results.video);
        }
      });
      return config;
    },
  },
});
