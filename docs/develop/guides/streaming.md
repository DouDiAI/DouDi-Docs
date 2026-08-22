# 流式响应

流式响应（Streaming）允许你在模型生成过程中实时接收输出，提升用户体验和感知速度。

## 工作原理

DouDi.ai 使用 **Server-Sent Events (SSE)** 协议实现流式响应：

1.  客户端发送请求时设置 `stream: true`
2.  服务器逐步返回生成的内容片段（chunk）
3.  每个 chunk 以 `data:` 前缀通过 SSE 发送
4.  生成结束时发送 `data: [DONE]`

## OpenAI 协议流式

### cURL

Terminal

```
curl https://doudi.ai/v1/chat/completions \
  -H "Authorization: Bearer $DOUDI_API_KEY" \
  -H "Content-Type: application/json" \
  -N \
  -d '{
    "model": "openai/gpt-4o",
    "messages": [{"role": "user", "content": "写一首关于编程的诗"}],
    "stream": true
  }'
```

### Python

stream\_openai.py

```
from openai import OpenAI

client = OpenAI(
    base_url="https://doudi.ai/v1",
    api_key="<你的 DOUDI_API_KEY>"
)

stream = client.chat.completions.create(
    model="openai/gpt-4o",
    messages=[{"role": "user", "content": "写一首关于编程的诗"}],
    stream=True
)

for chunk in stream:
    content = chunk.choices[0].delta.content
    if content:
        print(content, end="", flush=True)
```

### TypeScript

stream\_openai.ts

```
import OpenAI from 'openai'

const client = new OpenAI({
  baseURL: 'https://doudi.ai/v1',
  apiKey: '<你的 DOUDI_API_KEY>'
})

const stream = await client.chat.completions.create({
  model: 'openai/gpt-4o',
  messages: [{ role: 'user', content: '写一首关于编程的诗' }],
  stream: true
})

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content
  if (content) process.stdout.write(content)
}
```

## Anthropic 协议流式

### Python

stream\_anthropic.py

```
import anthropic

client = anthropic.Anthropic(
    base_url="https://doudi.ai/anthropic",
    api_key="<你的 DOUDI_API_KEY>"
)

with client.messages.stream(
    model="anthropic/claude-sonnet-4.6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "写一首关于编程的诗"}]
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
```

### TypeScript

stream\_anthropic.ts

```
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  baseURL: 'https://doudi.ai/anthropic',
  apiKey: '<你的 DOUDI_API_KEY>'
})

const stream = client.messages.stream({
  model: 'anthropic/claude-sonnet-4.6',
  max_tokens: 1024,
  messages: [{ role: 'user', content: '写一首关于编程的诗' }]
})

for await (const event of stream) {
  if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
    process.stdout.write(event.delta.text)
  }
}
```

## 流式 + Function Calling

流式响应也支持函数调用场景。模型会先流式输出工具调用请求，你处理完成后继续对话：

stream\_with\_tools.py

```
stream = client.chat.completions.create(
    model="openai/gpt-4o",
    messages=[{"role": "user", "content": "今天北京天气怎么样？"}],
    tools=[{
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "获取指定城市的天气",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {"type": "string", "description": "城市名称"}
                },
                "required": ["city"]
            }
        }
    }],
    stream=True
)

for chunk in stream:
    delta = chunk.choices[0].delta
    if delta.tool_calls:
        # 处理工具调用
        print(f"调用工具: {delta.tool_calls[0].function}")
    elif delta.content:
        print(delta.content, end="", flush=True)
```

## 错误处理和重连

流式连接可能因网络问题中断。建议实现重连逻辑。

stream\_retry.py

```
import time

def stream_with_retry(client, max_retries=3, **kwargs):
    for attempt in range(max_retries):
        try:
            stream = client.chat.completions.create(stream=True, **kwargs)
            for chunk in stream:
                yield chunk
            return  # 成功完成
        except Exception as e:
            if attempt < max_retries - 1:
                wait = 2 ** attempt  # 指数退避
                print(f"\n连接中断，{wait}s 后重试...")
                time.sleep(wait)
            else:
                raise e
```

## 最佳实践

1.  **始终设置超时** — 避免无限等待
2.  **处理不完整的 chunk** — 某些 chunk 可能没有 content
3.  **实现重连机制** — 使用指数退避策略
4.  **前端使用 `flush`** — 确保内容即时显示

> 本页按 DouDi.ai 接入语境整理，覆盖同类教程的结构和步骤。
> 实际模型、分组、价格和权限以 DouDi 控制台为准。
