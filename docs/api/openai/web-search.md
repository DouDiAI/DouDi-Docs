# Web Search

DouDi 的 OpenAI 兼容 Base URL 提供 Codex standalone web search 兼容端点：

```http
POST https://doudi.ai/v1/alpha/search
```

这个端点用于 Codex CLI / Codex Agent 的独立联网搜索能力。启用后，普通 Agent 任务在需要检索实时网页、核对最新资料或读取外部页面时，会由 Codex 运行时通过 `web.run` 自动调用 `/v1/alpha/search`。用户不需要，也不建议手工 `curl` 这个端点。

## 适用场景

| 场景 | 是否适合 | 说明 |
| --- | --- | --- |
| Codex Agent 需要实时网页搜索 | 适合 | 由运行时暴露的 `web.run` 自动触发 |
| Codex CLI 本地会话需要浏览最新资料 | 适合 | 需要本地配置同时启用搜索模式、供应商能力和 feature flag |
| 普通 OpenAI SDK 调用模型生成文本 | 不适合 | 使用 [Responses API](/api/openai/responses) 或 [Chat Completions](/api/openai/chat-completions) |
| 手写请求体调用搜索接口 | 不适合 | `/v1/alpha/search` payload 由 Codex 客户端维护，协议可能随客户端演进 |

## Codex 配置

修改本机 Codex 配置文件 `~/.codex/config.toml`。如果你已经通过 CC Switch 或安装脚本写入了 DouDi provider，不要删除原有配置，只需要确认同一个 provider 下补齐下面三类字段。

最小必需配置如下。`<provider>` 要替换成你本机已经在使用的 provider 名称，例如 `doudi`：

```toml
web_search = "live"

[model_providers.<provider>]
supports_standalone_web_search = true

[features]
standalone_web_search = true
```

如果你还没有写过 DouDi provider，可以参考这份完整示例：

```toml
model_provider = "doudi"
model = "<MODEL_ID>"
web_search = "live"

[model_providers.doudi]
name = "DouDi.ai"
base_url = "https://doudi.ai/v1"
env_key = "DOUDI_API_KEY"
wire_api = "responses"
supports_websockets = true
supports_standalone_web_search = true

[features]
standalone_web_search = true
```

