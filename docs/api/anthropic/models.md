# Anthropic Models API

通过 Anthropic 原生协议查询 DouDi.ai 平台上可用的模型。响应格式遵循 Anthropic API 规范（`type`、`display_name`、`created_at` 等字段）。

Models API 与所有 DouDi.ai API 一样，需要 DouDi.ai API Key。Anthropic 协议请通过 `x-api-key: <你的 DOUDI_API_KEY>` 传递认证信息。此端点返回所有可通过 Anthropic 协议调用的模型，不仅限于 Claude 系列。

## 列出所有模型

```
GET https://doudi.ai/anthropic/v1/models
```

### 请求示例

```bash
curl https://doudi.ai/anthropic/v1/models \
  -H "x-api-key: $DOUDI_API_KEY"
```

### 响应格式

```
{
  "data": [
    {
      "type": "model",
      "id": "provider/model-name",
      "display_name": "Provider Model Name",
      "created_at": "2026-01-21T16:09:13Z",
      "owned_by": "provider",
      "canonical_slug": "provider-model-name",
      "description": "Model capability description...",
      "context_length": 200000,
      "architecture": {
        "modality": "text+image+file->text",
        "input_modalities": ["text", "image", "file"],
        "output_modalities": ["text"],
        "tokenizer": "claude",
        "instruct_type": null
      },
      "pricing": {
        "prompt": "0.000001",
        "completion": "0.000005",
        "input_cache_read": "0.0000001",
        "input_cache_write_5m": "0.00000125",
        "input_cache_write_1h": "0.000002"
      },
      "top_provider": {
        "context_length": 200000,
        "max_completion_tokens": 64000,
        "is_moderated": false
      },
      "supported_parameters": [
        "temperature",
        "top_p",
        "max_tokens",
        "stop",
        "tools",
        "tool_choice",
        "response_format"
      ],
      "expiration_date": null
    }
  ]
}
```

### 与 OpenAI 协议的字段差异

| 字段 | OpenAI 协议 | Anthropic 协议 |
| --- | --- | --- |
| 类型标识 | `"object": "model"` | `"type": "model"` |
| 名称 | `name` | `display_name` |
| 创建时间 | `created`（Unix 时间戳） | `created_at`（ISO 8601） |

## 按供应商过滤模型

```
GET https://doudi.ai/anthropic/v1/models/{provider}
```

### 路径参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `provider` | string | 供应商标识，如 `anthropic`、`openai`、`google` |

### 请求示例

```bash
# 按供应商过滤模型
curl https://doudi.ai/anthropic/v1/models/anthropic \
  -H "x-api-key: $DOUDI_API_KEY"
```

### 响应格式

返回格式与列出所有模型一致，`data` 数组仅包含指定供应商的模型。

## 获取模型详情

```
GET https://doudi.ai/anthropic/v1/models/{provider}/{model_id}
```

### 路径参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `provider` | string | 供应商标识，如 `anthropic` |
| `model_id` | string | 模型名称，如 `model-name` |

### 请求示例

```bash
curl "https://doudi.ai/anthropic/v1/models/$PROVIDER/$MODEL_ID" \
  -H "x-api-key: $DOUDI_API_KEY"
```

### 响应格式

返回单个 Model 对象，结构与列表接口中的对象一致。
