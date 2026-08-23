# Zed Editor

![Zed Editor 中配置 DouDi.ai](/imported/haoai/integrations-zed-01.webp)

## 为什么选 Zed？

[Zed](https://zed.dev)  是目前 AI 编码体验最完整的编辑器：

*   **原生 Agent 支持** — 内置 Claude Code、Codex CLI 作为外部代理
*   **自定义 LLM Provider** — 通过 OpenAI 兼容协议接入任意模型
*   **高性能** — Rust 编写，启动快、占用低

搭配 DouDi.ai，一个 API Key 即可在 Zed 中使用全球顶级模型。

## 快速开始

### 1\. 获取 API Key

前往 [API Key 管理页面](https://doudi.ai/keys)  创建 API Key。

### 2\. 添加 Provider

### Agent Panel 添加（推荐）

通过 Agent Panel 可视化添加，无需编辑 JSON。

1.  按 `⌘ + Shift + A` 打开 Agent Panel
2.  点击 LLM Providers 区域的 **\+ Add Provider**
3.  按下图填写配置：

![Zed 添加 DouDi.ai Provider](/imported/haoai/integrations-zed-02.webp)

| 标注 | 字段 | 值 |
| --- | --- | --- |
| ① | Provider Name | `DouDi.ai` |
| ② | API URL | `https://doudi.ai/v1` |
| ③ | API Key | 你的 DouDi.ai API Key |
| ④ | Model Name | `openai/gpt-5.4-mini` |
| ⑤ | Max Completion Tokens | `512000` |
| ⑥ | Capabilities | 勾选模型支持的能力 |

点击 **\+ Add Model** 继续添加更多模型。

### settings.json 配置

通过 `settings.json` 批量配置所有模型。

1.  按 `⌘ + ,` 打开设置，点击右上角 **Edit in settings.json**
2.  在 `~/.config/zed/settings.json` 中添加以下配置：

```json
{
  "language_models": {
    "openai_compatible": {
      "DouDi.ai": {
        "api_url": "https://doudi.ai/v1",
        "available_models": [
          {
            "name": "openai/gpt-5.3-codex",
            "display_name": "GPT-5.3 Codex",
            "max_tokens": 512000,
            "max_output_tokens": 65536,
            "capabilities": {
              "tools": true,
              "images": true
            }
          },
          {
            "name": "openai/gpt-5-mini",
            "display_name": "GPT-5 Mini",
            "max_tokens": 256000,
            "max_output_tokens": 32768,
            "capabilities": {
              "tools": true,
              "images": true
            }
          },
          {
            "name": "moonshotai/kimi-k2.5",
            "display_name": "Kimi K2.5",
            "max_tokens": 262144,
            "max_output_tokens": 262144,
            "capabilities": {
              "tools": true,
              "images": true
            }
          },
          {
            "name": "bailian/qwen3-max",
            "display_name": "Qwen3 Max",
            "max_tokens": 256000,
            "max_output_tokens": 64000,
            "capabilities": {
              "tools": true,
              "images": false
            }
          }
        ]
      }
    }
  }
}
```

1.  保存后，Zed 会弹出输入框要求输入 API Key

settings.json 适合批量添加模型，后续增删直接编辑 available\_models 数组即可。

API Key 安全存储在系统钥匙串（macOS Keychain / Linux Secret Service）中，不会明文写入配置文件。

## 开始使用

Zed Agent Panel 有两种模式：

| 模式 | 说明 |
| --- | --- |
| **Zed Agent** | 内置 AI 助手，使用你配置的 LLM Provider（如 DouDi.ai） |
| **External Agents** | 外部 Agent（如 Claude Code、Codex CLI），独立运行 |

使用 **Zed Agent** 开始对话：

![Zed Agent Panel 模型选择](/imported/haoai/integrations-zed-03.webp)

| 步骤 | 操作 |
| --- | --- |
| ① | 点击 **+** → 选择 **Zed Agent**（`⌘ + N`） |
| ② | External Agents 区域展示已连接的外部 Agent |
| ③ | 右下角模型选择器 → **DouDi.ai** 分组 → 选择模型 |

![Zed Agent 对话演示](/imported/haoai/integrations-zed-04.webp)

## 推荐模型

推荐模型请参考 [模型广场/价格页面](https://doudi.ai/pricing) 。

## 添加更多模型

每个模型需要以下参数：

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `name` | 是 | 模型 ID，如 `openai/gpt-5.4-mini` |
| `display_name` | 否 | UI 显示名称 |
| `max_tokens` | 是 | 上下文窗口大小 |
| `max_output_tokens` | 否 | 最大输出 token 数 |
| `capabilities.tools` | 否 | 是否支持 Function Calling |
| `capabilities.images` | 否 | 是否支持图片输入 |

### 高手实践

手动填参数太慢？点击本页右上角 **Copy Page** 复制全文（或直接发送本页 URL），连同 `https://doudi.ai/v1/models` 一起发给 AI，让它自动生成完整的 `settings.json` 配置。

进入设置页面 → 点击右上角 **Edit in settings.json** 即可粘贴：

![Edit in settings.json](/imported/haoai/integrations-zed-05.webp)

## 故障排除

**模型列表中看不到 DouDi.ai**

确认 `settings.json` 格式正确，保存后重启 Zed。

**提示认证错误**

命令面板 `⌘ + Shift + P` → 搜索 `language model: reset credentials` → 重新输入 API Key。

**模型不支持工具调用**

将 `capabilities.tools` 设为 `false`。
