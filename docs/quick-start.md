# 快速开始

这一页带你完成一次最小可用流程：注册登录、创建 API Key、选择 API 地址和模型，然后发起第一次请求。

## 1. 注册并登录

打开 [DouDi 控制台](https://doudi.ai/dashboard)，按页面提示注册或登录账号。公开配置显示当前支持密码登录、GitHub OAuth、LinuxDo OAuth、Passkey 等方式，实际可用入口以登录页为准。

登录后进入控制台，先确认账户余额或额度状态。如果账号没有额度，请先到 [钱包充值页面](https://doudi.ai/wallet) 完成额度准备。

## 2. 选择 API 地址

OpenAI Compatible 场景优先使用这个 Base URL：

```text
https://doudi.ai/v1
```

大多数 OpenAI 兼容客户端会把这个值称为 `Base URL`、`API Base` 或 `Endpoint`。

如果控制台或运营侧未来提供备用地址，以控制台当前展示为准；不要照抄其他站点或旧教程里的域名。

## 3. 创建 API Key

进入 [API Key 管理页面](https://doudi.ai/keys)，创建一个新的 Key。新手建议：

- 名称写清用途，例如 `cherry-studio-main` 或 `codex-cli-test`。
- 分组优先选择 `auto`，让系统自动选择可用分组。
- 如只用于某个客户端或模型，可以之后再创建单独 Key，避免混用。
- Key 只显示一次时要妥善保存，不要发给别人。

更详细的说明见 [创建 API Key](/api-key)。

## 4. 选择模型

在 [模型广场/价格页面](https://doudi.ai/pricing) 或目标软件的模型选择框中，选择当前可用模型。新手可以按用途选择：

- 日常对话和文本生成：搜索 `gpt`、`claude`、`deepseek`。
- 代码协作：搜索 `codex`、`claude-sonnet`。
- 图片生成：搜索 `image`，并注意固定消耗模型通常按次计费。

模型是否可用还取决于你创建 Key 时选择的分组。

## 5. 发起第一次请求

下面是 OpenAI 兼容接口的最小示例。把 `YOUR_API_KEY` 换成你自己的 Key，把 `<MODEL_ID>` 换成控制台或目标软件当前支持的完整模型名。

```bash
curl https://doudi.ai/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<MODEL_ID>",
    "messages": [
      { "role": "user", "content": "用一句话介绍 DouDi" }
    ]
  }'
```

如果你使用的是支持 OpenAI 格式的客户端，通常只需要填三项：

| 配置项 | 填什么 |
| --- | --- |
| API Key | 控制台创建的 Key |
| Base URL | `https://doudi.ai/v1` |
| Model | 控制台或目标软件支持的模型名 |

## 常见第一次失败原因

- **401 未授权**：API Key 填错、复制时多了空格，或 Key 已被禁用。
- **模型不可用**：模型名拼错，或当前 Key 的分组不支持该模型。
- **额度不足**：账户余额不足，或套餐额度已经用完。
- **请求格式不兼容**：客户端选择了错误的接口类型，例如把 Claude 原生格式发到了 OpenAI 路径。
