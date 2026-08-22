# OpenCode

OpenCode Desktop 支持在软件内添加“自定义提供商”。本页按照这台电脑上 OpenCode Desktop 的真实界面编写，使用 DouDi 时不需要手动改项目文件。

截图中的表单都是空白示例，没有填写或公开任何真实 API Key。

## 下载地址

- 官方网站：[https://opencode.ai](https://opencode.ai)
- 官方 GitHub：[https://github.com/sst/opencode](https://github.com/sst/opencode)

## 配置前准备

先准备好：

1. DouDi 控制台创建的专用 Key。
2. API 地址：`https://doudi.ai/v1`。
3. DouDi 控制台中可用的完整模型 ID。

::: warning
API Key 只填写在 OpenCode 的 `API 密钥` 输入框。不要把 Key 写入提供商 ID、显示名称、模型名称、截图或项目代码。
:::

## 第 1 步：从首页进入设置

打开 OpenCode Desktop 后，点击左侧的 `设置`。

![OpenCode 真实首页与设置入口](/tutorial-shots/opencode-live-home.png)

打开设置窗口后，左侧“服务器”分类中有 `提供商` 和 `模型` 两项。本教程先进入 `提供商`。

## 第 2 步：打开自定义提供商

在 `提供商` 页面中向下滚动到最底部。你会看到 `自定义提供商`，说明文字是“通过基础 URL 添加与 OpenAI 兼容的提供商”。

点击这一行右侧的 `+ 连接`。

![OpenCode 真实提供商列表与自定义提供商入口](/tutorial-shots/opencode-live-provider-list-bottom.png)

::: tip
不要选择 OpenAI、Anthropic、Google 等官方预设。DouDi 应使用这里的 `自定义提供商`，这样才可以填写自己的基础 URL 和 API Key。
:::

## 第 3 步：填写基础 URL 和 API 密钥

点击 `+ 连接` 后，会打开“自定义提供商”表单。页面实际字段包括 `提供商 ID`、`显示名称`、`基础 URL` 和 `API 密钥`。

![OpenCode 真实自定义提供商基础表单](/tutorial-shots/opencode-live-custom-provider.png)

请按下面填写：

<div class="ml-field-table">
  <div class="ml-field-row">
    <div>提供商 ID</div>
    <div>填写 <code>doudi</code>。</div>
    <div>只能使用小写字母、数字、连字符或下划线。</div>
  </div>
  <div class="ml-field-row">
    <div>显示名称</div>
    <div>填写 <code>DouDi</code>。</div>
    <div>这是 OpenCode 列表中显示的名称。</div>
  </div>
  <div class="ml-field-row">
    <div>基础 URL</div>
    <div><code>https://doudi.ai/v1</code></div>
    <div>只写到 <code>/v1</code>。</div>
  </div>
  <div class="ml-field-row">
    <div>API 密钥</div>
    <div>粘贴 DouDi 控制台创建的 Key。</div>
    <div>不要加引号、空格或其他前缀。</div>
  </div>
</div>

### 基础 URL 不要这样填写

不要填完整接口路径：

```text
https://doudi.ai/v1/chat/completions
```

正确填写：

```text
https://doudi.ai/v1
```

OpenCode 会根据你之后选择的模型自动请求对应接口。

## 第 4 步：添加模型并提交

继续向下滚动，表单会显示 `模型`、`请求头（可选）` 和黑色 `提交` 按钮。

![OpenCode 真实模型与提交表单](/tutorial-shots/opencode-live-custom-provider-save.png)

### 填写模型

`模型` 下方有两个输入框：

| 真实字段 | 怎么填写 |
| --- | --- |
| `model-id` | 填 DouDi 控制台显示的完整模型 ID。 |
| `显示名称` | 填一个方便识别的名字，例如 `日常代码模型`。 |

如果需要增加多个模型，点击 `+ 添加模型`，每个模型各填一行。

### 请求头要不要填？

第一次配置时，`请求头（可选）` 保持空白。

因为本教程已经在上方 `API 密钥` 输入框填写 Key，不需要额外添加 `Authorization` 或其他请求头。只有 DouDi 控制台另行明确要求时，才需要在这里添加请求头。

确认模型 ID、基础 URL 和 API Key 都正确后，点击左下角黑色 `提交`。

## 第 5 步：确认提供商已连接

提交成功后，回到 `设置 → 提供商`，在“已连接的提供商”区域确认出现你填写的 `DouDi`。

然后进入左侧 `模型` 页面，确认刚刚添加的模型已经可选。回到项目后，新建一个会话并选择该模型测试。

建议第一次只输入：

```text
请只回复：OpenCode 连接成功
```

能正常回复，就说明基础 URL、Key 和模型 ID 已经生效。

## 常见问题

### 点“提交”后提示认证失败

检查下面三项：

1. API Key 是否来自 DouDi 控制台。
2. 基础 URL 是否为 `https://doudi.ai/v1`。
3. Key 前后是否有空格。

### 模型列表中没有新模型

回到 `设置 → 模型`，检查添加模型时的 `model-id` 是否填写完整。不要只填模型系列名称或自行猜测模型 ID。

### 请求返回 404 或接口地址错误

通常是基础 URL 写得太长。删除 `/chat/completions`、`/responses` 等额外路径，只保留：

```text
https://doudi.ai/v1
```

### 配置后仍在使用旧模型

确认新模型已在 OpenCode 的模型选择处选中。必要时完全退出 OpenCode Desktop 后重新打开，再新建一个会话测试。

## 配置检查清单

<div class="ml-checklist">

- 已从 OpenCode 首页进入 `设置`。
- 已进入 `提供商` 并选择 `自定义提供商`。
- 提供商 ID 是 `doudi`。
- 显示名称是 `DouDi`。
- 基础 URL 是 `https://doudi.ai/v1`。
- API Key 只填写在 `API 密钥` 输入框。
- 已填写 DouDi 当前可用的完整模型 ID。
- 请求头保持空白。
- 已点击 `提交` 并在模型页面完成测试。

</div>
