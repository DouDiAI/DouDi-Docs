# Claude Code

Claude Code 是 Anthropic 的终端编程工具。这个页面按 Windows 官方安装和登录流程编写，截图来自这台电脑上的真实运行结果。

## 下载地址

- 官方安装文档：[https://docs.anthropic.com/en/docs/claude-code/setup](https://docs.anthropic.com/en/docs/claude-code/setup)
- 官方 GitHub：[https://github.com/anthropics/claude-code](https://github.com/anthropics/claude-code)
- 新手建议：先把 `claude --version` 跑通，再看 `claude auth status`。这两个最能确认软件是否已经装好。

## 安装方式

Windows 上最省事的方式是用 npm 安装：

```powershell
npm install -g @anthropic-ai/claude-code
```

如果你更喜欢官方原生安装方式，也可以按 Anthropic 的官方安装页操作。

::: tip
安装完后如果终端还找不到 `claude`，先把当前 PowerShell 或命令提示符关掉，再重新打开一次。
:::

## 第 1 步：确认版本

安装完成后先检查版本：

```powershell
claude --version
```

本机显示的是：

![Claude Code 版本检查真实截图](/tutorial-shots/claude-code-version-status.png)

如果能看到版本号，说明 Claude Code 已经装好。

## 第 2 步：确认登录状态

再检查登录状态：

```powershell
claude auth status
```

本机当前状态是已登录：

![Claude Code 登录状态真实截图](/tutorial-shots/claude-code-auth-status.png)

输出里的 `loggedIn: true` 代表认证已经完成。

## 第 3 步：如果还没登录

如果你的输出不是 `loggedIn: true`，就执行：

```powershell
claude auth login
```

`claude auth login --help` 里还显示了两个常见方式：

- `--claudeai`：使用 Claude 订阅登录，默认就是这个
- `--console`：改用 Anthropic Console 计费

## 第 4 步：跑健康检查

安装和登录都完成后，再执行：

```powershell
claude doctor
```

如果看到 `No installation issues found.`，说明安装本身没问题。  
如果还提示 Remote Control 相关信息，那通常是在提醒云端/远程能力状态，不一定代表本地 CLI 装坏了。

## 第 5 步：开始用

最简单的测试方式是进入一个小目录后直接启动：

```powershell
claude
```

先让它做一件很小的事，比如解释当前目录，确认输出正常后再接项目。

## 常见问题

| 现象 | 处理方法 |
| --- | --- |
| `claude` 不是命令 | 关闭当前终端重新打开，再查一次 `claude --version` |
| `auth status` 不是 `loggedIn: true` | 运行 `claude auth login` 重新登录 |
| `doctor` 提示 Remote Control | 先看自己是否需要云端远程能力；如果只是本地 CLI 使用，通常不影响安装 |
| 命令输出很长 | 先用 `claude --version` 和 `claude auth status`，这两个最直观 |
| 想重新安装 | 可执行 `claude install latest`，或重新跑官方安装文档里的安装方式 |

## 配置检查清单

<div class="ml-checklist">

- 已按官方文档安装 Claude Code。
- `claude --version` 能输出版本号。
- `claude auth status` 显示 `loggedIn: true`。
- 必要时已执行 `claude auth login`。
- 已跑过 `claude doctor` 确认安装健康。

</div>
