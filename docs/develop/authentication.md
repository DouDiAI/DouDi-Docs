# 认证指南

所有 API 请求都需要通过 API Key 进行身份认证。DouDi.ai 使用统一的 API Key，支持当前可用协议的认证方式。

## 获取 API Key

1.  前往 [DouDi.ai 控制台](https://doudi.ai/console/overview) 
2.  进入 [API Keys 页面](https://doudi.ai/console/api-keys) 
3.  点击创建 API Key
4.  复制并安全保存你的 API Key

API Key 仅在创建时显示一次，请务必妥善保存。如果丢失，需要重新创建。

## 认证方式

根据你使用的协议，认证方式略有不同：

### OpenAI 兼容

**OpenAI 兼容协议**使用 `Authorization` Header：

```
Authorization: Bearer <你的 DOUDI_API_KEY>
```

```
from openai import OpenAI

client = OpenAI(
    base_url="https://doudi.ai/v1",
    api_key="<你的 DOUDI_API_KEY>"
)
```

### Anthropic 原生

**Anthropic 原生协议**使用 `x-api-key` Header：

```
x-api-key: <你的 DOUDI_API_KEY>
```

```
import anthropic

client = anthropic.Anthropic(
    base_url="https://doudi.ai/anthropic",
    api_key="<你的 DOUDI_API_KEY>"
)
```

### Grok / xAI 协议

**Grok / xAI 协议**使用 `Authorization` Header。可直接通过 OpenAI SDK 指向 Grok / xAI Base URL：

```
Authorization: Bearer <你的 DOUDI_API_KEY>
```

```
from openai import OpenAI

client = OpenAI(
    base_url="https://doudi.ai/grok/v1",
    api_key="<你的 DOUDI_API_KEY>"
)
```

## 环境变量配置

推荐使用环境变量管理 API Key，避免硬编码：

.env

```
DOUDI_API_KEY=<你的 DOUDI_API_KEY>

# 也可以设置协议专用的环境变量
OPENAI_API_KEY=<你的 DOUDI_API_KEY>
OPENAI_BASE_URL=https://doudi.ai/v1

ANTHROPIC_API_KEY=<你的 DOUDI_API_KEY>
ANTHROPIC_BASE_URL=https://doudi.ai/anthropic

GROK_API_KEY=<你的 DOUDI_API_KEY>
GROK_BASE_URL=https://doudi.ai/grok/v1
```

## 安全最佳实践

1.  **使用环境变量** — 永远不要在代码中硬编码 API Key
2.  **定期轮换密钥** — 建议每 90 天更换一次
3.  **区分环境** — 开发和生产环境使用不同的 API Key
4.  **监控用量** — 定期检查控制台的 API 用量和异常调用
5.  **限制权限** — 为不同项目创建独立的 API Key，便于追踪和管理

切勿将 API Key 提交到 Git 仓库或暴露在客户端代码中。使用 .gitignore 排除 .env 文件。

> 本页按 DouDi.ai 接入语境整理，覆盖同类教程的结构和步骤。
> 实际模型、分组、价格和权限以 DouDi 控制台为准。
