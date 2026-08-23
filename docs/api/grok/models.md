# Grok Models API

查询可通过 Grok / xAI 协议调用的模型。响应采用 OpenAI-compatible 的模型列表 结构，且只包含 Grok-family 模型。

所有 DouDi.ai Models API 都需要 DouDi.ai API Key。Grok / xAI 协议请通过 `Authorization: Bearer <你的 DOUDI_API_KEY>` 传递认证信息。

## Base URL 与端点

协议根地址：

```
https://doudi.ai/grok
```

```
GET https://doudi.ai/grok/v1/models
GET https://doudi.ai/grok/v1/models/{model_id}
```

## 列出可用 Grok 模型

```bash
curl https://doudi.ai/grok/v1/models \
  -H "Authorization: Bearer $DOUDI_API_KEY"
```

响应示例：

```
{
  "object": "list",
  "data": [
    {
      "id": "grok/grok-4.5",
      "object": "model",
      "created": 0,
      "owned_by": "grok"
    },
    {
      "id": "grok/grok-composer-2.5-fast",
      "object": "model",
      "created": 0,
      "owned_by": "grok"
    }
  ]
}
```

## 获取单个模型

详情路径支持 canonical ID 或裸 Grok 模型名称。例如：

```bash
curl https://doudi.ai/grok/v1/models/grok-4.5 \
  -H "Authorization: Bearer $DOUDI_API_KEY"
```

## 当前模型目录

| 模型 ID | 上下文窗口 | 输入 |
| --- | --- | --- |
| `grok/grok-4.5` | 500,000 token | 文本与图像 |
| `grok/grok-composer-2.5-fast` | 200,000 token | 仅文本 |

在 [Grok Chat Completions](/api/grok/chat-completions) 或 [Grok Responses](/api/grok/responses) 请求中使用这些 canonical model ID。
