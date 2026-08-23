# Cherry Studio 配置

[Cherry Studio](https://cherry-ai.com)  是一款跨平台的 AI 桌面客户端（支持 Windows、macOS、Linux），支持多模型对话、知识库和工作流，是目前功能最丰富的开源 AI 客户端之一。

通过配置 DouDi.ai 作为服务商，你可以在 Cherry Studio 中使用 GPT、Claude、Grok、DeepSeek 等当前可用模型，只需一个 API Key。

## 三种协议说明

Cherry Studio 支持通过以下三种协议接入 DouDi.ai：

**OpenAI Chat** — 基于 `/v1/chat/completions`，适用于 GPT 系列模型，如 `openai/gpt-4.1`、`openai/gpt-5.3-chat`。

**OpenAI Response** — 基于 `/v1/responses`，适用于 GPT 系列模型，如 `openai/gpt-4.1`、`openai/gpt-5.4-mini`。

**Claude** — 基于 `/anthropic/v1/messages`，适用于 Claude 系列模型，如 `anthropic/claude-sonnet-4.6`、`anthropic/claude-opus-4.6`。

## 前提条件

*   已注册 DouDi.ai 账号并获取 API Key（[前往获取](https://doudi.ai/keys)  ）
*   已安装 Cherry Studio（[下载地址](https://cherry-ai.com)  ）

## 配置步骤

### 第 1 步：打开设置

启动 Cherry Studio，点击左下角的 **设置** 图标。

![打开 Cherry Studio 设置](/imported/haoai/integrations-cherry-studio-01.webp)

### 第 2 步：添加模型提供商

进入左侧 **模型服务**，滚动到底部，点击 **\+ 添加**。在弹出的对话框中填写提供商名称，并选择对应的提供商类型。

**OpenAI Chat**

提供商类型选择 `OpenAI`，点击确定。

![添加 OpenAI Chat 提供商](/imported/haoai/integrations-cherry-studio-02.webp)

**OpenAI Response**

提供商类型选择 `OpenAI`（后续在配置页开启 Response 模式），点击确定。

![添加 OpenAI Response 提供商](/imported/haoai/integrations-cherry-studio-03.webp)

**Claude**

提供商类型选择 `Anthropic`，点击确定。

![添加 Claude 提供商](/imported/haoai/integrations-cherry-studio-04.webp)

### 第 3 步：填写 API 配置

在对应提供商的配置页中填写 API 密钥和 API 地址。

**OpenAI Chat**

| 配置项 | 值 |
| --- | --- |
| **API 密钥** | 你的 DouDi.ai API Key |
| **API 地址** | `https://doudi.ai/v1` |

![OpenAI Chat 配置](/imported/haoai/integrations-cherry-studio-05.webp)

**OpenAI Response**

| 配置项 | 值 |
| --- | --- |
| **API 密钥** | 你的 DouDi.ai API Key |
| **API 地址** | `https://doudi.ai/v1` |

![OpenAI Response 配置](/imported/haoai/integrations-cherry-studio-06.webp)

**Claude**

| 配置项 | 值 |
| --- | --- |
| **API 密钥** | 你的 DouDi.ai API Key |
| **API 地址** | `https://doudi.ai/anthropic` |

![Claude 配置](/imported/haoai/integrations-cherry-studio-07.webp)

确认页面右上角的开关处于 **开启（ON）** 状态，否则该提供商不会出现在模型选择器中。

### 第 4 步：添加模型

点击模型区域的 **管理** 按钮自动拉取模型列表，点击模型右侧的 **+** 添加到启用列表。

**OpenAI Chat**

![OpenAI Chat 模型列表](/imported/haoai/integrations-cherry-studio-08.webp)

**OpenAI Response**

![OpenAI Response 模型列表](/imported/haoai/integrations-cherry-studio-09.webp)

**Claude**

![Claude 模型列表](/imported/haoai/integrations-cherry-studio-10.webp)

### 第 5 步：验证配置

点击 **检测** 按钮，选择任意模型进行测试，显示检测通过即配置成功。

**OpenAI Chat**

![OpenAI Chat 验证](/imported/haoai/integrations-cherry-studio-11.webp)

**OpenAI Response**

![OpenAI Response 验证](/imported/haoai/integrations-cherry-studio-12.webp)

**Claude**

![Claude 验证](/imported/haoai/integrations-cherry-studio-13.webp)

## 开始使用

回到主界面，点击对话顶部的模型选择器，在对应提供商分组下选择模型，即可开始对话。

![选择模型开始对话](/imported/haoai/integrations-cherry-studio-14.webp)

## 常见问题

**Q: 点击「管理」后模型列表为空**

检查 API 地址是否填写正确（末尾不加斜杠），以及 API 密钥是否完整复制，无多余空格。

**Q: 检测时提示连接失败**

1.  确认 API Key 从 [API Key 管理页面](https://doudi.ai/keys)  完整复制，无多余空格
2.  确认 API 地址填写正确
3.  确认网络连接正常

**Q: 提供商不出现在模型选择器中**

检查配置页右上角的开关是否已开启。
