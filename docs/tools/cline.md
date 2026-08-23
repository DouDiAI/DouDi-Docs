# Cline

Cline 是安装在 VS Code 里的 AI 编程助手。配置好 DouDi 后，它可以在 VS Code 里帮你阅读代码、修改文件、执行项目任务，并且每一步操作都会在编辑器里确认。

## 下载地址

- 官方网站：[https://cline.bot](https://cline.bot)
- VS Code 插件页：[https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev)
- 官方 GitHub：[https://github.com/cline/cline](https://github.com/cline/cline)

## 准备工作

开始前先准备好 3 样东西：

1. 电脑里已经安装 VS Code。
2. 已经在 DouDi 控制台创建好 API Key。
3. 知道你要使用的模型名称，例如 DouDi 控制台里显示的完整模型 ID。

## 第 1 步：在 VS Code 找到 Cline

打开 VS Code，点击左侧活动栏里的扩展图标，然后搜索 `Cline`。如果页面右侧显示的是 Cline，并且按钮是“禁用”或“卸载”，说明已经安装好了。

![VS Code Cline 扩展真实截图](/tutorial-shots/cline-vscode-extension.png)

如果你还没有安装，就点击“安装”。安装完成后，左侧活动栏会出现 Cline 的小机器人图标。

## 第 2 步：打开 Cline 面板

点击 VS Code 左侧活动栏里的 Cline 小机器人图标，就会打开 Cline 面板。能看到输入框 `Type your task here...`，就说明已经进入 Cline 了。

![VS Code Cline 面板真实截图](/tutorial-shots/cline-vscode-panel.png)

第一次使用时，不建议直接让它处理整个大项目。可以先让它做一个很小的测试，比如：

```text
请解释当前打开的文件是做什么的
```

## 第 3 步：进入 API Configuration

在 Cline 面板右上角点击齿轮图标，进入设置页。左侧选择 `API Configuration`。

在 `API Provider` 这里选择 `OpenAI Compatible`。这个选项表示 Cline 会用兼容 OpenAI 格式的接口访问 DouDi。

![Cline 选择 OpenAI Compatible 真实截图](/tutorial-shots/cline-vscode-provider-dropdown.png)

## 第 4 步：填写 DouDi 参数

选择好 `OpenAI Compatible` 后，按照下面这样填写：

<div class="ml-field-table">
  <div class="ml-field-row">
    <div>字段</div>
    <div>填写内容</div>
    <div>说明</div>
  </div>
  <div class="ml-field-row">
    <div>API Provider</div>
    <div><code>OpenAI Compatible</code></div>
    <div>必须选这个，不要选 OpenAI 官方或 Anthropic。</div>
  </div>
  <div class="ml-field-row">
    <div>Base URL</div>
    <div><code>https://doudi.ai/v1</code></div>
    <div>注意最后要带 <code>/v1</code>。</div>
  </div>
  <div class="ml-field-row">
    <div>OpenAI Compatible API Key</div>
    <div>你的 DouDi Key</div>
    <div>从 DouDi 控制台复制，不要发给别人，也不要截图明文展示。</div>
  </div>
  <div class="ml-field-row">
    <div>Model ID</div>
    <div>填写完整模型 ID</div>
    <div>以你控制台可用模型为准，不要照抄截图或旧教程里的模型名。</div>
  </div>
</div>

![Cline API 配置真实截图](/tutorial-shots/cline-vscode-settings.png)

填写完成后，点击右上角 `Done` 保存。

## 第 5 步：做一次小测试

回到 Cline 主面板，在输入框里输入一个简单任务：

```text
请用中文介绍一下当前项目的目录结构
```

如果 Cline 能正常回复，说明配置成功。

如果它提示模型不存在、鉴权失败或连接失败，优先检查下面 4 个地方：

- `Base URL` 是否完整填写为 `https://doudi.ai/v1`。
- API Key 是否复制完整，前后不要多空格。
- `Model ID` 是否和 DouDi 控制台里的模型名完全一致。
- DouDi 账户余额或额度是否足够。

## 新手使用建议

- 第一次使用只让 Cline 读一个文件或解释一个小功能，不要一开始就让它重构整个项目。
- 让 Cline 修改文件前，先确认项目已经保存，重要项目建议先用 Git 管理。
- 如果它要执行命令或修改文件，先看清楚提示内容，再点击允许。
- 建议单独给 Cline 创建一个 DouDi Key，后续查额度和消耗会更清楚。
