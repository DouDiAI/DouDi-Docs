# 余额查询

返回当前 API Key 所属账户的余额状态，包含可用余额、历史累计入账与累计扣费。

本接口属于 DouDi.ai OpenAPI，与具体协议无关。任意一个有效的 DouDi.ai API Key 均可调用，响应结构与 cc-switch 等第三方工具兼容。

## 端点

```
GET https://doudi.ai/v1/user/balance
```

同一接口也通过 Anthropic 入口暴露，方便已配置不同 Base URL 的客户端复用：

| URL |
| --- |
| `https://doudi.ai/v1/user/balance` |
| `https://doudi.ai/anthropic/user/balance` |

两个 URL 返回完全一致的响应结构。

## 认证

使用任一有效的 DouDi.ai API Key（`sk-...`），通过 `Authorization: Bearer` 头传入：

```
Authorization: Bearer sk-xxx
```

请使用用户级 API Key（在 Dashboard 创建），不要使用 Internal / Gateway 内部密钥。

## 请求示例

### cURL

```bash
curl https://doudi.ai/v1/user/balance \
  -H "Authorization: Bearer $DOUDI_API_KEY"
```

### Python

```python
import os
import requests

resp = requests.get(
    "https://doudi.ai/v1/user/balance",
    headers={"Authorization": f"Bearer {os.environ['DOUDI_API_KEY']}"},
)
data = resp.json()
print(f"可用余额: ${data['balance']:.4f} {data['currency']}")
```

### TypeScript

```typescript
const resp = await fetch('https://doudi.ai/v1/user/balance', {
  headers: { Authorization: `Bearer ${process.env.DOUDI_API_KEY}` },
})
const data = await resp.json()
console.log(`可用余额: $${data.balance.toFixed(4)} ${data.currency}`)
```

## 响应格式

成功响应 `200 OK`：

```
{
  "is_active": true,
  "balance": 42.1357,
  "total": 100.0000,
  "used": 57.8643,
  "currency": "USD"
}
```

### 响应字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `is_active` | boolean | 账户是否可用。鉴权通过即返回 `true`；鉴权失败时返回 `false` |
| `balance` | number | 当前可用余额，等于 `total - used` |
| `total` | number | 历史累计入账：充值 + 赠送 + 礼品卡总和 |
| `used` | number | 历史累计扣费：所有调用产生的总消耗 |
| `currency` | string | 货币单位，固定为 `"USD"` |

所有金额以美元（USD）为单位，使用 64 位浮点数表示，底层精度为 NanoDollar（10⁻⁹ USD），可精确到亚美分级别。

## 错误响应

鉴权失败或服务异常时返回非 200 状态码，响应体格式与 cc-switch 兼容：

```
{
  "error": "unauthenticated",
  "is_active": false
}
```

| 状态码 | `error` 值 | 说明 |
| --- | --- | --- |
| 401 | `unauthenticated` | API Key 无效、已禁用或过期 |
| 500 | `internal error` | 服务内部错误，请稍后重试 |

## 第三方工具兼容性

本接口的响应结构与 cc-switch 余额查询模板兼容，可直接作为 cc-switch 的余额提供方接入：

*   `is_active` 用于状态校验
*   `balance` 对应 cc-switch 的 remaining 字段
*   `total` / `used` 用于消耗进度展示
