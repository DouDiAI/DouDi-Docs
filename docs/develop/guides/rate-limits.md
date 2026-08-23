# 速率限制

DouDi.ai 的速率限制保障平台稳定性。了解限制规则并优化调用策略。

## 默认限制

DouDi.ai 按量付费，所有用户共享统一的速率策略：

| 限制项 | 额度 |
| --- | --- |
| RPM（请求/分钟） | 100（团队级聚合） |
| TPM（Token/分钟） | 不限 |

**团队级聚合**：RPM 按整个组织（团队）累计计算，团队下的多个 API Key 共享同一配额，从根源防止多 Key 叠加击穿上游供应商限速。如需更高 RPM 配额，请联系 DouDi 运营支持 申请调整。

## Rate Limit Header

每个 API 响应都包含速率限制信息：

```
x-ratelimit-limit-requests: 100
x-ratelimit-remaining-requests: 95
x-ratelimit-reset-requests: 12s
```

| Header | 说明 |
| --- | --- |
| `x-ratelimit-limit-requests` | RPM 限制值 |
| `x-ratelimit-remaining-requests` | 剩余请求次数 |
| `x-ratelimit-reset-requests` | 请求限制重置时间 |

## 429 错误处理

当触发限流时，API 返回 `429 Too Many Requests`：

```
from openai import RateLimitError
import time

try:
    response = client.chat.completions.create(...)
except RateLimitError as e:
    retry_after = float(e.response.headers.get("retry-after", 1))
    print(f"触发限流，等待 {retry_after}s...")
    time.sleep(retry_after)
```

## 优化策略

### 1\. 使用 Prompt Caching

对于重复的 system prompt，启用缓存可以减少 token 消耗：

```
response = client.chat.completions.create(
    model="openai/gpt-4o",
    messages=[
        # 较长的 system prompt 会被自动缓存
        {"role": "system", "content": "你是一个专业的...（此处省略长文本）"},
        {"role": "user", "content": "用户问题"}
    ]
)
```

详见 [提示缓存](/develop/advanced/prompt-caching)。

### 2\. 批量处理

将多个短请求合并为一个请求：

```
# ❌ 不推荐：为每个问题发送独立请求
for question in questions:
    client.chat.completions.create(messages=[{"role": "user", "content": question}])

# ✅ 推荐：合并为一个请求
combined = "\n".join(f"{i+1}. {q}" for i, q in enumerate(questions))
client.chat.completions.create(
    messages=[{"role": "user", "content": f"请依次回答以下问题：\n{combined}"}]
)
```

### 3\. 选择合适的模型

推荐模型请参考 [模型广场/价格页面](https://doudi.ai/pricing) 。

### 4\. 控制 max\_tokens

设置合理的 `max_tokens` 限制，避免不必要的 token 消耗：

```
response = client.chat.completions.create(
    model="openai/gpt-4o",
    messages=[{"role": "user", "content": "一句话总结"}],
    max_tokens=100  # 限制输出长度
)
```

### 5\. 使用模型回退

当主模型达到限制时，自动切换到备选模型：

```
response = client.chat.completions.create(
    model="openai/gpt-4o",
    messages=[...],
    extra_body={
        "provider": {
            "fallback": ["anthropic/claude-sonnet-4.6", "grok/grok-4.5"]
        }
    }
)
```

详见 [故障回退](/develop/advanced/fallback)。
