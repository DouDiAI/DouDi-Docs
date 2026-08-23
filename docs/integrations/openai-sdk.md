# OpenAI SDK 兼容

DouDi.ai 完全兼容 OpenAI SDK，从 OpenAI 直连迁移只需修改两个参数：`base_url` 和 `api_key`。

## 迁移步骤

### 只需修改两行代码

### Python

```
from openai import OpenAI

# 之前：直连 OpenAI
# client = OpenAI(api_key="sk-openai-xxx")

# 现在：通过 DouDi.ai
client = OpenAI(
    base_url="https://doudi.ai/v1",    # 新增
    api_key="<你的 DOUDI_API_KEY>"       # 替换
)

# 其他代码完全不变！
response = client.chat.completions.create(
    model="openai/gpt-4o",  # 添加 provider 前缀
    messages=[{"role": "user", "content": "Hello!"}]
)
```

### TypeScript

```
import OpenAI from 'openai'

// 之前：直连 OpenAI
// const client = new OpenAI({ apiKey: 'sk-openai-xxx' })

// 现在：通过 DouDi.ai
const client = new OpenAI({
  baseURL: 'https://doudi.ai/v1',      // 新增
  apiKey: '<你的 DOUDI_API_KEY>'         // 替换
})

// 其他代码完全不变！
```

## 模型命名

DouDi.ai 使用 `provider/model-name` 格式标识模型：

| OpenAI 原始名称 | DouDi.ai 模型 ID |
| --- | --- |
| `gpt-4o` | `openai/gpt-4o` |
| `gpt-4o-mini` | `openai/gpt-4o-mini` |
| `gpt-5.2` | `openai/gpt-5.4-mini` |

通过 DouDi.ai，你还可以使用其他厂商的模型，推荐模型请参考 [DouDi.ai 模型广场/价格页面](https://doudi.ai/pricing) 。

## 兼容性

DouDi.ai 支持 OpenAI API 的以下功能：

| 功能 | 状态 |
| --- | --- |
| Chat Completions | ✅ 完全兼容 |
| Streaming | ✅ 完全兼容 |
| Function Calling | ✅ 完全兼容 |
| JSON Mode | ✅ 完全兼容 |
| Vision (图像输入) | ✅ 完全兼容 |
| Models List | ✅ 完全兼容 |
| Images Generation | ✅ 完全兼容 |

## 框架集成

### LangChain

```
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    base_url="https://doudi.ai/v1",
    api_key="<你的 DOUDI_API_KEY>",
    model="openai/gpt-4o"
)
```

### LlamaIndex

```
from llama_index.llms.openai import OpenAI

llm = OpenAI(
    api_base="https://doudi.ai/v1",
    api_key="<你的 DOUDI_API_KEY>",
    model="openai/gpt-4o"
)
```

### Vercel AI SDK

```
import { createOpenAI } from '@ai-sdk/openai'

const haoai = createOpenAI({
  baseURL: 'https://doudi.ai/v1',
  apiKey: '<你的 DOUDI_API_KEY>'
})

const model = haoai('openai/gpt-4o')
```

任何支持 OpenAI SDK 的框架和工具，都可以通过修改 base\_url 接入 DouDi.ai。
