# 提示缓存

Prompt Caching 允许缓存重复使用的 prompt 前缀，减少 token 消耗和响应延迟。

## 工作原理

当你的请求中包含较长的、重复使用的 system prompt 或上下文信息时：

1.  **首次请求** — 完整处理所有 token，并缓存 prompt 前缀
2.  **后续请求** — 命中缓存时，缓存部分的 token 不再重复计费
3.  **缓存过期** — 缓存有一定的 TTL（通常 5-10 分钟），过期后需重新缓存

## 缓存支持

DouDi.ai 的模型资源分别由 **AWS Bedrock**、**Azure OpenAI**、**Google Cloud**、**阿里云**、**火山云** 等模型官方云厂商提供。云厂商支持 Prompt Caching 的模型，DouDi.ai 同样支持。

| 云厂商 | 代表模型 | 缓存机制 |
| --- | --- | --- |
| AWS Bedrock | Claude 系列 | 原生 Prompt Caching |
| Azure OpenAI | GPT-4o 系列 | 自动缓存 |
| 阿里云 | Qwen 系列 | 平台侧缓存 |
| 火山云 | Doubao 系列 | 平台侧缓存 |

具体模型的缓存支持情况以各云厂商官方文档为准。DouDi.ai 会透传缓存相关参数，无需额外配置。

## 使用方式

### OpenAI 协议

OpenAI 模型的 Prompt Caching 是自动的 — 当检测到重复的 prompt 前缀时自动启用：

```python
# 长 system prompt 会被自动缓存
SYSTEM_PROMPT = """你是 DouDi.ai 的技术支持助手。

以下是你需要了解的产品信息：
- DouDi.ai 是一个 LLM Gateway，支持全球顶级模型
- 支持当前可用的 OpenAI 兼容与 Anthropic 协议
- ...
（省略更多产品知识）
"""

# 第一次请求：缓存 system prompt
response1 = client.chat.completions.create(
    model="openai/gpt-4o",
    messages=[
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": "DouDi.ai 支持哪些模型？"}
    ]
)

# 第二次请求：命中缓存，更快更便宜
response2 = client.chat.completions.create(
    model="openai/gpt-4o",
    messages=[
        {"role": "system", "content": SYSTEM_PROMPT},  # 缓存命中
        {"role": "user", "content": "如何配置 Claude Code？"}
    ]
)
```

### Anthropic 协议

Anthropic 模型支持显式的 cache control：

```python
import anthropic

client = anthropic.Anthropic(
    base_url="https://doudi.ai/anthropic",
    api_key="<你的 DOUDI_API_KEY>"
)

response = client.messages.create(
    model="anthropic/claude-sonnet-4.6",
    max_tokens=1024,
    system=[{
        "type": "text",
        "text": "你是一个专业助手。以下是产品文档...",
        "cache_control": {"type": "ephemeral"}  # 显式启用缓存
    }],
    messages=[{"role": "user", "content": "总结产品特点"}]
)

# 查看缓存命中情况
print(f"缓存创建 token: {response.usage.cache_creation_input_tokens}")
print(f"缓存命中 token: {response.usage.cache_read_input_tokens}")
```

## 成本节省

缓存命中后，缓存部分的 token 按更低价格计费，节省比例因模型而异：

*   **Anthropic Claude 系列** — 缓存命中可节省约 **90%** 输入成本
*   **OpenAI GPT 系列** — 缓存命中可节省约 **50%** 输入成本

实际节省比例取决于缓存命中率和各云厂商的计费策略，请参考 [数据看板页面](https://doudi.ai/dashboard/models) 的用量统计查看详情。

## 最佳实践

1.  **将长文本放在前面** — system prompt、知识库内容等不变的部分放在 messages 开头
2.  **保持前缀一致** — 只有完全相同的前缀才能命中缓存
3.  **合理设计 prompt 结构** — 将固定部分和变化部分分离

```
# ✅ 好的设计：固定内容在前，变化内容在后
messages = [
    {"role": "system", "content": LONG_STATIC_PROMPT},   # 可缓存
    {"role": "user", "content": dynamic_question}          # 变化部分
]

# ❌ 不好的设计：变化内容穿插在固定内容中
messages = [
    {"role": "system", "content": f"Today is {date}. {LONG_PROMPT}"}  # 每天不同，无法缓存
]
```

缓存命中可以在 API 响应的 usage 字段中查看，也可以在 [数据看板页面](https://doudi.ai/dashboard/models) 的用量统计中查看缓存命中率。

> 本页按 DouDi.ai 接入语境整理，覆盖同类教程的结构和步骤。
> 实际模型、分组、价格和权限以 DouDi 控制台为准。
