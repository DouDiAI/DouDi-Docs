# 计费说明

DouDi.ai 采用**纯按量付费**模式 — 用多少付多少，没有订阅，没有套餐，没有月费，没有最低消费。

无订阅、无套餐、无隐藏费用。充值即用，余额永不过期。

## 计费方式

### 文本模型（按 Token 计费）

| 计费项 | 说明 |
| --- | --- |
| **Input Tokens** | 输入（prompt）消耗的 token |
| **Output Tokens** | 输出（completion）消耗的 token |
| **Cached Tokens** | 缓存命中的输入 token（优惠价格） |

### 其他模型

| 类型 | 计费方式 |
| --- | --- |
| 图像生成 | 按张数计费 |

## 使用流程

1.  **注册** — 前往 [DouDi.ai 控制台](https://doudi.ai/console/overview)   注册账号
2.  **充值** — 按需充值，余额永不过期
3.  **调用** — 按实际用量扣费，实时结算

## 费用查看

### 控制台

1.  登录 [DouDi.ai 控制台](https://doudi.ai/console/wallet)  
2.  进入 **账单** 页面
3.  查看实时费用明细，按模型、按日期维度统计

### API 响应

每个 API 响应都包含 `usage` 字段，方便追踪用量：

```
{
  "usage": {
    "prompt_tokens": 100,
    "completion_tokens": 50,
    "total_tokens": 150
  }
}
```

## 费用优化建议

1.  **选择合适的模型** — 简单任务使用轻量模型，无需为所有场景使用旗舰模型
2.  **启用 Prompt Caching** — 重复的 system prompt 可节省 50-90% 输入成本
3.  **控制 max\_tokens** — 设置合理的输出长度限制，避免不必要的 token 消耗
4.  **合并请求** — 将多个短请求合并为一个，减少重复的 prompt 开销

各模型实时定价，请查看 模型目录 。

> 本页按 DouDi.ai 接入语境整理，覆盖同类教程的结构和步骤。
> 实际模型、分组、价格和权限以 DouDi 控制台为准。
