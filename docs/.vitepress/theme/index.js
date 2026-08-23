import DefaultTheme from "vitepress/theme";
import DocsHome from "./components/DocsHome.vue";
import LinkGrid from "./components/LinkGrid.vue";
import TerminalCard from "./components/TerminalCard.vue";
import TerminalSnippet from "./components/TerminalSnippet.vue";
import ToolGrid from "./components/ToolGrid.vue";
import "./styles.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("DocsHome", DocsHome);
    app.component("LinkGrid", LinkGrid);
    app.component("TerminalCard", TerminalCard);
    app.component("TerminalSnippet", TerminalSnippet);
    app.component("ToolGrid", ToolGrid);
  },
};
