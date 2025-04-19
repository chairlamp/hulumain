export default {
  e2e: {
    setupNodeEvents(_on: any, config: any) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
};
