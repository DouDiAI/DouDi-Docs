# Chat Completions

创建对话补全响应。支持文本生成、多模态输入、函数调用、流式响应等功能。

新项目推荐使用 Responses API。 Responses API 将 instructions 与 input 分离，系统指令自动享受 Prompt Caching，缓存命中率更高，可显著降低成本和延迟。Chat Completions 仍然长期支持，已有集成无需迁移。

## 端点

```
POST https://doudi.ai/v1/chat/completions
```

## 请求参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `model` | string | ✅ | 模型标识符，使用 [模型广场/价格页面](https://doudi.ai/pricing) 或 [Models API](/api/openai/models) 返回的当前可用 ID |
| `messages` | array | ✅ | 消息数组 |
| `temperature` | number | — | 采样温度 0-2，默认 1 |
| `max_tokens` | number | — | 最大生成 token 数 |
| `stream` | boolean | — | 是否启用流式响应 |
| `top_p` | number | — | 核采样参数 |
| `frequency_penalty` | number | — | 频率惩罚 -2 到 2 |
| `presence_penalty` | number | — | 存在惩罚 -2 到 2 |
| `tools` | array | — | 可用工具定义（Function Calling） |
| `tool_choice` | string/object | — | 工具选择策略 |
| `response_format` | object | — | 响应格式（JSON Mode） |
| `provider` | object | — | DouDi.ai 扩展：路由和回退配置 |

### Message 格式

```
interface Message {
  role: 'system' | 'user' | 'assistant' | 'tool'
  content: string | ContentPart[]  // 文本或多模态内容
  name?: string
  tool_calls?: ToolCall[]          // assistant 消息的工具调用
  tool_call_id?: string            // tool 消息的调用 ID
}

// 多模态内容
type ContentPart =
  | { type: 'text'; text: string }
  | { type: 'image_url'; image_url: { url: string; detail?: 'auto' | 'low' | 'high' } }
```

## 请求示例

### cURL

```bash
curl https://doudi.ai/v1/chat/completions \
  -H "Authorization: Bearer $DOUDI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<MODEL_ID>",
    "messages": [
      {"role": "system", "content": "你是一个有帮助的助手。"},
      {"role": "user", "content": "解释什么是 API Gateway"}
    ],
    "temperature": 0.7
  }'
```

### Python

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://doudi.ai/v1",
    api_key="<你的 DOUDI_API_KEY>"
)

response = client.chat.completions.create(
    model="<MODEL_ID>",
    messages=[
        {"role": "system", "content": "你是一个有帮助的助手。"},
        {"role": "user", "content": "解释什么是 API Gateway"}
    ],
    temperature=0.7
)

print(response.choices[0].message.content)
```

### TypeScript

```typescript
import OpenAI from 'openai'

const client = new OpenAI({
  baseURL: 'https://doudi.ai/v1',
  apiKey: '<你的 DOUDI_API_KEY>'
})

const response = await client.chat.completions.create({
  model: '<MODEL_ID>',
  messages: [
    { role: 'system', content: '你是一个有帮助的助手。' },
    { role: 'user', content: '解释什么是 API Gateway' }
  ],
  temperature: 0.7
})

console.log(response.choices[0].message.content)
```

## 响应格式

```
{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 0,
  "model": "<MODEL_ID>",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "API Gateway（API 网关）是一个..."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 25,
    "completion_tokens": 150,
    "total_tokens": 175
  }
}
```

## 流式响应

设置 `stream: true` 启用 SSE 流式响应：

### Python

```python
stream = client.chat.completions.create(
    model="<MODEL_ID>",
    messages=[{"role": "user", "content": "讲一个故事"}],
    stream=True
)

for chunk in stream:
    content = chunk.choices[0].delta.content
    if content:
        print(content, end="", flush=True)
```

### TypeScript

```typescript
const stream = await client.chat.completions.create({
  model: '<MODEL_ID>',
  messages: [{ role: 'user', content: '讲一个故事' }],
  stream: true
})

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content
  if (content) process.stdout.write(content)
}
```

### 流式响应格式

每个 chunk 通过 SSE 发送：

```
data: {"id":"chatcmpl-abc123","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"你"},"finish_reason":null}]}

data: {"id":"chatcmpl-abc123","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"好"},"finish_reason":null}]}

data: {"id":"chatcmpl-abc123","object":"chat.completion.chunk","choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}

data: [DONE]
```

## 多模态输入（视觉）

发送图片让模型分析：

```
response = client.chat.completions.create(
    model="<VISION_MODEL_ID>",
    messages=[{
        "role": "user",
        "content": [
            {"type": "text", "text": "这张图片里有什么？"},
            {"type": "image_url", "image_url": {"url": "https://example.com/image.jpg"}}
        ]
    }]
)
```

视觉输入需要选择当前支持图片能力的模型。详见 [视觉理解指南](/develop/guides/vision)。

## Function Calling

详见 [函数调用指南](/develop/guides/function-calling)。
