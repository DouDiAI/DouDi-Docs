# CCometixLine 状态栏插件

[CCometixLine](https://github.com/Haleclipse/CCometixLine)  是一款 Claude Code 状态栏增强工具，实时显示 Git 分支状态、当前模型、上下文窗口用量，让你在编码时对关键信息一目了然。

![CCometixLine 效果预览](/imported/haoai/integrations-claude-code-contextline-01.webp)

**核心能力：**

*   **Git 状态** — 分支名、clean / dirty / conflict 状态、远程追踪信息
*   **模型显示** — 简化模型名（如 `Sonnet 4` 而非完整标识符）
*   **上下文用量** — 实时计算 token 消耗百分比
*   **主题系统** — 内置多套主题（cometix、minimal、gruvbox、nord、powerline-dark），支持自定义

## 安装

需要终端已安装 [Nerd Font](https://www.nerdfonts.com/)  才能正常显示图标。

### 通过 Claude Code 安装（推荐）

在 Claude Code 对话框中发送以下消息，Claude 会自动完成安装和配置：

发送给 Claude Code

```
帮我安装: https://github.com/Haleclipse/CCometixLine
并配置到 Claude Code 全局设置中开启
```

Claude Code 将自动执行：

1.  克隆仓库并编译安装 CCometixLine
2.  将状态栏配置写入 `~/.claude/settings.json`
3.  重启后生效

### 手动安装

通过 npm 全局安装后手动配置：

```
npm install -g ccline
```

将以下配置添加到 `~/.claude/settings.json`：

~/.claude/settings.json

```
{
  "env": {
    "CLAUDE_CODE_STATUSLINE": "ccline"
  }
}
```

重启 Claude Code 后生效。

## 自定义

CCometixLine 提供交互式 TUI 配置面板，运行以下命令打开：

```
ccline config
```

在配置面板中可以实时预览和调整：

*   状态栏布局和显示项
*   主题切换和自定义配色
*   Git 信息显示粒度

更多详情参考 [GitHub 仓库](https://github.com/Haleclipse/CCometixLine)  。

> 本页按 DouDi.ai 接入语境整理，覆盖同类教程的结构和步骤。
> 实际模型、分组、价格和权限以 DouDi 控制台为准。
