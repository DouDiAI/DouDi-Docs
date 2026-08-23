# CodeBuddy

CodeBuddy 是腾讯推出的 AI 代码编辑器，适合做代码解释、补全、重构、项目问答和 Agent 编程任务。本教程按本机 Windows 版 CodeBuddy `4.10.4` 的真实界面编写。

## 下载地址

- 官方下载页：[https://www.codebuddy.ai/ide](https://www.codebuddy.ai/ide)
- 备用入口：[https://copilot.tencent.com/ide/](https://copilot.tencent.com/ide/)
- 新手建议：如果 `codebuddy.ai` 打不开，先试备用入口；两个入口都是 CodeBuddy IDE 页面。

## 准备工作

开始前先准备好三样东西：

| 需要准备 | 从哪里拿 |
| --- | --- |
| DouDi Key | DouDi 控制台的 API Key 页面 |
| 模型 ID | DouDi 控制台里的完整模型 ID |
| CodeBuddy 账号 | CodeBuddy 登录页，可用 Google、GitHub 等方式登录 |

::: tip 新手提醒
API Key 相当于你的账户密码，不要发给别人，也不要把明文 Key 截图上传到 GitHub。
:::

## 第 1 步：启动并登录 CodeBuddy

在 Windows 桌面或开始菜单打开 CodeBuddy。本机安装路径示例：

```text
E:\doudiAPI接入软件\CodeBuddy\CodeBuddy.exe
```

第一次打开时会看到“导入配置”页面，可以选择从 VS Code / Cursor 导入，也可以直接点“跳过”。

![CodeBuddy 导入配置真实截图](/tutorial-shots/codebuddy-live-home.png)

跳过后进入登录页，点击“登录”。如果 CodeBuddy 没有自动打开浏览器，可以点击页面里的“在浏览器中打开”。

![CodeBuddy 登录前页面真实截图](/tutorial-shots/codebuddy-live-after-skip.png)

![CodeBuddy 登录中真实截图](/tutorial-shots/codebuddy-live-login.png)

浏览器中会打开 CodeBuddy 登录页，按你的账号情况选择 Google、GitHub 或 X 登录。

![CodeBuddy 浏览器登录页真实截图](/tutorial-shots/codebuddy-live-browser-login-cropped.png)

登录成功后，回到 CodeBuddy，会进入主界面。

![CodeBuddy 登录后主界面真实截图](/tutorial-shots/codebuddy-live-main.png)

## 第 2 步：打开 Agents 面板

在左侧进入 CodeBuddy 的 `Agents` 面板。这个页面底部会有当前模型选择器，默认可能显示 `Default`。

![CodeBuddy Agents 面板真实截图](/tutorial-shots/codebuddy-live-agents-panel.png)

点击底部的模型名称，会弹出模型列表。列表里能看到 `Default`、`Fast`、`Balanced`、`Primary`、`Deep` 等内置模型，最下面有 `+ 配置自定义模型`。

![CodeBuddy 模型菜单真实截图](/tutorial-shots/codebuddy-live-model-menu.png)

点击 `+ 配置自定义模型`。

## 第 3 步：添加自定义模型

进入模型设置后，点击右侧的 `+ 添加模型`。

![CodeBuddy 添加模型入口真实截图](/tutorial-shots/codebuddy-live-custom-model-settings.png)

弹窗标题是 `添加模型`，并提示 `仅支持 OpenAI 兼容协议 API`。这说明 DouDi 这类 OpenAI 兼容接口可以接入。

打开“提供商”下拉框，向下找到 `自定义 API`。如果列表太长，可以在搜索框输入 `自定义 API`，然后点击筛选出来的唯一结果。

![CodeBuddy 提供商下拉框真实截图](/tutorial-shots/codebuddy-live-provider-dropdown.png)

![CodeBuddy 搜索自定义 API 真实截图](/tutorial-shots/codebuddy-live-custom-api-filtered.png)

## 第 4 步：填写 DouDi 信息

选择 `自定义 API` 后，在这个添加模型弹窗里填写下面内容：

<div class="ml-field-table">
  <div class="ml-field-row">
    <div>位置</div>
    <div>填写内容</div>
    <div>怎么填</div>
  </div>
  <div class="ml-field-row">
    <div>接口地址 / Base URL</div>
    <div><code>https://doudi.ai/v1/chat/completions</code></div>
    <div>CodeBuddy 的示例地址是完整 <code>/chat/completions</code> 路径，所以这里也填完整地址。</div>
  </div>
  <div class="ml-field-row">
    <div>提供商</div>
    <div><code>自定义 API</code></div>
    <div>不要选腾讯云、Kimi、智谱等内置供应商。</div>
  </div>
  <div class="ml-field-row">
    <div>API Key</div>
    <div>你的 DouDi Key</div>
    <div>粘贴后确认前后没有空格；教程截图不要展示明文 Key。</div>
  </div>
  <div class="ml-field-row">
    <div>模型名称</div>
    <div>完整模型 ID</div>
    <div>从 DouDi 控制台复制，必须和控制台显示完全一致。</div>
  </div>
</div>

填写时可以按这个顺序来：

1. 先把接口地址改成 `https://doudi.ai/v1/chat/completions`。
2. 提供商选择 `自定义 API`。
3. 在带“小眼睛”图标的输入框里粘贴 DouDi Key。
4. 在“模型名称”里填写或选择你要用的完整模型 ID。
5. 点右下角 `保存`。

::: warning 不要随便保存测试 Key
如果你只是照着教程练习，API Key 还没准备好，就先不要点保存。等 Key 和模型 ID 都确认正确后再保存。
:::

## 第 5 步：切换到 DouDi 模型

保存后回到 Agents 面板，再点击底部模型选择器。

如果配置成功，你刚刚添加的模型会出现在模型列表里。选择它之后，再开始提问或让 CodeBuddy 处理代码。

## 第 6 步：做一个最小测试

新手建议先用很小的问题测试，不要一上来就让它分析整个项目。

可以按顺序试这三句话：

```text
请用一句话解释这个函数的作用。
```

```text
请帮我给这段代码补充中文注释。
```

```text
这段代码哪里可能会报错？请只列出最重要的 3 个问题。
```

三个测试都能正常回答，再继续让它做重构、生成文件或分析大项目。

## 模型选择原则

| 场景 | 建议 |
| --- | --- |
| 快速解释代码 | 选择速度快、消耗低的模型 |
| 重构复杂函数 | 选择代码能力强的模型 |
| 大文件分析 | 选择上下文更长的模型 |
| 临时测试 | 使用额度较低的测试 Key |

具体模型 ID 请以 [模型广场/价格页面](https://doudi.ai/pricing) 或控制台当前可用列表为准。

## 常见问题

| 现象 | 处理方法 |
| --- | --- |
| 找不到自定义模型入口 | 先登录 CodeBuddy，再进入 Agents 面板底部的模型下拉菜单。 |
| 下拉列表里供应商太多 | 在提供商搜索框输入 `自定义 API`，再点击筛选出来的结果。 |
| 没有 Base URL 输入框 | 说明还没有选到 `自定义 API`，不要选腾讯云、Kimi、智谱等内置供应商。 |
| 提示模型不存在 | 从 DouDi 控制台重新复制完整模型 ID。 |
| 提示鉴权失败 | 重新复制 API Key，确认前后没有空格，Key 没有被删除或停用。 |
| 回答很慢 | 换速度更快的模型，或减少一次性发送的代码文件数量。 |
| 额度消耗异常 | 检查是否开启自动补全、后台索引或连续重试。 |

## 配置检查清单

<div class="ml-checklist">

- 已登录 CodeBuddy。
- 已进入 `Agents` 面板底部的模型选择器。
- 已点击 `+ 配置自定义模型`。
- 提供商选择的是 `自定义 API`。
- 接口地址填写 `https://doudi.ai/v1/chat/completions`。
- API Key 填写在带“小眼睛”图标的密钥输入框。
- 模型名称填写 DouDi 控制台里的完整模型 ID。
- 已保存并在 Agents 面板切换到该模型。
- 已用小问题完成首次测试。

</div>
