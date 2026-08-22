# OpenAI Compatible 接入

这是最通用的接入方式，适合 SDK、脚本、服务端应用和大多数第三方客户端。

## 配置值

```text
API Key: 你的 DouDi API Key
Base URL: https://doudi.ai/v1
Model: 控制台可用模型名
```

## curl 示例

```bash
curl https://doudi.ai/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-5.5",
    "messages": [
      { "role": "system", "content": "你是一个简洁的助手。" },
      { "role": "user", "content": "返回三条 API 接入建议" }
    ]
  }'
```

## JavaScript 示例

```js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.DOUDI_API_KEY,
  baseURL: "https://doudi.ai/v1",
});

const response = await client.chat.completions.create({
  model: "gpt-5.5",
  messages: [{ role: "user", content: "测试 DouDi 接入" }],
});

console.log(response.choices[0]?.message?.content);
```

## Python 示例

```python
from openai import OpenAI

client = OpenAI(
    api_key="YOUR_API_KEY",
    base_url="https://doudi.ai/v1",
)

response = client.chat.completions.create(
    model="gpt-5.5",
    messages=[{"role": "user", "content": "测试 DouDi 接入"}],
)

print(response.choices[0].message.content)
```

## 注意

服务端应用应把 Key 放在环境变量里。前端网页不要直接暴露 DouDi API Key。
