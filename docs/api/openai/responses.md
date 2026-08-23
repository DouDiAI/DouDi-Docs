# Responses API (推荐)

创建模型响应。支持文本和图像输入，生成文本或 JSON 输出。支持函数调用（Tool Calling）、流式响应和多轮对话。

**推荐新项目使用 Responses API。** 这是 OpenAI 推出的新一代 API，相比 [Chat Completions](/api/openai/chat-completions) 具备以下优势：

*   **原生 Prompt Caching** — `instructions` 与 `input` 分离，系统指令自动作为缓存前缀，多轮对话中不变的前缀部分缓存命中率更高，可节省最高 50% 输入 token 费用，同时降低延迟
*   **结构化 item 模式** — 输入/输出格式更清晰，原生支持工具调用流程
*   **更丰富的流式事件** — 细粒度的 SSE 事件类型，便于实时 UI 渲染

## 端点

```
POST https://doudi.ai/v1/responses
```

## 请求参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `model` | string | ✅ | 模型标识符，如 `openai/gpt-5.4-mini` |
| `input` | string | array | ✅ | 输入内容，可以是纯文本字符串或结构化消息数组 |
| `instructions` | string | — | 系统指令（独立于 input，自动享受 Prompt Caching） |
| `stream` | boolean | — | 是否启用 SSE 流式响应，默认 `false` |
| `max_output_tokens` | number | — | 最大生成 token 数 |
| `temperature` | number | — | 采样温度 0-2，默认 1 |
| `top_p` | number | — | 核采样参数 |
| `tools` | array | — | 可用工具定义（Function Calling） |
| `tool_choice` | string | object | — | 工具选择策略：`auto`、`none` 或指定工具 |
| `truncation` | string | — | 截断策略：`auto` 自动截断 / `disabled` 超限报错（默认） |
| `text` | object | — | 文本生成格式配置 |
| `store` | boolean | — | 是否存储响应（默认 `true`） |
| `metadata` | object | — | 自定义元数据键值对 |
| `provider` | object | — | DouDi.ai 扩展：路由和回退配置 |

### Input 格式

`input` 支持两种格式：

**1\. 简单字符串** — 直接传入文本

```
{
  "input": "你好，请介绍一下自己"
}
```

**2\. 结构化消息数组** — 多轮对话和多模态输入

```
interface InputItem {
  type: 'message'
  role: 'user' | 'assistant'
  content: ContentPart[]
  id?: string               // assistant 消息必填
  status?: 'completed'      // assistant 消息必填
}

type ContentPart =
  | { type: 'input_text'; text: string }           // 用户文本输入
  | { type: 'input_image'; image_url: string }     // 图像输入
  | { type: 'output_text'; text: string; annotations?: any[] }  // 助手文本输出
```

在多轮对话中包含 assistant 角色消息时，id 和 status 字段为必填。 Responses API 为无状态设计，每次请求需携带完整对话历史。

## 请求示例

### cURL

```bash
curl https://doudi.ai/v1/responses \
  -H "Authorization: Bearer $DOUDI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-5.4-mini",
    "input": "解释什么是 API Gateway",
    "instructions": "你是一个有帮助的技术助手，用中文回答。",
    "max_output_tokens": 1024
  }'
```

### Python

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://doudi.ai/v1",
    api_key="<你的 DOUDI_API_KEY>"
)

response = client.responses.create(
    model="openai/gpt-5.4-mini",
    input="解释什么是 API Gateway",
    instructions="你是一个有帮助的技术助手，用中文回答。",
    max_output_tokens=1024
)

print(response.output_text)
```

### TypeScript

```typescript
import OpenAI from 'openai'

const client = new OpenAI({
  baseURL: 'https://doudi.ai/v1',
  apiKey: '<你的 DOUDI_API_KEY>'
})

const response = await client.responses.create({
  model: 'openai/gpt-5.4-mini',
  input: '解释什么是 API Gateway',
  instructions: '你是一个有帮助的技术助手，用中文回答。',
  max_output_tokens: 1024
})

