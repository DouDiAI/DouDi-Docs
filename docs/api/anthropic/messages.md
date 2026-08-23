# Messages API (推荐)

通过 Anthropic 原生协议创建 Claude 对话。DouDi.ai 完全兼容 Anthropic Messages API，你可以直接使用官方 SDK。

**推荐使用 Anthropic 原生协议调用 Claude 模型。** 相比 OpenAI 兼容协议转发，原生协议具备以下优势：

*   **原生 Prompt Caching** — `system` 指令独立传递，自动享受 Anthropic 原生缓存机制，多轮对话前缀命中率更高，可节省最高 90% 输入 token 费用
*   **完整特性支持** — 原生支持 Extended Thinking、Citations、PDF 输入等 Claude 独有能力，无协议转换损耗
*   **更低延迟** — 无需 OpenAI → Anthropic 协议转换，请求直达上游

## 端点

```
POST https://doudi.ai/anthropic/v1/messages
```

## 认证

Anthropic 协议使用 `x-api-key` Header：

```
x-api-key: <你的 DOUDI_API_KEY>
anthropic-version: 2023-06-01
```

## 请求参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `model` | string | ✅ | 模型标识，如 `anthropic/claude-sonnet-4.6` |
| `max_tokens` | number | ✅ | 最大生成 token 数 |
| `messages` | array | ✅ | 消息数组 |
| `system` | string | — | 系统提示词 |
| `temperature` | number | — | 采样温度 0-1 |
| `top_p` | number | — | 核采样参数 |
| `top_k` | number | — | Top-K 采样 |
| `stream` | boolean | — | 是否启用流式响应 |
| `tools` | array | — | 工具定义 |
| `tool_choice` | object | — | 工具选择策略 |
| `thinking` | object | — | Claude 思考模式配置，不同模型版本的取值不同 |
| `output_config` | object | — | Claude 4.6+ 自适应思考的输出配置，如 `effort` |

### Message 格式

```
interface Message {
  role: 'user' | 'assistant'
  content: string | ContentBlock[]
}

type ContentBlock =
  | { type: 'text'; text: string }
  | { type: 'image'; source: { type: 'base64'; media_type: string; data: string } }
  | { type: 'tool_use'; id: string; name: string; input: object }
  | { type: 'tool_result'; tool_use_id: string; content: string }
```

## Claude 思考模式

Claude 不同版本的思考模式参数不同。请按具体模型版本配置，不要把 `adaptive` 和 `budget_tokens` 混用到不支持的模型上。

| 模型 | 推荐配置 | 说明 |
| --- | --- | --- |
| `anthropic/claude-sonnet-4.5`、`anthropic/claude-haiku-4.5` | 手动思考 | 使用 `enabled + budget_tokens`，不支持 `adaptive` |
| `anthropic/claude-sonnet-4.6`、`anthropic/claude-opus-4.6` | 自适应思考 | 使用 `adaptive`；手动 `budget_tokens` 仍可用，但已不推荐 |
| `anthropic/claude-opus-4.7+` | 自适应思考 | 只使用 `adaptive`，不支持手动 `budget_tokens` |

`budget_tokens` 必须小于 `max_tokens`。思考过程会消耗并计入输出 token；如果只需要最终答案，可按上游支持情况使用 `display: "omitted"` 减少思考内容返回。

### 手动思考：Sonnet 4.5 / Haiku 4.5

`claude-sonnet-4.5` 和 `claude-haiku-4.5` 使用手动思考模式，需要显式设置 `budget_tokens`。

```
{
  "model": "anthropic/claude-sonnet-4.5",
  "max_tokens": 16000,
  "thinking": {
    "type": "enabled",
    "budget_tokens": 10000
  },
  "messages": [
    {
      "role": "user",
      "content": "请深入分析这个复杂问题..."
    }
  ]
}
```

### 自适应思考：Sonnet 4.6 / Opus 4.6

`claude-sonnet-4.6` 和 `claude-opus-4.6` 推荐使用自适应思考模式。`output_config.effort` 可按任务复杂度设置为 `low`、`medium` 或 `high`。

```
{
  "model": "anthropic/claude-sonnet-4.6",
  "max_tokens": 16000,
  "thinking": {
    "type": "adaptive"
  },
  "output_config": {
    "effort": "medium"
  },
  "messages": [
    {
      "role": "user",
      "content": "请深入分析这个复杂问题..."
    }
  ]
}
```

### Opus 4.7+：不要使用 budget\_tokens

`claude-opus-4.7+` 继续使用 `thinking: {"type":"adaptive"}`。不要在这些模型上发送手动 `budget_tokens`，否则上游可能返回参数错误。

## 请求示例

### cURL

```bash
curl https://doudi.ai/anthropic/v1/messages \
  -H "x-api-key: $DOUDI_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-sonnet-4.6",
    "max_tokens": 1024,
    "system": "你是一个专业的编程助手。",
    "messages": [
      {"role": "user", "content": "用 Python 写一个快速排序"}
    ]
  }'
```

### Python

```python
import anthropic

client = anthropic.Anthropic(
    base_url="https://doudi.ai/anthropic",
    api_key="<你的 DOUDI_API_KEY>"
)

message = client.messages.create(
    model="anthropic/claude-sonnet-4.6",
    max_tokens=1024,
    system="你是一个专业的编程助手。",
    messages=[
        {"role": "user", "content": "用 Python 写一个快速排序"}
    ]
)

print(message.content[0].text)
```

### TypeScript

```typescript
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  baseURL: 'https://doudi.ai/anthropic',
  apiKey: '<你的 DOUDI_API_KEY>'
})

const message = await client.messages.create({
  model: 'anthropic/claude-sonnet-4.6',
  max_tokens: 1024,
  system: '你是一个专业的编程助手。',
  messages: [
    { role: 'user', content: '用 Python 写一个快速排序' }
  ]
})

console.log(message.content[0].text)
```

## 响应格式

```
{
  "id": "msg_abc123",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "以下是 Python 快速排序的实现..."
    }
  ],
  "model": "anthropic/claude-sonnet-4.6",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 25,
    "output_tokens": 200
  }
}
```

## 流式响应

### Python

```python
with client.messages.stream(
    model="anthropic/claude-sonnet-4.6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "讲一个故事"}]
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
```

### TypeScript

```typescript
const stream = client.messages.stream({
  model: 'anthropic/claude-sonnet-4.6',
  max_tokens: 1024,
  messages: [{ role: 'user', content: '讲一个故事' }]
})

for await (const event of stream) {
  if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
    process.stdout.write(event.delta.text)
  }
}
```

## 支持的模型

| 模型 | 说明 |
| --- | --- |
| `anthropic/claude-opus-4.6` | Claude Opus 4 — 最强能力 |
| `anthropic/claude-sonnet-4.6` | Claude Sonnet 4 — 均衡性能 |
| `anthropic/claude-sonnet-4.5` | Claude Sonnet 4.5 — 支持手动思考模式 |
| `anthropic/claude-haiku-4.5` | Claude Haiku 4.5 — 快速响应 |

DouDi.ai 的 Anthropic 协议支持全部原生功能，包括 Vision、Tool Use、Prompt Caching、Extended Thinking 等。完整可用模型以 Models API 和 [模型广场/价格页面](https://doudi.ai/pricing) 为准。
