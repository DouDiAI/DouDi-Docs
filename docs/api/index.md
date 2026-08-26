# API 概览

DouDi.ai 提供三种协议的 API 接入方式，覆盖 OpenAI 兼容、Anthropic 原生和 Grok / xAI 协议。

**协议推荐：** OpenAI 协议推荐使用 [Responses API](/api/openai/responses)，原生 Prompt Caching 支持更优；调用 Claude 模型推荐使用 [Anthropic 原生协议](/api/anthropic/messages)；调用 Grok 模型推荐使用 [Grok / xAI 协议](/api/grok/chat-completions)，其文本 JSON/SSE 形状兼容 xAI 的 OpenAI-compatible 格式。

## API 文档结构

<div class="ml-route-grid">
  <a class="ml-route-card" href="/api/openai/responses">
    <span>OpenAI 兼容协议</span>
    <p>适合 OpenAI SDK、Responses API、Chat Completions、Codex Web Search、模型列表和图像生成。</p>
  </a>
  <a class="ml-route-card" href="/api/anthropic/messages">
    <span>Anthropic 原生协议</span>
    <p>适合 Claude Messages、Anthropic SDK、原生 Claude 参数和模型列表。</p>
  </a>
  <a class="ml-route-card" href="/api/grok/chat-completions">
    <span>Grok / xAI 协议</span>
    <p>适合 Grok Chat Completions、Responses 和 Grok 模型查询。</p>
  </a>
  <a class="ml-route-card" href="/api/openapi/balance">
    <span>DouDi OpenAPI</span>
    <p>适合余额查询、实时价格查询和平台级工具集成。</p>
  </a>
</div>

## Base URL

| 协议 | Base URL | 说明 |
| --- | --- | --- |
| **OpenAI 兼容** | `https://doudi.ai/v1` | 兼容 OpenAI SDK，支持 Chat Completions 和 Responses API |
| **Anthropic 原生** | `https://doudi.ai/v1` | 兼容 Anthropic SDK，原生 Claude 体验 |
| **Grok / xAI 协议** | `https://doudi.ai/grok` | Grok / xAI 路由，文本 JSON/SSE 兼容 xAI OpenAI-compatible 格式 |

## 认证

所有协议使用统一的 DouDi.ai API Key，但 Header 格式因协议而异：

| 协议 | Header | 格式 |
| --- | --- | --- |
| OpenAI | `Authorization` | `Bearer sk-xxx` |
| Anthropic | `x-api-key` | `sk-xxx` |
| Grok / xAI | `Authorization` | `Bearer sk-xxx` |

详见 [认证指南](/develop/authentication)。

## 可用端点

### OpenAI 兼容协议

| 端点 | 方法 | 说明 |
| --- | --- | --- |
| `/v1/chat/completions` | POST | 创建对话补全 |
| `/v1/responses` | POST | 创建模型响应（Responses API，推荐） |
| `/v1/alpha/search` | POST | Codex standalone web search，详见 [Web Search](/api/openai/web-search) |
| `/v1/images/generations` | POST | 图像生成 |
| `/v1/models` | GET | 列出所有可用模型 |
| `/v1/models/{provider}` | GET | 按供应商过滤模型 |
| `/v1/models/{provider}/{model_id}` | GET | 获取模型详情 |
| `/v1/models/count` | GET | 获取模型数量统计 |

### Anthropic 原生协议

| 端点 | 方法 | 说明 |
| --- | --- | --- |
| `/v1/messages` | POST | 创建 Messages（推荐） |
| `/v1/models` | GET | 列出所有可用模型 |
| `/v1/models/{provider}` | GET | 按供应商过滤模型 |
| `/v1/models/{provider}/{model_id}` | GET | 获取模型详情 |
| `/v1/models/count` | GET | 获取模型数量统计 |

### Grok / xAI 协议

| 端点 | 方法 | 说明 |
| --- | --- | --- |
| `/grok/v1/chat/completions` | POST | 创建 Grok 对话补全，详见 [Chat Completions](/api/grok/chat-completions) |
| `/grok/v1/responses` | POST | 创建 Grok Responses API 响应，详见 [Responses](/api/grok/responses) |
| `/grok/v1/models` | GET | 列出可用 Grok 模型，详见 [Models](/api/grok/models) |
| `/grok/v1/models/{model_id}` | GET | 获取指定 Grok 模型详情 |

### DouDi.ai OpenAPI（平台）

与协议无关的平台接口，鉴权方式见各端点文档。

| 端点 | 方法 | 说明 |
| --- | --- | --- |
| `/v1/user/balance` | GET | [余额查询](/api/openapi/balance)，兼容 cc-switch，使用 DouDi.ai API Key 鉴权 |
| `doudi.ai/api/provider/pricing` | GET | [实时价格查询](/api/openapi/provider-pricing)，hvoy 兼容，HMAC 签名或公开访问 |

## 速率限制

DouDi.ai 按量付费，所有用户共享统一的速率策略，无套餐差异：

| 限制项 | 额度 |
| --- | --- |
| RPM（请求/分钟） | 100（团队级聚合） |
| TPM（Token/分钟） | 不限 |

RPM 按团队聚合计算，多 Key 共享同一配额。如需更高速率配额，请联系 DouDi 运营支持 申请调整。详见 [Rate Limits](/develop/guides/rate-limits)。

当触发限流时，API 返回 `429 Too Many Requests`，响应 Header 包含：

```
HTTP/1.1 429 Too Many Requests
x-ratelimit-limit-requests: 100
x-ratelimit-remaining-requests: 0
x-ratelimit-reset-requests: 60s
```

## 错误码

所有协议返回统一的 HTTP 状态码：

| 状态码 | 说明 | 常见原因 |
| --- | --- | --- |
| `200` | 成功 | — |
| `400` | 请求错误 | 参数格式错误、缺少必填字段 |
| `401` | 认证失败 | API Key 无效或过期 |
| `403` | 权限不足 | 账户无权访问该模型 |
| `404` | 资源不存在 | 模型 ID 错误 |
| `429` | 触发限流 | 超过速率限制 |
| `500` | 服务器错误 | 内部错误，请重试 |
| `502` | 上游错误 | 模型供应商服务异常 |
| `503` | 服务不可用 | 服务维护中 |

### 错误响应格式

```
{
  "error": {
    "message": "Invalid API key",
    "type": "authentication_error",
    "code": "invalid_api_key"
  }
}
```

## DouDi.ai 扩展参数

DouDi.ai 在标准协议基础上提供扩展参数，用于高级路由和回退控制：

```
{
  "model": "<MODEL_ID>",
  "messages": [{ "role": "user", "content": "Hello" }],
  "provider": {
    "routing": "latency",
    "fallback": [
      "<FALLBACK_MODEL_ID_1>",
      "<FALLBACK_MODEL_ID_2>"
    ]
  }
}
```

详见 [供应商路由](/develop/advanced/provider-routing) 和 [故障回退](/develop/advanced/fallback)。
