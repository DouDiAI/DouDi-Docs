# 工具接入

大多数 AI 客户端都可以用 OpenAI Compatible 方式接入 DouDi。你只需要找到“自定义 OpenAI 提供商”或“OpenAI Compatible Provider”，然后填写三项。

| 配置项 | 内容 |
| --- | --- |
| API Key | DouDi 控制台创建的 Key |
| Base URL | `https://doudi.ai/v1` |
| Model | 控制台可用模型名 |

## 怎么选工具

| 使用场景 | 推荐先看 |
| --- | --- |
| 自己写代码或 SDK | [OpenAI Compatible](/tools/openai-compatible) |
| 命令行编程助手 | [Codex CLI](/tools/codex-cli) |
| Claude Code 工作流 | [Claude Code](/tools/claude-code) |
| IDE 内补全与聊天 | [Cursor](/tools/cursor) |
| 桌面聊天客户端 | [Cherry Studio](/tools/cherry-studio) |
| VS Code Agent | [Cline](/tools/cline) |
| 自建 Web Chat | [Open WebUI](/tools/open-webui) |

## 通用检查

配置后先做一次短文本请求。成功后再尝试长上下文、工具调用、图片或其他高级能力。不同客户端对 OpenAI 格式的兼容程度不同，高级能力应逐项验证。
