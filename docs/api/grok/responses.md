# Grok Responses

通过 **Grok / xAI** API 协议族发起 xAI-compatible Responses 请求。这个 Grok / xAI 路由 只会调度 Grok-family 模型和上游；HTTP 请求与 SSE 响应正文采用 xAI 的 OpenAI-compatible Responses 格式。

该协议描述路由和调度边界，而不是另一种面向调用方的请求体格式。将官方 OpenAI SDK 的 `base_url` 设为 `https://doudi.ai/grok/v1` 即可调用该接口。

## Base URL 与端点

协议根地址：

```
https://doudi.ai/grok
```

Responses 端点：

```
POST https://doudi.ai/grok/v1/responses
```

## 认证

通过 Bearer Token 传递 DouDi.ai API Key：

```
Authorization: Bearer <你的 DOUDI_API_KEY>
```

## 请求示例

### cURL

```bash
curl https://doudi.ai/grok/v1/responses \
  -H "Authorization: Bearer $DOUDI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "grok/grok-4.5",
    "input": "解释 API 网关如何工作。",
    "instructions": "你是一个有帮助的技术助手。",
    "max_output_tokens": 1024
  }'
```

### Python

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://doudi.ai/grok/v1",
    api_key="<你的 DOUDI_API_KEY>",
)

response = client.responses.create(
    model="grok/grok-4.5",
    input="解释 API 网关如何工作。",
    instructions="你是一个有帮助的技术助手。",
    max_output_tokens=1024,
)

print(response.output_text)
```

### TypeScript

```typescript
import OpenAI from 'openai'

const client = new OpenAI({
  baseURL: 'https://doudi.ai/grok/v1',
  apiKey: '<你的 DOUDI_API_KEY>'
})

const response = await client.responses.create({
  model: 'grok/grok-4.5',
  input: '解释 API 网关如何工作。',
  instructions: '你是一个有帮助的技术助手。',
  max_output_tokens: 1024
})

console.log(response.output_text)
```

## 流式响应

设置 `stream: true` 后，服务会返回 xAI-compatible SSE 事件：

```python
stream = client.responses.create(
    model="grok/grok-4.5",
    input="写一段简短的欢迎语。",
    stream=True,
)

for event in stream:
    if event.type == "response.output_text.delta":
        print(event.delta, end="", flush=True)
```

## 续写与 WebSocket 客户端

仅当 `previous_response_id` 对应同一 DouDi.ai principal 先前创建的响应时，才可以用它继续 对话。Router 会将续写绑定到创建该响应的 Grok 上游账号；未知或属于其他 principal 的 response ID 会被拒绝，而不会改投到另一个账号。

兼容 Responses WebSocket 的接入地址为：

```
GET https://doudi.ai/grok/v1/responses
```

它是 DouDi.ai 在每个 turn 中桥接到 xAI HTTP/SSE 的入口，**不代表 xAI 提供原生 WebSocket transport**。

## 当前文本模型

| 模型 ID | 说明 |
| --- | --- |
| `grok/grok-4.5` | 默认前沿模型，上下文窗口为 500,000 token。 |
| `grok/grok-composer-2.5-fast` | 纯文本编程模型，上下文窗口为 200,000 token；不支持图像输入。 |

如需使用 Chat Completions 格式，请参考 [Grok Chat Completions](/api/grok/chat-completions)。

> 本页按 DouDi.ai 接入语境整理，覆盖同类教程的结构和步骤。
> 实际模型、分组、价格和权限以 DouDi 控制台为准。
