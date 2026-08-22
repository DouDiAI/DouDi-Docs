# 开启 WebSocket

先完成 [配置模型供应商](/integrations/codex/model-provider)，再运行一键命令开启 Codex 的 Responses 协议格式和 WebSocket 长连接。脚本只修改连接能力，不读取、不保存、不覆盖 API Key。

## 一键启用 WebSocket（推荐）

```
curl -fsSL https://doudi.ai/install/codex.sh | bash
```

脚本会备份 `~/.codex/config.toml`，优先找到 CC Switch 已写入的 DouDi.ai 供应商，并在原有供应商配置块里补齐下面两个字段。下面以 `haoai` 供应商名为例；如果你的本地供应商名不同，把 `haoai` 换成实际名称即可：

```
[model_providers.haoai]
wire_api = "responses"
supports_websockets = true
```

`wire_api = "responses"` 表示让 Codex 使用 Responses 协议格式；`supports_websockets = true` 表示这个供应商支持 WebSocket 长连接。两项一起配置后，Codex 才会按推荐方式连接 DouDi.ai。

API Key 仍在 CC Switch 的 Codex 供应商设置里管理。这个命令只负责开启 Codex 所需的协议格式和 WebSocket 连接。

如果你的配置使用 `[model_providers]` 下的 inline table 写法，脚本也会在原有供应商里补字段，不会强制改成另一种格式。

> 本页按 DouDi.ai 接入语境整理，覆盖同类教程的结构和步骤。
> 实际模型、分组、价格和权限以 DouDi 控制台为准。
