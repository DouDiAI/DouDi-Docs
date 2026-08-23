# Images API

两个端点：生成（文字 → 图）、编辑（图 + 文字 → 图）。响应都是 OpenAI 标准结构 `data[0].b64_json`。

## 生成图像

```
POST https://doudi.ai/v1/images/generations
```

### 调用示例

### Python

```python
import base64
from openai import OpenAI

client = OpenAI(api_key="YOUR_DOUDI_API_KEY", base_url="https://doudi.ai/v1")

resp = client.images.generate(
    model="<IMAGE_MODEL_ID>",
    prompt="A simple red apple on a white table",
    size="1024x1024",
    quality="low",
    output_format="png",
)

with open("output.png", "wb") as f:
    f.write(base64.b64decode(resp.data[0].b64_json))
```

### TypeScript

```typescript
import OpenAI from 'openai'
import fs from 'node:fs'

const client = new OpenAI({ apiKey: 'YOUR_DOUDI_API_KEY', baseURL: 'https://doudi.ai/v1' })

const resp = await client.images.generate({
  model: '<IMAGE_MODEL_ID>',
  prompt: 'A simple red apple on a white table',
  size: '1024x1024',
  quality: 'low',
  output_format: 'png',
})

fs.writeFileSync('output.png', Buffer.from(resp.data[0].b64_json!, 'base64'))
```

### cURL

```bash
curl -X POST 'https://doudi.ai/v1/images/generations' \
  -H 'Authorization: Bearer YOUR_DOUDI_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "<IMAGE_MODEL_ID>",
    "prompt": "A simple red apple on a white table",
    "size": "1024x1024",
    "quality": "low",
    "output_format": "png"
  }'
```

输出示例：

![生成的红苹果](/imported/haoai/api-openai-images-01.webp)

### 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `model` | string | ✅ | 图像模型 ID，请从 [模型广场/价格页面](https://doudi.ai/pricing) 复制当前可用值 |
| `prompt` | string | ✅ | 自然语言描述 |
| `quality` | string | ✅ | `auto` / `low` / `medium` / `high`，以具体模型支持情况为准 |
| `n` | number | — | 1–10，默认 1 |
| `size` | string | — | `auto`（默认 1536x1024）或任意 `宽x高`，约束见下方「支持的尺寸」 |
| `output_format` | string | — | `png` / `jpeg` / `webp` |
| `background` | string | — | `opaque` / `auto` / `transparent`，以具体模型支持情况为准 |
| `stream` | boolean | — | 默认 `false` |

### 支持的尺寸

尺寸不是固定档位，具体约束以当前图像模型和上游返回为准。常见约束包括：

*   宽、高都是 **16 的倍数**；
*   单边 ≤ **3840**；
*   宽高比在 **1:3 ~ 3:1** 之间；
*   总像素 **655,360 ~ 8,294,400**（约 0.64MP ~ 8.3MP）。

常用尺寸：`1024x1024`、`1536x1024`、`1024x1536`、`2048x2048`、`2560x1440`；4K 档：`3840x2160`、`2160x3840`、`2880x2880`。

如果尺寸被拒，请根据错误信息调整到模型支持的宽高、像素范围和宽高比。

4K 属实验档：单图可能耗时数分钟（客户端超时建议 ≥600 秒），且上游偶发生成失败——**失败不计费**。

### 计费（官方 token 口径 × 1.5 折）