console.log(response.output_text)
```

## 响应格式

```
{
  "id": "resp_abc123",
  "object": "response",
  "created_at": 1703123456,
  "model": "openai/gpt-5.4-mini",
  "status": "completed",
  "output": [
    {
      "type": "message",
      "id": "msg_def456",
      "status": "completed",
      "role": "assistant",
      "content": [
        {
          "type": "output_text",
          "text": "API Gateway（API 网关）是一个...",
          "annotations": []
        }
      ]
    }
  ],
  "usage": {
    "input_tokens": 25,
    "output_tokens": 150,
    "total_tokens": 175
  }
}
```

### 响应字段说明

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | 响应唯一标识符，以 `resp_` 开头 |
| `object` | string | 固定值 `"response"` |
| `created_at` | number | 创建时间戳（Unix 秒） |
| `model` | string | 实际使用的模型 ID |
| `status` | string | 响应状态：`completed`、`failed`、`in_progress`、`cancelled` |
| `output` | array | 输出 item 数组，包含消息和工具调用 |
| `usage` | object | Token 用量统计 |

## 结构化消息输入

使用结构化消息数组实现多轮对话：

### Python

```python
response = client.responses.create(
    model="openai/gpt-5.4-mini",
    input=[
        {
            "type": "message",
            "role": "user",
            "content": [
                {"type": "input_text", "text": "法国的首都是哪里？"}
            ]
        },
        {
            "type": "message",
            "role": "assistant",
            "id": "msg_abc123",
            "status": "completed",
            "content": [
                {"type": "output_text", "text": "法国的首都是巴黎。", "annotations": []}
            ]
        },
        {
            "type": "message",
            "role": "user",
            "content": [
                {"type": "input_text", "text": "那里有多少人口？"}
            ]
        }
    ]
)

print(response.output_text)
```

### TypeScript

```typescript
const response = await client.responses.create({
  model: 'openai/gpt-5.4-mini',
  input: [
    {
      type: 'message',
      role: 'user',
      content: [
        { type: 'input_text', text: '法国的首都是哪里？' }
      ]
    },
    {
      type: 'message',
      role: 'assistant',
      id: 'msg_abc123',
      status: 'completed',
      content: [
        { type: 'output_text', text: '法国的首都是巴黎。', annotations: [] }
      ]
    },
    {
      type: 'message',
      role: 'user',
      content: [
        { type: 'input_text', text: '那里有多少人口？' }
      ]
    }
  ]
})

console.log(response.output_text)
```

## 流式响应

设置 `stream: true` 启用 SSE 流式响应：

### Python

```python
stream = client.responses.create(
    model="openai/gpt-5.4-mini",
    input="讲一个关于编程的笑话",
    stream=True
)

for event in stream:
    if event.type == "response.output_text.delta":
        print(event.delta, end="", flush=True)
```

### TypeScript

```typescript
const stream = await client.responses.create({
  model: 'openai/gpt-5.4-mini',
  input: '讲一个关于编程的笑话',
  stream: true
})

for await (const event of stream) {
  if (event.type === 'response.output_text.delta') {
    process.stdout.write(event.delta)
  }
}
```

### 流式事件类型

流式响应通过 SSE 发送以下事件：

```
data: {"type":"response.created","response":{"id":"resp_abc123","object":"response","status":"in_progress"}}

data: {"type":"response.output_item.added","output_index":0,"item":{"type":"message","id":"msg_def456","role":"assistant","status":"in_progress","content":[]}}

data: {"type":"response.content_part.added","output_index":0,"content_index":0,"part":{"type":"output_text","text":""}}

data: {"type":"response.output_text.delta","output_index":0,"content_index":0,"delta":"你"}

data: {"type":"response.output_text.delta","output_index":0,"content_index":0,"delta":"好"}

data: {"type":"response.output_item.done","output_index":0,"item":{"type":"message","id":"msg_def456","role":"assistant","status":"completed","content":[{"type":"output_text","text":"你好..."}]}}

data: {"type":"response.completed","response":{"id":"resp_abc123","object":"response","status":"completed","usage":{"input_tokens":12,"output_tokens":45,"total_tokens":57}}}

data: [DONE]
```

| 事件类型 | 说明 |
| --- | --- |
| `response.created` | 响应对象创建 |
| `response.output_item.added` | 新增输出 item |
| `response.content_part.added` | 新增内容片段 |
| `response.output_text.delta` | 文本增量（逐 token 输出） |
| `response.output_item.done` | 输出 item 完成 |
| `response.completed` | 响应全部完成 |
| `response.function_call_arguments.delta` | 函数调用参数增量 |
| `response.function_call_arguments.done` | 函数调用参数完成 |

## Function Calling

Responses API 原生支持工具调用：

### Python

```python
response = client.responses.create(
    model="openai/gpt-5.4-mini",
    input="北京今天天气怎么样？",
    tools=[
        {
            "type": "function",
            "name": "get_weather",
            "description": "获取指定城市的当前天气",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "城市名称，如 北京"
                    },
                    "unit": {
                        "type": "string",
                        "enum": ["celsius", "fahrenheit"]
                    }
                },
                "required": ["location"]
            }
        }
    ],
    tool_choice="auto"
)

