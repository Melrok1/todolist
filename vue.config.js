const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/css/_variables.scss";
                         @import "@/assets/css/_mixins.scss";`,
      },
      scss: {
        additionalData: `@import "@/assets/css/_variables.scss";
                         @import "@/assets/css/_mixins.scss";`,
      },
    },
  },
});
