# 怎么选工具

如果你刚开始使用 DouDi，不需要一口气看完所有软件教程。先根据自己的目标选一个工具，跑通后再扩展到其他软件。

## 先按用途选择

| 你想做什么 | 建议先看 | 为什么 |
| --- | --- | --- |
| 日常聊天、翻译、总结 | [Chatbox](/tools/chatbox) 或 [Cherry Studio](/tools/cherry-studio) | 界面直观，适合第一次配置 API Key |
| 写代码、改项目 | [Claude Code](/tools/claude-code)、[Codex CLI](/tools/codex-cli)、[OpenCode](/tools/opencode) | 更适合在项目目录里处理代码 |
| 在 VS Code 里用 AI | [Cline](/tools/cline) | 不需要换编辑器，直接在 VS Code 里配置 |
| 配多个模型和服务商 | [Cherry Studio](/tools/cherry-studio) 或 [LobeHub](/tools/lobehub) | 适合管理多个 Provider 和模型 |
| 想先验证 Key 是否能用 | [OpenAI Compatible](/tools/openai-compatible) | 最通用，能快速排查 Base URL、Key、模型名 |
| 遇到频繁断线 | [常见问题排查](/tools/troubleshooting) 或 [Codex CLI](/tools/codex-cli) | 先排网络、代理和客户端重试问题 |

## 新手推荐顺序

第一次配置建议按这个顺序：

1. 先完成 [创建 API Key](/api-key)。
2. 再看 [OpenAI Compatible](/tools/openai-compatible)，理解 `Base URL`、`API Key`、`Model` 三个字段。
3. 如果你要聊天，选 [Chatbox](/tools/chatbox) 或 [Cherry Studio](/tools/cherry-studio)。
4. 如果你要写代码，选 [Claude Code](/tools/claude-code) 或 [Codex CLI](/tools/codex-cli)。
5. 成功后再配置第二个软件，不要一开始同时改很多工具。

## 每篇教程都按这个方法读

不要只复制命令或只看截图。建议每一篇都按固定顺序读：

1. 先看“下载地址”，确认你装的是对应软件。
2. 再看“准备工作”，把 Key、Base URL、模型 ID 准备好。
3. 对照每一步截图填写，不要跳步。
4. 做最小测试，只发送一句短消息。
5. 最后看“配置检查清单”和“常见问题”。

## 三个最容易填错的地方

| 字段 | 正确理解 | 常见错误 |
| --- | --- | --- |
| API Key | DouDi 控制台创建的密钥 | 多复制空格、把 Key 填到模型名里 |
| Base URL | 软件要连接的 API 地址 | 有的软件要 `/v1`，有的软件不要 `/v1` |
| Model | DouDi 控制台里的完整模型 ID | 只写简称，或照抄别人的旧模型名 |

::: tip
不同软件对 Base URL 的要求不一样。比如 OpenAI Compatible 通常填 `https://doudi.ai/v1`，但 Chatbox、Cherry Studio、BotGem 这类软件可能会自动补接口路径，教程里会单独说明。
:::

## 跑通后怎么维护

- 每个软件单独创建一个 API Key，方便以后查消耗。
- 不同用途使用不同模型，测试用低消耗模型，正式任务再切换。
- 截图时隐藏 API Key。
- 软件升级后如果入口变化，优先看页面里的字段名称，不要只按按钮位置找。
- 遇到失败先看 [常见问题排查](/tools/troubleshooting)，再重新配置。
