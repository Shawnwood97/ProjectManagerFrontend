import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#001B2B",
        secondary: "#001B2B",
        primaryTx: "#D5D5D5",
        secondaryTx: "#9A9A9A",
        altTx: "#1C1C1C",
        primaryBg: "#1C1C1C",
        secondaryBg: "#262626",
        accent: "#8c9eff",
        error: "#ff2121",
      },
    },
    dark: false,
  },
});

export default vuetify;
