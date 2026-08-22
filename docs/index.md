---
layout: home

hero:
  name: DouDi 文档
  text: 兜底 API 接入手册
  tagline: 从注册、Key、Base URL、模型分组到工具配置，按真实接入流程整理。
  image:
    src: /logo.png
    alt: DouDi.ai
  actions:
    - theme: brand
      text: 快速开始
      link: /quick-start
    - theme: alt
      text: 查看工具接入
      link: /tools/choose-tool

features:
  - title: 面向真实接入
    details: 把 API Key、Base URL、模型名、分组和额度拆开讲，先完成最小可用调用。
  - title: 偏向稳定用量
    details: 重点说明批量调用、下游接入、请求排查和成本确认，不只写面向散户的按钮教程。
  - title: 独立维护
    details: 文档站独立于兜底主服务源码，使用 VitePress 和公开数据快照长期维护。
---

<script setup>
import { withBase } from "vitepress";
</script>

<HomeDataCards />

## DouDi.ai 是什么

DouDi.ai 是一个 AI API 聚合网关。你可以把多个模型服务理解成一个统一入口，在控制台里管理账户、余额、API Key、模型、分组和请求日志。

对第一次接入的人，先抓住四个概念：

1. **控制台**：注册登录、充值、查看余额、创建 API Key。
2. **Base URL**：客户端或代码里填写的 API 地址，OpenAI Compatible 场景使用 `https://doudi.ai/v1`。
3. **模型**：决定请求能力和基础计费规则，例如文本、代码、图片或多模态模型。
4. **分组**：决定可用线路、稳定性、价格倍率和调度范围。

## 从这里开始

<div class="ml-route-grid">
  <a class="ml-route-card" href="quick-start">
    <span>快速开始</span>
    <p>完成注册、Key、Base URL、模型名和第一次 curl 请求。</p>
  </a>
  <a class="ml-route-card" href="tools/choose-tool">
    <span>选择工具</span>
    <p>按聊天、写代码、VS Code、自部署和 SDK 场景选择教程。</p>
  </a>
  <a class="ml-route-card" href="api-key">
    <span>创建 API Key</span>
    <p>按用途拆 Key、设置额度，并避免把 Key 泄露到截图或仓库。</p>
  </a>
  <a class="ml-route-card" href="tools/troubleshooting">
    <span>配置失败排查</span>
    <p>按 Base URL、Key、模型名、分组、接口格式和状态码定位问题。</p>
  </a>
</div>

## 核心配置速查

<div class="ml-field-table">
  <div class="ml-field-row">
    <div>Base URL</div>
    <div><code>https://doudi.ai/v1</code></div>
    <div>OpenAI Compatible、SDK、命令行工具的默认填写值。</div>
  </div>
  <div class="ml-field-row">
    <div>API Key</div>
    <div>DouDi 控制台令牌页创建的专用 Key</div>
    <div>每个客户端单独创建，方便限额、停用和排查消耗。</div>
  </div>
  <div class="ml-field-row">
    <div>Model</div>
    <div>控制台显示的完整模型 ID</div>
    <div>不要只写简称，也不要照抄其他站点的旧模型名。</div>
  </div>
  <div class="ml-field-row">
    <div>测试方式</div>
    <div>先发一条短消息</div>
    <div>成功后再做长上下文、文件、图片、批量或 Agent 任务。</div>
  </div>
</div>

## 常用工具直达

<div class="dd-tool-grid dd-tool-grid--compact">
  <a class="dd-tool-card" href="tools/claude-code">
    <span class="dd-tool-icon"><img :src="withBase('/tool-icons/claude.ico')" alt=""></span>
    <span class="dd-tool-copy"><strong>Claude Code</strong><em>命令行代码协作</em></span>
  </a>
  <a class="dd-tool-card" href="tools/codex-cli">
    <span class="dd-tool-icon"><img :src="withBase('/tool-icons/codex.svg')" alt=""></span>
    <span class="dd-tool-copy"><strong>Codex CLI</strong><em>Responses API 与 provider</em></span>
  </a>
  <a class="dd-tool-card" href="tools/cherry-studio">
    <span class="dd-tool-icon"><img :src="withBase('/tool-icons/cherry.png')" alt=""></span>
    <span class="dd-tool-copy"><strong>Cherry Studio</strong><em>桌面多 Provider 管理</em></span>
  </a>
  <a class="dd-tool-card" href="tools/chatbox">
    <span class="dd-tool-icon"><img :src="withBase('/tool-icons/chatbox.ico')" alt=""></span>
    <span class="dd-tool-copy"><strong>Chatbox</strong><em>聊天、翻译、总结</em></span>
  </a>
  <a class="dd-tool-card" href="tools/cline">
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
| 第一次测试 DouDi | [快速开始](/quick-start) → [OpenAI Compatible](/tools/openai-compatible) |
| 配置桌面聊天软件 | [怎么选择工具](/tools/choose-tool) → [Chatbox](/tools/chatbox) 或 [Cherry Studio](/tools/cherry-studio) |
| 配置代码工具 | [Claude Code](/tools/claude-code)、[Codex CLI](/tools/codex-cli)、[OpenCode](/tools/opencode) |
| 在 VS Code 或编辑器里使用 | [Cline](/tools/cline)、[Cursor](/tools/cursor)、[Zed Editor](/tools/zed-editor) |
| 自部署或写代码接入 | [Open WebUI](/tools/open-webui)、[LangChain / SDK](/tools/langchain-sdk)、[LlamaIndex / SDK](/tools/llamaindex) |
| 账户、余额和扣费不清楚 | [计费与额度](/billing-quota) → [账户概览](/account/) |

## 文档覆盖范围

<div class="ml-grid">
  <div class="ml-card">
    <strong>基础接入</strong>
    <span>注册登录、创建 Key、OpenAI Compatible、API 参考、模型与分组。</span>
  </div>
  <div class="ml-card">
    <strong>工具教程</strong>
    <span>覆盖 Claude Code、Codex CLI、OpenCode、Cherry Studio、Chatbox、Cline、Trae、CodeBuddy 等常见工具。</span>
  </div>
  <div class="ml-card">
    <strong>账户排查</strong>
    <span>覆盖充值、套餐、订单发票、额度消耗、401、403、429 和请求体过大等问题。</span>
  </div>
</div>

## 推荐阅读顺序

从 [快速开始](/quick-start) 完成一次最小请求，然后阅读 [创建 API Key](/api-key)、[模型与分组](/models-groups) 和 [计费与额度](/billing-quota)。如果你已经知道要配置哪个客户端，可以直接进入 [怎么选择工具](/tools/choose-tool)。
