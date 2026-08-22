# Cherry Studio

Cherry Studio 可以在“模型服务”里新增自定义提供商。本页根据这台电脑上 Cherry Studio v2.0.5 的真实界面编写，用图片带你完成 DouDi 的服务商和模型配置。

教程中的新增窗口是空白表单，未展示或使用任何真实 API Key。

## 下载地址

- 官方下载页：[https://www.cherryai.com.cn/download](https://www.cherryai.com.cn/download)
- 新手建议：在下载页选择与你电脑系统对应的版本；Windows 通常选择 Windows 安装包。

## 配置前准备

先准备好下面三项：

1. DouDi 控制台创建的专用 Key。
2. API 根地址：`https://doudi.ai`。
3. DouDi 控制台中可用的完整模型 ID。

::: warning
Cherry Studio 的新增表单填写的是“API 根地址”，不是完整接口地址。不要在这一步填写 `/v1/chat/completions`。
:::

## 第 1 步：从首页进入模型服务

打开 Cherry Studio 后，点击左下角的齿轮图标进入 `设置`。

![Cherry Studio 真实首页与设置入口](/tutorial-shots/cherry-studio-live-home.png)

进入设置后，点击左侧的 `模型服务`。页面左下方有 `+ 添加服务商` 按钮。

## 第 2 步：打开“添加自定义提供商”

在 `模型服务` 页面点击 `+ 添加服务商`，会打开“添加自定义提供商”窗口。

![Cherry Studio 真实添加自定义提供商表单](/tutorial-shots/cherry-studio-live-add-provider.png)

这个窗口有四个关键区域：

1. `提供商名称`
2. `API 密钥`
3. `OpenAI` Base URL
4. `Anthropic` Base URL

DouDi 使用 OpenAI 兼容接口，因此只填写 `OpenAI` 这一栏；`Anthropic` 保持空白。

## 第 3 步：填写名称、Key 和 OpenAI 地址

按下面填写：

<div class="ml-field-table">
  <div class="ml-field-row">
    <div>提供商名称</div>
    <div><code>DouDi</code></div>
    <div>这是本地显示名称，方便以后识别。</div>
  </div>
  <div class="ml-field-row">
    <div>API 密钥</div>
    <div>粘贴 DouDi 控制台创建的 Key。</div>
    <div>只填这里，不要写入模型名称或备注。</div>
  </div>
  <div class="ml-field-row">
    <div>OpenAI Base URL</div>
    <div><code>https://doudi.ai</code></div>
    <div>填 API 根地址，不要加 <code>/v1</code>。</div>
  </div>
  <div class="ml-field-row">
    <div>Anthropic Base URL</div>
    <div>保持空白。</div>
    <div>本教程配置的是 OpenAI 兼容接口。</div>
  </div>
</div>

下图是本机实际在 `OpenAI` Base URL 中输入 `https://doudi.ai` 后的提示。软件会自动显示实际请求路径：

```text
https://doudi.ai/v1/chat/completions
```

![Cherry Studio 真实 OpenAI 地址与请求路径提示](/tutorial-shots/cherry-studio-live-openai-endpoint.png)

::: tip
当你看到下方“请求路径”显示 `/v1/chat/completions`，就说明地址填写方式正确。不要手动把 `/v1` 或 `/chat/completions` 再加进输入框。
:::

填写完成后，点击右下角黑色 `添加`。

## 第 4 步：添加模型

添加服务商后，在右侧模型区域点击 `+` 按钮，打开“添加模型”窗口。

![Cherry Studio 真实添加模型窗口](/tutorial-shots/cherry-studio-live-add-model.png)

逐项填写：

| 真实字段 | 怎么填写 |
| --- | --- |
| 模型 ID | 复制 DouDi 控制台显示的完整模型 ID。 |
| 模型名称 | 填一个容易识别的名称，例如 `DouDi 日常代码`。 |
| 分组名称 | 可以填写 `GPT`、`Claude` 或 `常用模型`，用于本地分类。 |
| 端点类型 | 选择 `OpenAI`。 |

::: warning
新增模型窗口的端点类型有时会默认显示 `Anthropic`。DouDi 的普通 OpenAI 兼容模型应手动切换为 `OpenAI`。
:::

点击“端点类型”下拉框后，可以看到真实选项列表，其中包含 `OpenAI`、`OpenAI-Response`、`Anthropic` 和 `Gemini` 等。

![Cherry Studio 真实端点类型下拉选项](/tutorial-shots/cherry-studio-live-model-endpoint-type.png)

选择 `OpenAI` 后，点击右下角 `添加模型`。

## 第 5 步：测试模型

回到聊天首页，在顶部模型下拉框中选择刚添加的 DouDi 模型。

第一次测试建议只发送：

```text
请只回复：Cherry Studio 连接成功
```

能正常回复后，再测试长对话、代码解释或文件分析。

## 常见问题

### 添加后提示认证失败

检查：

1. API Key 是否来自 DouDi 控制台。
2. OpenAI Base URL 是否为 `https://doudi.ai`。
3. 输入框中是否错误地添加了 `/v1` 或 `/chat/completions`。
4. Key 前后是否带了空格。

### 模型无法使用或提示模型不存在

重新打开“添加模型”，确认：

1. 模型 ID 是控制台显示的完整名称。
2. 端点类型选择的是 `OpenAI`。
3. 当前 Key 分组有该模型的调用权限。

### 不小心选择了 Anthropic

删除或编辑刚刚添加的模型，把“端点类型”改回 `OpenAI` 后重新保存。不要只改提供商名称，端点类型也必须正确。

### 自动获取模型列表失败

第一次配置失败时，不必依赖“获取模型列表”。直接手动添加一个确认可用的完整模型 ID，再进行短消息测试。

## 配置检查清单

<div class="ml-checklist">

- 已从首页左下角齿轮进入 `设置`。
- 已进入 `模型服务` 并点击 `+ 添加服务商`。
- 提供商名称填写为 `DouDi`。
- API Key 只填写在 `API 密钥` 输入框。
- OpenAI Base URL 是 `https://doudi.ai`。
- Anthropic Base URL 保持空白。
- 已确认下方请求路径自动显示 `/v1/chat/completions`。
- 已添加完整模型 ID。
- 新增模型的端点类型为 `OpenAI`。
- 已用短消息完成首次测试。

</div>
