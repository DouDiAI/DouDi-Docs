# LobeHub 配置

[LobeHub](https://lobehub.com)  是一款功能强大的开源 AI 桌面客户端（支持 macOS、Windows、Linux、Web），支持多种 AI 服务商配置。

通过 DouDi.ai，LobeHub 支持以下三种协议接入：

| 协议 | 服务商 | API 代理地址 |
| --- | --- | --- |
| **OpenAI Chat**（推荐） | OpenAI | `https://doudi.ai/v1` |
| **OpenAI Response** | OpenAI | `https://doudi.ai/v1` |
| **Claude** | Anthropic | `https://doudi.ai/anthropic` |

## 前提条件

*   已注册 DouDi.ai 账号并获取 API Key（[前往获取](https://doudi.ai/keys)  ）
*   已安装 LobeHub（[下载地址](https://lobehub.com/zh/download)  ）

## 配置步骤

### 第 1 步：打开设置

启动 LobeHub，点击左下角的 **设置** 图标。

![打开 LobeHub 设置](/imported/haoai/integrations-lobehub-01.webp)

### 第 2 步：进入 AI 服务商

在设置页面左侧，点击 **AI 服务商**，然后在服务商列表中选择对应的服务商。

![进入 AI 服务商](/imported/haoai/integrations-lobehub-02.webp)

### 第 3 步：填写配置信息

根据你想使用的协议，选择对应服务商并填写配置。以 **OpenAI Chat** 为例：

| 配置项 | 值 |
| --- | --- |
| **API Key** | 你的 DouDi.ai API Key |
| **API 代理地址** | `https://doudi.ai/v1` |
| **使用 Responses API 规范** | 关闭（OpenAI Chat）/ 开启（OpenAI Response） |

其他协议对应的 API 代理地址：

| 协议 | 服务商 | API 代理地址 |
| --- | --- | --- |
| **OpenAI Chat / Response** | OpenAI | `https://doudi.ai/v1` |
| **Claude** | Anthropic | `https://doudi.ai/anthropic` |

填写完成后，在「连通性检查」处选择一个模型，点击检查按钮，看到「**检查通过**」即配置成功。

![填写配置并检查连接](/imported/haoai/integrations-lobehub-03.webp)

**OpenAI Chat 与 OpenAI Response 的区别：**「使用 Responses API 规范」开关关闭时走 `/v1/chat/completions`（Chat 协议），开启时走 `/v1/responses`（Response 协议，仅支持 GPT 系列）。

## 开始使用

配置完成后，回到主界面，点击输入框左侧的模型图标选择模型，即可开始对话。

![开始对话](/imported/haoai/integrations-lobehub-04.webp)

## 常见问题

**Q: 连通性检查提示失败**

1.  确认 API 代理地址填写正确（见上方表格）
2.  确认 API Key 从 [API Key 管理页面](https://doudi.ai/keys)  完整复制，无多余空格
3.  确认网络连接正常

**Q: OpenAI Chat 和 OpenAI Response 有什么区别？**

两者都使用同一个 API 代理地址 `https://doudi.ai/v1`，区别在于请求格式：

*   **OpenAI Chat**（关闭 Responses API 开关）：走 `/v1/chat/completions`，支持所有模型，兼容性最好
*   **OpenAI Response**（开启 Responses API 开关）：走 `/v1/responses`，仅支持 GPT 系列，但支持 `instructions` 独立缓存等新特性，适合高频调用场景

**Q: 模型列表里没有我想用的模型**

点击「获取模型列表」按钮自动拉取，或点击 **+** 手动添加自定义模型。手动添加时模型 ID 需使用 `厂商/模型名` 格式，完整模型列表可在 [DouDi.ai 模型广场/价格页面](https://doudi.ai/pricing)  查看。
