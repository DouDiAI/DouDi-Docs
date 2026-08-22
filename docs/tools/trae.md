# Trae

Trae 是一款 AI 编程工具，适合做代码问答、文件理解、项目辅助开发和 Agent 编程。本教程按本机 Windows 版 Trae 的真实界面编写，重点是把 DouDi 添加成自定义 OpenAI 兼容模型。

## 下载地址

- 官方下载中心：[https://www.trae.ai/download](https://www.trae.ai/download)
- Windows 编程用户建议下载 `TraeCode`，不是 `TraeWork`。
- `TraeCode` 更适合代码编辑、项目开发和 AI IDE 场景；`TraeWork` 更偏办公和日常 AI 助手。

## 准备工作

开始前先准备好三样东西：

| 需要准备 | 从哪里拿 |
| --- | --- |
| DouDi Key | DouDi 控制台的 API Key 页面 |
| 模型 ID | DouDi 控制台里的完整模型 ID |
| TraeCode | Trae 官方下载中心，Windows 选择 TraeCode |

::: tip 新手提醒
API Key 不要截图明文展示，也不要发给别人。配置教程里只展示接口地址，不展示真实 Key。
:::

## 第 1 步：打开 Trae

在 Windows 桌面或开始菜单打开 Trae。本机安装路径示例：

```text
E:\doudiAPI接入软件\Trae\Trae.exe
```

打开后可以看到 Trae 主界面，左侧是任务区，中间是 Agent 对话区，右侧是编辑器区域。

![Trae 主界面真实截图](/tutorial-shots/trae-live-home.png)

## 第 2 步：进入设置

点击右上角的齿轮图标，进入 `设置`。

![Trae 设置入口真实截图](/tutorial-shots/trae-live-settings-entry.png)

进入设置后，默认会停在 `通用` 页面。点击设置标题左侧的菜单按钮，展开设置目录。

![Trae 设置目录真实截图](/tutorial-shots/trae-live-settings-menu.png)

## 第 3 步：打开模型设置

在设置目录里点击 `模型`。

模型页会显示当前可用模型列表，页面上方有 `+ 添加模型` 按钮。

![Trae 模型设置页真实截图](/tutorial-shots/trae-live-model-settings.png)

点击 `+ 添加模型`，会弹出添加模型窗口。

![Trae 添加模型窗口真实截图](/tutorial-shots/trae-live-custom-model-entry.png)

## 第 4 步：切换到自定义配置

添加模型窗口默认在 `模型服务商` 标签。接入 DouDi 时，不要从官方服务商列表里选，改点右侧的 `自定义配置`。

![Trae 自定义配置表单真实截图](/tutorial-shots/trae-live-custom-config-form.png)

这里能看到几个关键字段：

| 字段 | 应该怎么选 |
| --- | --- |
| API 格式 | 保持 `OpenAI Chat Completions 格式` |
| 自定义请求地址 | 填 DouDi 的 OpenAI 兼容地址 |
| 模型 ID | 填 DouDi 控制台复制的完整模型 ID |
| API 密钥 | 填你的 DouDi Key |

## 第 5 步：填写 DouDi

在 `自定义请求地址` 里填写：

```text
https://doudi.ai/v1
```

![Trae 填写 DouDi Base URL 真实截图](/tutorial-shots/trae-live-doudi-base-url.png)

Trae 这个页面有一条蓝色提示：不要以斜杠结尾，`/chat/completions` 会自动补到你填写的地址末尾。所以这里填 `https://doudi.ai/v1`，不要填完整的 `https://doudi.ai/v1/chat/completions`。

继续按下面填写：

<div class="ml-field-table">
  <div class="ml-field-row">
    <div>位置</div>
    <div>填写内容</div>
    <div>说明</div>
  </div>
  <div class="ml-field-row">
    <div>API 格式</div>
    <div><code>OpenAI Chat Completions 格式</code></div>
    <div>保持默认即可。</div>
  </div>
  <div class="ml-field-row">
    <div>自定义请求地址</div>
    <div><code>https://doudi.ai/v1</code></div>
    <div>不要在末尾加斜杠。</div>
  </div>
  <div class="ml-field-row">
    <div>完整 URL</div>
    <div>关闭</div>
    <div>保持默认关闭，让 Trae 自动补 <code>/chat/completions</code>。</div>
  </div>
  <div class="ml-field-row">
    <div>模型 ID</div>
    <div>完整模型 ID</div>
    <div>从 DouDi 控制台复制，必须完全一致。</div>
  </div>
  <div class="ml-field-row">
    <div>多模态</div>
    <div>按模型能力选择</div>
    <div>普通代码模型可以先关闭；支持图片的模型再开启。</div>
  </div>
  <div class="ml-field-row">
    <div>API 密钥</div>
    <div>你的 DouDi Key</div>
    <div>粘贴后检查前后不要有空格。</div>
  </div>
</div>

填写完成后，确认 `模型 ID` 和 `API 密钥` 都没有填错，再点击右下角 `添加模型`。

## 第 6 步：切换并测试

添加成功后，回到 Trae 主界面，在底部模型选择位置切换到刚刚添加的模型。

新手建议先用小任务测试：

```text
请用一句话解释这个函数的作用。
```

```text
请帮我给这段代码补充中文注释。
```

```text
这段代码哪里可能会报错？请只列出最重要的 3 个问题。
```

这三个问题都能正常回答，再让 Trae 分析整个项目或做复杂重构。

## 常见问题

| 现象 | 处理方法 |
| --- | --- |
| 找不到模型设置 | 点右上角齿轮进入设置，再点左侧菜单里的 `模型`。 |
| 不知道选哪个下载按钮 | Windows 编程用户选 `TraeCode`，不是 `TraeWork`。 |
| Base URL 该填哪个 | Trae 默认会自动补 `/chat/completions`，所以填 `https://doudi.ai/v1`。 |
| 提示模型不存在 | 从 DouDi 控制台重新复制完整模型 ID。 |
| 提示 API Key 错误 | 重新复制 Key，确认没有空格，也确认 Key 没有被删除或停用。 |
| 回答很慢 | 换速度更快的模型，或减少一次性发送的代码文件数量。 |
| 额度消耗异常 | 检查是否开启自动补全、后台索引或连续重试。 |
