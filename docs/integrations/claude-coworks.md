# Claude Coworks 配置

[Claude Coworks](https://claudecoworks.com)  是 Anthropic 官方桌面客户端，内置「第三方推理」功能，支持通过 Anthropic 兼容的 Gateway 将推理请求转发到 DouDi.ai，从而访问全球顶级模型。

## 前提条件

*   已注册 DouDi.ai 账号并获取 API Key（[前往获取](https://doudi.ai/keys) ）
*   已安装 Claude Coworks（[下载地址](https://claudecoworks.com) ）

## 配置步骤

### 第 1 步：开启开发者模式

在菜单栏点击 **Help → Troubleshooting → Enable Developer Mode**。

![开启开发者模式](/assets/images/integrations-claude-coworks-01.webp)

开启开发者模式后，菜单栏会出现 **Developer** 菜单。

### 第 2 步：打开第三方推理配置

在菜单栏点击 **Developer → Configure Third-Party Inference…**，打开配置面板。

![打开配置面板](/assets/images/integrations-claude-coworks-02.webp)

### 第 3 步：选择 Gateway

在 **Connection** 页面选中 **Gateway（Anthropic-compatible）**。

![选择 Gateway](/assets/images/integrations-claude-coworks-03.webp)

### 第 4 步：填写凭据并应用

在 **GATEWAY CREDENTIALS** 区域填写以下信息，然后点击 **Apply locally**：

| 配置项 | 值 |
| --- | --- |
| Gateway base URL | `https://doudi.ai/v1` |
| Gateway API key | 你的 DouDi.ai API Key |
| Gateway auth scheme | `x-api-key` |

![填写凭据并应用](/assets/images/integrations-claude-coworks-04.webp)

右上角状态指示器变为绿色即表示已成功接入。

### 第 5 步：浏览可用模型

连接建立后，即可在 Claude Coworks 中查看当前可用模型。需要核对模型能力、价格和账号权限时，前往 [DouDi.ai 模型广场/价格页面](https://doudi.ai/pricing)。

![浏览可用模型](/assets/images/integrations-claude-coworks-05.webp)

### 第 6 步：选择你的模型

在 Claude Coworks 界面中选取要使用的特定模型。你可以随时根据需求在不同模型之间切换。选定的模型将用于所有推理请求。

![选择你的模型](/assets/images/integrations-claude-coworks-06.webp)

### 第 7 步：验证并开始使用

设置已完成！Claude Coworks 将通过 DouDi.ai Gateway 以你选定的模型转发所有推理请求。现在即可正常使用 Claude Coworks，所有请求都将通过 DouDi.ai 基础设施处理。

![验证完成](/assets/images/integrations-claude-coworks-07.webp)

## 开始使用

配置生效后，Claude Coworks 的所有推理请求将通过 DouDi.ai Gateway 转发。模型可用性以 Claude Coworks 实际拉取结果和 [DouDi.ai 模型广场/价格页面](https://doudi.ai/pricing) 为准。

## 常见问题

**Q: 菜单栏找不到 Developer 菜单**

需要先完成第 1 步，开启开发者模式后 **Developer** 菜单才会出现。

**Q: 点击 Apply locally 后状态指示器未变绿 / 连接失败**

1.  确认 Gateway base URL 填写为 `https://doudi.ai/v1`，末尾不加斜杠
2.  确认 Gateway auth scheme 选择的是 `x-api-key`
3.  确认 API Key 从 DouDi.ai 控制台 完整复制，无多余空格
4.  确认网络连接正常
