# 工具接入常见问题排查

## 快速检查清单

| 检查项 | 正确状态 |
| --- | --- |
| Base URL | 包含 `/v1` |
| API Key | 以控制台创建的完整 Key 为准 |
| 鉴权头 | `Authorization: Bearer YOUR_API_KEY` |
| 模型名 | 和 DouDi 控制台里的完整模型 ID 完全一致 |
| 分组 | 当前 Key 的分组支持该模型 |
| 接口格式 | OpenAI、Anthropic、Responses 不要混用 |

## 状态码含义

| 状态码 | 常见原因 |
| --- | --- |
| 400 | 请求体格式错误或参数不被支持 |
| 401 | Key 错误、过期、禁用 |
| 403 | 分组、模型、代理或权限限制 |
| 404 | 路径错误，常见是漏了 `/v1` |
| 429 | 频率过高或并发过高 |
| 500 | 上游异常或网关临时错误 |

## 最小定位方法

1. 用 curl 测试同一个 Key 和模型。
2. curl 可用，再检查客户端配置。
3. 换一个低倍率常用模型测试。
4. 换备用 API 地址测试。
5. 到控制台日志里看失败原因和实际扣费情况。

## Codex 频繁 Reconnect

Codex CLI 或 Codex Desktop 频繁出现 `Reconnect` / `Reconnecting...` 时，优先检查本机代理配置。

在 `~/.codex/.env` 中写入：

```ini
HTTP_PROXY="http://127.0.0.1:<HTTP 或 mixed 端口>"
HTTPS_PROXY="http://127.0.0.1:<HTTP 或 mixed 端口>"
```

把端口替换成代理软件里真实显示的 HTTP 或 mixed 端口，保存后完全重启 Codex Desktop。

更完整的步骤见 [Codex CLI - 频繁 Reconnect](/tools/codex-cli#频繁-reconnect--reconnecting)。
