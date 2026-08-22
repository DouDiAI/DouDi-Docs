# Cline

Cline 是 VS Code 里的 Agent 工具。使用 DouDi 时建议为 Cline 单独创建 Key，并限制预算。

## 配置步骤

1. 在 VS Code 中打开 Cline 设置。
2. Provider 选择 OpenAI Compatible 或自定义 OpenAI。
3. API Key 填 DouDi Key。
4. Base URL 填 `https://doudi.ai/v1`。
5. Model 填控制台可用模型名。

## 建议

- 第一次只让 Cline 读文件或解释代码。
- 确认请求日志正常后，再允许它修改文件。
- 长上下文任务容易产生较高消耗，建议设置 Key 额度。
