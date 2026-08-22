# Chatbox

Chatbox 是一个桌面聊天客户端，适合用 DouDi 做日常聊天、翻译、长文总结和代码问答。本教程按本机 Chatbox `1.22.3` 的真实界面编写。

## 下载地址

- 官方下载页：[https://chatboxai.app/en](https://chatboxai.app/en)
- 新手建议：官网提供 Windows、macOS、Linux、iOS、Android 和网页版，电脑配置优先下载桌面版。

## 准备工作

1. 在 DouDi 控制台创建一个 API Key。
2. 在 DouDi 控制台复制一个可用的完整模型 ID。
3. 打开 Chatbox。

## 第 1 步：打开设置

打开 Chatbox 后，点击左下角的“设置”。

![Chatbox 首页真实截图](/tutorial-shots/chatbox-live-home.png)

进入设置后，点击左侧的“模型提供方”。

![Chatbox 设置入口真实截图](/tutorial-shots/chatbox-live-settings.png)

## 第 2 步：选择 OpenAI 提供方

在中间的服务商列表选择 `OpenAI`。如果你的列表里还没有 OpenAI，可以点击左下角“添加”，然后在弹出的列表里点击 `OpenAI`。

![Chatbox 模型提供方真实截图](/tutorial-shots/chatbox-live-providers.png)

![Chatbox 添加提供方真实截图](/tutorial-shots/chatbox-live-add-provider.png)

> 不要点击“通过 OAuth 登录”。接入 DouDi 时，直接填写下面的 API 密钥和 API 主机即可。

## 第 3 步：填写 DouDi 地址和 Key

在 OpenAI 页面填写 API Key 和 API 主机。

<div class="ml-field-table">
  <div class="ml-field-row">
    <div>位置</div>
    <div>填写内容</div>
    <div>新手提示</div>
  </div>
  <div class="ml-field-row">
    <div>API 密钥</div>
    <div>你的 DouDi Key</div>
    <div>从 DouDi 控制台复制。不要发送给他人，也不要在截图中显示明文。</div>
  </div>
  <div class="ml-field-row">
    <div>API 主机</div>
    <div><code>https://doudi.ai</code></div>
    <div>当前 Chatbox 会自动补上 <code>/v1/chat/completions</code>，这里不要再填写 <code>/v1</code>。</div>
  </div>
</div>

填写后看一下输入框下面的“预览”。它应显示为：

```text
https://doudi.ai/v1/chat/completions
```

![Chatbox 填写 DouDi 主机真实截图](/tutorial-shots/chatbox-live-doudi-host.png)

## 第 4 步：添加要使用的模型

在“模型”标题右侧点击“新建”，会弹出编辑模型窗口。

![Chatbox 新建模型真实截图](/tutorial-shots/chatbox-live-new-model.png)

按下面填写：

1. `模型 ID`：粘贴 DouDi 控制台里的完整模型名称。
2. `显示名称`：可不填；不填时 Chatbox 会直接显示模型 ID。
3. `模型类型`：普通对话模型选择“聊天”。
4. `上下文窗口`、`最大输出 Token 数`：第一次不确定时可以先留空，或按模型说明填写。
5. 点击“测试模型”。测试通过后点击“保存”。

## 第 5 步：选择默认模型并测试

回到设置左侧，打开“默认模型”，选择刚刚添加的模型。

然后关闭设置，新建一个对话，发送：

```text
请回复“Chatbox 已连接 DouDi”，并用一句话介绍你自己。
```

正常返回就说明配置成功。之后可以继续测试翻译、长文总结和代码解释。

## 控制上下文消耗

Chatbox 的连续对话会携带历史内容。对新手来说，最容易忽略的是历史越长，消耗越高。

建议这样使用：

1. 一个主题开一个新对话。
2. 测试阶段不要上传很大的文件。
3. 长文总结前先确认模型消耗和上下文限制。
4. 不需要历史时，新开会话再问。

## 常见问题

| 现象 | 处理方法 |
| --- | --- |
| 没有响应 | 检查网络、API 主机、Key 是否正确 |
| 预览地址多出两个 `/v1` | API 主机只填写 `https://doudi.ai`，不要在这里再添加 `/v1` |
| 提示模型不存在 | 从 DouDi 控制台重新复制完整模型名 |
| 提示无权限 | 检查 Key 分组是否支持该模型 |
| 消耗偏高 | 减少连续历史，必要时新建对话 |

## 配置检查清单

<div class="ml-checklist">

- 已在 Chatbox 里进入 `设置 → 模型提供方`。
- 已选择或新增 `OpenAI` 提供方。
- API 密钥填写的是 DouDi Key。
- API 主机填写 `https://doudi.ai`，没有额外添加 `/v1`。
- 预览地址显示为 `/v1/chat/completions`。
- 已新增完整模型 ID。
- 已把默认模型切换成刚刚添加的模型。
- 已用一句短消息完成首次测试。

</div>
