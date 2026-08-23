# Cherry Studio 配置

[Cherry Studio](https://cherry-ai.com) 是一款跨平台 AI 桌面客户端，支持多模型对话、知识库和常用办公工作流。通过添加一个 DouDi.ai 自定义提供商，可以在 Cherry Studio 中使用当前账号可用模型。

## 前提条件

- 已注册 DouDi.ai 账号，并在 [API Key 管理页面](https://doudi.ai/keys) 获取 API Key
- 已安装 Cherry Studio（[下载地址](https://cherry-ai.com)）

## 配置步骤

### 第 1 步：打开设置

启动 Cherry Studio 后，点击左下角的 **设置** 图标。

![打开 Cherry Studio 设置](/assets/images/integrations-cherry-studio-01.webp)

### 第 2 步：添加自定义提供商

进入 **模型服务**，在提供商列表底部点击 **添加服务商**，选择添加自定义提供商。

在弹窗中填写：

| 配置项 | 填写内容 |
| --- | --- |
| **提供商名称** | `DouDi.ai` |
| **API 密钥** | 你的 DouDi.ai API Key |
| **OpenAI API 地址** | `https://doudi.ai/` |
| **Anthropic API 地址** | `https://doudi.ai/` |

Cherry Studio 会根据这里的 API 地址自动拼出请求路径：OpenAI Chat 使用 `https://doudi.ai/v1/chat/completions`，Anthropic Messages 使用 `https://doudi.ai/v1/messages`。不要在输入框里手动填写完整请求路径。

![添加 DouDi.ai 自定义提供商](/assets/images/integrations-cherry-studio-02.webp)

填写完成后点击 **添加**。

### 第 3 步：获取模型列表

添加完成后，在提供商列表中选择 **DouDi.ai**。确认 API 密钥和 API 地址已保存，然后点击右侧的 **获取模型列表**。

![获取 DouDi.ai 模型列表](/assets/images/integrations-cherry-studio-03.webp)

如果模型列表为空，先确认 API Key 是否完整复制，再确认账号在 [模型广场/价格页面](https://doudi.ai/pricing) 中拥有对应模型权限。

### 第 4 步：添加要使用的模型

模型列表弹出后，可以点击右上角 **添加全部模型**，也可以只点击单个模型右侧的 **+** 添加需要的模型。

![添加 DouDi.ai 模型](/assets/images/integrations-cherry-studio-04.webp)

模型名称、能力和权限会随 DouDi.ai 当前账号状态变化，文档不单独维护固定模型清单。需要核对模型能力和价格时，以 [模型广场/价格页面](https://doudi.ai/pricing) 为准。

### 第 5 步：开始使用

回到聊天主界面，点击顶部模型选择器，在 **DouDi.ai** 分组下选择刚添加的模型，即可开始对话。

![选择 DouDi.ai 模型开始对话](/assets/images/integrations-cherry-studio-05.webp)

## 常见问题

**Q: API 地址应该填 `https://doudi.ai/` 还是完整接口地址？**

在 Cherry Studio 当前自定义提供商界面里填写 `https://doudi.ai/`。界面会自动生成 `https://doudi.ai/v1/chat/completions` 和 `https://doudi.ai/v1/messages` 请求路径。

**Q: 点击获取模型列表后没有模型**

检查 API Key 是否来自 [API Key 管理页面](https://doudi.ai/keys)，并确认没有多余空格。随后到 [模型广场/价格页面](https://doudi.ai/pricing) 核对账号可用模型和权限。

**Q: 聊天页看不到 DouDi.ai 模型**

确认已经在模型列表里点击 **添加全部模型** 或单个模型右侧的 **+**。如果仍未出现，重启 Cherry Studio 后再打开模型选择器。
