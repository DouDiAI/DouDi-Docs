# Claude Code

Claude Code 的不同版本和配置方式可能变化。只要它支持自定义 OpenAI Compatible 或代理层，就可以按 DouDi 的 Base URL 和 Key 配置。

## 配置值

```text
Base URL: https://doudi.ai/v1
API Key: 你的 DouDi API Key
Model: 控制台可用模型名
```

## 接入建议

1. 先在 DouDi 控制台创建 `claude-code-main` 这类单独 Key。
2. 在 Claude Code 的 provider 配置中选择兼容 OpenAI 的入口。
3. 填入 Base URL、Key 和模型名。
4. 用一个只读命令或小文件解释任务测试。
5. 成功后再运行会改文件的大任务。

## 排查

| 现象 | 处理 |
| --- | --- |
| 403 | 检查客户端是否走了不支持的代理或模型 |
| 模型列表为空 | 手动填写模型名，不依赖自动发现 |
| 请求中途断开 | 降低上下文长度，查看 DouDi 请求日志 |
| 消耗异常 | 核对模型、分组和日志里的实际计费项 |
