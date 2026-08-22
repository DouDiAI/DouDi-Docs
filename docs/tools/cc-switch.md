# CC Switch

CC Switch 用来保存和切换不同 AI 服务商的 API 配置。本页按这台电脑上正在运行的 CC Switch 真实界面编写，适合把 Codex 供应商配置为 DouDi。

截图中的已有供应商、账号或图标仅用于说明位置；本教程不会公开任何已有的 API Key。

## 下载地址

- 官方网站：[https://ccswitch.io/en/](https://ccswitch.io/en/)
- 官方 GitHub Releases：[https://github.com/farion1231/cc-switch/releases](https://github.com/farion1231/cc-switch/releases)

## 配置前准备

开始前准备好下面三项：

1. DouDi 控制台创建的专用 Key。
2. DouDi 地址：`https://doudi.ai/v1`。
3. DouDi 控制台中可用的完整模型 ID。

::: warning
不要把 API Key 写在供应商名称、备注或截图里。Key 只填写在 `API Key` 输入框。
:::

## 第 1 步：在首页点击新增

打开 CC Switch。右上角橙色圆形 `+` 按钮就是“新增供应商”入口。

![CC Switch 真实首页与新增按钮](/tutorial-shots/cc-switch-live-home.png)

点击 `+` 后进入“添加新供应商”页面。

## 第 2 步：选择 Codex 供应商和自定义配置

页面顶部会显示 `Codex 供应商` 和 `统一供应商` 两个分类。

如果你要给 Codex 配置 DouDi：

1. 保持在 `Codex 供应商`。
2. 选择左上方的 `自定义配置`。
3. 向下滚动，填写供应商的 API 字段。

下面是本机实际打开的添加供应商页面。底部提示也写着：选择预设后，请在下方填写 API Key 等字段。

![CC Switch 真实添加供应商页面](/tutorial-shots/cc-switch-live-add-provider.png)

::: tip
不要因为列表里有很多预设服务商就随便选择。DouDi 使用本页的 `自定义配置`，这样地址、Key 和协议都由你自己明确填写。
:::

## 第 3 步：填写供应商名称、Key 和请求地址

选择 `自定义配置` 后向下滚动，会看到实际输入框。

![CC Switch 真实 API Key 与请求地址表单](/tutorial-shots/cc-switch-live-key-url-form.png)

请按下面填写：

<div class="ml-field-table">
  <div class="ml-field-row">
    <div>供应商名称</div>
    <div>填写 <code>DouDi</code>。</div>
    <div>这是列表中显示的名称，方便以后识别。</div>
  </div>
  <div class="ml-field-row">
    <div>备注</div>
    <div>可填写 <code>日常开发</code> 或 <code>Codex</code>。</div>
    <div>可选，不影响调用。</div>
  </div>
  <div class="ml-field-row">
    <div>官网链接</div>
    <div>可填写 <code>https://doudi.ai</code>。</div>
    <div>可选，只是方便以后打开官网。</div>
  </div>
  <div class="ml-field-row">
    <div>API Key</div>
    <div>粘贴 DouDi 控制台创建的 Key。</div>
    <div>只填这一处，不要加引号或空格。</div>
  </div>
  <div class="ml-field-row">
    <div>API 请求地址</div>
    <div><code>https://doudi.ai/v1</code></div>
    <div>地址只写到 <code>/v1</code>。</div>
  </div>
</div>

### `完整 URL` 要不要打开？

截图中 `完整 URL` 开关默认是关闭状态。第一次配置时保持关闭。

你填写的是服务商基础地址，CC Switch 会根据协议自动补齐后面的接口路径。因此不要填成：

```text
https://doudi.ai/v1/responses
```

正确填写：

```text
https://doudi.ai/v1
```

## 第 4 步：确认高级选项中的协议

继续向下滚动，打开 `高级选项`。本机真实界面会显示 `上游格式`，默认选项是 `Responses（原生）`。

![CC Switch 真实高级选项与 Responses 协议](/tutorial-shots/cc-switch-live-provider-form.png)

请按下面处理：

1. `上游格式` 保持为 `Responses（原生）`。
2. 第一次配置时，`模型映射` 不要填写。
3. `自定义 User-Agent` 保持默认，不需要修改。
4. 不要先点“获取模型列表”或“添加模型”，先完成基础连接测试。

::: tip
黄色提示写着“填写兼容 OpenAI Response 格式的服务端地址”。DouDi 的基础地址填写为 `https://doudi.ai/v1`，不要在地址末尾额外添加 `/responses`。
:::

## 第 5 步：保存供应商

确认以下项目后，点击右下角蓝色 `+ 添加`：

1. 已选中 `Codex 供应商 > 自定义配置`。
2. API Key 已粘贴完成。
3. API 请求地址是 `https://doudi.ai/v1`。
4. `完整 URL` 保持关闭。
5. 上游格式为 `Responses（原生）`。

添加成功后会回到首页，并出现你填写的 `DouDi` 供应商卡片。

## 第 6 步：用小任务测试

新供应商出现在首页后，先完全退出并重新打开需要使用的 Codex 工具，再在一个小目录中测试。

建议先发一条简单指令：

```text
请只回复：连接成功
```

正常返回后，再测试代码阅读、文件修改或长对话。

::: warning
如果你要配置的不是 Codex，而是 CC Switch 顶部图标对应的其他工具，请先切换到对应工具的供应商分类，再添加配置。不要把 Codex 供应商配置误当成所有软件都自动生效。
:::

## 常见问题

### 提示认证失败

依次检查：

1. API Key 是否来自 DouDi 控制台。
2. Key 前后是否有空格。
3. API 请求地址是否是 `https://doudi.ai/v1`。
4. `完整 URL` 是否保持关闭。
5. 上游格式是否为 `Responses（原生）`。

### 返回模型不存在

第一次配置时先不要做模型映射。进入 DouDi 控制台，确认当前 Key 分组支持的完整模型 ID。

### 添加后调用仍然是旧配置

确认新供应商卡片已经出现在首页，然后完全退出并重启需要使用的 Codex 工具。不要只关闭终端中的一条任务。

### 无法添加

检查是否遗漏 API Key 或 API 请求地址。截图中的底部提示说明，选择预设或自定义配置后，仍需要填写 API Key 等必填字段。

## 配置检查清单

<div class="ml-checklist">

- 已从 CC Switch 首页右上角 `+` 进入添加供应商。
- 已选择 `Codex 供应商 > 自定义配置`。
- 供应商名称填写为 `DouDi`。
- API Key 只填写在 `API Key` 输入框。
- API 请求地址是 `https://doudi.ai/v1`。
- `完整 URL` 保持关闭。
- 上游格式是 `Responses（原生）`。
- 已点击右下角 `+ 添加` 保存。
- 已用小任务完成首次测试。

</div>
