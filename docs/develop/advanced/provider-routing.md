# 供应商路由

DouDi.ai 支持多供应商架构，同一模型可通过不同供应商节点提供服务。通过路由策略，你可以控制请求的分发方式。

## 路由策略

| 策略 | 说明 | 适用场景 |
| --- | --- | --- |
| `priority` | 按优先级顺序（默认） | 稳定性优先 |
| `cost` | 成本最低优先 | 批量处理、成本敏感 |
| `latency` | 延迟最低优先 | 实时对话、用户交互 |
| `balanced` | 负载均衡 | 高并发场景 |

## 使用方式

通过 `provider.routing` 扩展参数配置路由策略：

routing.py

```
from openai import OpenAI

client = OpenAI(
    base_url="https://doudi.ai/v1",
    api_key="<你的 DOUDI_API_KEY>"
)

response = client.chat.completions.create(
    model="openai/gpt-4o",
    messages=[{"role": "user", "content": "你好"}],
    extra_body={
        "provider": {
            "routing": "cost"  # 成本最低优先
        }
    }
)
```

routing.ts

```
const response = await client.chat.completions.create({
  model: 'openai/gpt-4o',
  messages: [{ role: 'user', content: '你好' }],
  // @ts-ignore DouDi.ai 扩展参数
  provider: {
    routing: 'cost'
  }
})
```

## 策略详解

### `priority` — 优先级路由（默认）

按 DouDi.ai 预设的供应商优先级顺序分发请求。优先使用稳定性最高的节点。

### `cost` — 成本优先

自动选择当前成本最低的供应商节点。适合批量处理、数据标注等对延迟不敏感的场景。

### `latency` — 延迟优先

选择响应延迟最低的供应商节点。适合需要快速响应的实时对话场景。

### `balanced` — 负载均衡

将请求均匀分配到所有可用的供应商节点。适合高并发场景，避免单点过载。

## 最佳实践

1.  **实时对话**使用 `latency` — 用户等待时间更短
2.  **批量任务**使用 `cost` — 降低整体成本
3.  **生产环境**默认 `priority` — 确保稳定性
4.  **配合故障回退** — 路由策略可以和 `fallback` 参数组合使用

你也可以在 DouDi.ai 控制台中设置全局默认路由策略，无需在每次请求中指定。

> 本页按 DouDi.ai 接入语境整理，覆盖同类教程的结构和步骤。
> 实际模型、分组、价格和权限以 DouDi 控制台为准。
