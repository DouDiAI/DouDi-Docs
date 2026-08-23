# 视觉理解

DouDi.ai 支持多模态模型的视觉输入，可以分析图像、截图、文档和视频内容。

## 支持的模型

| 模型 | 图像 | 视频 | 说明 |
| --- | --- | --- | --- |
| `openai/gpt-4o` | ✅ | — | 高质量图像分析 |
| `openai/gpt-4o-mini` | ✅ | — | 快速图像分析 |
| `anthropic/claude-sonnet-4.6` | ✅ | — | 强大的文档和代码理解 |

## 图像分析

### 通过 URL 发送图像

### cURL

```bash
curl https://doudi.ai/v1/chat/completions \
  -H "Authorization: Bearer $DOUDI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-4o",
    "messages": [{
      "role": "user",
      "content": [
        {"type": "text", "text": "描述这张图片的内容"},
        {"type": "image_url", "image_url": {"url": "https://example.com/photo.jpg"}}
      ]
    }]
  }'
```

### Python

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://doudi.ai/v1",
    api_key="<你的 DOUDI_API_KEY>"
)

response = client.chat.completions.create(
    model="openai/gpt-4o",
    messages=[{
        "role": "user",
        "content": [
            {"type": "text", "text": "描述这张图片的内容"},
            {
                "type": "image_url",
                "image_url": {"url": "https://example.com/photo.jpg"}
            }
        ]
    }]
)

print(response.choices[0].message.content)
```

### TypeScript

```typescript
const response = await client.chat.completions.create({
  model: 'openai/gpt-4o',
  messages: [{
    role: 'user',
    content: [
      { type: 'text', text: '描述这张图片的内容' },
      {
        type: 'image_url',
        image_url: { url: 'https://example.com/photo.jpg' }
      }
    ]
  }]
})
```

### 通过 Base64 发送图像

适用于本地文件或截图场景：

```python
import base64

# 读取本地图片
with open("screenshot.png", "rb") as f:
    image_data = base64.standard_b64encode(f.read()).decode("utf-8")

response = client.chat.completions.create(
    model="openai/gpt-4o",
    messages=[{
        "role": "user",
        "content": [
            {"type": "text", "text": "这个截图里显示了什么？"},
            {
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/png;base64,{image_data}"
                }
            }
        ]
    }]
)
```

## 图像细节级别

通过 `detail` 参数控制分析精度：

| 值 | 说明 | 适用场景 |
| --- | --- | --- |
| `auto` | 自动选择（默认） | 一般场景 |
| `low` | 低精度，更快速 | 简单分类、标签识别 |
| `high` | 高精度，更详细 | 文档 OCR、细节分析 |

```
{
    "type": "image_url",
    "image_url": {
        "url": "https://example.com/document.jpg",
        "detail": "high"  # 高精度模式
    }
}
```

## 多图对比

可以在一个请求中发送多张图片：

```
response = client.chat.completions.create(
    model="openai/gpt-4o",
    messages=[{
        "role": "user",
        "content": [
            {"type": "text", "text": "比较这两张图片的区别"},
            {"type": "image_url", "image_url": {"url": "https://example.com/before.jpg"}},
            {"type": "image_url", "image_url": {"url": "https://example.com/after.jpg"}}
        ]
    }]
)
```

## Anthropic 协议的视觉输入

```
import anthropic

client = anthropic.Anthropic(
    base_url="https://doudi.ai/anthropic",
    api_key="<你的 DOUDI_API_KEY>"
)

message = client.messages.create(
    model="anthropic/claude-sonnet-4.6",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": [
            {
                "type": "image",
                "source": {
                    "type": "base64",
                    "media_type": "image/jpeg",
                    "data": image_data
                }
            },
            {"type": "text", "text": "描述这张图片"}
        ]
    }]
)
```

## 常见用例

*   **文档 OCR** — 提取图片中的文字和表格
*   **代码截图分析** — 分析截图中的代码并提供修改建议
*   **UI 审查** — 分析界面设计和布局
*   **图表解读** — 分析数据图表和可视化内容
*   **产品识别** — 识别图片中的物体和场景
