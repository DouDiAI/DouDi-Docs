# 快速开始

本指南帮助你在 3 分钟内接入 DouDi.ai Gateway，开始调用全球顶级模型。

## 前置要求

1.  前往 [DouDi.ai 控制台](https://doudi.ai/console/overview) 
2.  进入 [API Keys 页面](https://doudi.ai/console/api-keys) 
3.  点击创建 API Key
4.  准备开发环境（Python 3.8+ / Node.js 18+）

DouDi.ai 提供 OpenAI、Anthropic、Grok / xAI 三种协议入口。Grok 使用独立路由，文本请求可直接使用 OpenAI SDK。

## 选择接入方式

### OpenAI SDK（推荐）

**OpenAI 兼容协议** — 最通用的接入方式。

### cURL

Terminal

```
curl https://doudi.ai/v1/chat/completions \
  -H "Authorization: Bearer YOUR_DOUDI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [
      { "role": "user", "content": "用一句话介绍 DouDi.ai Gateway" }
    ]
  }'
```

### Python

quickstart.py

```
from openai import OpenAI

client = OpenAI(
    base_url="https://doudi.ai/v1",
    api_key="YOUR_DOUDI_API_KEY",
)

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "user", "content": "用一句话介绍 DouDi.ai Gateway"}
    ],
)

print(response.choices[0].message.content)
```

### TypeScript

quickstart.ts

```
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://doudi.ai/v1",
  apiKey: "YOUR_DOUDI_API_KEY",
});

async function main() {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "user", content: "用一句话介绍 DouDi.ai Gateway" },
    ],
  });

  console.log(response.choices[0]?.message?.content);
}

main();
```

### Anthropic SDK

**Anthropic 原生协议** — 直接使用 Anthropic SDK，完整支持 Claude 全部功能。

### cURL

Terminal

```
curl https://doudi.ai/anthropic/v1/messages \
  -H "x-api-key: YOUR_DOUDI_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-sonnet-4.6",
    "max_tokens": 512,
    "messages": [
      { "role": "user", "content": "用一句话介绍 DouDi.ai Gateway" }
    ]
  }'
```

### Python

quickstart\_anthropic.py

```
import anthropic

client = anthropic.Anthropic(
    base_url="https://doudi.ai/anthropic",
    api_key="YOUR_DOUDI_API_KEY",
)

message = client.messages.create(
    model="anthropic/claude-sonnet-4.6",
    max_tokens=512,
    messages=[
        {"role": "user", "content": "用一句话介绍 DouDi.ai Gateway"}
    ],
)

print(message.content[0].text)
```

### TypeScript

quickstart\_anthropic.ts

```
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  baseURL: "https://doudi.ai/anthropic",
  apiKey: "YOUR_DOUDI_API_KEY",
});

async function main() {
  const message = await client.messages.create({
    model: "anthropic/claude-sonnet-4.6",
    max_tokens: 512,
    messages: [
      { role: "user", content: "用一句话介绍 DouDi.ai Gateway" },
    ],
  });

  console.log(message.content[0]?.type === "text" ? message.content[0].text : "");
}

main();
```

### Grok / xAI

**Grok / xAI 协议** — 使用 Grok / xAI 路由，文本 JSON/SSE 兼容 xAI OpenAI-compatible 格式。

### cURL

Terminal

```
curl https://doudi.ai/grok/v1/chat/completions \
  -H "Authorization: Bearer YOUR_DOUDI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "grok/grok-4.5",
    "messages": [
      { "role": "user", "content": "用一句话介绍 DouDi.ai Gateway" }
    ]
  }'
```

### Python

quickstart\_grok.py

```
from openai import OpenAI

client = OpenAI(
    base_url="https://doudi.ai/grok/v1",
    api_key="YOUR_DOUDI_API_KEY",
)

response = client.chat.completions.create(
    model="grok/grok-4.5",
    messages=[
        {"role": "user", "content": "用一句话介绍 DouDi.ai Gateway"}
    ],
)

print(response.choices[0].message.content)
```

### TypeScript

quickstart\_grok.ts

```
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://doudi.ai/grok/v1",
  apiKey: "YOUR_DOUDI_API_KEY",
});

async function main() {
  const response = await client.chat.completions.create({
    model: "grok/grok-4.5",
    messages: [
      { role: "user", content: "用一句话介绍 DouDi.ai Gateway" },
    ],
  });

  console.log(response.choices[0]?.message?.content);
}

main();
```

## 下一步

[🔑 认证指南](/develop/authentication)[📊 模型目录](/develop/models)[🔧 API 参考](/api/)[🛠️ 工具集成](/integrations/claude-code)

> 本页按 DouDi.ai 接入语境整理，覆盖同类教程的结构和步骤。
> 实际模型、分组、价格和权限以 DouDi 控制台为准。
