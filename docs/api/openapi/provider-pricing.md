# 实时价格查询

返回全站可用模型的实时计费价格快照，包含输入、输出与各类缓存价格，按渠道分组。响应结构兼容 hvoy.ai 等第三方价格聚合平台。

本接口属于 DouDi.ai OpenAPI，与具体协议无关。价格数据由平台计费价目表实时生成，与实际计费完全一致。

## 端点

```
GET https://doudi.ai/api/provider/pricing
```

注意：本接口挂载在 **站点域名** `doudi.ai` 上，而不是 OpenAI Compatible 的 `https://doudi.ai/v1` Base URL。

## 认证

本接口不使用 DouDi.ai API Key。根据站点配置，存在两种访问模式：

| 模式 | 请求头 | 响应缓存 |
| --- | --- | --- |
| **签名模式**（默认） | 必须携带 `X-Hvoy-Ts` 和 `X-Hvoy-Sign` | `Cache-Control: no-store` |
| **公开模式** | 无需任何请求头 | `Cache-Control: public, max-age=60` |

### 签名算法

签名模式下，请求需携带以下两个请求头：

| 请求头 | 说明 |
| --- | --- |
| `X-Hvoy-Ts` | Unix 时间戳（秒级整数），与服务器时间误差不得超过 **60 秒** |
| `X-Hvoy-Sign` | 以共享密钥为 key、对时间戳字符串计算 HMAC-SHA256，取十六进制小写：`hex(HMAC-SHA256(secret, ts))` |

签名仅覆盖时间戳本身，不包含请求路径或其他内容。共享密钥由 DouDi.ai 分发给合作平台，如需接入请联系 DouDi 运营支持。

## 请求示例

### cURL

```bash
ts=$(date +%s)
sign=$(printf '%s' "$ts" | openssl dgst -sha256 -hmac "$HVOY_PRICING_SECRET" -r | cut -d' ' -f1)

curl https://doudi.ai/api/provider/pricing \
  -H "X-Hvoy-Ts: $ts" \
  -H "X-Hvoy-Sign: $sign"
```

### Python

```python
import hashlib
import hmac
import os
import time

import requests

ts = str(int(time.time()))
secret = os.environ["HVOY_PRICING_SECRET"]
sign = hmac.new(secret.encode(), ts.encode(), hashlib.sha256).hexdigest()

resp = requests.get(
    "https://doudi.ai/api/provider/pricing",
    headers={"X-Hvoy-Ts": ts, "X-Hvoy-Sign": sign},
)
data = resp.json()["data"]
for model in data["models"]:
    print(f"{model['group_name']}/{model['model_name']}: "
          f"输入 ¥{model['input_price']} / 输出 ¥{model['output_price']}")
```

### TypeScript

```typescript
import { createHmac } from "node:crypto";

const ts = String(Math.floor(Date.now() / 1000));
const sign = createHmac("sha256", process.env.HVOY_PRICING_SECRET!)
  .update(ts)
  .digest("hex");

const resp = await fetch("https://doudi.ai/api/provider/pricing", {
  headers: { "X-Hvoy-Ts": ts, "X-Hvoy-Sign": sign },
});
const body = await resp.json();
for (const model of body.data.models) {
  console.log(`${model.group_name}/${model.model_name}: ¥${model.input_price}`);
}
```

公开模式下省略两个签名头即可，其余完全相同。

## 响应格式

成功响应 `200 OK`：

```
{
  "schema_version": "1.0",
  "success": true,
  "message": "",
  "data": {
    "currency": "CNY",
    "price_unit": "per_1m_tokens",
    "site_name": "DouDi.ai",
    "site_domain": "doudi.ai",
    "updated_at": "2026-06-07T12:00:00Z",
    "models": [
      {
        "model_name": "openai/gpt-4o",
        "group_name": "channel-1",
        "input_price": 18.75,
        "output_price": 75,
        "cache_input_price": 1.875,
        "cache_create_price": null,
        "cache_create_price_1h": null,
        "enabled": true,
        "note": ""
      }
    ]
  }
}
```

### 顶层字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `schema_version` | string | 响应结构版本，当前为 `"1.0"` |
| `success` | boolean | 请求是否成功 |
| `message` | string | 成功时为空字符串，失败时为错误信息 |
| `data` | object | 价格数据，仅成功时返回 |

### `data` 字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `currency` | string | 货币单位，固定为 `"CNY"`（人民币） |
| `price_unit` | string | 价格单位，固定为 `"per_1m_tokens"`（每 100 万 token） |
| `site_name` | string | 站点名称，如 `"DouDi.ai"`（可能省略） |
| `site_domain` | string | 站点域名，如 `"doudi.ai"`（可能省略） |
| `updated_at` | string | 快照生成时间，UTC、RFC 3339 格式 |
| `models` | array | 模型价格列表，按 `group_name`、`model_name` 升序排列 |

### `models[]` 字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `model_name` | string | 模型 ID（请求侧名称），如 `openai/gpt-4o` |
| `group_name` | string | 渠道分组名，按渠道稳定，如 `channel-1` |
| `input_price` | number | 输入 token 价格 |
| `output_price` | number | null | 输出 token 价格，该模型无此定价时为 `null` |
| `cache_input_price` | number | null | 缓存读取价格 |
| `cache_create_price` | number | null | 缓存创建（5 分钟）价格 |
| `cache_create_price_1h` | number | null | 缓存创建（1 小时）价格 |
| `enabled` | boolean | 是否可用。接口仅导出当前可调度的模型，恒为 `true` |
| `note` | string | 备注，当前恒为空字符串 |

所有价格均为人民币（CNY）、按每 100 万 token 计，已包含套餐倍率，并保留 6 位小数。仅导出按 token 计费且当前有可用上游的模型；同一模型在同一分组内只出现一次。

## 错误响应

失败时返回相同的信封结构，`success` 为 `false` 且无 `data`：

```
{
  "schema_version": "1.0",
  "success": false,
  "message": "service temporarily unavailable"
}
```

| 状态码 | `message` 值 | 说明 |
| --- | --- | --- |
| 401 | `missing hvoy signature` | 签名模式下缺少 `X-Hvoy-Ts` 或 `X-Hvoy-Sign` |
| 401 | `invalid hvoy timestamp` | 时间戳不是有效的正整数 |
| 401 | `expired hvoy signature` | 时间戳与服务器时间相差超过 60 秒 |
| 401 | `invalid hvoy signature` | 签名校验失败 |
| 503 | `provider pricing disabled` | 站点未开启价格导出功能 |
| 503 | `provider pricing signature secret unavailable` | 服务端签名密钥未配置 |
| 503 | `service temporarily unavailable` | 服务内部错误，请稍后重试 |
