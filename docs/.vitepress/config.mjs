import { defineConfig } from "vitepress";

const base = process.env.VITEPRESS_BASE || "/";
const asset = (fileName) => `${base}${fileName}`.replace(/\/{2,}/g, "/");

export default defineConfig({
  title: "DouDi 文档",
  description: "DouDi.ai API 接入、Key、计费、模型分组和常见工具配置教程",
  lang: "zh-CN",
  base,
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ["meta", { name: "theme-color", content: "#f7f6f3" }],
    ["link", { rel: "icon", type: "image/png", href: asset("logo.png") }],
  ],
  themeConfig: {
    logo: "/logo.png",
    siteTitle: "DouDi 文档",
    nav: [
      { text: "快速开始", link: "/quick-start" },
      { text: "API Key", link: "/api-key" },
      { text: "计费与额度", link: "/billing-quota" },
      { text: "工具接入", link: "/tools" },
      { text: "账户", link: "/account/" },
    ],
    sidebar: [
      {
        text: "入门",
        items: [
          { text: "文档首页", link: "/" },
          { text: "快速开始", link: "/quick-start" },
          { text: "创建 API Key", link: "/api-key" },
          { text: "模型与分组", link: "/models-groups" },
          { text: "计费与额度", link: "/billing-quota" },
          { text: "API 参考", link: "/api-reference" },
        ],
      },
      {
        text: "工具接入",
        items: [
          { text: "工具接入总览", link: "/tools" },
          { text: "怎么选择工具", link: "/tools/choose-tool" },
          { text: "OpenAI Compatible", link: "/tools/openai-compatible" },
          { text: "工具问题排查", link: "/tools/troubleshooting" },
        ],
      },
      {
        text: "代码与 Agent 工具",
        collapsed: false,
        items: [
          { text: "Claude Code", link: "/tools/claude-code" },
          { text: "Claude Coworks", link: "/tools/claude-cowork" },
          { text: "Codex CLI", link: "/tools/codex-cli" },
          { text: "OpenCode", link: "/tools/opencode" },
          { text: "CC Switch", link: "/tools/cc-switch" },
          { text: "Zed Editor", link: "/tools/zed-editor" },
          { text: "Trae", link: "/tools/trae" },
          { text: "CodeBuddy", link: "/tools/codebuddy" },
          { text: "WorkBuddy", link: "/tools/workbuddy" },
        ],
      },
      {
        text: "桌面、聊天与编辑器",
        collapsed: false,
        items: [
          { text: "Cursor", link: "/tools/cursor" },
          { text: "Cherry Studio", link: "/tools/cherry-studio" },
          { text: "Chatbox", link: "/tools/chatbox" },
          { text: "Cline", link: "/tools/cline" },
          { text: "BotGem", link: "/tools/botgem" },
          { text: "LobeHub / LobeChat", link: "/tools/lobehub" },
          { text: "OpenCat", link: "/tools/opencat" },
          { text: "NextChat", link: "/tools/nextchat" },
          { text: "GitHub Copilot", link: "/tools/github-copilot" },
        ],
      },
      {
        text: "自部署、SDK 与特殊场景",
        collapsed: false,
        items: [
          { text: "Open WebUI", link: "/tools/open-webui" },
          { text: "LangChain / SDK", link: "/tools/langchain-sdk" },
          { text: "LlamaIndex / SDK", link: "/tools/llamaindex" },
          { text: "OpenClaw", link: "/tools/openclaw" },
          { text: "Hermes / OpenClaw 403", link: "/tools/hermes-openclaw-403" },
        ],
      },
      {
        text: "账户与排查",
        items: [
          { text: "账户概览", link: "/account/" },
          { text: "充值余额", link: "/account/recharge" },
          { text: "订阅与套餐", link: "/account/subscription-plans" },
          { text: "订单与发票", link: "/account/orders-invoices" },
          { text: "常见问题", link: "/troubleshooting" },
          { text: "账户问题排查", link: "/account/troubleshooting" },
        ],
      },
    ],
    outline: {
      label: "本页目录",
      level: [2, 3],
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    lastUpdated: {
      text: "最后更新",
      formatOptions: {
        dateStyle: "medium",
        timeStyle: "short",
      },
    },
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            displayDetails: "显示详情",
            resetButtonTitle: "清空搜索",
            backButtonTitle: "关闭搜索",
            noResultsText: "没有找到结果",
            footer: {
              selectText: "选择",
              selectKeyAriaLabel: "回车",
              navigateText: "切换",
              navigateUpKeyAriaLabel: "上箭头",
              navigateDownKeyAriaLabel: "下箭头",
              closeText: "关闭",
              closeKeyAriaLabel: "Esc",
            },
          },
        },
      },
    },
  },
});
