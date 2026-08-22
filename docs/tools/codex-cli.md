# Codex CLI

Codex CLI 使用 OpenAI Compatible Provider 时，核心仍是 API Key、Base URL 和模型名。

## 推荐配置

```text
Base URL: https://doudi.ai/v1
API Key: 你的 DouDi API Key
Model: 控制台可用的代码模型
```

## 配置步骤

1. 在 DouDi 控制台创建一个专用于 Codex CLI 的 Key。
2. 在 Codex CLI 的 provider 或环境变量配置里选择 OpenAI Compatible。
3. 填入 `https://doudi.ai/v1`。
4. 填入模型名。
5. 运行一个小任务，确认能正常返回。

## 建议

- 给 Codex CLI 单独建 Key，方便限额和轮换。
- 长任务先用小模型验证链路，再切换高成本模型。
- 如果出现 429，先降低并发或等待，再查看请求日志。
- 如果工具提示模型不存在，手动输入控制台可用模型名。
