<script setup>
import DocsHero from "./DocsHero.vue";
import LinkGrid from "./LinkGrid.vue";
import StatusStrip from "./StatusStrip.vue";
import TerminalCard from "./TerminalCard.vue";
import ToolGrid from "./ToolGrid.vue";

const heroActions = [
  { label: "快速开始", href: "/quick-start", primary: true },
  { label: "API 参考", href: "/api/" },
];

const routeItems = [
  {
    title: "入门",
    description: "注册、Key、Base URL、模型与分组、计费与额度。",
    href: "/quick-start",
    meta: "01",
  },
  {
    title: "开发指南",
    description: "认证、模型、流式响应、结构化输出、路由、回退和可观测性。",
    href: "/develop/",
    meta: "02",
  },
  {
    title: "API 参考",
    description: "OpenAI、Anthropic、Grok / xAI 和 DouDi OpenAPI 端点。",
    href: "/api/",
    meta: "03",
  },
  {
    title: "工具集成",
    description: "Agent 编程工具、编辑器、桌面客户端、SDK 与自部署教程。",
    href: "/integrations/",
    meta: "04",
  },
];

const troubleshootItems = [
  {
    title: "请求失败",
    description: "按 401、403、404、429、上游错误和请求体格式定位问题。",
    href: "/troubleshooting",
  },
  {
    title: "账户和扣费",
    description: "排查充值、套餐、订单、发票、余额和额度消耗。",
    href: "/account/",
  },
  {
    title: "工具配置差异",
    description: "确认客户端到底需要填写 doudi.ai 还是 doudi.ai/v1。",
    href: "/tools/troubleshooting",
  },
];

const tools = [
  {
    title: "Claude Code",
    description: "Anthropic 原生协议与模型提供商配置",
    href: "/integrations/claude-code",
    icon: "/tool-icons/claude.ico",
  },
  {
    title: "Codex CLI",
    description: "OpenAI 兼容、Responses API 与 WebSocket",
    href: "/integrations/codex",
    icon: "/tool-icons/codex.svg",
  },
  {
    title: "OpenCode",
    description: "终端内代码协作与自定义 provider",
    href: "/integrations/opencode",
    icon: "/tool-icons/opencode.png",
  },
  {
    title: "Cherry Studio",
    description: "桌面多 provider 和模型管理",
    href: "/integrations/cherry-studio",
    icon: "/tool-icons/cherry.png",
  },
  {
    title: "Chatbox",
    description: "聊天、翻译、总结和轻量问答",
    href: "/integrations/chatbox",
    icon: "/tool-icons/chatbox.ico",
  },
  {
    title: "Open WebUI",
    description: "自部署 Web Chat 和团队入口",
    href: "/tools/open-webui",
    icon: "/tool-icons/openwebui.png",
  },
];

const terminalLines = [
  { prompt: "$", text: "curl https://doudi.ai/v1/chat/completions \\" },
  { text: '  -H "Authorization: Bearer $DOUDI_API_KEY" \\' },
  { text: '  -H "Content-Type: application/json" \\' },
  { text: '  -d \'{"model":"openai/gpt-4o-mini","messages":[{"role":"user","content":"ping"}]}\'' },
  { text: "" },
  { text: "# 成功后再配置客户端、长上下文、文件或批量任务", kind: "muted" },
];
</script>

<template>
  <div class="dd-home-shell">
    <DocsHero
      title="兜底 API 文档"
      description="注册、Key、Base URL、模型分组、API 协议和工具配置都在这里。第一次接入先跑通最小请求，再进入对应客户端教程。"
      command="curl https://doudi.ai/v1/models -H &quot;Authorization: Bearer $DOUDI_API_KEY&quot;"
      :actions="heroActions"
    />

    <StatusStrip />

    <section class="dd-home-section">
      <h2>按接入阶段阅读</h2>
      <LinkGrid :items="routeItems" />
    </section>

    <section class="dd-home-section dd-home-section--split">
      <div>
        <h2>先验证一条最小请求</h2>
        <p>
          不要在第一次配置时同时改多个客户端。先确认 Key、Base URL、模型 ID 和协议入口都能成功返回，再迁移到 Claude Code、Codex CLI、桌面客户端或 SDK。
        </p>
      </div>
      <TerminalCard title="first-request" :lines="terminalLines" />
    </section>

    <section class="dd-home-section">
      <h2>常用工具直达</h2>
      <ToolGrid :tools="tools" />
    </section>

    <section class="dd-home-section">
      <h2>排查入口</h2>
      <LinkGrid :items="troubleshootItems" compact />
    </section>
  </div>
</template>
