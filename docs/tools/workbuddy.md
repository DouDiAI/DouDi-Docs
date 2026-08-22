# WorkBuddy

WorkBuddy 是腾讯的 AI Agent 办公工具。本教程按本机 WorkBuddy `v5.3.13` 的真实界面编写，说明怎样把 DouDi 作为 OpenAI 兼容模型接入。

## 下载地址

- 官方入口：[https://copilot.tencent.com/work/](https://copilot.tencent.com/work/)
- 新手提示：第一次启动如果出现 Windows 防火墙提示，先确认是否需要联网；不要在不确定时随意允许公共网络访问。

## 先了解这个版本的接入方式

本机版本的“模型”页面写明“仅支持 OpenAI 兼容协议 API”，所以 DouDi 可以接入。

不过它的“添加模型”弹窗只提供内置服务商选择，**没有直接填写自定义 Base URL 的输入框**。要接入 DouDi，需要按 WorkBuddy 显示的本地配置文件方式添加一条模型配置。

## 准备工作

1. 在 DouDi 控制台创建 API Key。
2. 在DouDi 控制台复制一个完整模型 ID。
3. 关闭正在编辑的 WorkBuddy 任务，避免修改配置时丢失未保存内容。

## 第 1 步：打开 WorkBuddy 设置

打开 WorkBuddy 后，点击左下角头像，再点击“设置”。

![WorkBuddy 主页真实截图](/tutorial-shots/workbuddy-live-home.png)

![WorkBuddy 账号菜单真实截图](/tutorial-shots/workbuddy-live-account-menu.png)

![WorkBuddy 设置入口真实截图](/tutorial-shots/workbuddy-live-settings.png)

## 第 2 步：打开“模型”

在设置窗口左侧点击“模型”。这里会显示“本地配置文件”，路径是：

```text
%USERPROFILE%\.workbuddy\models.json
```

`%USERPROFILE%` 代表你的 Windows 用户目录。比如用户名是 `Administrator`，实际位置就是：

```text
C:\Users\Administrator\.workbuddy\models.json
```

![WorkBuddy 模型设置真实截图](/tutorial-shots/workbuddy-live-models.png)

## 第 3 步：了解添加模型窗口

点击右上角“添加模型”可以看到 API Key 和模型名称，但提供商下拉框只有内置选项。

![WorkBuddy 添加模型真实截图](/tutorial-shots/workbuddy-live-add-model.png)

![WorkBuddy 提供商下拉框真实截图](/tutorial-shots/workbuddy-live-provider-dropdown.png)

因此，DouDi 不能在这个下拉框里直接选择；请继续使用下面的本地配置文件方法。

## 第 4 步：打开本地配置文件

1. 完全退出 WorkBuddy。
2. 按下 Windows 键 + `R`，输入下面的内容后按回车：

```text
%USERPROFILE%\.workbuddy
```

3. 找到 `models.json`，先复制一份作为备份。
4. 用记事本或 VS Code 打开 `models.json`。

## 第 5 步：添加 DouDi 模型

在 `models.json` 最外层的方括号 `[` 和 `]` 中添加一条配置。已有其他模型时，前一条配置后面需要有英文逗号 `,`。

```json
{
  "id": "<完整模型ID>",
  "name": "DouDi / <完整模型ID>",
  "vendor": "DouDi",
  "url": "https://doudi.ai/v1/chat/completions",
  "apiKey": "<你的DouDi Key>",
  "supportsToolCall": true,
  "supportsImages": false,
  "supportsReasoning": true
}
```

需要替换的只有下面两项：

<div class="ml-field-table">
  <div class="ml-field-row">
    <div>位置</div>
    <div>填写内容</div>
    <div>说明</div>
  </div>
  <div class="ml-field-row">
    <div><code>id</code></div>
    <div>完整模型 ID</div>
    <div>必须和 DouDi 控制台的模型名完全一致。</div>
  </div>
  <div class="ml-field-row">
    <div><code>apiKey</code></div>
    <div>你的 DouDi Key</div>
    <div>不要把 Key 发给别人、上传 GitHub 或放进截图。</div>
  </div>
</div>

`url` 不需要修改，保持为：

```text
https://doudi.ai/v1/chat/completions
```

如果你选择的模型不支持工具调用，把 `supportsToolCall` 改为 `false`；不确定时先保留默认值，后续再按模型能力调整。

## 第 6 步：保存并验证

1. 保存 `models.json`。
2. 重新打开 WorkBuddy。
3. 再次进入“设置 → 模型”。
4. 如果列表里出现 `DouDi / 你的模型名`，说明配置文件已被识别。
5. 回到主页，在输入框右下角的模型选择处选中该模型，发送一条短消息测试。

可以先发送：

```text
请回复“WorkBuddy 已连接 DouDi”。
```

## 常见问题

| 现象 | 处理方法 |
| --- | --- |
| 启动后没有看到 DouDi 模型 | 检查 `models.json` 是否为合法 JSON，尤其注意逗号、引号和方括号。 |
| 提示模型不存在 | 把 `id` 改为 DouDi 控制台里显示的完整模型 ID。 |
| 提示鉴权失败 | 重新复制 API Key，确认前后没有空格。 |
| WorkBuddy 没有读取新配置 | 确认已经保存文件，并完全退出后重新打开 WorkBuddy。 |
| Agent 无法使用工具 | 确认所选模型支持工具调用；不支持时把 `supportsToolCall` 改为 `false`。 |
