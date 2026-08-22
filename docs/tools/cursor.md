# Cursor

Cursor 可以通过 OpenAI Compatible Provider 接入 DouDi。不同版本入口名称可能变化，以 Cursor 当前设置页为准。

## 配置步骤

1. 打开 Cursor 设置。
2. 找到模型或 Provider 配置。
3. 新增 OpenAI Compatible 或自定义 OpenAI Provider。
4. 填入 API Key 和 Base URL。
5. 手动添加控制台可用模型名。

## 推荐值

```text
Base URL: https://doudi.ai/v1
API Key: 你的 DouDi API Key
Model: 控制台可用模型名
```

## 使用建议

- 代码补全和聊天可以分开 Key。
- 如果项目很大，先控制上下文范围，避免长上下文请求消耗过高。
- 大批量 Agent 操作前，先用一个小文件验证模型和 Key。
