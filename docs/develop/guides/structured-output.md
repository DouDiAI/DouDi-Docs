# 结构化输出

结构化输出让模型按照你指定的 JSON 格式返回数据，适用于数据提取、分类标注、表单填充等场景。

## JSON Mode

最简单的结构化输出方式，强制模型返回合法 JSON：

### Python

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://doudi.ai/v1",
    api_key="<你的 DOUDI_API_KEY>"
)

response = client.chat.completions.create(
    model="openai/gpt-4o",
    messages=[
        {"role": "system", "content": "你是一个数据提取助手。请以 JSON 格式返回结果。"},
        {"role": "user", "content": "提取以下文本中的人名、公司和职位：张三是阿里巴巴的高级工程师"}
    ],
    response_format={"type": "json_object"}
)

import json
result = json.loads(response.choices[0].message.content)
print(result)
# {"name": "张三", "company": "阿里巴巴", "title": "高级工程师"}
```

### TypeScript

```typescript
const response = await client.chat.completions.create({
  model: 'openai/gpt-4o',
  messages: [
    { role: 'system', content: '你是一个数据提取助手。请以 JSON 格式返回结果。' },
    { role: 'user', content: '提取以下文本中的人名、公司和职位：张三是阿里巴巴的高级工程师' }
  ],
  response_format: { type: 'json_object' }
})

const result = JSON.parse(response.choices[0].message.content!)
```

使用 JSON Mode 时，system prompt 中必须包含 “JSON” 关键词，否则部分模型可能忽略格式要求。

## JSON Schema 约束

更精确地控制输出结构，确保字段名称和类型符合预期：

```python
response = client.chat.completions.create(
    model="openai/gpt-4o",
    messages=[
        {"role": "user", "content": "分析这段用户评论的情感：这个产品太棒了，非常好用！"}
    ],
    response_format={
        "type": "json_schema",
        "json_schema": {
            "name": "sentiment_analysis",
            "schema": {
                "type": "object",
                "properties": {
                    "sentiment": {
                        "type": "string",
                        "enum": ["positive", "negative", "neutral"],
                        "description": "情感倾向"
                    },
                    "confidence": {
                        "type": "number",
                        "description": "置信度 0-1"
                    },
                    "keywords": {
                        "type": "array",
                        "items": {"type": "string"},
                        "description": "关键情感词"
                    }
                },
                "required": ["sentiment", "confidence", "keywords"],
                "additionalProperties": False
            }
        }
    }
)
```

输出：

```
{
  "sentiment": "positive",
  "confidence": 0.95,
  "keywords": ["太棒了", "非常好用"]
}
```

## 实际应用场景

### 数据提取

```
# 从非结构化文本提取结构化数据
response = client.chat.completions.create(
    model="openai/gpt-4o",
    messages=[{
        "role": "user",
        "content": """提取以下订单信息：
        客户李四于2025年1月15日下单购买了3台MacBook Pro，
        单价18999元，收货地址是北京市朝阳区xxx路123号"""
    }],
    response_format={
        "type": "json_schema",
        "json_schema": {
            "name": "order_info",
            "schema": {
                "type": "object",
                "properties": {
                    "customer": {"type": "string"},
                    "date": {"type": "string"},
                    "items": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "name": {"type": "string"},
                                "quantity": {"type": "integer"},
                                "unit_price": {"type": "number"}
                            }
                        }
                    },
                    "address": {"type": "string"}
                },
                "required": ["customer", "date", "items", "address"]
            }
        }
    }
)
```

### 分类标注

```
# 多标签分类
response = client.chat.completions.create(
    model="openai/gpt-4o",
    messages=[{
        "role": "user",
        "content": "分类这篇文章的主题：AI 技术在医疗领域的应用越来越广泛..."
    }],
    response_format={
        "type": "json_schema",
        "json_schema": {
            "name": "classification",
            "schema": {
                "type": "object",
                "properties": {
                    "primary_category": {"type": "string"},
                    "secondary_categories": {
                        "type": "array",
                        "items": {"type": "string"}
                    },
                    "tags": {
                        "type": "array",
                        "items": {"type": "string"}
                    }
                },
                "required": ["primary_category"]
            }
        }
    }
)
```

## 支持的模型

| 模型 | JSON Mode | JSON Schema |
| --- | --- | --- |
| `openai/gpt-4o` | ✅ | ✅ |
| `openai/gpt-4o-mini` | ✅ | ✅ |
| `anthropic/claude-sonnet-4.6` | ✅ | — |

不支持 JSON Schema 的模型可以通过在 system prompt 中详细描述期望的 JSON 格式来实现类似效果。
