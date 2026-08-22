# GitHub Copilot

GitHub Copilot 是 GitHub 官方的编程助手服务，在 VS Code 中通常通过 `GitHub Copilot Chat` 扩展使用。它不是 OpenAI Compatible 客户端，不能像 Cherry Studio、OpenCode 那样直接填写 DouDi 的 Base URL 和 API Key。

本页截图来自这台电脑上的 VS Code 真实界面。

## 下载地址

- GitHub Copilot 快速开始：[https://docs.github.com/copilot/get-started/quickstart](https://docs.github.com/copilot/get-started/quickstart)
- VS Code 扩展：[https://marketplace.visualstudio.com/items?itemName=GitHub.copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)
- GitHub Copilot Chat 扩展：[https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat)

## 第 1 步：在 VS Code 找到 Copilot 扩展

打开 VS Code，点击左侧扩展图标，搜索：

```text
github copilot
```

这台电脑上实际搜索到的是 `GitHub Copilot Chat`，右侧扩展详情页显示它由 GitHub 发布，并提示这是 Copilot 的 AI chat 功能。

![VS Code 中的 GitHub Copilot Chat 真实扩展页面](/tutorial-shots/github-copilot-vscode-extension.png)

如果你的 VS Code 还没有安装 Copilot，先安装 GitHub 官方发布的扩展。安装后通常需要登录 GitHub 账号并确认 Copilot 权限或订阅状态。

::: warning
不要安装名字相似但发布者不明的扩展。GitHub Copilot 应优先使用 GitHub 官方发布的扩展。
:::

## 第 2 步：查看 Copilot 设置

在 VS Code 中打开设置，搜索：

```text
GitHub Copilot
```

本机真实设置页显示的是 Copilot Chat 的功能开关，例如代码搜索、调试命令、图像工具、上下文编辑模式、Web 搜索域名等。

![VS Code 中的 GitHub Copilot 设置真实截图](/tutorial-shots/github-copilot-vscode-settings.png)

这些设置用于控制 Copilot 在 VS Code 里的行为，不是第三方 API 配置页。

## 能不能直接接入 DouDi？

不能按普通方式直接接入。

GitHub Copilot 的调用链路由 GitHub 官方托管，用户在 VS Code 里登录的是 GitHub 账号，而不是填写 OpenAI Compatible 服务商。它没有像下面这样的 DouDi 配置字段：

<div class="ml-field-table">
  <div class="ml-field-row">
    <div>Base URL</div>
    <div>官方 Copilot 设置中没有 DouDi Base URL 输入框。</div>
    <div>不要硬填到其他无关设置里。</div>
  </div>
  <div class="ml-field-row">
    <div>API Key</div>
    <div>官方 Copilot 使用 GitHub 授权。</div>
    <div>不要把 DouDi Key 当作 GitHub 密码或 Token。</div>
  </div>
  <div class="ml-field-row">
    <div>模型 ID</div>
    <div>官方 Copilot 的模型由 GitHub 提供。</div>
    <div>不能直接填写 DouDi 模型名。</div>
  </div>
</div>

::: danger
不要把 DouDi Key 填到 GitHub 登录页、GitHub Token、VS Code 账号授权页面或 Copilot 登录页面。这样不会接入 DouDi，还可能泄露 Key。
:::

## 正确使用方式

如果你只是想使用 GitHub Copilot：

1. 在 VS Code 安装 GitHub 官方 Copilot 扩展。
2. 点击 VS Code 中的 GitHub 登录提示。
3. 在浏览器完成 GitHub 授权。
4. 回到 VS Code，确认 Copilot 可以聊天或补全。
5. 在 Copilot 设置中按需调整功能开关。

如果你想使用 DouDi 做代码辅助，请换支持自定义 Provider 的工具。

## DouDi 推荐替代工具

下面这些工具更适合填写 DouDi 的 Base URL 和 Key：

| 工具 | 适合场景 |
| --- | --- |
| [OpenCode](/tools/opencode) | 桌面端代码智能体，支持自定义提供商 |
| [Cherry Studio](/tools/cherry-studio) | 图形界面验证 Key、添加模型比较直观 |
| [Codex CLI](/tools/codex-cli) | 命令行代码任务、项目阅读和修改 |
| [CC Switch](/tools/cc-switch) | 切换 Codex 相关供应商配置 |
| [Cline](/tools/cline) | VS Code 内使用自定义模型服务 |

## 常见问题

### 我在 Copilot 设置里找不到 Base URL

这是正常的。GitHub Copilot 不是 OpenAI Compatible 客户端，官方设置页不会提供 DouDi 的 Base URL 输入框。

### 我能不能用第三方扩展改 Copilot 的接口？

不建议把第三方扩展当成 GitHub Copilot 官方配置教程来使用。若你要接入 DouDi，请直接使用支持 OpenAI Compatible 的工具，例如 OpenCode、Cherry Studio 或 Cline。

### Copilot 提示需要登录或订阅

按 GitHub 官方流程登录 GitHub 账号，并确认你的账号是否有 Copilot 权限。DouDi 余额和 Copilot 订阅不是同一套系统。

### 想在 VS Code 里用 DouDi 怎么办？

使用支持自定义 API 的 VS Code 扩展，例如 Cline，然后在 Cline 的 Provider 设置里填写 DouDi，而不是在 GitHub Copilot 里填写。

## 检查清单

<div class="ml-checklist">

- 已在 VS Code 扩展页确认安装的是 GitHub 官方 Copilot 扩展。
- 已知道 Copilot 使用 GitHub 账号授权。
- 没有把 DouDi Key 填到 GitHub 登录或 Copilot 授权页面。
- 已确认官方 Copilot 设置中没有 DouDi Base URL 输入框。
- 如果要接入 DouDi，已改用 OpenCode、Cherry Studio、Codex CLI、CC Switch 或 Cline。

</div>