与上游官方 API 同构计费：计量单位、token 数量和价格倍率以当前通道配置为准。实时价格以 [模型广场/价格页面](https://doudi.ai/pricing) 为准。

| 计费项 | 官方单价 | 本平台 |
| --- | --- | --- |
| **图片输出** | $30/M tokens | **$4.50/M tokens** |
| 文本输入（提示词） | $5/M tokens | $0.75/M tokens |
| 参考图输入（编辑场景） | $8/M tokens | $1.20/M tokens（见下） |
| 缓存输入 | $1.25–$2/M tokens | 本通道无缓存命中，恒为 0 |
| 文本输出 | 以模型为准 | 以模型为准 |

*   **图片输出 token 数由官方计量公式确定**（输出尺寸 × 质量档，官方文档 Calculating costs 的计算器可逐张复核）。高质档参考值：1024×1024 = 7,024 tokens ≈ $0.0316/张；1536×1024 = 5,488 ≈ $0.0247；3840×2160 = 13,342 ≈ $0.0600；2880×2880 = 23,719 ≈ $0.1067；
*   **质量统一按高质档计量**（低/中/高同价）：上游对任何质量参数实际均按高细节渲染，按高质计量即按实际交付计费；
*   **提示词按官方同款分词器（o200k）计数**，与你本地用 tiktoken 数出的结果逐 token 一致；
*   **参考图输入**仅在 `/v1/images/edits` 上传参考图时产生（纯文生图无此项）。官方未公开可复算的参考图 token 计数公式，因此当前路径**不对参考图输入单独计量收费**；表中 $1.20/M 为对齐官方的折后费率（官方 $8/M × 0.15），仅当上游按官方口径上报该 token 时适用；
*   `n` 大于 1 时按张数计；**生成失败不计费**。

实时价格以[模型广场/价格页面](https://doudi.ai/pricing) 为准。

### 响应

```
{
  "created": 1777385517,
  "data": [
    { "b64_json": "<图片 Base64>", "index": 0 }
  ],
  "model": "<IMAGE_MODEL_ID>",
  "size": "1024x1024",
  "quality": "low",
  "usage": {
    "input_tokens": 8,
    "input_tokens_details": { "text_tokens": 8 },
    "output_tokens": 7024,
    "total_tokens": 7032
  }
}
```

`usage` 按官方口径返回：输入 = 提示词的 o200k token 数，输出 = 官方公式按实际输出尺寸（高质档）算出的 token 数——与计费数字完全一致。上例 `quality` 虽为 `low`，输出仍按高质档计 7,024（见计费说明）。

图片在 `data[0].b64_json`，自行 base64 解码后保存。

## 编辑图像

```
POST https://doudi.ai/v1/images/edits
```

`multipart/form-data`，需上传图片文件。

### 调用

### Python

```python
import base64
from openai import OpenAI

client = OpenAI(api_key="YOUR_DOUDI_API_KEY", base_url="https://doudi.ai/v1")

with open("apple.png", "rb") as f:
    resp = client.images.edit(
        model="<IMAGE_MODEL_ID>",
        image=f,
        prompt="把苹果改成绿色，其他保持不变",
        size="auto",
        quality="low",
    )

with open("apple_edited.png", "wb") as out:
    out.write(base64.b64decode(resp.data[0].b64_json))
```

### TypeScript

```typescript
import OpenAI, { toFile } from 'openai'
import fs from 'node:fs'

const client = new OpenAI({ apiKey: 'YOUR_DOUDI_API_KEY', baseURL: 'https://doudi.ai/v1' })

const resp = await client.images.edit({
  model: '<IMAGE_MODEL_ID>',
  image: await toFile(fs.createReadStream('apple.png'), 'apple.png'),
  prompt: '把苹果改成绿色，其他保持不变',
  size: 'auto',
  quality: 'low',
})

fs.writeFileSync('apple_edited.png', Buffer.from(resp.data[0].b64_json!, 'base64'))
```

### cURL

```bash
curl -X POST 'https://doudi.ai/v1/images/edits' \
  -H 'Authorization: Bearer YOUR_DOUDI_API_KEY' \
  -F 'model="<IMAGE_MODEL_ID>"' \
  -F 'prompt="把苹果改成绿色，其他保持不变"' \
  -F 'image=@/path/to/apple.png' \
  -F 'size="auto"' \
  -F 'quality="low"'
```

`image` 字段传本地文件路径（cURL 用 `@` 前缀），不是 URL。

实测对比：

| 原图 | 编辑后 |
| --- | --- |
| ![原始红苹果](/imported/haoai/api-openai-images-02.webp) | ![编辑后的绿苹果](/imported/haoai/api-openai-images-03.webp) |

### 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `model` | string | ✅ | 图像模型 ID，请从 [模型广场/价格页面](https://doudi.ai/pricing) 复制当前可用值 |
| `image` | file | ✅ | PNG / JPEG 文件 |
| `prompt` | string | ✅ | 编辑指令 |
| `quality` | string | ✅ | `low` / `medium` / `high` |
| `n` | number | — | 默认 1 |
| `size` | string | — | `auto` 表示与原图一致 |

### 响应

```
{
  "created": 1777385669,
  "data": [
    { "b64_json": "<编辑后图片 Base64>", "index": 0 }
  ],
  "model": "<IMAGE_MODEL_ID>",
  "size": "auto",
  "quality": "low",
  "usage": {
    "input_tokens": 10,
    "input_tokens_details": { "text_tokens": 10 },
    "num_input_images": 1,
    "output_tokens": 5488,
    "total_tokens": 5498
  }
}
```

与生成一致，`usage` 按官方口径返回。`num_input_images` 是输入图片张数。注意：参考图输入的 token 不计入（官方未公开可复算的输入图计数公式，详见上方计费说明），因此 `input_tokens_details` 只含 `text_tokens`。

图像模型与价格见 [模型广场/价格页面](https://doudi.ai/pricing) 。
