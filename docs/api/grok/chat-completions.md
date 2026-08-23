# Grok Chat Completions

通过 DouDi.ai 的 **Grok / xAI** API 协议族调用 Grok 模型。这个 Grok / xAI 路由只会调度 Grok-family 模型和上游；文本请求与响应正文采用 xAI 的 OpenAI-compatible Chat Completions JSON / SSE 格式。

该协议描述 Grok / xAI 的路由和调度边界，并不表示它是 OpenAI 上游的别名。请使用 DouDi.ai API Key，而不是 xAI OAuth 凭据，并配置下面的 Grok 入口。

## Base URL 与端点

协议根地址：

```
https://doudi.ai/grok
```

使用官方 OpenAI SDK 时，请配置以下 SDK Base URL：

```
https://doudi.ai/grok/v1
```

Chat Completions 端点：

```
POST https://doudi.ai/grok/v1/chat/completions
```

## 认证

通过 Bearer Token 传递 DouDi.ai API Key：

```
Authorization: Bearer <你的 DOUDI_API_KEY>
```

## 模型选择

请使用带 `grok/` 前缀的 canonical model ID。当前可用模型以 [Grok Models API](/api/grok/models) 和 [模型广场/价格页面](https://doudi.ai/pricing) 为准。

## 请求示例

### cURL

```bash
curl https://doudi.ai/grok/v1/chat/completions \
  -H "Authorization: Bearer $DOUDI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<GROK_MODEL_ID>",
    "messages": [
      {"role": "system", "content": "你是一个有帮助的助手。"},
      {"role": "user", "content": "解释 API 网关如何工作。"}
    ]
  }'
```

### Python

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://doudi.ai/grok/v1",
    api_key="<你的 DOUDI_API_KEY>",
)

response = client.chat.completions.create(
    model="<GROK_MODEL_ID>",
    messages=[
        {"role": "system", "content": "你是一个有帮助的助手。"},
        {"role": "user", "content": "解释 API 网关如何工作。"},
    ],
)

print(response.choices[0].message.content)
```

### TypeScript

```typescript
import OpenAI from 'openai'

const client = new OpenAI({
  baseURL: 'https://doudi.ai/grok/v1',
  apiKey: '<你的 DOUDI_API_KEY>'
})

const response = await client.chat.completions.create({
  model: '<GROK_MODEL_ID>',
  messages: [
    { role: 'system', content: '你是一个有帮助的助手。' },
    { role: 'user', content: '解释 API 网关如何工作。' }
  ]
})

console.log(response.choices[0].message.content)
```

## 流式响应

设置 `stream: true` 后，服务会以 xAI-compatible Chat Completions SSE 格式持续返回内容：

```python
stream = client.chat.completions.create(
    model="<GROK_MODEL_ID>",
    messages=[{"role": "user", "content": "写一段简短的欢迎语。"}],
    stream=True,
)

for chunk in stream:
    content = chunk.choices[0].delta.content
    if content:
        print(content, end="", flush=True)
```

需要使用 xAI-compatible Responses 格式时，请参考 [Grok Responses API](/api/grok/responses)。