其中 `model` 必须使用 [模型广场/价格页面](https://doudi.ai/pricing) 或 [Models API](/api/openai/models) 返回的当前可用模型 ID，不要在文档里照抄固定模型名。`DOUDI_API_KEY` 是环境变量名，实际 API Key 请在 [API Key 管理页面](https://doudi.ai/keys) 创建后写入本机环境变量。

保存配置后，必须完全退出当前 Codex / Codex Agent，并重新打开一个新的 Agent 会话。继续使用旧会话、只刷新页面或只 resume 当前任务，可能仍然读取旧配置。

## 调用语义

启用 standalone web search 后，调用链分成两条：

| 调用 | 端点 | 由谁发起 | 用途 |
| --- | --- | --- | --- |
| 模型响应 | `/v1/responses` | Codex | 普通对话、代码编辑、工具调用编排 |
| 独立搜索 | `/v1/alpha/search` | Codex 的 `web.run` | 实时网页搜索和页面读取 |

你在日常任务里只需要告诉 Agent 需要核对实时资料，或让 Agent 在该使用搜索时自行搜索。Codex 运行时会决定是否暴露并调用 `web.run`；如果当前运行时没有暴露 `web.run`，DouDi 也不会收到 `/v1/alpha/search` 请求。

## 与 Responses hosted web_search 的区别

`/v1/alpha/search` standalone search 和 `/v1/responses` hosted `web_search` 不是同一个能力。

| 维度 | Standalone `/v1/alpha/search` | Responses hosted `web_search` |
| --- | --- | --- |
| 请求路径 | 独立 `POST /v1/alpha/search` | `POST /v1/responses` 请求体内声明 hosted search tool |
| 触发入口 | Codex 运行时的 `web.run` | Responses API 的模型托管工具调用 |
| 配置条件 | `web_search = "live"`、provider `supports_standalone_web_search = true`、`[features].standalone_web_search = true` | 按 Responses API 的工具参数与模型能力决定 |
| 成功证据 | 使用日志出现 `/v1/alpha/search` 请求并返回成功 | 只能证明 Responses hosted search 路径成功 |
| 计费语义 | 成功一次独立搜索记为 1 次 web search 调用 | 按 hosted tool 路径和对应用量记录计费 |

因此，不能只因为最终回答里出现了网页内容或引用，就判断 Alpha Search 已成功。也不能把 `/v1/responses` hosted search 的成功记录写成 `/v1/alpha/search` 成功。

## 成功判据

一次完整成功需要同时满足以下条件：

1. `config.toml` 中存在顶层 `web_search = "live"`。
2. 当前使用的 `[model_providers.<provider>]` 中存在 `supports_standalone_web_search = true`。
3. `[features]` 中存在 `standalone_web_search = true`。
4. 修改配置后已经完全重启 Codex，并进入新的 Agent 会话。
5. 新会话中 Codex 运行时暴露了 `web.run`。
6. 任务实际触发搜索后，[使用日志](https://doudi.ai/usage-logs/common) 中出现 `request_path=/v1/alpha/search` 或等价路径记录，且请求成功。
7. 用量记录中出现 1 次 web search 调用计数，例如 `web_search_call_count=1` 或内置工具 `web_search_preview` 的一次调用。

仅有回答文本、引用内容、终端里看起来像“搜到了”的文字，不能作为 Alpha Search 成功证据。

## 计费

成功的一次 standalone web search 会按 1 次 web search 调用计费。DouDi 后端会把该次独立搜索记录为内置搜索工具调用，常见计费项名称为 `web_search_preview`。

具体单价、倍率、余额扣减和模型侧 token 费用以 [模型广场/价格页面](https://doudi.ai/pricing)、[数据看板](https://doudi.ai/dashboard/models) 与 [使用日志](https://doudi.ai/usage-logs/common) 的实时记录为准；文档不维护静态价格或静态模型清单。

## 故障排查

### `web.run` 没有暴露

优先检查四件事：

1. `web_search = "live"` 是否写在顶层，而不是写进 provider 子表。
2. `supports_standalone_web_search = true` 是否写在当前正在使用的 provider 下。
3. `[features]` 下是否存在 `standalone_web_search = true`。
4. 是否完全退出 Codex 并新开 Agent。

如果这四项都正确，但运行时仍没有 `web.run`，确认你正在使用的 Codex 版本支持 standalone web search，并检查是否有项目级配置覆盖了用户级配置。

### 仍然只看到 `/v1/responses`

如果使用日志只出现 `/v1/responses`，没有 `/v1/alpha/search`，通常说明当前会话没有启用 standalone search，或者本次任务没有触发搜索。请先新开会话，再让 Agent 明确核对一个需要实时资料的问题。

注意：`/v1/responses` 中的 hosted search 成功，不等于 `/v1/alpha/search` 成功。

### `503 No available channel for model ...`

这个错误不一定表示模型不存在。它也可能表示当前模型虽然可以用于普通对话，但没有可用渠道同时支持该模型和 `/v1/alpha/search`。

处理方式：

1. 换用一个当前确认支持 Codex / Responses 的模型 ID。
2. 到 [模型广场/价格页面](https://doudi.ai/pricing) 重新复制模型 ID，避免使用旧名称。
3. 如果你是平台管理员，确认该模型的渠道协议支持 Alpha Search 路径。

### 渠道协议不匹配

DouDi 后端会按请求路径做渠道能力检查。`/v1/alpha/search` 目前只适合支持 Alpha Search 路径的 Codex、NewAPI、Sub2API 渠道，或已经显式配置该路径和模型的 Advanced Custom 渠道。普通 OpenAI 兼容渠道即使能处理 `/v1/responses`，也不代表一定能处理 `/v1/alpha/search`。

如果你无法判断渠道类型，请把失败时间、模型 ID、使用分组和错误信息提供给 DouDi 支持排查，不要在文档或脚本里写死备用模型清单。

## 相关文档

- [Codex 模型供应商配置](/integrations/codex/model-provider)
- [开启 WebSocket](/integrations/codex/websocket)
- [Responses API](/api/openai/responses)
- [Models API](/api/openai/models)
- [OpenAI Codex Web Search](https://developers.openai.com/codex/web-search)
- [OpenAI Codex Config Reference](https://developers.openai.com/codex/config-reference)
