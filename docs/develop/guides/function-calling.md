# 函数调用（Function Calling）

函数调用允许模型根据用户需求，自动选择并调用你预定义的工具函数，实现数据查询、API 调用、任务执行等能力。

## 基本概念

函数调用的完整流程：

1.  **定义工具** — 在请求中描述可用函数和参数
2.  **模型决策** — 模型判断是否需要调用工具
3.  **返回调用** — 模型返回函数名和参数
4.  **执行函数** — 你执行函数并获取结果
5.  **继续对话** — 将结果发回模型，生成最终回复

## OpenAI 协议

### Python

```python
from openai import OpenAI
import json

client = OpenAI(
    base_url="https://doudi.ai/v1",
    api_key="<你的 DOUDI_API_KEY>"
)

# 1. 定义工具
tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "获取指定城市的实时天气信息",
        "parameters": {
            "type": "object",
            "properties": {
                "city": {
                    "type": "string",
                    "description": "城市名称，如：北京、上海"
                },
                "unit": {
                    "type": "string",
                    "enum": ["celsius", "fahrenheit"],
                    "description": "温度单位"
                }
            },
            "required": ["city"]
        }
    }
}]

# 2. 发送请求
messages = [{"role": "user", "content": "北京今天天气怎么样？"}]

response = client.chat.completions.create(
    model="openai/gpt-4o",
    messages=messages,
    tools=tools,
    tool_choice="auto"
)

message = response.choices[0].message

# 3. 处理工具调用
if message.tool_calls:
    for tool_call in message.tool_calls:
        args = json.loads(tool_call.function.arguments)

        # 4. 执行你的函数
        result = get_weather(args["city"])  # 你自己的实现

        # 5. 将结果发回模型
        messages.append(message)
        messages.append({
            "role": "tool",
            "tool_call_id": tool_call.id,
            "content": json.dumps(result)
        })

    # 获取最终回复
    final = client.chat.completions.create(
        model="openai/gpt-4o",
        messages=messages,
        tools=tools
    )
    print(final.choices[0].message.content)
```

### TypeScript

```typescript
import OpenAI from 'openai'

const client = new OpenAI({
  baseURL: 'https://doudi.ai/v1',
  apiKey: '<你的 DOUDI_API_KEY>'
})

// 1. 定义工具
const tools: OpenAI.ChatCompletionTool[] = [{
  type: 'function',
  function: {
    name: 'get_weather',
    description: '获取指定城市的实时天气信息',
    parameters: {
      type: 'object',
      properties: {
        city: { type: 'string', description: '城市名称' },
        unit: { type: 'string', enum: ['celsius', 'fahrenheit'] }
      },
      required: ['city']
    }
  }
}]

// 2. 发送请求
const messages: OpenAI.ChatCompletionMessageParam[] = [
  { role: 'user', content: '北京今天天气怎么样？' }
]

const response = await client.chat.completions.create({
  model: 'openai/gpt-4o',
  messages,
  tools,
  tool_choice: 'auto'
})

const message = response.choices[0].message

// 3. 处理工具调用
if (message.tool_calls) {
  messages.push(message)

  for (const toolCall of message.tool_calls) {
    const args = JSON.parse(toolCall.function.arguments)
    const result = await getWeather(args.city)  // 你自己的实现

    messages.push({
      role: 'tool',
      tool_call_id: toolCall.id,
      content: JSON.stringify(result)
    })
  }

  const final = await client.chat.completions.create({
    model: 'openai/gpt-4o',
    messages,
    tools
  })

  console.log(final.choices[0].message.content)
}
```

## Anthropic 协议

Anthropic 使用 `tools` 参数，格式略有不同：

```python
import anthropic

client = anthropic.Anthropic(
    base_url="https://doudi.ai/anthropic",
    api_key="<你的 DOUDI_API_KEY>"
)

response = client.messages.create(
    model="anthropic/claude-sonnet-4.6",
    max_tokens=1024,
    tools=[{
        "name": "get_weather",
        "description": "获取指定城市的实时天气信息",
        "input_schema": {
            "type": "object",
            "properties": {
                "city": {"type": "string", "description": "城市名称"}
            },
            "required": ["city"]
        }
    }],
    messages=[{"role": "user", "content": "北京今天天气怎么样？"}]
)

# 处理 tool_use content block
for block in response.content:
    if block.type == "tool_use":
        print(f"调用工具: {block.name}, 参数: {block.input}")
```

## 并行函数调用

模型可以在一次响应中返回多个工具调用，你应该并行执行它们：

```
# 模型可能同时请求多个工具调用
if message.tool_calls:
    # 并行执行所有工具调用
    import asyncio

    async def execute_tools(tool_calls):
        tasks = []
        for tc in tool_calls:
            args = json.loads(tc.function.arguments)
            tasks.append(execute_function(tc.function.name, args))
        return await asyncio.gather(*tasks)
```

## tool\_choice 参数

| 值 | 说明 |
| --- | --- |
| `"auto"` | 模型自动决定是否调用工具（默认） |
| `"none"` | 禁止调用工具 |
| `"required"` | 强制调用工具 |
| `{"type": "function", "function": {"name": "xxx"}}` | 强制调用指定工具 |

## 支持的模型

以下模型支持 Function Calling：

*   OpenAI: gpt-4o、gpt-4o-mini、o1、o3-mini
*   Anthropic: claude-opus-4、claude-sonnet-4、claude-3-5-haiku
*   国产: deepseek-chat、qwen-max、glm-4
