# OpenCode 配置

[OpenCode](https://github.com/opencode-ai/opencode)  是一款开源的终端 AI 编码工具，类似 Claude Code 的开源替代品。通过 DouDi.ai 接入，可以使用任意模型。

## 配置步骤

### 1\. 安装 OpenCode

```
# macOS / Linux
curl -fsSL https://opencode.ai/install | bash

# 或使用 Go 安装
go install github.com/opencode-ai/opencode@latest
```

![安装 OpenCode](/imported/haoai/integrations-opencode-01.webp)

### 2\. 配置环境变量

OpenCode 支持多种 Provider 配置。推荐使用 OpenAI 兼容模式：

~/.zshrc

```
# OpenAI 兼容模式
export OPENAI_API_KEY=<你的 DOUDI_API_KEY>
export OPENAI_BASE_URL=https://doudi.ai/v1
```

如果主要使用 Claude 模型，也可以配置 Anthropic 模式：

~/.zshrc

```
export ANTHROPIC_API_KEY=<你的 DOUDI_API_KEY>
export ANTHROPIC_BASE_URL=https://doudi.ai/anthropic
```

### 3\. 配置文件

也可以通过 OpenCode 的配置文件设置：

~/.config/opencode/config.toml

```
[providers.haoai]
api_key = "<你的 DOUDI_API_KEY>"
base_url = "https://doudi.ai/v1"

[models.default]
provider = "haoai"
model = "anthropic/claude-sonnet-4.6"
```

### 4\. 验证

```
opencode "Hello, 你好吗？"
```

![运行效果](/imported/haoai/integrations-opencode-02.webp)

## 推荐模型

推荐模型请参考 [模型广场/价格页面](https://doudi.ai/pricing)  。

OpenCode 的具体配置方式可能随版本更新变化，请参考 [OpenCode 官方文档](https://github.com/opencode-ai/opencode)  。

> 本页按 DouDi.ai 接入语境整理，覆盖同类教程的结构和步骤。
> 实际模型、分组、价格和权限以 DouDi 控制台为准。
