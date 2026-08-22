# Models API

列出和查询 DouDi.ai 平台上所有可用的模型。返回的数据遵循 OpenRouter 标准，包含模型的完整元数据：架构、定价、支持参数等。

Models API 与所有 DouDi.ai API 一样，需要 DouDi.ai API Key。请通过 `Authorization: Bearer <你的 DOUDI_API_KEY>` 传递认证信息。关于响应中各字段的详细说明，请参阅 模型目录 — Models API 标准。

## 列出所有模型

```
GET https://doudi.ai/v1/models
```

### 请求示例

### cURL

Terminal

```
curl https://doudi.ai/v1/models \
  -H "Authorization: Bearer $DOUDI_API_KEY"
```

### Python

models.py

```
import os
import requests

resp = requests.get(
    "https://doudi.ai/v1/models",
    headers={"Authorization": f"Bearer {os.environ['DOUDI_API_KEY']}"},
)
for model in resp.json()["data"]:
    print(model["id"])
```

### TypeScript

models.ts

```
const resp = await fetch('https://doudi.ai/v1/models', {
  headers: { Authorization: 'Bearer ' + process.env.DOUDI_API_KEY }
})
const { data } = await resp.json()

for (const model of data) {
  console.log(model.id)
}
```

### 响应格式

```
{
  "object": "list",
  "data": [
    {
      "id": "anthropic/claude-sonnet-4.6",
      "object": "model",
      "created": 1759104000,
      "owned_by": "bedrock",
      "canonical_slug": "claude-sonnet-4-5-20250929",
      "name": "Claude Sonnet 4.5",
      "description": "Anthropic's balanced model with state-of-the-art performance...",
      "context_length": 200000,
      "architecture": {
        "modality": "text+image+file->text",
        "input_modalities": ["text", "image", "file"],
        "output_modalities": ["text"],
        "tokenizer": "claude",
        "instruct_type": null
      },
      "pricing": {
        "prompt": "0.000003",
        "completion": "0.000015",
        "input_cache_read": "0.0000003",
        "input_cache_write_5m": "0.00000375",
        "input_cache_write_1h": "0.000006"
      },
      "top_provider": {
        "context_length": 200000,
        "max_completion_tokens": 16384,
        "is_moderated": false
      },
      "per_request_limits": null,
      "supported_parameters": [
        "temperature",
        "top_p",
        "max_tokens",
        "stop",
        "tools",
        "tool_choice",
        "response_format",
        "reasoning"
      ],
      "default_parameters": null,
      "expiration_date": null
    }
  ]
}
```

### 响应字段说明

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | 模型标识符，如 `"anthropic/claude-sonnet-4.6"` |
| `canonical_slug` | string | 永久标识符，不会变更 |
| `name` | string | 模型显示名称 |
| `created` | number | 添加时间（Unix 时间戳） |
| `description` | string | 模型能力描述 |
| `context_length` | number | 最大上下文窗口（token） |
| `architecture` | object | 输入/输出模态、分词器信息 |
| `pricing` | object | 定价（美元/token） |
| `top_provider` | object | 供应商配置（上下文限制、最大输出等） |
| `supported_parameters` | string\[\] | 支持的 API 参数 |

## 按供应商过滤模型

```
GET https://doudi.ai/v1/models/{provider}
```

仅返回指定供应商的模型列表。

### 路径参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `provider` | string | 供应商标识，如 `anthropic`、`openai`、`google`、`bailian`、`volcengine` |

### 请求示例

Terminal

```
# 列出所有 Anthropic 模型
curl https://doudi.ai/v1/models/anthropic \
  -H "Authorization: Bearer $DOUDI_API_KEY"

# 列出所有 OpenAI 模型
curl https://doudi.ai/v1/models/openai \
  -H "Authorization: Bearer $DOUDI_API_KEY"
```

### 响应格式

返回格式与列出所有模型一致，`data` 数组仅包含指定供应商的模型。

## 获取模型详情

```
GET https://doudi.ai/v1/models/{provider}/{model_id}
```

### 路径参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `provider` | string | 供应商标识，如 `anthropic` |
| `model_id` | string | 模型名称，如 `claude-sonnet-4.6` |

### 请求示例

Terminal

```
curl https://doudi.ai/v1/models/anthropic/claude-sonnet-4.6 \
  -H "Authorization: Bearer $DOUDI_API_KEY"
```

### 响应格式

返回单个 Model 对象，结构与列表接口中的对象一致。

> 本页按 DouDi.ai 接入语境整理，覆盖同类教程的结构和步骤。
> 实际模型、分组、价格和权限以 DouDi 控制台为准。
