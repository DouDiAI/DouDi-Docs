# 模型目录

DouDi.ai 提供主流大模型的统一访问。你可以在 [DouDi.ai 模型目录](https://doudi.ai/models)   浏览所有可用模型，也可以通过 [Models API](/api/openai/models) 以编程方式获取完整模型信息。

## 模型命名规范

所有模型遵循 `provider/model-name` 格式：

```
anthropic/claude-sonnet-4.6
grok/grok-4.5
moonshotai/kimi-k2.5
```

## Models API 标准

DouDi.ai 的 [Models API](/api/openai/models) 遵循 OpenRouter 标准，以 JSON 格式返回每个模型的完整元数据。

### API 响应结构

#### 根响应对象

```
{
  "object": "list",
  "data": [
    /* Model 对象数组 */
  ],
}
```

#### Model 对象

每个模型包含以下标准化字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | API 请求中使用的模型标识符，如 `"anthropic/claude-sonnet-4.6"` |
| `canonical_slug` | string | 模型的永久标识符，不会变更 |
| `name` | string | 模型的显示名称 |
| `created` | number | 模型添加时间（Unix 时间戳） |
| `description` | string | 模型能力和特性的详细说明 |
| `context_length` | number | 最大上下文窗口大小（token 数） |
| `architecture` | Architecture | 模型技术架构信息 |
| `pricing` | Pricing | 模型定价信息 |
| `top_provider` | TopProvider | 主要供应商配置 |
| `supported_parameters` | string\[\] | 支持的 API 参数列表 |

#### Architecture 对象

描述模型的输入/输出模态和分词器信息：

```
{
  "modality": "text+image+file->text",
  "input_modalities": ["text", "image", "file"],
  "output_modalities": ["text"],
  "tokenizer": "claude",
  "instruct_type": null
}
```

| 字段 | 说明 |
| --- | --- |
| `modality` | 输入输出模态的简写，如 `text+image->text` |
| `input_modalities` | 支持的输入类型：`text`、`image`、`audio`、`file` |
| `output_modalities` | 支持的输出类型：`text` |
| `tokenizer` | 分词器类型 |
| `instruct_type` | 指令格式类型（部分模型为 `null`） |

#### Pricing 对象

所有价格以 **美元/token** 为单位。值为 `"0"` 表示免费。

```
{
  "prompt": "0.000001",
  "completion": "0.000005",
  "input_cache_read": "0.0000001",
  "input_cache_write_5m": "0.00000125",
  "input_cache_write_1h": "0.000002"
}
```

| 字段 | 说明 |
| --- | --- |
| `prompt` | 输入 token 单价 |
| `completion` | 输出 token 单价 |
| `input_cache_read` | 缓存读取 token 单价 |
| `input_cache_write_5m` | 5 分钟缓存创建 token 单价 |
| `input_cache_write_1h` | 1 小时缓存创建 token 单价 |

不同模型的分词方式不同，即使输入和输出相同，token 数量（和费用）也会有所差异。请使用响应中的 usage 字段获取实际 token 消耗。

#### TopProvider 对象

```
{
  "context_length": 200000,
  "max_completion_tokens": 8192,
  "is_moderated": false
}
```

| 字段 | 说明 |
| --- | --- |
| `context_length` | 供应商级别的上下文限制 |
| `max_completion_tokens` | 单次响应最大 token 数 |
| `is_moderated` | 是否启用内容审核 |

#### Supported Parameters

`supported_parameters` 数组标识了该模型支持的 OpenAI 兼容参数：

| 参数 | 说明 |
| --- | --- |
| `temperature` | 采样温度控制 |
| `top_p` | 核采样参数 |
| `max_tokens` | 最大响应长度 |
| `stop` | 自定义停止序列 |
| `tools` | 函数调用 / Tool Use |
| `tool_choice` | 工具选择策略 |
| `response_format` | 输出格式规范（JSON Mode） |
| `reasoning` | 深度推理模式 |

## 获取模型列表

Models API 与所有 DouDi.ai API 一样，需要 DouDi.ai API Key。OpenAI 兼容接口请通过 `Authorization: Bearer <你的 DOUDI_API_KEY>` 传递认证信息。

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
    print(f"{model['id']} — {model['name']}")
```

### TypeScript

models.ts

```
const resp = await fetch("https://doudi.ai/v1/models", {
  headers: { Authorization: "Bearer " + process.env.DOUDI_API_KEY },
});
const { data } = await resp.json();

for (const model of data) {
  console.log(`${model.id} — ${model.name}`);
}
```

查看完整的实时模型列表和定价，请访问 DouDi.ai 模型目录 。 API 端点详情请参阅 Models API 参考。

> 本页按 DouDi.ai 接入语境整理，覆盖同类教程的结构和步骤。
> 实际模型、分组、价格和权限以 DouDi 控制台为准。
