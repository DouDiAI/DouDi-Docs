# WorkBuddy 配置

[WorkBuddy](https://workbuddy.ai)  是腾讯推出的 AI Agent 桌面应用，支持日常办公、代码开发、文档处理等多种场景。通过接入 DouDi.ai，可以使用当前账号可用模型，只需一个 API Key。

## 前提条件

*   已注册 DouDi.ai 账号并获取 API Key（[前往获取](https://doudi.ai/keys)  ）
*   已安装 WorkBuddy（[下载地址](https://workbuddy.ai)  ）

## 配置步骤

### 第 1 步：打开设置

启动 WorkBuddy，点击左下角头像，在弹出菜单中点击 **设置**。

![打开 WorkBuddy 设置](/assets/images/integrations-workbuddy-01.webp)

### 第 2 步：进入模型配置

在设置页左侧导航中点击 **模型**，然后点击右侧的 **\+ 添加模型**。

![进入模型配置](/assets/images/integrations-workbuddy-02.webp)

### 第 3 步：填写配置信息

在「添加模型」弹窗中填写以下信息：

| 配置项 | 值 |
| --- | --- |
| **提供商** | `自定义 / Custom` |
| **接口地址** | `https://doudi.ai/v1/chat/completions` |
| **API KEY** | 你的 DouDi.ai API Key |
| **模型名称** | 从 [模型广场/价格页面](https://doudi.ai/pricing) 复制当前可用模型 ID |

WorkBuddy 仅支持 OpenAI 兼容协议。通过 DouDi.ai 的 `/v1/chat/completions` 接口，可以访问当前兼容模型，只需在**模型名称**中填入对应的模型 ID，详见 [模型广场/价格页面](https://doudi.ai/pricing)  。

按需勾选高级配置：

| 选项 | 说明 |
| --- | --- |
| **工具调用** | 支持函数调用的模型勾选（默认已勾选） |
| **图片输入** | 使用视觉模型时勾选 |
| **推理模式** | 使用深度思考模型时勾选 |

填写完成后点击 **保存**。

![填写配置信息](/assets/images/integrations-workbuddy-03.webp)

### 第 4 步：确认模型已保存

保存后模型出现在「已保存模型」列表中，配置完成。

![已保存模型列表](/assets/images/integrations-workbuddy-04.webp)

### 第 5 步：开始对话

回到主界面，点击底部模型选择器，在「自定义模型」分组下选择刚配置的模型，即可开始对话。

![开始对话](/assets/images/integrations-workbuddy-05.webp)

## 常见问题

**Q: 能否使用 Claude 模型？**

可以。WorkBuddy 通过 DouDi.ai 的 OpenAI 兼容接口可访问当前可用的兼容模型，在**模型名称**中填入对应 ID 即可，详见 [模型广场/价格页面](https://doudi.ai/pricing)  。

**Q: 保存后模型未出现在选择列表中**

尝试重启 WorkBuddy，新添加的模型会出现在聊天底部模型选择器的「自定义模型」分组中。

**Q: 请求失败或提示接口错误**

检查接口地址是否填写完整（`https://doudi.ai/v1/chat/completions`），以及 API KEY 是否从 [API Key 管理页面](https://doudi.ai/keys)  完整复制，无多余空格。
