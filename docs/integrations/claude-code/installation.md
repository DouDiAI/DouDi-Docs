# 安装 Claude Code

Claude Code 是一个由 AI 驱动的编码助手，理解你的整个代码库，可以跨多个文件和工具工作。可在终端、IDE、桌面应用和浏览器中使用。

## 前置要求

*   [DouDi.ai API Key](https://doudi.ai/keys)  （注册即可获取，无需 Claude 订阅）

## 终端 CLI

功能完整的 CLI，用于直接在终端中使用 Claude Code。

### 原生安装（推荐）

**macOS / Linux / WSL：**

```
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows PowerShell：**

```
irm https://claude.ai/install.ps1 | iex
```

**Windows CMD：**

```
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

Windows 需要先安装 Git for Windows 。原生安装会自动在后台更新。

### Homebrew

```
brew install --cask claude-code
```

Homebrew 安装不会自动更新。需定期运行 brew upgrade claude-code 获取最新版本。

### WinGet

```
winget install Anthropic.ClaudeCode
```

WinGet 安装不会自动更新。需定期运行 winget upgrade Anthropic.ClaudeCode 获取最新版本。

安装完成后，请先完成 [配置模型供应商](/integrations/claude-code/model-provider) 再启动使用。

## VS Code / Cursor

在编辑器中直接提供内联差异、@-提及、计划审查和对话历史。

*   [为 VS Code 安装](vscode:extension/anthropic.claude-code)
*   [为 Cursor 安装](cursor:extension/anthropic.claude-code)

或在扩展视图中搜索 **“Claude Code”**（`Cmd+Shift+X` / `Ctrl+Shift+X`）。安装后，打开命令面板（`Cmd+Shift+P` / `Ctrl+Shift+P`），输入 “Claude Code”，选择 **在新标签页中打开**。

## JetBrains IDE

支持 IntelliJ IDEA、PyCharm、WebStorm 等，具有交互式差异查看和选择上下文共享。

从 JetBrains Marketplace 安装 [Claude Code 插件](https://plugins.jetbrains.com/plugin/27310-claude-code-beta-)  ，然后重启 IDE。

## 验证安装

```
claude --version
# 正常输出版本号即表示安装成功
```

## 更新与卸载

```
# 原生安装自动更新，其他方式手动更新：
brew upgrade claude-code          # Homebrew
winget upgrade Anthropic.ClaudeCode  # WinGet

# 卸载
brew uninstall claude-code   # Homebrew
```

## 下一步

*   [配置模型供应商](/integrations/claude-code/model-provider) — 使用 DouDi.ai 作为 API 提供商
*   [CCometixLine 状态栏](/integrations/claude-code/contextline) — 实时显示 Git 状态、模型、上下文用量
*   [配置 Skills](/integrations/claude-code/skills) — 扩展 Claude Code 能力
