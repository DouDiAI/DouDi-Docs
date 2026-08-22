# LobeHub / LobeChat

LobeHub 常见产品是 LobeChat。它可以通过 OpenAI 兼容方式接入第三方模型服务，适合搭建自己的网页聊天工具。

本页按照这台 Windows 电脑上的 LobeHub Desktop 真实界面编写。截图里的 API Key 使用演示值，界面会自动隐藏，不会公开真实 Key。

## 下载地址

- 官方网站：[https://lobehub.com](https://lobehub.com)
- LobeChat GitHub：[https://github.com/lobehub/lobe-chat](https://github.com/lobehub/lobe-chat)
- 新手建议：如果你只是个人使用，优先使用 Windows 桌面版或在线版；服务器部署再考虑环境变量。

## 配置前准备

先准备好三样东西：

1. DouDi 控制台创建的 API Key。
2. DouDi 当前可用的接入地址。
3. DouDi 控制台里可以使用的完整模型 ID。

::: warning
API Key 只填写在 LobeHub 的 `API Key` 输入框里。不要把真实 Key 写进截图、文档、聊天记录或公开仓库。
:::

## 第 1 步：打开设置里的 AI 服务商

打开 LobeHub 后，按 `Ctrl + ,` 可以快速进入设置。也可以在软件里找到设置入口后进入。

进入设置后，点击左侧 `智能体` 分类下的 `AI 服务商`。右侧会出现“已启用服务商”和“未启用服务商”列表。

![LobeHub AI 服务商真实截图](/tutorial-shots/lobehub-provider-list.png)

这里不要选 LobeHub 自带云服务。DouDi 是 OpenAI 兼容接口，应该使用 `OpenAI` 服务商来填写自己的 API Key 和代理地址。

## 第 2 步：选择 OpenAI 服务商

在中间服务商列表里点击 `OpenAI`。右侧会显示 OpenAI 的配置区域，包括 `API Key`、`API 代理地址`、`连通性检查` 和 `模型列表`。

![LobeHub OpenAI 服务商配置真实截图](/tutorial-shots/lobehub-openai-models.png)

如果你点到的是 `ChatGPT`，请重新点击左侧列表中的 `OpenAI`。`ChatGPT` 通常对应官方订阅模型，不适合在这里填写 DouDi 的第三方接口。

## 第 3 步：填写 API Key 和 API 代理地址

在 OpenAI 服务商页面按下面填写：

<div class="ml-field-table">
  <div class="ml-field-row">
    <div>页面字段</div>
    <div>填写内容</div>
    <div>新手提示</div>
  </div>
  <div class="ml-field-row">
    <div>API Key</div>
    <div>粘贴 DouDi 控制台创建的 Key。</div>
    <div>粘贴后界面会显示为圆点，这是正常的。</div>
  </div>
  <div class="ml-field-row">
    <div>API 代理地址</div>
    <div><code>https://doudi.ai</code></div>
    <div>LobeHub 这里要求包含 <code>https://</code>。如果你的 DouDi 控制台显示了不同接入域名，以控制台为准。</div>
  </div>
  <div class="ml-field-row">
    <div>连通性检查</div>
    <div>选择或填写一个 DouDi 支持的模型。</div>
    <div>不知道填什么时，先到DouDi 控制台复制一个完整模型 ID。</div>
  </div>
</div>

![LobeHub 填写 DouDi 示例真实截图](/tutorial-shots/lobehub-openai-doudi-config.png)

::: tip
LobeHub 这个位置叫 `API 代理地址`，不是模型名称。不要把模型 ID 填到这里，也不要把 `/chat/completions` 这类完整接口路径填进去。
:::

## 第 4 步：获取并启用模型

填写 API Key 和 API 代理地址后，在 `模型列表` 右侧点击 `获取模型列表`。

如果 Key 和代理地址正确，LobeHub 会从服务端读取可用模型。读取后检查两件事：

1. 模型列表里是否出现 DouDi 支持的模型。
2. 你准备使用的模型右侧开关是否已经开启。

如果模型列表没有变化，可以先不用急着反复点。优先检查 API Key、代理地址和账户额度。

## 第 5 步：设置默认服务模型

回到左侧菜单，点击 `服务模型`。这里可以指定新建助理、话题自动命名、消息内容翻译、会话历史压缩等功能默认使用哪个模型。

![LobeHub 服务模型真实截图](/tutorial-shots/lobehub-service-models.png)

新手建议先只改 `新建助理` 和 `话题自动命名`：

1. `新建助理`：选择你日常对话要用的主模型。
2. `话题自动命名`：选择便宜、响应快的模型即可。
3. 图片、视频、向量化、ASR 等功能不要乱选，先确认 DouDi 对应模型是否支持。

## 第 6 步：发送一句话测试

回到聊天页面，新建一个会话，发送：

```text
请只回复：LobeHub 已连接 DouDi
```

能正常回复，就说明 LobeHub 已经连上 DouDi。测试成功后，再开始长文、代码、文件等消耗更高的任务。

## 常见问题

| 现象 | 处理方法 |
| --- | --- |
| 提示 API Key 错误 | 重新从 DouDi 控制台复制 Key，确认前后没有空格 |
| 提示代理地址错误 | `API 代理地址` 必须包含 `https://`，不要填成模型名或完整接口路径 |
| 获取不到模型列表 | 检查 Key 是否有额度、模型权限是否开放、网络是否能访问 DouDi |
| 发送消息提示模型不存在 | 到 DouDi 控制台重新复制完整模型 ID |
| 配置后还是走原来的模型 | 回到 `服务模型` 页面，把默认模型改成刚刚启用的模型 |
| 软件频繁 Reconnect | 先检查网络和代理软件；必要时退出 LobeHub 后重新打开，再测试一条短消息 |

## 配置检查清单

<div class="ml-checklist">

- 已进入 `设置 → AI 服务商`。
- 已选择左侧服务商列表里的 `OpenAI`。
- API Key 已填写 DouDi 控制台创建的 Key。
- API 代理地址已填写 DouDi 当前接入域名。
- 已点击 `获取模型列表` 或确认模型已启用。
- 已在 `服务模型` 页面选择默认模型。
- 已发送短消息完成测试。

</div>
