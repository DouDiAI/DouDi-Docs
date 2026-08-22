# 工具接入

<script setup>
import { withBase } from "vitepress";
</script>

这一组文档用于把 DouDi 接入常见客户端、代码工具、编辑器、自部署服务和 SDK。第一次配置不要同时改很多软件，先选一个目标工具，把 Key、Base URL、模型名跑通，再扩展到第二个工具。

## 新手先看

<div class="ml-route-grid">
  <a class="ml-route-card" href="choose-tool">
    <span>怎么选择工具</span>
    <p>按聊天、写代码、VS Code、自部署和 SDK 场景选择入口。</p>
  </a>
  <a class="ml-route-card" href="../api-key">
    <span>创建 API Key</span>
    <p>为每个软件单独创建 Key，方便限额、停用和排查消耗。</p>
  </a>
  <a class="ml-route-card" href="openai-compatible">
    <span>OpenAI Compatible</span>
    <p>先弄懂 Base URL、API Key、Model 三个核心字段。</p>
  </a>
  <a class="ml-route-card" href="troubleshooting">
    <span>接入失败排查</span>
    <p>按状态码、模型名、分组、接口格式和客户端差异定位。</p>
  </a>
</div>

## 通用填写规则

除非单页特别说明，OpenAI 兼容配置默认填写：

| 配置项 | 推荐值 |
| --- | --- |
| Base URL | `https://doudi.ai/v1` |
| API Key | DouDi 控制台令牌页创建的 Key |
| 模型名 | 从 DouDi 控制台复制完整模型 ID |

部分客户端会自动补 `/v1/chat/completions`，因此它们只需要填写 `https://doudi.ai`。这类差异会写在对应教程里；不要把一个软件的地址规则照搬到另一个软件。

## 按场景进入

<div class="ml-grid">
  <div class="ml-card">
    <strong>我想聊天、翻译、总结</strong>
    <span>优先看 Chatbox、Cherry Studio、LobeHub、OpenCat 或 NextChat。</span>
  </div>
  <div class="ml-card">
    <strong>我想写代码、改项目</strong>
    <span>优先看 Claude Code、Codex CLI、OpenCode、Trae、CodeBuddy、Zed Editor。</span>
  </div>
  <div class="ml-card">
    <strong>我在 VS Code 里工作</strong>
    <span>优先看 Cline。GitHub Copilot 不能直接填写 DouDi Key。</span>
  </div>
</div>

## 工具矩阵

