# Cursor 兼容性说明

**Cursor 已限制第三方 API 提供商**

Cursor 近期版本对自定义 API 提供商做出了严格限制，导致通过 DouDi.ai 接入时存在以下不兼容问题：

*   **内联补全（Tab 补全）完全不可用** — Cursor 的 Tab 补全强制使用官方模型，无法替换
*   **Agent 模式不可用** — Background Agent 不支持第三方 API 提供商
*   **自动模型选择失效** — Auto 模式会绕过自定义配置，回退到官方模型
*   **Cursor Pro 付费墙** — 即使配置成功，免费版也无法使用自定义模型

综合以上限制，Cursor 目前不适合作为 DouDi.ai 的接入工具。

## 推荐替代方案

以下工具对 DouDi.ai 有完整支持，功能无限制：

[Claude Code + CC Switch](/integrations/claude-code)[Codex CLI + CC Switch](/integrations/codex)

## 继续使用 Cursor 编辑器

如果你习惯了 Cursor 的编辑体验，不想换编辑器，可以在 **Cursor 内置终端**中运行 Claude Code 或 Codex CLI —— 编辑器还是 Cursor，AI 能力走 DouDi.ai，两者互不干扰。

打开 Cursor 内置终端（`` Ctrl+` ``），然后像平时一样使用：

```
# 使用 Claude Code
claude "帮我重构这个函数"

# 使用 Codex CLI
codex "帮我重构这个函数"
```

Claude Code 和 Codex CLI 会读取当前目录的代码，直接在终端里完成 AI 编码任务，与你在 Cursor 里打开的文件实时同步。

## 为什么 Cursor 不能正常使用？

### 内联补全被锁定

Cursor 的 Tab 补全（inline completion）是其核心功能之一，但该功能硬编码使用 Cursor 官方模型，不读取任何自定义 API 配置。即使你正确配置了 DouDi.ai 的 Base URL 和 API Key，Tab 补全依然会走 Cursor 官方渠道。

### Agent 模式不支持第三方

Cursor 的 Background Agent 功能在设计上绑定了官方 API，第三方提供商无法接入。

### Auto 模式会覆盖自定义配置

Cursor 的 Auto 模式会自动选择”最优”模型，但这个选择逻辑优先使用官方模型，会绕过你填写的自定义 Base URL。

### 免费版无法使用自定义模型

即使订阅了 Cursor Pro，自定义 API 提供商的支持也在持续收紧。Cursor 的商业模式依赖官方模型消费，第三方接入并非其设计目标。

> 本页按 DouDi.ai 接入语境整理，覆盖同类教程的结构和步骤。
> 实际模型、分组、价格和权限以 DouDi 控制台为准。
