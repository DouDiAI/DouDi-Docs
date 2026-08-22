---
layout: home
---

<script setup>
import { withBase } from "vitepress";
</script>

<section class="dd-portal-hero">
  <div class="dd-portal-copy">
    <h1>兜底 API 接入手册</h1>
    <p>从注册、Key、Base URL、模型分组到工具配置，按真实接入流程整理。第一次接入先完成一条最小请求，再按你的客户端继续配置。</p>
    <div class="dd-portal-actions">
      <a class="dd-action dd-action--primary" :href="withBase('/quick-start')">快速开始</a>
      <a class="dd-action dd-action--secondary" :href="withBase('/integrations/')">选择工具</a>
    </div>
  </div>
  <aside class="dd-config-panel" aria-label="接入配置速查">
    <div class="dd-config-head">
      <img :src="withBase('/logo.png')" alt="DouDi.ai">
      <div>
        <strong>OpenAI Compatible</strong>
        <span>接入时优先确认这 4 项</span>
      </div>
    </div>
    <dl class="dd-config-list">
      <div>
        <dt>Base URL</dt>
        <dd><code>https://doudi.ai/v1</code></dd>
      </div>
      <div>
        <dt>API Key</dt>
        <dd>控制台令牌页创建的专用 Key</dd>
      </div>
      <div>
        <dt>Model</dt>
        <dd>控制台显示的完整模型 ID</dd>
      </div>
      <div>
        <dt>首测</dt>
        <dd>先发短消息，再做长上下文、文件或批量任务</dd>
      </div>
    </dl>
  </aside>
</section>

<section class="dd-start-board" aria-label="接入入口">
  <a class="dd-start-card dd-start-card--yellow" :href="withBase('/quick-start')">
    <strong>第一次测试 DouDi</strong>
    <span>完成注册、Key、Base URL、模型名和第一次 curl 请求。</span>
  </a>
  <a class="dd-start-card dd-start-card--lavender" :href="withBase('/integrations/')">
    <strong>配置客户端或代码工具</strong>
    <span>按聊天、写代码、VS Code、自部署和 SDK 场景选择集成教程。</span>
  </a>
  <a class="dd-start-card dd-start-card--mint" :href="withBase('/tools/troubleshooting')">
    <strong>请求失败或消耗异常</strong>
    <span>按 Base URL、Key、模型名、分组、状态码和额度定位问题。</span>
  </a>
</section>

## 文档地图

<div class="ml-route-grid">
  <a class="ml-route-card" href="/quick-start">
    <span>入门</span>
    <p>快速开始、API Key、模型与分组、计费与额度。</p>
  </a>
  <a class="ml-route-card" href="/develop/">
    <span>开发指南</span>
    <p>认证、模型目录、流式响应、结构化输出、路由、回退和可观测性。</p>
  </a>
  <a class="ml-route-card" href="/api/">
    <span>API 参考</span>
    <p>OpenAI、Anthropic、Grok / xAI 和 DouDi OpenAPI 端点。</p>
  </a>
  <a class="ml-route-card" href="/integrations/">
    <span>工具集成</span>
    <p>代码 Agent、编辑器、桌面客户端、SDK 与自部署教程。</p>
  </a>
</div>

## DouDi.ai 是什么

DouDi.ai 是一个 AI API 聚合网关。你可以把多个模型服务理解成一个统一入口，在控制台里管理账户、余额、API Key、模型、分组和请求日志。

对第一次接入的人，先抓住四个概念：

1. **控制台**：注册登录、充值、查看余额、创建 API Key。
2. **Base URL**：客户端或代码里填写的 API 地址，OpenAI Compatible 场景使用 `https://doudi.ai/v1`。
3. **模型**：决定请求能力和基础计费规则，例如文本、代码、图片或多模态模型。
4. **分组**：决定可用线路、稳定性、价格倍率和调度范围。

## 常用工具直达

<div class="dd-tool-grid dd-tool-grid--compact">
  <a class="dd-tool-card" href="integrations/claude-code">
    <span class="dd-tool-icon"><img :src="withBase('/tool-icons/claude.ico')" alt=""></span>
    <span class="dd-tool-copy"><strong>Claude Code</strong><em>命令行代码协作</em></span>
  </a>
  <a class="dd-tool-card" href="integrations/codex">
    <span class="dd-tool-icon"><img :src="withBase('/tool-icons/codex.svg')" alt=""></span>
    <span class="dd-tool-copy"><strong>Codex CLI</strong><em>Responses API 与 provider</em></span>
  </a>
  <a class="dd-tool-card" href="integrations/cherry-studio">
    <span class="dd-tool-icon"><img :src="withBase('/tool-icons/cherry.png')" alt=""></span>
    <span class="dd-tool-copy"><strong>Cherry Studio</strong><em>桌面多 Provider 管理</em></span>
  </a>
  <a class="dd-tool-card" href="integrations/chatbox">
    <span class="dd-tool-icon"><img :src="withBase('/tool-icons/chatbox.ico')" alt=""></span>
    <span class="dd-tool-copy"><strong>Chatbox</strong><em>聊天、翻译、总结</em></span>
  </a>
  <a class="dd-tool-card" href="integrations/cline">
    <span class="dd-tool-icon"><img :src="withBase('/tool-icons/cline.png')" alt=""></span>
    <span class="dd-tool-copy"><strong>Cline</strong><em>VS Code Agent</em></span>
  </a>
  <a class="dd-tool-card" href="tools/open-webui">
    <span class="dd-tool-icon"><img :src="withBase('/tool-icons/openwebui.png')" alt=""></span>
    <span class="dd-tool-copy"><strong>Open WebUI</strong><em>自部署 Web Chat</em></span>
  </a>
</div>

## 接入路径

| 你现在要做什么 | 推荐阅读 |
| --- | --- |
| 第一次测试 DouDi | [快速开始](/quick-start) → [API 概览](/api/) |
| 配置桌面聊天软件 | [工具集成总览](/integrations/) → [Chatbox](/integrations/chatbox) 或 [Cherry Studio](/integrations/cherry-studio) |
| 配置代码工具 | [Claude Code](/integrations/claude-code)、[Codex CLI](/integrations/codex)、[OpenCode](/integrations/opencode) |
| 在 VS Code 或编辑器里使用 | [Cline](/integrations/cline)、[Cursor](/integrations/cursor)、[Zed](/integrations/zed) |
| 自部署或写代码接入 | [Open WebUI](/tools/open-webui)、[LangChain](/integrations/langchain)、[LlamaIndex](/integrations/llamaindex) |
| 账户、余额和扣费不清楚 | [计费与额度](/billing-quota) → [账户概览](/account/) |

## 文档覆盖范围

<div class="ml-grid">
  <div class="ml-card">
    <strong>基础接入</strong>
    <span>注册登录、创建 Key、OpenAI Compatible、API 参考、模型与分组。</span>
  </div>
  <div class="ml-card">
    <strong>工具教程</strong>
    <span>覆盖 Claude Code、Codex CLI、OpenCode、Cherry Studio、Chatbox、Cline、Cursor、SDK 等常见工具。</span>
  </div>
  <div class="ml-card">
    <strong>账户排查</strong>
    <span>覆盖充值、套餐、订单发票、额度消耗、401、403、429 和请求体过大等问题。</span>
  </div>
</div>

## 推荐阅读顺序

从 [快速开始](/quick-start) 完成一次最小请求，然后阅读 [开发指南](/develop/)、[API 概览](/api/) 和 [工具集成](/integrations/)。如果你已经知道要配置哪个客户端，可以直接进入对应集成页。