<div class="dd-tool-grid">
  <a class="dd-tool-card" href="claude-code">
    <span class="dd-tool-icon"><img :src="withBase('/tool-icons/claude.ico')" alt=""></span>
    <span class="dd-tool-copy">
      <strong>Claude Code</strong>
      <em>终端里的代码协作，适合项目修改和命令行工作流。</em>
    </span>
  </a>
  <a class="dd-tool-card" href="codex-cli">
    <span class="dd-tool-icon"><img :src="withBase('/tool-icons/codex.svg')" alt=""></span>
    <span class="dd-tool-copy">
      <strong>Codex CLI</strong>
      <em>通过 <code>config.toml</code> 接入 DouDi provider 和 Responses API。</em>
    </span>
  </a>
  <a class="dd-tool-card" href="opencode">
    <span class="dd-tool-icon"><img :src="withBase('/tool-icons/opencode.png')" alt=""></span>
    <span class="dd-tool-copy">
      <strong>OpenCode</strong>
      <em>桌面端代码智能体，自定义提供商和模型配置。</em>
    </span>
  </a>
  <a class="dd-tool-card" href="cc-switch">
    <span class="dd-tool-icon"><img :src="withBase('/tool-icons/cc-switch.png')" alt=""></span>
    <span class="dd-tool-copy">
      <strong>CC Switch</strong>
      <em>切换 Codex / Responses 相关供应商配置。</em>
    </span>
  </a>
  <a class="dd-tool-card" href="claude-cowork">
    <span class="dd-tool-icon"><img :src="withBase('/tool-icons/claude.ico')" alt=""></span>
    <span class="dd-tool-copy">
      <strong>Claude Coworks</strong>
      <em>Claude Desktop 第三方推理网关配置。</em>
    </span>
  </a>
  <a class="dd-tool-card" href="cherry-studio">
    <span class="dd-tool-icon"><img :src="withBase('/tool-icons/cherry.png')" alt=""></span>
    <span class="dd-tool-copy">
      <strong>Cherry Studio</strong>
      <em>图形界面管理多个服务商、模型和默认会话。</em>
    </span>
  </a>
  <a class="dd-tool-card" href="chatbox">
    <span class="dd-tool-icon"><img :src="withBase('/tool-icons/chatbox.ico')" alt=""></span>
    <span class="dd-tool-copy">
      <strong>Chatbox</strong>
      <em>日常聊天、翻译、总结和轻量代码问答。</em>
    </span>
  </a>
  <a class="dd-tool-card" href="botgem">
    <span class="dd-tool-icon"><img :src="withBase('/tool-icons/botgem.ico')" alt=""></span>
    <span class="dd-tool-copy">
      <strong>BotGem</strong>
      <em>桌面聊天客户端，通过 Other Provider 接入。</em>
    </span>
  </a>
  <a class="dd-tool-card" href="cline">
    <span class="dd-tool-icon"><img :src="withBase('/tool-icons/cline.png')" alt=""></span>
    <span class="dd-tool-copy">
      <strong>Cline</strong>
      <em>VS Code 内的 OpenAI Compatible Agent 配置。</em>
    </span>
  </a>
  <a class="dd-tool-card" href="cursor">
    <span class="dd-tool-icon"><img :src="withBase('/tool-icons/cursor.ico')" alt=""></span>
    <span class="dd-tool-copy">
      <strong>Cursor</strong>
      <em>编辑器内自定义 Base URL 或兼容 Provider。</em>
    </span>
  </a>
  <a class="dd-tool-card" href="zed-editor">
    <span class="dd-tool-icon"><img :src="withBase('/tool-icons/zed-editor.png')" alt=""></span>
    <span class="dd-tool-copy">
      <strong>Zed Editor</strong>
      <em>通过 AI provider 和 <code>settings.json</code> 管理模型。</em>
    </span>
  </a>
  <a class="dd-tool-card" href="trae">
    <span class="dd-tool-icon"><img :src="withBase('/tool-icons/trae.png')" alt=""></span>
    <span class="dd-tool-copy">
      <strong>Trae</strong>
      <em>自定义 OpenAI 兼容模型，适合代码问答和项目辅助。</em>
    </span>
  </a>
  <a class="dd-tool-card" href="codebuddy">
    <span class="dd-tool-icon"><img :src="withBase('/tool-icons/codebuddy.svg')" alt=""></span>
    <span class="dd-tool-copy">
      <strong>CodeBuddy</strong>
      <em>IDE 模型面板中的自定义 API 模型。</em>
    </span>
  </a>
  <a class="dd-tool-card" href="workbuddy">
    <span class="dd-tool-icon"><img :src="withBase('/tool-icons/workbuddy.svg')" alt=""></span>
    <span class="dd-tool-copy">
      <strong>WorkBuddy</strong>
      <em>通过本地模型配置文件接入 OpenAI 兼容协议。</em>
    </span>
  </a>
  <a class="dd-tool-card" href="lobehub">
    <span class="dd-tool-icon"><img :src="withBase('/tool-icons/lobehub.png')" alt=""></span>
    <span class="dd-tool-copy">
      <strong>LobeHub / LobeChat</strong>
      <em>网页聊天、自部署聊天入口和默认服务模型配置。</em>
    </span>
  </a>
  <a class="dd-tool-card" href="nextchat">
    <span class="dd-tool-icon"><img :src="withBase('/tool-icons/nextchat.png')" alt=""></span>
    <span class="dd-tool-copy">
      <strong>NextChat</strong>
      <em>轻量网页聊天、自部署入口和兼容 API 配置。</em>
    </span>
  </a>
  <a class="dd-tool-card" href="opencat">
    <span class="dd-tool-icon"><img :src="withBase('/tool-icons/opencat.ico')" alt=""></span>
    <span class="dd-tool-copy">
      <strong>OpenCat</strong>
      <em>桌面或移动端客户端的 API Host 与模型配置。</em>
    </span>
  </a>
  <a class="dd-tool-card" href="open-webui">
    <span class="dd-tool-icon"><img :src="withBase('/tool-icons/openwebui.png')" alt=""></span>
    <span class="dd-tool-copy">
      <strong>Open WebUI</strong>
      <em>团队或个人自建网页聊天入口。</em>
    </span>
  </a>
  <a class="dd-tool-card" href="langchain-sdk">
    <span class="dd-tool-icon"><img :src="withBase('/tool-icons/langchain.svg')" alt=""></span>
    <span class="dd-tool-copy">
      <strong>LangChain / SDK</strong>
      <em>脚本、应用后端、机器人和批量任务接入。</em>
    </span>
  </a>
  <a class="dd-tool-card" href="llamaindex">
    <span class="dd-tool-icon"><img :src="withBase('/tool-icons/llamaindex.svg')" alt=""></span>
    <span class="dd-tool-copy">
      <strong>LlamaIndex / SDK</strong>
      <em>知识库、RAG 和索引应用。</em>
    </span>
  </a>
  <a class="dd-tool-card" href="openclaw">
    <span class="dd-tool-icon"><img :src="withBase('/tool-icons/openclaw.svg')" alt=""></span>
    <span class="dd-tool-copy">
      <strong>OpenClaw</strong>
      <em>智能体类工具的自定义模型服务入口。</em>
    </span>
  </a>
  <a class="dd-tool-card" href="github-copilot">
    <span class="dd-tool-icon"><img :src="withBase('/tool-icons/github-copilot.png')" alt=""></span>
    <span class="dd-tool-copy">
      <strong>GitHub Copilot</strong>
      <em>说明官方 Copilot 为什么不能直接填写 DouDi Key。</em>
    </span>
  </a>
  <a class="dd-tool-card" href="hermes-openclaw-403">
    <span class="dd-tool-icon"><img :src="withBase('/tool-icons/403.svg')" alt=""></span>
    <span class="dd-tool-copy">
      <strong>Hermes / OpenClaw 403</strong>
      <em>代理、网关、权限和状态码排查。</em>
    </span>
  </a>
