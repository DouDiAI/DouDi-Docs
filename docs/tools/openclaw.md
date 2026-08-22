# OpenClaw

OpenClaw 是代码或智能体相关工具时，接入重点是确认它支持自定义模型服务。如果你遇到 Hermes / OpenClaw 的 403 问题，请看单独的 [403 代理排查](/tools/hermes-openclaw-403)。

## 下载地址

- 官方文档或项目主页：优先使用你当前 OpenClaw 客户端内提供的官网入口。
- 403 排查页：[Hermes / OpenClaw 403 代理](/tools/hermes-openclaw-403)
- 新手建议：OpenClaw 的版本和分支比较多，下载前先确认来源是否来自项目官方。

## 能不能接入 DouDi

| 情况 | 结论 |
| --- | --- |
| 支持自定义 OpenAI Compatible Provider | 可以接入 |
| 支持自定义 Base URL 和 API Key | 通常可以接入 |
| 只支持固定官方服务 | 不能直接接入 |

## 配置步骤

1. 打开 OpenClaw 设置。
2. 找到模型服务、Provider 或 API 配置。
3. 新增 OpenAI Compatible Provider。
4. Base URL 填 `https://doudi.ai/v1`。
5. API Key 填 DouDi Key。
6. 模型名填写 DouDi 控制台中的完整名称。
7. 保存后用短问题测试。

## 常见问题

- 出现 403：优先看 [Hermes / OpenClaw 403 代理](/tools/hermes-openclaw-403)。
- 没有模型列表：手动添加模型名。
- 请求失败：检查 Base URL 是否带 `/v1`。
