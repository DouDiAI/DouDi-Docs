# Cline 配置

[Cline](https://github.com/cline/cline)  是一款流行的 VS Code AI 编码插件（前身为 Claude Dev）。通过 DouDi.ai 接入，可以使用多种模型。

## 前提条件

*   已注册 DouDi.ai 账号并获取 API Key（[前往获取](https://doudi.ai/keys)  ）
*   已安装 [VS Code](https://code.visualstudio.com/) 

## 配置步骤

### 第 1 步：安装 Cline

在 VS Code 扩展市场搜索 **Cline** 并安装。

![安装 Cline](/imported/haoai/integrations-cline-01.webp)

### 第 2 步：打开设置

点击左侧活动栏的 **Cline 图标**，进入 Cline 面板，然后点击右上角的 **设置图标**。

![打开 Cline 设置](/imported/haoai/integrations-cline-02.webp)

### 第 3 步：填写配置并保存

在 API Configuration 页面填写以下信息，完成后点击右上角 **Done**：

| 配置项 | 值 |
| --- | --- |
| **API Provider** | `OpenAI Compatible` |
| **Base URL** | `https://doudi.ai/v1` |
| **OpenAI Compatible API Key** | 你的 DouDi.ai API Key |
| **Model ID** | 从 [模型广场/价格页面](https://doudi.ai/pricing) 复制当前可用模型 ID |

![填写配置信息](/imported/haoai/integrations-cline-03.webp)

Cline 也支持 Anthropic 协议，对应的 Base URL 为 `https://doudi.ai/v1`。

## 常见问题

**Q: 提示模型不支持**

确认 Model ID 格式正确，使用 OpenAI Compatible 时模型名通常需带 `厂商/` 前缀，并以 [模型广场/价格页面](https://doudi.ai/pricing) 的实时 ID 为准。

**Q: 无法使用 Tool Use 功能**

切换 API Provider 为 Anthropic，Base URL 改为 `https://doudi.ai/v1`，可获得完整的 Tool Use 支持。
