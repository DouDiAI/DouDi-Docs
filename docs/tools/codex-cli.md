# Codex CLI

Codex CLI 是运行在终端里的 Codex。它没有网页配置表单，安装后主要通过两个地方配置：

- 命令行：安装、启动、检查版本。
- `config.toml`：选择模型、服务商和 API 地址。

本教程按 OpenAI 官方 Codex CLI 文档整理，并补充 DouDi 的配置方式。下面的终端截图来自这台电脑上实际运行的 Codex CLI，不使用模拟软件界面。

## 下载地址

- Codex CLI 官方文档：[https://learn.chatgpt.com/docs/codex/cli](https://learn.chatgpt.com/docs/codex/cli)
- Codex CLI 配置基础：[https://developers.openai.com/codex/config-basic](https://developers.openai.com/codex/config-basic)
- Codex CLI 配置进阶：[https://developers.openai.com/codex/config-advanced](https://developers.openai.com/codex/config-advanced)
- Codex 官方 GitHub：[https://github.com/openai/codex](https://github.com/openai/codex)

## 先看结论

如果你只是想让 Codex CLI 使用 DouDi，完整流程就是：

1. 安装 Codex CLI。
2. 创建 DouDi Key。
3. 把 Key 放进 Windows 用户环境变量。
4. 在 `config.toml` 中写入 DouDi 的服务商配置。
5. 进入一个项目目录，运行 `codex` 测试。

::: warning
不要把 API Key 直接写进 `config.toml`、项目代码或 Git 仓库。教程中的 `DOUDI_API_KEY` 只是环境变量名称，不是要照抄的 Key。
:::

## 第 1 步：安装 Codex CLI

### 1. 安装 Node.js

Codex CLI 通过 npm 安装。如果电脑还没有 `npm`，先安装 Node.js 的长期支持版，安装时保持默认选项即可。

安装完成后，重新打开 PowerShell，检查 npm：

```powershell
npm --version
```

能显示版本号就说明 npm 已经可以使用。

### 2. 安装 Codex CLI

在 PowerShell 中运行：

```powershell
npm install -g @openai/codex
```

安装完成后检查版本：

```powershell
codex --version
```

这台电脑实际运行 Codex CLI 后显示了版本号，说明命令已经安装成功：

![Codex CLI 实际版本检查截图](/tutorial-shots/codex-cli-install-check.png)

::: tip
如果提示“找不到 codex 命令”，先关闭当前 PowerShell，再重新打开一个窗口。npm 的全局命令目录有时需要新终端才能被识别。
:::

## 第 2 步：创建 DouDi Key

打开 DouDi 控制台，创建一个专门给 Codex CLI 使用的 Key：

1. 进入“API Key”或 Token 页面。
2. 点击创建 Key。
3. 名称填写 `codex-cli`。
4. 复制 Key，并暂时保存在安全位置。
5. 不要把 Key 发到群聊、截图或 GitHub。

建议单独创建 Key，这样以后遇到额度或权限问题时，更容易判断是不是 Codex CLI 导致的。

## 第 3 步：在 Windows 中保存 API Key

### 方法 A：使用 PowerShell 保存

把下面命令中的 `你的真实Key` 替换成 DouDi 控制台复制的 Key：

```powershell
[Environment]::SetEnvironmentVariable("DOUDI_API_KEY", "你的真实Key", "User")
```

关闭当前 PowerShell，再打开一个新的 PowerShell。然后用下面的命令检查变量是否存在：

```powershell
if ($env:DOUDI_API_KEY) {
  "DOUDI_API_KEY 已读取"
} else {
  "没有读取到 DOUDI_API_KEY"
}
```

这里只显示“已读取”，不会把完整 Key 打印到屏幕上。

### 方法 B：只对当前窗口临时设置

如果你只是想测试一次，可以使用：

```powershell
$env:DOUDI_API_KEY = "你的真实Key"
```

关闭这个 PowerShell 窗口后，临时变量就会失效。长期使用建议使用方法 A。

## 第 4 步：打开 Codex CLI 配置文件

Codex CLI 的用户配置文件位置是：

```text
C:\Users\你的用户名\.codex\config.toml
```

把上面的“你的用户名”换成 Windows 登录用户名。例如：

```text
C:\Users\Administrator\.codex\config.toml
```

如果 `.codex` 文件夹或 `config.toml` 不存在，可以手动创建。建议使用记事本打开：

```powershell
notepad "$HOME\.codex\config.toml"
```

::: warning
如果文件里已经有其他设置，不要全部删除。只需要新增或修改 `model_provider`、`model` 和 `[model_providers.doudi]` 相关部分。
:::

## 第 5 步：写入 DouDi 配置

把下面配置复制到 `config.toml`。其中 `<模型ID>` 必须替换成 DouDi 控制台显示的完整模型名：

```toml
model_provider = "doudi"
model = "<模型ID>"
model_reasoning_effort = "medium"

[model_providers.doudi]
name = "DouDi"
base_url = "https://doudi.ai/v1"
env_key = "DOUDI_API_KEY"
wire_api = "responses"
```

### 每一行是什么意思

<div class="ml-field-table">
  <div class="ml-field-row">
    <div>model_provider</div>
    <div>填写 <code>doudi</code>。</div>
    <div>必须和下面配置段的名称一致。</div>
  </div>
  <div class="ml-field-row">
    <div>model</div>
    <div>填写 DouDi 控制台的完整模型 ID。</div>
    <div>不要自行猜模型名，也不要只写简称。</div>
  </div>
  <div class="ml-field-row">
    <div>base_url</div>
    <div><code>https://doudi.ai/v1</code></div>
    <div>只写到 <code>/v1</code>，不要再加 <code>/responses</code>。</div>
  </div>
  <div class="ml-field-row">
    <div>env_key</div>
    <div><code>DOUDI_API_KEY</code></div>
    <div>这是环境变量名称，真正的 Key 不写在配置文件里。</div>
  </div>
  <div class="ml-field-row">
    <div>wire_api</div>
    <div><code>responses</code></div>
    <div>Codex CLI 使用 Responses API 协议。</div>
  </div>
</div>

::: tip
配置中的 `base_url` 不要写成 `https://doudi.ai/v1/responses`。Codex CLI 会根据 `wire_api = "responses"` 自动拼接接口路径。
:::

## 第 6 步：启动并测试

### 1. 进入一个项目文件夹

不要直接在很大的硬盘根目录测试，先准备一个小文件夹：

```powershell
mkdir "$HOME\Desktop\codex-test"
cd "$HOME\Desktop\codex-test"
```

### 2. 启动 Codex CLI

```powershell
codex
```

第一次测试时输入一条简单指令：

```text
请只回复：Codex CLI 已通过 DouDi 连接成功
```

能正常返回，就说明 Key、Base URL、模型和 Responses API 配置基本正确。

### 3. 直接执行一次性任务

也可以使用 `exec` 模式：

```powershell
codex exec "请查看当前目录，并告诉我有哪些文件"
```

建议先使用小项目测试，再让 Codex 修改正式项目文件。

## 官方登录和 DouDi 配置不要混用

Codex CLI 官方登录命令是：

```powershell
codex login
```

它用于登录 OpenAI 官方账号。如果你使用的是 DouDi 自定义服务商配置，重点是 `DOUDI_API_KEY` 和 `config.toml`，不需要把 DouDi Key 当成 OpenAI 网页登录密码。

如果你想使用 OpenAI 官方服务，就按官方文档执行 `codex login`；如果你想使用 DouDi，就按本页的自定义服务商配置执行。两套方式不要同时混着排查。

## 常见问题

### `codex` 不是命令

重新打开 PowerShell，然后再次检查：

```powershell
codex --version
```

仍然找不到时，重新执行：

```powershell
npm install -g @openai/codex
```

### 提示没有读取到 API Key

依次检查：

1. 是否使用了新的 PowerShell 窗口。
2. 环境变量名称是否完全写成 `DOUDI_API_KEY`。
3. `config.toml` 中的 `env_key` 是否也是 `DOUDI_API_KEY`。
4. Key 是否已过期、被删除或额度不足。

### 返回模型不存在

不要直接照抄其他教程的模型名。进入 DouDi 控制台，复制当前账号分组可以使用的完整模型 ID，并替换：

```toml
model = "<模型ID>"
```

### 返回认证失败

重点检查：

```text
base_url = https://doudi.ai/v1
env_key = DOUDI_API_KEY
```

不要在 Base URL 后面重复添加 `/responses`，也不要把 Key 写进引号以外的其他字符。

### 经常出现 `Reconnect` 或 `Reconnecting`

这通常是代理程序没有被 Codex CLI 正确识别。先确认代理软件正在运行，再在当前 PowerShell 中设置代理：

```powershell
$env:HTTP_PROXY = "http://127.0.0.1:你的HTTP或Mixed端口"
$env:HTTPS_PROXY = "http://127.0.0.1:你的HTTP或Mixed端口"
```

例如端口是 `7897`：

```powershell
$env:HTTP_PROXY = "http://127.0.0.1:7897"
$env:HTTPS_PROXY = "http://127.0.0.1:7897"
```

端口必须以你的代理软件实际显示为准，不要直接照抄 `7897`。设置后重新运行：

```powershell
codex
```

## 安全检查清单

<div class="ml-checklist">

- 已安装并能运行 `codex --version`。
- 已创建专用的 DouDi Key。
- Key 保存在 Windows 环境变量中，没有写进项目文件。
- `model_provider` 与 `[model_providers.doudi]` 名称一致。
- `base_url` 以 `/v1` 结尾，没有重复添加接口路径。
- `wire_api` 写成 `responses`。
- `model` 使用 DouDi 控制台中的完整模型 ID。
- 已在小项目中完成首次测试。

</div>

## 官方资料

- [Codex CLI 官方文档](https://learn.chatgpt.com/docs/codex/cli)
- [Codex 基础配置](https://developers.openai.com/codex/config-basic)
- [Codex 高级配置](https://developers.openai.com/codex/config-advanced)
- [Codex 配置参考](https://developers.openai.com/codex/config-reference)
