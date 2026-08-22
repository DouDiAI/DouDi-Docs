# 快速开始

这一页带你完成最小可用流程：登录控制台、准备余额、创建 API Key、填入 Base URL，然后发起第一次请求。

## 1. 登录 DouDi 控制台

打开 [DouDi.ai](https://doudi.ai)，按页面提示注册或登录。登录后先检查余额、套餐或可用额度状态。

如果账户还没有额度，请先在控制台完成充值、兑换或套餐开通。入口名称可能随运营配置调整，以控制台实际显示为准。

## 2. 创建 API Key

进入控制台的令牌或 API Key 页面，创建一个新 Key。建议按用途命名，例如：

| 用途 | 推荐名称 |
| --- | --- |
| 本地测试 | `local-test` |
| Codex CLI | `codex-cli-main` |
| Cherry Studio | `cherry-studio-main` |
| 下游服务 | `downstream-prod` |

Key 创建后请立即保存。不要把 Key 发到群聊、Issue、PR、截图或公开仓库。

## 3. 填写 Base URL

OpenAI Compatible 客户端通常需要三项：

| 配置项 | 填写内容 |
| --- | --- |
| API Key | 控制台创建的 Key |
| Base URL | `https://doudi.ai/v1` |
| Model | 控制台可用模型名 |

部分工具会把 Base URL 叫做 `API Base`、`Endpoint`、`OpenAI API URL` 或 `Provider URL`。含义相同。

## 4. 发起第一次请求

把下面示例里的 `YOUR_API_KEY` 换成你的 Key，把模型名换成控制台里当前可用的模型。

```bash
curl https://doudi.ai/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-5.5",
    "messages": [
      { "role": "user", "content": "用一句话介绍 DouDi.ai" }
    ]
  }'
```

如果你使用的是图形客户端，先找“自定义 OpenAI Provider”或“OpenAI Compatible Provider”，再填入上面的三项。

## 5. 检查是否成功

成功后，你应该能在客户端看到模型回复，也能在控制台请求日志里看到本次请求。日志里的状态码、消耗、模型、分组和渠道信息是排查问题的第一证据。

## 常见第一次失败

| 现象 | 优先检查 |
| --- | --- |
| 401 | Key 是否复制完整，前后是否多了空格，Key 是否被禁用 |
| 模型不存在 | 模型名是否拼错，当前分组是否支持该模型 |
| 余额不足 | 账户余额、套餐额度或单次请求预算是否足够 |
| 429 | 并发限制、Key 限速、渠道容量或上游限速 |
| 413 | 请求体过大，图片或上下文需要压缩 |
| 5xx | 查看控制台日志，确认是 DouDi、下游客户端还是上游返回 |
