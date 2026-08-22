# Claude Coworks

下面使用 Claude Desktop 的真实界面截图，按截图里实际显示的字段配置 DouDi。教程只写截图中确实存在的按钮和选项，不再使用示意界面。

## 下载地址

- Claude 官方下载页：[https://claude.com/download](https://claude.com/download)
- 新手提醒：先把 Claude 更新到支持开发者模式和第三方推理供应商的版本，再开始下面的配置。

## 配置前准备

先完成这三件事：

1. 在 DouDi 控制台创建一个专用 Key，建议命名为 `claude-coworks`。
2. 在 DouDi 控制台确认你要用的 Claude 系列模型，并复制完整模型名。
3. 不要把 API Key 发到群聊、截图或公开仓库。

<div class="ml-callout">
这页是 Claude Desktop 的第三方推理配置。截图里的网关地址填 DouDi：<code>https://doudi.ai/v1</code>，不要填其他教程中的 API 地址。
</div>

## 第 1 步：打开开发者菜单

这一步是进入第三方推理配置的入口。不要点击左侧的 `Code`，也不要先进入账号设置。

1. 打开 Claude Desktop，停留在 Home 首页。
2. 点击窗口左上角的三横菜单图标。
3. 鼠标停在 `Developer` 上。
4. 在展开的菜单中点击 `Configure Third-Party Inference...`。

下面是这台电脑上 Claude Desktop 的真实菜单截图。看到 `Developer` 和 `Configure Third-Party Inference...` 就说明入口已经打开，可以继续下一步。

![Claude Desktop 开发者菜单真实截图](/tutorial-shots/claude-coworks-developer-menu.png)

::: tip
`Settings` 里的 `Desktop app > Developer` 页面主要用于本地 MCP 服务器，不是本教程要找的第三方推理配置。配置 DouDi 时，请以本节截图中的 `Configure Third-Party Inference...` 为准。
:::

::: warning
如果左上角菜单里没有 `Developer`，先将 Claude Desktop 更新到最新版后完全退出并重新打开。不同版本和账号开放的功能可能不同；不要随意修改配置文件或在首页直接粘贴 API Key。
:::

## 第 2 步：确认已打开 Claude Desktop

先打开 Claude Desktop。你看到下面这个 Home 首页，就说明软件已经正常启动。

![Claude Desktop 首页真实截图](/tutorial-shots/claude-coworks-home.png)

完成上一步后，会打开标题为 `Configure third-party inference` 的配置窗口。窗口标题、左侧 `Connection` 菜单和右侧字段应与下一张截图一致。

## 第 3 步：按真实配置页填写 Connection

进入配置页后，左侧选中 `Connection`。右侧上方的连接类型选择 `Gateway`。

![Claude Desktop Configure third-party inference 真实配置截图](/tutorial-shots/claude-coworks-connection.png)

请对照截图逐项填写：

<div class="ml-field-table">
  <div class="ml-field-row">
    <div>Connection</div>
    <div>选择 <code>Gateway</code>。</div>
    <div>这是截图顶部的下拉框。</div>
  </div>
  <div class="ml-field-row">
    <div>Credential kind</div>
    <div>选择 <code>Static API key</code>。</div>
    <div>不要选其他凭证来源。</div>
  </div>
  <div class="ml-field-row">
    <div>Gateway Base URL</div>
    <div><code>https://doudi.ai/v1</code></div>
    <div>必须带 <code>/v1</code>。</div>
  </div>
  <div class="ml-field-row">
    <div>Gateway API key</div>
    <div>填 DouDi 控制台创建的 Key。</div>
    <div>直接粘贴 Key，不要加引号或空格。</div>
  </div>
  <div class="ml-field-row">
    <div>Gateway auth scheme</div>
    <div>选择 <code>x-api-key</code>。</div>
    <div>截图里已明确显示该认证方式。</div>
  </div>
</div>

截图下方的 `Artifact preview iframe origin` 可以保持空白，除非你明确在使用 Artifacts 预览功能。

## 第 4 步：先测试连接，再保存

按下面顺序操作：

1. 确认 `Gateway Base URL`、`Gateway API key`、`Gateway auth scheme` 三项和截图一致。
2. 点击右上方的 `Test connection`。
3. 测试成功后，点击右下角的 `Apply Changes`。
4. 回到 Claude Desktop 首页，新建对话测试。

建议第一次只发下面这句话：

```text
请只回复：配置成功
```

能正常回复就表示网关地址和 Key 基础配置已经生效。之后再测试代码解释、文件分析或长对话。

## 第 5 步：模型与额度提醒

| 使用场景 | 建议 |
| --- | --- |
| 第一次测试 | 先选消耗低、响应快的 Claude 系列模型 |
| 日常写作和代码问答 | 选稳定的常用模型 |
| 大项目、长文件分析 | 选上下文更长的模型，并给 Key 设置额度上限 |

::: warning
不要直接照抄其他教程里的模型 ID。请以 DouDi 控制台显示的完整模型名为准，当前 Key 分组必须支持该模型。
:::

## 小白排查顺序

<div class="ml-checklist">

- 已从左上角菜单打开 `Developer > Configure Third-Party Inference...`。
- 已进入 `Configure third-party inference` 页面。
- Connection 选的是 `Gateway`。
- Credential kind 选的是 `Static API key`。
- Gateway Base URL 是 `https://doudi.ai/v1`。
- API Key 来自 DouDi 控制台，没有多余空格。
- Gateway auth scheme 选的是 `x-api-key`。
- 已先点击 `Test connection`，成功后再点 `Apply Changes`。

</div>

## 常见问题

| 现象 | 原因与处理 |
| --- | --- |
| 找不到配置页面 | 更新 Claude Desktop，确认当前版本是否支持第三方推理配置 |
| 测试连接失败 | 重新检查网关地址、Key 和 `x-api-key` 认证方式 |
| 应用后无法调用 | 检查 Key 分组、余额和当前模型是否可用 |
| 返回认证失败 | 重新复制 Key，不要带空格或引号 |
| 点击 Apply Changes 没反应 | 先完成 Test connection，再检查是否还有未填必填项 |
