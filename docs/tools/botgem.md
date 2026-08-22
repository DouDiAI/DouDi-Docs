# BotGem

BotGem 是聊天客户端类工具，可以把第三方模型服务添加成 `Service Provider`。本教程按本机 Windows 版 BotGem `2.3.3` 的真实界面编写，重点是用 `Other / OpenAI compatible API` 接入 DouDi。

## 下载地址

- 官方网站：[https://botgem.com](https://botgem.com)
- 本机安装位置示例：`C:\Program Files\WindowsApps\27425IcyArrow.AMA-TheBestGPTApp_2.3.3.0_x64__z9kheaq1rx32y\app\BotGem.exe`

## 准备工作

开始前先准备好三样东西：

| 需要准备 | 从哪里拿 |
| --- | --- |
| DouDi Key | DouDi 控制台的 API Key 页面 |
| 模型 ID | DouDi 控制台里的完整模型 ID |
| BotGem 桌面版 | BotGem 官网或 Microsoft Store |

::: tip 新手提醒
API Key 不要发给别人，也不要把明文 Key 截图上传。教程截图里只展示接口地址，不展示真实 Key。
:::

## 第 1 步：打开 BotGem

在 Windows 开始菜单或桌面打开 BotGem。打开后左侧会看到 `对话`、`通话`、`发现`、`设置`。

![BotGem 主界面真实截图](/tutorial-shots/botgem-live-home.png)

## 第 2 步：进入设置

点击左侧的 `设置`。

设置页里会看到这些入口：

- `General Settings`
- `Service Provider`
- `Ollama Management Console`
- `Team Management Console`
- `BotGem Pro`

![BotGem 设置页真实截图](/tutorial-shots/botgem-live-settings-open.png)

## 第 3 步：打开 Service Provider

点击 `Service Provider`。这是 BotGem 用来管理模型服务商的地方。

如果你还没有添加过服务，这里会显示 `No Service`。点击右上角绿色加号。

![BotGem Service Provider 页真实截图](/tutorial-shots/botgem-live-service-provider.png)

## 第 4 步：选择 Other

点击加号后会弹出服务商列表：

- `OpenAI`
- `Azure OpenAI`
- `Claude`
- `Gemini`
- `DeepSeek`
- `Groq`
- `Volcengine`
- `Other`

接入 DouDi 时，选择最下面的 `Other`。它下面标注的是 `OpenAI compatible API`，也就是 OpenAI 兼容接口。

![BotGem 服务商列表真实截图](/tutorial-shots/botgem-live-provider-list.png)

## 第 5 步：填写 DouDi

选择 `Other` 后，会出现 `LLM` 配置弹窗。

![BotGem Other 配置表单真实截图](/tutorial-shots/botgem-live-other-provider-form.png)

按下面填写：

<div class="ml-field-table">
  <div class="ml-field-row">
    <div>位置</div>
    <div>填写内容</div>
    <div>说明</div>
  </div>
  <div class="ml-field-row">
    <div>Name</div>
    <div><code>DouDi</code></div>
    <div>只是显示名称，方便以后识别。</div>
  </div>
  <div class="ml-field-row">
    <div>API Server</div>
    <div><code>https://doudi.ai</code></div>
    <div>BotGem 会自动拼接 <code>/v1/chat/completions</code>，这里不要手动加。</div>
  </div>
  <div class="ml-field-row">
    <div>API Key</div>
    <div>你的 DouDi Key</div>
    <div>粘贴后检查前后不要有空格。</div>
  </div>
  <div class="ml-field-row">
    <div>Models</div>
    <div>完整模型 ID</div>
    <div>从 DouDi 控制台复制，必须完全一致。</div>
  </div>
</div>

这里最容易填错的是 `API Server`。BotGem 的输入框下面会自动预览完整请求地址。填入 `https://doudi.ai` 后，下面会显示：

```text
https://doudi.ai/v1/chat/completions
```

![BotGem 填写 DouDi Server 真实截图](/tutorial-shots/botgem-live-doudi-server.png)

确认 `API Key` 和 `Models` 都填好后，可以先点击 `检查连接`。连接成功后再点击 `保存`。

## 第 6 步：开始测试

保存后回到左侧 `对话` 页面，创建一个新对话，然后选择刚刚添加的 `DouDi` 服务。

新手建议先用最小问题测试：

```text
请回复 ok
```

如果能正常回复，再测试稍微复杂一点的问题：

```text
请用三句话介绍你当前使用的模型能力。
```

确认稳定后，再把它用于长文本问答或复杂任务。

## 常见问题

| 现象 | 处理方法 |
| --- | --- |
| 找不到接入口 | 进入 `设置`，打开 `Service Provider`，点右上角加号。 |
| 不知道选哪个服务商 | 选择 `Other`，它下面写着 `OpenAI compatible API`。 |
| API Server 报错 | 只填 `https://doudi.ai`，不要填 `/v1` 或 `/chat/completions`。 |
| 提示 API Key 错误 | 重新复制 Key，确认没有空格，也确认 Key 没有被删除或停用。 |
| 提示模型不存在 | 从 DouDi 控制台重新复制完整模型 ID。 |
| Models 下拉没有内容 | 直接在 `Models` 输入框手动输入完整模型 ID。 |
| 回答消耗偏高 | 减少历史上下文，避免一次性发送太长内容。 |

## 配置检查清单

<div class="ml-checklist">

- 已进入 `设置 → Service Provider`。
- 已点击右上角加号。
- 服务商选择的是 `Other / OpenAI compatible API`。
- Name 填写 `DouDi`。
- API Server 填写 `https://doudi.ai`，没有添加 `/v1`。
- API Key 填写的是 DouDi 控制台创建的 Key。
- Models 填写完整模型 ID。
- 已点击 `检查连接` 或保存后用短消息测试。

</div>
