import { defineConfig } from "vitepress";

const base = process.env.VITEPRESS_BASE || "/";
const asset = (fileName) => `${base}${fileName}`.replace(/\/{2,}/g, "/");

const hintLanguageMap = [
  [/^(curl|terminal|shell|bash|sh|zsh)$/i, "bash"],
  [/^(powershell|ps1)$/i, "powershell"],
  [/^(cmd|bat)$/i, "bat"],
  [/^(python|py|.+\.py)$/i, "python"],
  [/^(typescript|ts|.+\.ts)$/i, "typescript"],
  [/^(javascript|js|.+\.js|.+\.mjs|.+\.cjs)$/i, "javascript"],
  [/^(json|.+\.json)$/i, "json"],
  [/^(toml|.+\.toml)$/i, "toml"],
  [/^(yaml|yml|.+\.ya?ml)$/i, "yaml"],
  [/^(ini|env|.+\.ini|.+\.env)$/i, "ini"],
  [/^(http|request|endpoint|端点)$/i, "http"],
];

const normalizedHint = (value) =>
  value
    .trim()
    .replace(/^#+\s*/g, "")
    .replace(/[:：]$/g, "")
    .trim();

const languageFromHint = (hint) => {
  const value = normalizedHint(hint);
  for (const [pattern, language] of hintLanguageMap) {
    if (pattern.test(value)) return language;
  }
  return "";
};

const nearbyInlineText = (tokens, index) => {
  for (let cursor = index - 1; cursor >= 0 && cursor >= index - 10; cursor -= 1) {
    const token = tokens[cursor];
    if (token?.type === "inline" && token.content.trim()) {
      return token.content.trim();
    }
  }
  return "";
};

const isJsonLike = (code) => {
  if (!/^[\s[{]/.test(code)) return false;
  try {
    JSON.parse(code);
    return true;
  } catch {
    return false;
  }
};

const inferFenceLanguage = (code, hint) => {
  const hinted = languageFromHint(hint);
  const text = code.trim();
  if (!text) return "text";

  if (hinted === "bash" && /^\s*(GET|POST|PUT|PATCH|DELETE)\s+https?:\/\//m.test(text)) {
    return "http";
  }
  if (hinted) return hinted;

  if (isJsonLike(text)) return "json";
  if (/^\s*(GET|POST|PUT|PATCH|DELETE)\s+https?:\/\//m.test(text)) return "http";
  if (/^\s*curl\s+|\\\n\s+-[A-Za-z]/m.test(text)) return "bash";
  if (/^\s*(\$env:|\[Environment\]::|if\s*\(\$env:|notepad\s+\$HOME)/m.test(text)) return "powershell";
  if (/^\s*(npm|pnpm|yarn|node|npx|git|docker|codex|claude)\s+/m.test(text)) return "bash";
  if (/^\s*from\s+\w+\s+import\s+|print\(|client\s*=\s*OpenAI\(/m.test(text)) return "python";
  if (/^\s*import\s+.+\s+from\s+['"]|^\s*const\s+\w+\s*=|await\s+|baseURL\s*:/m.test(text)) return "typescript";
  if (/^\s*model_provider\s*=|\[model_providers\./m.test(text)) return "toml";
  if (/^\s*[A-Z0-9_]+\s*=/m.test(text)) return "bash";
  if (/^\s*interface\s+\w+|^\s*type\s+\w+\s*=/m.test(text)) return "typescript";
  return "text";
};

const gettingStartedSidebar = {
  text: "入门",
  link: "/",
  items: [
    { text: "文档首页", link: "/" },
    { text: "快速开始", link: "/quick-start" },
    { text: "创建 API Key", link: "/api-key" },
    { text: "模型与分组", link: "/models-groups" },
    { text: "计费与额度", link: "/billing-quota" },
  ],
};

const developSidebar = {
  text: "开发指南",
  link: "/develop/",
  items: [
    { text: "开发指南总览", link: "/develop/" },
    {
      text: "接入基础",
      collapsed: false,
      items: [
        { text: "快速开始", link: "/quick-start" },
        { text: "认证与 Key", link: "/develop/authentication" },
        { text: "模型目录", link: "/develop/models" },
      ],
    },
    {
      text: "能力指南",
      collapsed: false,
      items: [
        { text: "流式响应", link: "/develop/guides/streaming" },
        { text: "Function Calling", link: "/develop/guides/function-calling" },
        { text: "结构化输出", link: "/develop/guides/structured-output" },
        { text: "视觉输入", link: "/develop/guides/vision" },
      ],
    },
    {
      text: "稳定性与路由",
      collapsed: false,
      items: [
        { text: "错误处理", link: "/develop/guides/error-handling" },
        { text: "频率限制", link: "/develop/guides/rate-limits" },
        { text: "供应商路由", link: "/develop/advanced/provider-routing" },
        { text: "故障回退", link: "/develop/advanced/fallback" },
        { text: "Prompt Caching", link: "/develop/advanced/prompt-caching" },
      ],
    },
    {
      text: "可观测性",
      collapsed: false,
      items: [
        { text: "仪表盘", link: "/develop/observability/dashboard" },
        { text: "用量追踪", link: "/develop/observability/usage-tracking" },
        { text: "价格观察", link: "/develop/observability/pricing" },
      ],
    },
  ],
};

const apiSidebar = {
  text: "API 参考",
  link: "/api/",
  items: [
    { text: "API 概览", link: "/api/" },
    {
      text: "OpenAI 兼容协议",
      collapsed: false,
      items: [
        { text: "Chat Completions", link: "/api/openai/chat-completions" },
        { text: "Responses", link: "/api/openai/responses" },
        { text: "Models", link: "/api/openai/models" },
        { text: "Images", link: "/api/openai/images" },
      ],
    },
    {
      text: "Anthropic 原生协议",
      collapsed: false,
      items: [
        { text: "Messages", link: "/api/anthropic/messages" },
        { text: "Models", link: "/api/anthropic/models" },
      ],
    },
    {
      text: "Grok / xAI 协议",
      collapsed: false,
      items: [
        { text: "Chat Completions", link: "/api/grok/chat-completions" },
        { text: "Responses", link: "/api/grok/responses" },
        { text: "Models", link: "/api/grok/models" },
      ],
    },
    {
      text: "DouDi OpenAPI",
      collapsed: false,
      items: [
        { text: "余额查询", link: "/api/openapi/balance" },
        { text: "实时价格查询", link: "/api/openapi/provider-pricing" },
      ],
    },
    { text: "旧版 API 参考", link: "/api-reference" },
  ],
};

const integrationsSidebar = {
  text: "工具集成",
  link: "/integrations/",
  items: [
    { text: "工具集成总览", link: "/integrations/" },
    {
      text: "Agent 编程工具",
      collapsed: false,
      items: [
        {
          text: "Claude Code",
          link: "/integrations/claude-code",
          collapsed: true,
          items: [
            { text: "安装", link: "/integrations/claude-code/installation" },
            { text: "模型配置", link: "/integrations/claude-code/model-provider" },
            { text: "状态栏", link: "/integrations/claude-code/contextline" },
            { text: "Skills", link: "/integrations/claude-code/skills" },
          ],
        },
        {
          text: "Codex CLI",
          link: "/integrations/codex",
          collapsed: true,
          items: [
            { text: "安装", link: "/integrations/codex/installation" },
            { text: "模型配置", link: "/integrations/codex/model-provider" },
            { text: "WebSocket", link: "/integrations/codex/websocket" },
          ],
        },
        { text: "OpenCode", link: "/integrations/opencode" },
        { text: "Claude Coworks", link: "/integrations/claude-coworks" },
        { text: "OpenClaw", link: "/integrations/openclaw" },
      ],
    },
    {
      text: "模型与端点切换",
      collapsed: false,
      items: [
        { text: "CC Switch", link: "/integrations/cc-switch" },
        { text: "其他客户端", link: "/integrations/others" },
      ],
    },
    {
      text: "编辑器与 IDE",
      collapsed: false,
      items: [
        { text: "Cursor", link: "/integrations/cursor" },
        { text: "Cline", link: "/integrations/cline" },
        { text: "Zed", link: "/integrations/zed" },
        { text: "GitHub Copilot", link: "/integrations/copilot" },
      ],
    },
    {
      text: "桌面客户端",
      collapsed: false,
      items: [
        { text: "Cherry Studio", link: "/integrations/cherry-studio" },
        { text: "Chatbox", link: "/integrations/chatbox" },
        { text: "BotGem", link: "/integrations/botgem" },
        { text: "LobeHub / LobeChat", link: "/integrations/lobehub" },
        { text: "OpenCat", link: "/integrations/opencat" },
        { text: "NextChat", link: "/integrations/nextchat" },
        { text: "WorkBuddy", link: "/integrations/workbuddy" },
        { text: "沉浸式翻译", link: "/integrations/immersive-translate" },
      ],
    },
    {
      text: "SDK 与自部署",
      collapsed: false,
      items: [
        { text: "OpenAI SDK", link: "/integrations/openai-sdk" },
        { text: "LangChain", link: "/integrations/langchain" },
        { text: "LlamaIndex", link: "/integrations/llamaindex" },
        { text: "Open WebUI", link: "/tools/open-webui" },
      ],
    },
  ],
};

const legacyToolsSidebar = {
  text: "旧版工具教程",
  link: "/tools/",
  collapsed: true,
  items: [
    { text: "旧版工具总览", link: "/tools/" },
    { text: "怎么选择工具", link: "/tools/choose-tool" },
    { text: "OpenAI Compatible", link: "/tools/openai-compatible" },
    { text: "工具问题排查", link: "/tools/troubleshooting" },
    { text: "CodeBuddy", link: "/tools/codebuddy" },
    { text: "Trae", link: "/tools/trae" },
    { text: "Open WebUI", link: "/tools/open-webui" },
  ],
};

const accountSidebar = {
  text: "账户与排查",
  link: "/account/",
  items: [
    { text: "账户概览", link: "/account/" },
    { text: "充值余额", link: "/account/recharge" },
    { text: "订阅与套餐", link: "/account/subscription-plans" },
    { text: "订单与发票", link: "/account/orders-invoices" },
    { text: "常见问题", link: "/troubleshooting" },
    { text: "账户问题排查", link: "/account/troubleshooting" },
  ],
};

const mapNestedGroups = (items, collapsed) =>
  items.map((item) => (item.items ? { ...item, collapsed } : item));

const sidebarSection = (section, active = false) => ({
  ...section,
  collapsed: !active,
  items: mapNestedGroups(section.items, !active),
});

const buildSidebar = (activeSection) => {
  const sections = [
    sidebarSection(gettingStartedSidebar, activeSection === "getting-started"),
    sidebarSection(developSidebar, activeSection === "develop"),
    sidebarSection(apiSidebar, activeSection === "api"),
    sidebarSection(integrationsSidebar, activeSection === "integrations"),
    sidebarSection(accountSidebar, activeSection === "account"),
  ];

  if (activeSection === "tools") {
    return [
      sections[0],
      sections[1],
      sections[2],
      sidebarSection(integrationsSidebar),
      sidebarSection(legacyToolsSidebar, true),
      sections[4],
    ];
  }

  return sections;
};

export default defineConfig({
  title: "DouDi 文档",
  description: "DouDi.ai API 接入、Key、计费、模型分组和常见工具配置教程",
  lang: "zh-CN",
  base,
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ["meta", { name: "theme-color", content: "#ffffff" }],
    ["link", { rel: "icon", type: "image/png", href: asset("logo.png") }],
  ],
  markdown: {
    config(md) {
      md.core.ruler.after("inline", "doudi-infer-code-languages", (state) => {
        state.tokens.forEach((token, index) => {
          if (token.type !== "fence" || token.info.trim()) return;
          token.info = inferFenceLanguage(token.content, nearbyInlineText(state.tokens, index));
        });
      });
    },
  },
  themeConfig: {
    logo: "/logo.png",
    siteTitle: "DouDi 文档",
    nav: [
      { text: "首页", link: "/" },
      { text: "快速开始", link: "/quick-start" },
      { text: "开发指南", link: "/develop/" },
      { text: "API 参考", link: "/api/" },
      { text: "工具集成", link: "/integrations/" },
      {
        text: "账户与排查",
        items: [
          { text: "账户概览", link: "/account/" },
          { text: "计费与额度", link: "/billing-quota" },
          { text: "充值余额", link: "/account/recharge" },
          { text: "常见问题", link: "/troubleshooting" },
        ],
      },
    ],
    sidebar: {
      "/develop/": buildSidebar("develop"),
      "/api/": buildSidebar("api"),
      "/api-reference": buildSidebar("api"),
      "/integrations/": buildSidebar("integrations"),
      "/account/": buildSidebar("account"),
      "/troubleshooting": buildSidebar("account"),
      "/tools/": buildSidebar("tools"),
      "/": buildSidebar("getting-started"),
    },
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
