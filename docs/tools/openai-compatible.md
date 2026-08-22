# OpenAI Compatible

OpenAI Compatible 是最通用的接入方式。只要软件里能填写自定义 OpenAI API 地址、API Key 和模型名，通常都可以按这一页配置 DouDi。

## 下载地址

OpenAI Compatible 不是一个单独软件，所以不需要下载。你只要在已经安装的软件里找到 `OpenAI Compatible`、`Custom OpenAI` 或 `自定义 API` 入口，再按这一页填写即可。

## 适合哪些场景

- 自己写脚本、插件、机器人或网页应用。
- 软件没有单独的 DouDi 选项，但支持 `OpenAI Compatible`、`Custom OpenAI`、`自定义 API`。
- 想先用一个最标准的方式测试 Key、模型名和网络是否正常。

## 准备工作

1. 打开 DouDi 控制台，在令牌页创建一个专用 Key。
2. 在 DouDi 控制台复制你要用的完整模型名。
3. 准备一个可以发 HTTP 请求的工具，例如终端、Apifox、Postman 或代码编辑器。

<div class="ml-callout">
新手建议先用一个低成本模型测试接口是否能跑通。确认正常后，再换成正式工作要用的模型。
</div>

## 第 1 步：确认基础字段

把下面几项先记下来，后面所有软件基本都会用到。

![DouDi 通用 Provider 配置示意图](/tutorial-shots/common-provider.svg)

<div class="ml-field-table">
  <div class="ml-field-row">
    <div>API Key</div>
    <div>填写 DouDi 控制台令牌页创建的 Key。</div>
    <div>格式通常是一长串密钥，不要多复制空格。</div>
  </div>
  <div class="ml-field-row">
    <div>Base URL</div>
    <div><code>https://doudi.ai/v1</code></div>
    <div>必须带 <code>/v1</code>。</div>
  </div>
  <div class="ml-field-row">
    <div>模型名</div>
    <div>从 DouDi 控制台复制完整名称。</div>
    <div>不要自己改大小写或简写。</div>
  </div>
</div>

## 第 2 步：选择接口类型

大多数聊天软件、代码软件会使用 Chat Completions；部分新版 SDK 或工具可能会使用 Responses。

| 接口 | 完整地址 | 什么时候用 |
| --- | --- | --- |
| Chat Completions | `https://doudi.ai/v1/chat/completions` | 聊天、代码助手、常见客户端 |
| Responses | `https://doudi.ai/v1/responses` | 支持新版 Responses API 的工具 |
| Models | `https://doudi.ai/v1/models` | 客户端刷新模型列表时可能会调用 |

如果软件只让你填 Base URL，就填 `https://doudi.ai/v1`，不要把 `/chat/completions` 一起填进去。

## 第 3 步：用 curl 测试

把 `YOUR_API_KEY` 换成你的 Key，把 `<MODEL_ID>` 换成你准备使用的完整模型名。

```bash
curl https://doudi.ai/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<MODEL_ID>",
    "messages": [
      { "role": "user", "content": "你好，测试一下接口是否可用" }
    ]
  }'
```

看到返回内容里有回答文本，就说明 Key、Base URL、模型名这三项基本正常。

## 第 4 步：在代码中调用

推荐把 Key 放到环境变量里，不要直接写死在代码文件中。

```js
const response = await fetch("https://doudi.ai/v1/chat/completions", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.DOUDI_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "<MODEL_ID>",
    messages: [{ role: "user", content: "写一个一句话介绍" }],
  }),
});

console.log(await response.json());
```

## 配置检查清单

<div class="ml-checklist">

- Base URL 已经包含 `/v1`。
- 请求头里有 `Authorization: Bearer 你的Key`。
- 模型名来自 DouDi 控制台，没有手动缩写。
- 当前 Key 的分组支持这个模型。
- Key 没有发到公开截图、群聊或 GitHub 仓库。

</div>

## 常见问题

| 现象 | 常见原因 | 处理方法 |
| --- | --- | --- |
| 返回 `401` | Key 填错、Key 被禁用、没有加 `Bearer` | 重新复制 Key，并检查请求头 |
| 返回模型不存在 | 模型名拼写错误，或 Key 分组不支持 | 回到 DouDi 控制台复制完整模型名 |
| 客户端无法保存 | Base URL 填成了纯域名或填了完整接口路径 | 只填 `https://doudi.ai/v1` |
| 请求很慢 | 当前网络到主域名不稳定 | 先确认本机网络和代理，再以 DouDi 控制台展示的接入地址为准 |

