# 控制台总览

[DouDi.ai 控制台](https://doudi.ai/dashboard) 提供账号、额度和 API 使用入口。涉及模型统计、请求明细和 API Key 时，请直接进入对应页面：

| 场景 | 页面 |
| --- | --- |
| 控制台首页 | [doudi.ai/dashboard](https://doudi.ai/dashboard) |
| API Key 管理 | [doudi.ai/keys](https://doudi.ai/keys) |
| 使用日志 | [doudi.ai/usage-logs/common](https://doudi.ai/usage-logs/common) |
| 数据看板 | [doudi.ai/dashboard/models](https://doudi.ai/dashboard/models) |
| 模型广场与价格 | [doudi.ai/pricing](https://doudi.ai/pricing) |

## 主要功能

### API Key 管理

在 [API Key 管理页面](https://doudi.ai/keys) 为不同项目创建独立的 API Key，并管理已创建的密钥。

*   **创建密钥** — 为不同项目创建独立的 API Key
*   **查看密钥** — 管理所有已创建的密钥
*   **停用/删除** — 停用或删除不再使用的密钥
*   **权限控制** — 为不同密钥设置访问权限

### 请求日志

在 [使用日志页面](https://doudi.ai/usage-logs/common) 实时查看 API 请求的详细信息：

| 字段 | 说明 |
| --- | --- |
| 时间戳 | 请求发生时间 |
| 模型 | 使用的模型 |
| 状态码 | HTTP 响应状态 |
| 延迟 | 请求响应时间 |
| Token 用量 | 输入/输出 token 数 |
| 费用 | 该请求的计费金额 |

### 数据看板

在 [数据看板页面](https://doudi.ai/dashboard/models) 查看模型维度的趋势和统计，适合追踪一段时间内的调用结构、模型分布和成本变化。

### 全局策略配置

在控制台中配置影响所有请求的全局策略：

*   **默认路由策略** — 设置供应商路由的默认行为
*   **默认回退模型** — 配置全局故障回退列表
*   **速率限制** — 查看和调整限制配置
*   **内容过滤** — 配置内容安全策略

## 快速入门

1. 访问 [doudi.ai/dashboard](https://doudi.ai/dashboard) 并登录。
2. 在 [API Key 管理页面](https://doudi.ai/keys) 创建或检查密钥。
3. 在 [使用日志页面](https://doudi.ai/usage-logs/common) 查看请求详情。
4. 在 [数据看板页面](https://doudi.ai/dashboard/models) 查看模型维度统计。
5. 在 [模型广场/价格页面](https://doudi.ai/pricing) 确认可用模型和价格。

控制台数据近实时更新，通常延迟在 1 分钟以内。
