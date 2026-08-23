# OpenClaw

[OpenClaw](https://openclaw.ai) 是一款开源的本地 AI 助手，通过 WhatsApp、Telegram、Slack 等消息应用与你交互，能执行邮件、日历、网页浏览等任务。它完全在本地运行，数据不离开你的设备。

## 为什么搭配 DouDi.ai？

*   **统一入口** — 一个 API Key 接入 DouDi.ai 当前可用模型
*   **灵活的 Agent 策略** — 不同 Agent 可绑定不同用途的模型
*   **成本可控** — 通过 [使用日志页面](https://doudi.ai/usage-logs/common) 和 [数据看板页面](https://doudi.ai/dashboard/models) 观察消耗
*   **回退能力** — 可以给主模型配置 fallback，降低单个上游异常对任务的影响

OpenClaw 作为 Agentic AI 助手，单次任务的 Token 消耗较大。建议根据任务复杂度、模型价格和上下文窗口选择模型；实时模型和价格以 [模型广场/价格页面](https://doudi.ai/pricing) 或 [Models API](/api/openai/models) 为准。

## 安装

macOS / Linux

```bash
curl -sSL https://openclaw.ai/install.sh | bash
```

Windows (PowerShell)

```powershell
& ([scriptblock]::Create((iwr -useb https://openclaw.ai/install.ps1)))
```

## 快速开始

### 1\. 获取 API Key

前往 [API Key 管理页面](https://doudi.ai/keys) 创建 API Key。

### 2\. 选择模型 ID

打开 [模型广场/价格页面](https://doudi.ai/pricing)，复制当前账号可用的模型 ID。使用 OpenClaw 前，请同时确认模型支持你需要的输入能力，例如文本、图片、文件或工具调用。

### 3\. 运行配置向导

OpenClaw 提供交互式向导：

```bash
openclaw onboard
```

在向导中选择 **Custom Provider**，填入以下信息：

| 配置项 | 值 |
| --- | --- |
| **Provider Type** | `anthropic-messages` 或 `openai-responses` |
| **Base URL** | Anthropic: `https://doudi.ai/anthropic`；OpenAI Responses: `https://doudi.ai/v1` |
| **API Key** | 你的 DouDi.ai API Key |
| **Model** | 从模型广场复制的当前可用模型 ID |

### 4\. 启动验证

```bash
openclaw start
```

向 OpenClaw 发送一条消息测试连通性。如果收到正常回复，配置成功。

## 完整配置

OpenClaw 通过 `~/.openclaw/openclaw.json` 管理所有配置（支持 JSON5 格式，可写注释）。

### Provider 配置

Provider 定义在 `models.providers` 下，每个 Provider 需要指定 API 协议类型、地址和密钥：

```json
{
  "models": {
    "providers": {
      "doudi-anthropic": {
        "baseUrl": "https://doudi.ai/anthropic",
        "apiKey": "${DOUDI_API_KEY}",
        "api": "anthropic-messages",
        "models": []
      },
      "doudi-openai": {
        "baseUrl": "https://doudi.ai/v1",
        "apiKey": "${DOUDI_API_KEY}",
        "api": "openai-responses",
        "models": []
      }
    }
  }
}
```

`apiKey` 支持 `${ENV_VAR}` 语法引用环境变量，避免明文写入配置文件。需要 Anthropic 原生能力时使用 `doudi-anthropic`；需要 Responses 协议时使用 `doudi-openai`。

### Models 配置

模型定义在对应 Provider 的 `models` 数组中。不要把文档里的占位符直接复制为真实模型；请从 [模型广场/价格页面](https://doudi.ai/pricing) 或 [Models API](/api/openai/models) 复制当前可用 ID，并按模型元数据填写上下文和输出限制。

```json
{
  "models": {
    "providers": {
      "doudi-openai": {
        "baseUrl": "https://doudi.ai/v1",
        "apiKey": "${DOUDI_API_KEY}",
        "api": "openai-responses",
        "models": [
          {
            "id": "<MODEL_ID>",
            "name": "<DISPLAY_NAME>",
            "input": ["text"],
            "contextWindow": 200000,
            "maxTokens": 8192
          }
        ]
      }
    }
  }
}
```

常用字段：

| 字段 | 说明 |
| --- | --- |
| `id` | DouDi.ai 返回的完整模型 ID |
| `name` | OpenClaw UI 中显示的名称 |
| `input` | 模型支持的输入类型，例如 `text`、`image`、`file` |
| `reasoning` | 模型是否支持推理/思考能力 |
| `contextWindow` | 上下文窗口大小，参考模型元数据填写 |
| `maxTokens` | 单次最大输出 token，参考模型元数据填写 |

### Agents 配置

OpenClaw 通过 `agents.defaults` 设置全局默认，通过 `agents.list` 数组定义不同 Agent。Agent 中引用模型时需要使用 `provider名/model-id` 格式。

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "doudi-openai/<MODEL_ID>",
        "fallbacks": ["doudi-openai/<FALLBACK_MODEL_ID>"]
      },
      "models": {
        "doudi-openai/<MODEL_ID>": { "alias": "primary" },
        "doudi-openai/<FALLBACK_MODEL_ID>": { "alias": "fast" }
      },
      "thinkingDefault": "low",
      "timeoutSeconds": 600,
      "maxConcurrent": 3
    },
    "list": [
      {
        "id": "main",
        "default": true
      },
      {
        "id": "research",
        "model": {
          "primary": "doudi-openai/<RESEARCH_MODEL_ID>"
        }
      },
      {
        "id": "quick",
        "model": {
          "primary": "doudi-openai/<FAST_MODEL_ID>"
        }
      }
    ]
  }
}
```

建议按用途建立别名，而不是按具体模型名建立别名。这样模型调整时只需要改配置，不需要改变操作习惯。

## 完整配置示例

以下示例展示 Provider、Models 和 Agents 的组合方式。请把所有 `<...>` 占位符替换成当前可用模型 ID 和对应参数。

```json
{
  "models": {
    "providers": {
      "doudi-openai": {
        "baseUrl": "https://doudi.ai/v1",
        "apiKey": "${DOUDI_API_KEY}",
        "api": "openai-responses",
        "models": [
          {
            "id": "<PRIMARY_MODEL_ID>",
            "name": "Primary",
            "input": ["text", "image", "file"],
            "contextWindow": 200000,
            "maxTokens": 8192
          },
          {
            "id": "<FAST_MODEL_ID>",
            "name": "Fast",
            "input": ["text"],
            "contextWindow": 128000,
            "maxTokens": 4096
          }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "doudi-openai/<PRIMARY_MODEL_ID>",
        "fallbacks": ["doudi-openai/<FAST_MODEL_ID>"]
      },
      "models": {
        "doudi-openai/<PRIMARY_MODEL_ID>": { "alias": "primary" },
        "doudi-openai/<FAST_MODEL_ID>": { "alias": "fast" }
      },
      "thinkingDefault": "low",
      "timeoutSeconds": 600,
      "maxConcurrent": 3
    },
    "list": [
      { "id": "main", "default": true },
      {
        "id": "quick",
        "model": { "primary": "doudi-openai/<FAST_MODEL_ID>" }
      }
    ]
  }
}
```

## 使用场景

配置完成后，通过消息应用向 OpenClaw 发送指令：

*   **邮件管理** — “帮我整理今天未读的邮件，按优先级排序”
*   **日程安排** — “明天下午 3 点安排一个团队会议”
*   **信息检索** — “搜索最近关于 AI Agent 的技术文章，总结要点”
*   **代码辅助** — “帮我 review 这段 Python 代码，检查安全问题”
*   **工作流自动化** — “每天早上 9 点发送团队日报到 Slack #general 频道”

## 故障排除

**无法连接 DouDi.ai**

确认 `baseUrl` 配置正确：

*   Anthropic 协议：`https://doudi.ai/anthropic`
*   OpenAI Responses 协议：`https://doudi.ai/v1`

**模型不存在**

确认 `models.providers[].models[].id` 使用 DouDi.ai 返回的完整模型 ID；在 `agents` 中引用模型时，需要加上 OpenClaw Provider 名前缀，例如 `doudi-openai/<MODEL_ID>`。

**Token 消耗过高**

OpenClaw 单次任务消耗较大，建议：

1.  在 [模型广场/价格页面](https://doudi.ai/pricing) 选择更适合日常任务的当前可用模型
2.  只在复杂任务中切换到高能力或高上下文模型
3.  在 [使用日志页面](https://doudi.ai/usage-logs/common) 查看请求明细，并用 [数据看板页面](https://doudi.ai/dashboard/models) 监控模型维度用量

**如何快速切换模型**

在对话中使用别名切换，例如 `/model primary` 或 `/model fast`。别名来自 `agents.defaults.models` 配置。
