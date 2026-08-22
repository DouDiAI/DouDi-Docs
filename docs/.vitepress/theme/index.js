import DefaultTheme from "vitepress/theme";
import HomeDataCards from "./components/HomeDataCards.vue";
import ModelSnapshot from "./components/ModelSnapshot.vue";
import "./styles.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("HomeDataCards", HomeDataCards);
    app.component("ModelSnapshot", ModelSnapshot);
  },
};
