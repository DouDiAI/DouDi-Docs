# NextChat 配置

[NextChat](https://nextchat.dev)  （原 ChatGPT-Next-Web）是一款广受欢迎的开源 AI 客户端，支持 Web、桌面（macOS、Windows、Linux）多平台部署，界面简洁，功能丰富，支持多种 AI 服务商配置。

通过配置 DouDi.ai 作为服务商，你可以在 NextChat 中使用 GPT、Claude 等当前可用模型，只需一个 API Key。

NextChat 支持以下两种方式接入 DouDi.ai：

| 协议 | 模型服务商 | 接口地址 | 适用模型 |
| --- | --- | --- | --- |
| **OpenAI Chat** | OpenAI | `https://doudi.ai` | 所有模型（带 `厂商/` 前缀） |
| **Anthropic** | Anthropic | `https://doudi.ai/anthropic` | Claude 系列 |

## 前提条件

*   已注册 DouDi.ai 账号并获取 API Key（[前往获取](https://doudi.ai/console/api-keys)  ）
*   已安装 NextChat（[下载地址](https://nextchat.dev)  ）或使用 Web 版

## 配置步骤

### 第 1 步：打开设置

启动 NextChat，点击左下角的 **设置** 图标。

![打开 NextChat 设置](/imported/haoai/integrations-nextchat-01.webp)

### 第 2 步：配置模型服务商和 API Key

在设置页面中，找到 **模型服务商** 下拉菜单，选择对应服务商，填写接口地址和 API Key。

根据你选择的服务商，填写对应的配置：

**OpenAI（支持所有模型）**

| 配置项 | 值 |
| --- | --- |
| **模型服务商** | OpenAI |
| **接口地址** | `https://doudi.ai` |
| **API Key** | 你的 DouDi.ai API Key |
| **自定义模型名** | 例如 `openai/gpt-5.3-chat,anthropic/claude-sonnet-4.6,deepseek/deepseek-v3.2` |

**Anthropic（Claude 系列）**

| 配置项 | 值 |
| --- | --- |
| **模型服务商** | Anthropic |
| **接口地址** | `https://doudi.ai/anthropic` |
| **API Key** | 你的 DouDi.ai API Key |
| **自定义模型名** | 例如 `claude-sonnet-4.6,claude-opus-4.6,claude-haiku-4.5` |

![配置模型服务商和 API Key](/imported/haoai/integrations-nextchat-02.webp)

**自定义模型名** 字段支持同时填写多个模型，用英文逗号隔开。填写后这些模型会出现在「模型 (model)」下拉列表中供你选择。

使用 OpenAI 服务商时，接口地址填 `https://doudi.ai`（不含 `/v1`），NextChat 会自动补全完整路径。若填写 `https://doudi.ai/v1` 会导致路径重复报错。

### 第 3 步：选择模型

配置完成后，在设置页面底部的 **模型 (model)** 下拉框中，可以看到你刚填写的自定义模型。

![配置完成后选择模型](/imported/haoai/integrations-nextchat-03.webp)

点击下拉框，可以看到所有可用的服务商和模型列表。

![选择模型](/imported/haoai/integrations-nextchat-04.webp)

## 开始使用

关闭设置，回到主界面，选好模型后即可开始对话。

![开始对话](/imported/haoai/integrations-nextchat-05.webp)

## 可用模型示例

推荐模型请参考 [DouDi.ai 模型广场](https://doudi.ai/models)  。

## 常见问题

**Q: 报错 `No providers support endpoint 'chat_completions'`**

模型名填写有误，该模型不存在或你的账号无权访问。请检查模型名是否正确，或换一个其他模型测试。

**Q: 报错 `Unsupported OpenAI API endpoint`**

接口地址填写了 `https://doudi.ai/v1`，导致路径重复。请改为 `https://doudi.ai`（不含 `/v1`）。

**Q: OpenAI 服务商可以调用 Claude 和其他当前可用模型吗？**

可以。在自定义模型名中填写带厂商前缀的完整模型名（如 `anthropic/claude-sonnet-4.6`），DouDi.ai 会自动路由到对应厂商。

**Q: Anthropic 服务商的模型名需要带前缀吗？**

不需要。使用 Anthropic 服务商时，模型名直接填 `claude-sonnet-4.6`。

> 本页按 DouDi.ai 接入语境整理，覆盖同类教程的结构和步骤。
> 实际模型、分组、价格和权限以 DouDi 控制台为准。