</div>

## 全部教程

### 基础与排查

| 教程 | 适合场景 |
| --- | --- |
| [怎么选择工具](choose-tool) | 不确定该配置哪个软件 |
| [OpenAI Compatible](openai-compatible) | 自写脚本、通用客户端、先验证 Key |
| [工具接入常见问题排查](troubleshooting) | 401、403、404、429、Reconnect、模型不存在 |

### 代码与 Agent 工具

| 工具 | 适合场景 |
| --- | --- |
| [Claude Code](claude-code) | Claude Code 工作流、命令行代码协作 |
| [Claude Coworks](claude-cowork) | Claude Desktop 第三方推理网关配置 |
| [Codex CLI](codex-cli) | Codex 命令行、Responses API、自定义 provider |
| [OpenCode](opencode) | 桌面端代码智能体、自定义提供商 |
| [CC Switch](cc-switch) | 切换 Codex / Responses 相关供应商配置 |
| [Zed Editor](zed-editor) | Zed 编辑器内配置 AI provider |
| [Trae](trae) | TraeCode 自定义 OpenAI 兼容模型 |
| [CodeBuddy](codebuddy) | CodeBuddy IDE 自定义 API 模型 |
| [WorkBuddy](workbuddy) | WorkBuddy 自定义模型配置 |

### 桌面聊天与网页客户端

| 工具 | 适合场景 |
| --- | --- |
| [Cherry Studio](cherry-studio) | 图形界面管理多个 Provider 和模型 |
| [Chatbox](chatbox) | 日常聊天、翻译、总结、代码问答 |
| [BotGem](botgem) | 桌面聊天客户端自定义服务商 |
| [LobeHub / LobeChat](lobehub) | 网页聊天或自部署聊天入口 |
| [OpenCat](opencat) | 桌面 / 移动端客户端配置 |
| [NextChat](nextchat) | 网页聊天、自部署或轻量客户端 |

### 编辑器、平台与特殊场景

| 教程 | 说明 |
| --- | --- |
| [Cline](cline) | VS Code 内使用 OpenAI Compatible Provider |
| [Cursor](cursor) | Cursor 自定义 Provider 或 Base URL 配置 |
| [GitHub Copilot](github-copilot) | 说明为什么官方 Copilot 不能直接接入 DouDi |
| [Open WebUI](open-webui) | 自建网页聊天入口或团队使用 |
| [OpenClaw](openclaw) | OpenClaw 相关配置入口 |
| [Hermes / OpenClaw 403](hermes-openclaw-403) | 403、代理和网关问题排查 |
| [LangChain / SDK](langchain-sdk) | 代码框架、OpenAI SDK、脚本开发 |
| [LlamaIndex / SDK](llamaindex) | 知识库、RAG 和索引应用 |

## 配置前检查

<div class="ml-checklist">

- 已经在 DouDi 控制台创建专用 API Key。
- 已经复制当前账号可用的完整模型 ID。
- 已经确认当前教程要求填写的是 `https://doudi.ai` 还是 `https://doudi.ai/v1`。
- 第一次测试只发送一句短消息，成功后再做长上下文、文件上传或批量任务。
- 截图、提问和提交 Issue 前已经隐藏 API Key。

</div>
