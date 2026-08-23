# 故障回退

DouDi.ai 的故障回退机制在主模型不可用时，自动切换到备选模型，确保你的服务不中断。

## 工作原理

1.  请求发送到主模型
2.  如果主模型返回错误（5xx、超时、限流等）
3.  自动按顺序尝试 fallback 列表中的模型
4.  返回第一个成功的响应

## 单请求回退

通过 `provider.fallback` 参数为单个请求配置回退：

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://doudi.ai/v1",
    api_key="<你的 DOUDI_API_KEY>"
)

response = client.chat.completions.create(
    model="openai/gpt-4o",  # 主模型
    messages=[{"role": "user", "content": "你好"}],
    extra_body={
        "provider": {
            "fallback": [
                "anthropic/claude-sonnet-4.6",  # 第一备选
                "grok/grok-4.5"              # 第二备选
            ]
        }
    }
)

# 查看实际使用的模型
print(response.model)
```

```typescript
const response = await client.chat.completions.create({
  model: 'openai/gpt-4o',
  messages: [{ role: 'user', content: '你好' }],
  // @ts-ignore DouDi.ai 扩展参数
  provider: {
    fallback: [
      'anthropic/claude-sonnet-4.6',
      'grok/grok-4.5'
    ]
  }
})
```

## 回退触发条件

以下情况会触发回退：

| 条件 | 说明 |
| --- | --- |
| HTTP 5xx | 服务器错误 |
| 请求超时 | 模型响应超时 |
| 429 限流 | 上游模型达到速率限制 |
| 模型不可用 | 供应商维护或下线 |

以下情况**不会**触发回退：

| 条件 | 说明 |
| --- | --- |
| HTTP 4xx（非 429） | 客户端错误需要修正请求 |
| 内容过滤 | 模型拒绝生成的内容 |

## 配合路由使用

回退机制可以和供应商路由组合：

```
response = client.chat.completions.create(
    model="openai/gpt-4o",
    messages=[{"role": "user", "content": "你好"}],
    extra_body={
        "provider": {
            "routing": "latency",    # 延迟优先路由
            "fallback": [             # 回退列表
                "anthropic/claude-sonnet-4.6",
                "grok/grok-4.5"
            ]
        }
    }
)
```

## 推荐回退方案

推荐模型请参考 [模型广场/价格页面](https://doudi.ai/pricing) 。

## 最佳实践

1.  **选择能力相近的备选模型** — 确保回退后输出质量一致
2.  **跨厂商回退** — 避免同一厂商的模型同时不可用
3.  **设置 2-3 个备选** — 足以应对大部分故障场景
4.  **监控回退频率** — 如果频繁回退，可能需要更换主模型

> 本页按 DouDi.ai 接入语境整理，覆盖同类教程的结构和步骤。
> 实际模型、分组、价格和权限以 DouDi 控制台为准。
