# API 参考

DouDi 对外主要按 OpenAI Compatible 方式接入。不同客户端的字段名称会有差异，但核心是 Base URL、API Key 和模型名。

## Base URL

```text
https://doudi.ai/v1
```

如果客户端要求填写完整接口地址，聊天补全接口通常是：

```text
https://doudi.ai/v1/chat/completions
```

## Chat Completions

把 `<MODEL_ID>` 换成 DouDi 控制台当前可用的完整模型名。

```bash
curl https://doudi.ai/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<MODEL_ID>",
    "messages": [
      { "role": "user", "content": "写一个简短的接入检查清单" }
    ]
  }'
```

## Models

很多 OpenAI Compatible 客户端会读取模型列表：

```bash
curl https://doudi.ai/v1/models \
  -H "Authorization: Bearer YOUR_API_KEY"
```

如果客户端不自动刷新模型，请手动输入控制台里可用的模型名。

## 错误响应

常见状态码：

| 状态码 | 含义 |
| --- | --- |
| 400 | 请求格式、模型参数或客户端类型不匹配 |
| 401 | API Key 无效或未填写 |
| 403 | 当前 Key、账户或分组无权访问 |
| 429 | 频率、并发或上游容量限制 |
| 413 | 请求体过大 |
| 500+ | 网关或上游返回错误，需要结合 [使用日志](https://doudi.ai/usage-logs/common) 排查 |

排查时请保留请求时间、模型名、分组、状态码和 [使用日志](https://doudi.ai/usage-logs/common) 里的 request ID。