# 处理工具调用
for item in response.output:
    if item.type == "function_call":
        print(f"调用函数: {item.name}")
        print(f"参数: {item.arguments}")
```

### TypeScript

```typescript
const response = await client.responses.create({
  model: 'openai/gpt-5.4-mini',
  input: '北京今天天气怎么样？',
  tools: [
    {
      type: 'function',
      name: 'get_weather',
      description: '获取指定城市的当前天气',
      parameters: {
        type: 'object',
        properties: {
          location: {
            type: 'string',
            description: '城市名称，如 北京'
          },
          unit: {
            type: 'string',
            enum: ['celsius', 'fahrenheit']
          }
        },
        required: ['location']
      }
    }
  ],
  tool_choice: 'auto'
})

// 处理工具调用
for (const item of response.output) {
  if (item.type === 'function_call') {
    console.log(`调用函数: ${item.name}`)
    console.log(`参数: ${item.arguments}`)
  }
}
```

### 工具调用响应格式

当模型调用工具时，`output` 中包含 `function_call` 类型的 item：

```
{
  "id": "resp_abc123",
  "object": "response",
  "status": "completed",
  "output": [
    {
      "type": "function_call",
      "id": "fc_abc123",
      "call_id": "call_xyz789",
      "name": "get_weather",
      "arguments": "{\"location\":\"北京\",\"unit\":\"celsius\"}"
    }
  ],
  "usage": {
    "input_tokens": 45,
    "output_tokens": 25,
    "total_tokens": 70
  }
}
```

### 提交工具结果

将工具执行结果回传给模型，在 `input` 中包含完整的调用链：

```
# 第二次请求：提交工具结果
response = client.responses.create(
    model="openai/gpt-5.4-mini",
    input=[
        {
            "type": "message",
            "role": "user",
            "content": [{"type": "input_text", "text": "北京今天天气怎么样？"}]
        },
        {
            "type": "function_call",
            "id": "fc_abc123",
            "call_id": "call_xyz789",
            "name": "get_weather",
            "arguments": "{\"location\":\"北京\",\"unit\":\"celsius\"}"
        },
        {
            "type": "function_call_output",
            "id": "fco_abc123",
            "call_id": "call_xyz789",
            "output": "{\"temperature\":\"22°C\",\"condition\":\"晴\"}"
        }
    ]
)

print(response.output_text)
# => "北京今天天气晴朗，气温 22°C，非常适合户外活动。"
```

### Tool Choice 选项

| 值 | 说明 |
| --- | --- |
| `"auto"` | 模型自行决定是否调用工具（默认） |
| `"none"` | 禁止调用工具 |
| `{"type": "function", "name": "tool_name"}` | 强制调用指定工具 |

## 与 Chat Completions 的对比

| 特性 | Chat Completions | Responses API |
| --- | --- | --- |
| 端点 | `/v1/chat/completions` | `/v1/responses` |
| 输入格式 | `messages` 数组 | `input` 字符串或结构化 item 数组 |
| 系统指令 | `role: "system"` message | `instructions` 参数（独立缓存） |
| Prompt Caching | 系统指令混在 messages 中，缓存前缀不稳定 | `instructions` 独立传递，自动缓存，命中率更高 |
| 输出格式 | `choices[0].message.content` | `output[0].content[0].text` 或 `output_text` |
| 工具调用 | `tool_calls` 在 message 中 | 独立的 `function_call` output item |
| 工具结果 | `role: "tool"` message | `function_call_output` input item |
| 流式事件 | `chat.completion.chunk` | 结构化事件类型（`response.*`） |
| Token 字段 | `prompt_tokens` / `completion_tokens` | `input_tokens` / `output_tokens` |

两个 API 均可用于生产环境。如果你已有 Chat Completions 集成，无需迁移。 推荐新项目使用 Responses API，尤其是需要复杂工具调用流程或高频调用（可充分利用缓存降低成本）的场景。 详见 函数调用指南。

> 本页按 DouDi.ai 接入语境整理，覆盖同类教程的结构和步骤。
> 实际模型、分组、价格和权限以 DouDi 控制台为准。
