# 错误处理

本指南介绍 DouDi.ai API 的错误响应格式、常见错误场景以及推荐的处理策略。

## 错误响应格式

所有错误响应遵循统一的 JSON 格式：

```
{
  "error": {
    "code": "invalid_api_key",
    "message": "提供的 API Key 无效，请检查后重试。",
    "type": "authentication_error"
  }
}
```

## HTTP 状态码

| 状态码 | 类型 | 说明 | 是否应重试 |
| --- | --- | --- | --- |
| `400` | `invalid_request_error` | 请求参数错误 | ❌ 修改参数后重试 |
| `401` | `authentication_error` | API Key 无效或缺失 | ❌ 检查 API Key |
| `403` | `permission_error` | 权限不足 | ❌ 检查账户权限 |
| `404` | `not_found_error` | 模型或资源不存在 | ❌ 检查模型 ID |
| `429` | `rate_limit_error` | 触发速率限制 | ✅ 等待后重试 |
| `500` | `internal_error` | 服务器内部错误 | ✅ 稍后重试 |
| `502` | `upstream_error` | 上游模型供应商错误 | ✅ 换模型或重试 |
| `503` | `service_unavailable` | 服务暂时不可用 | ✅ 稍后重试 |

## 常见错误和解决方案

### 401 — API Key 无效

```
{"error": {"code": "invalid_api_key", "message": "The API key provided is invalid."}}
```

**解决方案**：

*   检查 API Key 是否正确复制（包含 `sk-` 前缀）
*   确认 Key 未过期或被禁用
*   检查环境变量是否正确加载

### 429 — 速率限制

```
{"error": {"code": "rate_limit_exceeded", "message": "Rate limit reached. Please retry after 1s."}}
```

**解决方案**：

*   检查响应 Header 中的 `x-ratelimit-reset-requests`
*   实现指数退避重试
*   如需更高配额，联系支持申请调整

### 502 — 上游错误

```
{"error": {"code": "upstream_error", "message": "The upstream provider returned an error."}}
```

**解决方案**：

*   使用[故障回退](/develop/advanced/fallback)自动切换到备选模型
*   稍后重试
*   检查模型供应商状态页

## 重试策略

推荐使用\*\*指数退避（Exponential Backoff）\*\*策略：

retry.py

```
import time
import random
from openai import OpenAI, APIError, RateLimitError, APIConnectionError

client = OpenAI(
    base_url="https://doudi.ai/v1",
    api_key="<你的 DOUDI_API_KEY>"
)

def chat_with_retry(max_retries=5, **kwargs):
    """带指数退避的重试封装"""
    for attempt in range(max_retries):
        try:
            return client.chat.completions.create(**kwargs)

        except RateLimitError:
            # 429: 等待后重试
            wait = (2 ** attempt) + random.uniform(0, 1)
            print(f"触发限流，等待 {wait:.1f}s 后重试...")
            time.sleep(wait)

        except APIConnectionError:
            # 网络错误：短暂等待后重试
            wait = 2 ** attempt
            print(f"连接错误，等待 {wait}s 后重试...")
            time.sleep(wait)

        except APIError as e:
            if e.status_code and e.status_code >= 500:
                # 5xx: 服务器错误，重试
                wait = 2 ** attempt
                time.sleep(wait)
            else:
                # 4xx: 客户端错误，不重试
                raise

    raise Exception(f"重试 {max_retries} 次后仍然失败")

# 使用
response = chat_with_retry(
    model="openai/gpt-4o",
    messages=[{"role": "user", "content": "你好"}]
)
```

## 超时设置

建议为 API 调用设置合理的超时时间：

```
# Python OpenAI SDK
client = OpenAI(
    base_url="https://doudi.ai/v1",
    api_key="<你的 DOUDI_API_KEY>",
    timeout=60.0,  # 60 秒超时
    max_retries=3  # SDK 内置重试
)
```

```
// TypeScript OpenAI SDK
const client = new OpenAI({
  baseURL: 'https://doudi.ai/v1',
  apiKey: '<你的 DOUDI_API_KEY>',
  timeout: 60000,  // 60 秒超时
  maxRetries: 3    // SDK 内置重试
})
```

流式请求建议使用更长的超时时间（120-300 秒），因为模型可能需要较长时间生成完整内容。

## 最佳实践

1.  **区分可重试和不可重试错误** — 4xx 通常需要修改请求，5xx 可以重试
2.  **使用指数退避** — 避免在限流时频繁重试
3.  **设置最大重试次数** — 防止无限重试
4.  **记录错误日志** — 便于排查问题
5.  **配置故障回退** — 使用 DouDi.ai 的 `provider.fallback` 参数自动切换模型
6.  **监控错误率** — 在控制台关注错误趋势

> 本页按 DouDi.ai 接入语境整理，覆盖同类教程的结构和步骤。
> 实际模型、分组、价格和权限以 DouDi 控制台为准。
