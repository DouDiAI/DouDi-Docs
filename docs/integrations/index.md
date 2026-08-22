# 工具集成

DouDi.ai 兼容 OpenAI、Anthropic 和 Grok / xAI 协议。选择教程时先按工具类型分流，再进入具体客户端页面填写 Base URL、API Key 和模型 ID。

## 代码与 Agent 工具

适合命令行编码助手、多模型切换工具和本地 Agent 工作流。

<div class="ml-route-grid">
  <a class="ml-route-card" href="/integrations/claude-code">
    <span>Claude Code</span>
    <p>使用 Anthropic 原生协议接入 Claude Code，并继续配置模型提供商、状态栏和 Skills。</p>
  </a>
  <a class="ml-route-card" href="/integrations/codex">
    <span>Codex CLI</span>
    <p>使用 OpenAI 兼容协议接入 Codex CLI、Responses API 和 WebSocket 场景。</p>
  </a>
  <a class="ml-route-card" href="/integrations/opencode">
    <span>OpenCode</span>
    <p>配置 OpenAI / Anthropic 协议入口，适合终端内代码协作。</p>
  </a>
  <a class="ml-route-card" href="/integrations/cc-switch">
    <span>CC Switch</span>
    <p>管理多个 Claude Code provider，并通过 DouDi 查询余额。</p>
  </a>
  <a class="ml-route-card" href="/integrations/claude-coworks">
    <span>Claude Coworks</span>
    <p>桌面化 Claude 工作流，适合 Anthropic 协议配置。</p>
  </a>
  <a class="ml-route-card" href="/integrations/openclaw">
    <span>OpenClaw</span>
    <p>连接 OpenAI / Anthropic 兼容入口，用于本地 Agent 协作。</p>
  </a>
</div>

## 编辑器与 IDE

适合 VS Code、独立编辑器和 IDE 内联模型能力。

<div class="ml-route-grid">
  <a class="ml-route-card" href="/integrations/cline">
    <span>Cline</span>
    <p>在 VS Code 里配置 OpenAI 或 Anthropic provider。</p>
  </a>
  <a class="ml-route-card" href="/integrations/cursor">
    <span>Cursor</span>
    <p>确认 Cursor 当前兼容性边界，并查看可用替代方案。</p>
  </a>
  <a class="ml-route-card" href="/integrations/zed">
    <span>Zed</span>
    <p>配置 Zed Assistant 的模型、Base URL 和 Key。</p>
  </a>
  <a class="ml-route-card" href="/integrations/copilot">
    <span>GitHub Copilot</span>
    <p>在 VS Code 侧配置可接入的 OpenAI 兼容端点。</p>
  </a>
</div>

## 桌面客户端

适合聊天、翻译、总结和多 Provider 桌面软件。

<div class="ml-route-grid">
  <a class="ml-route-card" href="/integrations/cherry-studio">
    <span>Cherry Studio</span>
    <p>配置自定义 Provider、模型列表和 OpenAI / Anthropic 协议。</p>
  </a>
  <a class="ml-route-card" href="/integrations/chatbox">
    <span>Chatbox</span>
    <p>配置聊天客户端的 API Host、Key 和模型。</p>
  </a>
  <a class="ml-route-card" href="/integrations/botgem">
    <span>BotGem</span>
    <p>配置服务商、模型和 DouDi API Key。</p>
  </a>
  <a class="ml-route-card" href="/integrations/lobehub">
    <span>LobeHub / LobeChat</span>
    <p>配置 OpenAI 兼容模型服务和可用模型列表。</p>
  </a>
  <a class="ml-route-card" href="/integrations/opencat">
    <span>OpenCat</span>
    <p>配置桌面聊天客户端的 OpenAI provider。</p>
  </a>
  <a class="ml-route-card" href="/integrations/nextchat">
    <span>NextChat</span>
    <p>配置自定义接口、模型和基础聊天功能。</p>
  </a>
  <a class="ml-route-card" href="/integrations/workbuddy">
    <span>WorkBuddy</span>
    <p>为 AI Agent 桌面应用添加 DouDi 模型。</p>
  </a>
  <a class="ml-route-card" href="/integrations/immersive-translate">
    <span>沉浸式翻译</span>
    <p>使用 DouDi 模型作为网页翻译、总结和阅读辅助入口。</p>
  </a>
</div>

## SDK 与自部署

适合开发框架、自部署 Web Chat 和代码里的直接调用。

<div class="ml-route-grid">
  <a class="ml-route-card" href="/integrations/openai-sdk">
    <span>OpenAI SDK</span>
    <p>在 Python、TypeScript 等代码里直接指定 DouDi Base URL。</p>
  </a>
  <a class="ml-route-card" href="/integrations/langchain">
    <span>LangChain</span>
    <p>在 LangChain 中配置 OpenAI 兼容模型和调用参数。</p>
  </a>
  <a class="ml-route-card" href="/integrations/llamaindex">
    <span>LlamaIndex</span>
    <p>把 DouDi 接入 RAG、索引和检索增强生成流程。</p>
  </a>
  <a class="ml-route-card" href="/tools/open-webui">
    <span>Open WebUI</span>
    <p>为自部署 Web Chat 配置 OpenAI Compatible endpoint。</p>
  </a>
</div>

## 不确定选哪个

| 你的场景 | 推荐入口 |
| --- | --- |
| 想先跑通代码调用 | [快速开始](/quick-start) 或 [OpenAI SDK](/integrations/openai-sdk) |
| 想配置 Claude Code | [Claude Code 总览](/integrations/claude-code) → [模型提供商](/integrations/claude-code/model-provider) |
| 想配置 Codex CLI | [Codex CLI 总览](/integrations/codex) → [模型提供商](/integrations/codex/model-provider) |
| 想用桌面聊天软件 | [Cherry Studio](/integrations/cherry-studio) 或 [Chatbox](/integrations/chatbox) |
| 请求失败、模型不显示或扣费异常 | [工具问题排查](/tools/troubleshooting) |

## 旧版工具教程

旧版工具页仍保留，避免历史链接失效。新用户优先使用上方四个分类。

<div class="ml-route-grid">
  <a class="ml-route-card" href="/tools">
    <span>旧版工具总览</span>
    <p>查看早期工具接入目录。</p>
  </a>
  <a class="ml-route-card" href="/tools/codebuddy">
    <span>CodeBuddy</span>
    <p>旧版 CodeBuddy 配置教程。</p>
  </a>
  <a class="ml-route-card" href="/tools/trae">
    <span>Trae</span>
    <p>旧版 Trae 配置教程。</p>
  </a>
  <a class="ml-route-card" href="/integrations/others">
    <span>其他客户端</span>
    <p>没有列出的客户端，按 OpenAI Compatible 思路配置。</p>
  </a>
</div>
