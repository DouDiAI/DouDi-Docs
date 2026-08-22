# Zed Editor

Zed Editor 的 AI 功能可以通过 `OpenAI Compatible` 方式接入 DouDi。本页按照这台 Windows 电脑上的 Zed 真实界面编写，重点是配置 `settings.json` 和在 Agent 里选择模型。

截图中的配置文件没有展示 API Key。Zed 的 API Key 应通过 Zed 的 Provider 配置或系统环境变量保存，不要直接写进公开文档或项目文件。

## 下载地址

- 官方下载页：[https://zed.dev/download](https://zed.dev/download)
- 官方文档：[https://zed.dev/docs](https://zed.dev/docs)
- Zed AI 文档：[https://zed.dev/docs/ai/overview](https://zed.dev/docs/ai/overview)

## 配置前准备

先准备好：

1. DouDi 控制台创建的专用 Key。
2. API 地址：`https://doudi.ai/v1`。
3. DouDi 控制台中可用的完整模型 ID。

::: warning
Zed 的 `settings.json` 可以写 API 地址和模型列表，但不要把真实 API Key 明文写进去。
:::

## 第 1 步：打开 Zed Agent

打开 Zed 后，当前电脑上的界面中间是 `New Agent Thread`，底部输入框写着：

```text
Message the Zed Agent, @ to include context, / for commands
```

这说明已经打开了 Zed Agent 面板。

![Zed Editor 真实 Agent 首页](/tutorial-shots/zed-live-home.png)

如果你没看到这个面板，可以在 Zed 里打开 Agent 或 Assistant 相关入口，然后再继续配置模型。

## 第 2 步：进入 AI 设置

点击 Agent 底部的 `Select a Model`，再点击弹窗里的 `Configure`。

这台电脑上的模型菜单已经能看到 `doudiOpenAI` 和 `gpt5.5`，说明 DouDi 提供商已经被 Zed 识别。

![Zed 真实模型选择菜单](/tutorial-shots/zed-live-model-menu.png)

点击 `Configure` 后，会进入 Zed 的 `AI` 设置页。这里能看到：

- `Disable AI`
- `LLM Providers`
- `External Agents`
- `MCP Servers`
- `Skills`

![Zed 真实 AI 设置页](/tutorial-shots/zed-live-agent-configure.png)

其中 `LLM Providers` 是模型服务商配置入口。如果你的 Zed 版本可以直接在这里添加 OpenAI-Compatible Provider，可以点 `Configure` 后按界面提示填写 DouDi。

## 第 3 步：打开 settings.json

如果界面里没有完整的自定义 Provider 表单，直接编辑 Zed 用户设置文件。

Windows 上常见路径是：

```text
C:\Users\你的用户名\AppData\Roaming\Zed\settings.json
```

这台电脑上的实际路径是：

```text
C:\Users\Administrator\AppData\Roaming\Zed\settings.json
```

下面是本机 Zed 打开的真实 `settings.json`，可以看到 `language_models.openai_compatible` 中已经有 `doudiOpenAI` 提供商和 `gpt5.5` 模型。

![Zed 真实 settings.json 配置截图](/tutorial-shots/zed-live-settings-json.png)

## 第 4 步：写入 DouDi Provider

在 `settings.json` 中加入或修改下面这段。把 `<模型ID>` 换成 DouDi 控制台显示的完整模型名。

```json
{
  "agent": {
    "default_model": {
      "provider": "doudiOpenAI",
      "model": "<模型ID>"
    }
  },
  "language_models": {
    "openai_compatible": {
      "doudiOpenAI": {
        "api_url": "https://doudi.ai/v1",
        "available_models": [
          {
            "name": "<模型ID>",
            "max_tokens": 200000,
            "max_output_tokens": 32000,
            "capabilities": {
              "tools": true,
              "images": false,
              "chat_completions": true
            }
          }
        ]
      }
    }
  }
}
```

### 每个字段是什么意思

<div class="ml-field-table">
  <div class="ml-field-row">
    <div>provider</div>
    <div><code>doudiOpenAI</code></div>
    <div>要和 <code>openai_compatible</code> 下面的名称一致。</div>
  </div>
  <div class="ml-field-row">
    <div>api_url</div>
    <div><code>https://doudi.ai/v1</code></div>
    <div>Zed 这里填写到 <code>/v1</code>。</div>
  </div>
  <div class="ml-field-row">
    <div>name / model</div>
    <div>填写完整模型 ID。</div>
    <div>不要只写简称。</div>
  </div>
  <div class="ml-field-row">
    <div>chat_completions</div>
    <div><code>true</code></div>
    <div>使用 OpenAI 兼容 Chat Completions 调用方式。</div>
  </div>
</div>

::: tip
如果你已经有其他 Zed 设置，不要整段覆盖文件。只需要把 `agent` 和 `language_models.openai_compatible` 相关部分合并进去。
:::

## 第 5 步：保存 API Key

Zed 的 `settings.json` 不建议放 API Key。新手推荐两种方式：

| 方式 | 做法 |
| --- | --- |
| Zed 界面 | 在 `AI → LLM Providers → Configure` 中找到对应 Provider 后填写 Key。 |
| 环境变量 | 按 Zed 对自定义 Provider 的提示设置对应 API Key 环境变量。 |

如果你不确定环境变量名称，优先使用 Zed 界面填写 Key。配置完成后，完全退出并重新打开 Zed。

## 第 6 步：选择模型并测试

回到 Agent 面板，点击底部 `Select a Model`。如果配置生效，菜单中会显示你的提供商和模型。

本机真实界面显示：

- Provider：`doudiOpenAI`
- Model：`gpt5.5`

![Zed 真实模型选择菜单](/tutorial-shots/zed-live-model-menu.png)

选择模型后，先发送一条很短的测试消息：

```text
请只回复：Zed 连接成功
```

能正常回复后，再测试代码解释、文件修改或项目级任务。

## 常见问题

### 模型菜单里没有 DouDi

检查：

1. `settings.json` 是否保存成功。
2. `provider` 名称是否和 `openai_compatible` 下的名称一致。
3. `available_models` 中的 `name` 是否和 `agent.default_model.model` 一致。
4. 是否完全重启了 Zed。

### 返回认证失败

说明 API Key 没有正确保存，或者 Key 无效。不要把 Key 写进项目文件，优先回到 `AI → LLM Providers → Configure` 重新填写。

### 返回模型不存在

复制 DouDi 控制台中的完整模型 ID，替换配置里的 `<模型ID>`。

### 请求地址错误

Zed 的 `api_url` 填：

```text
https://doudi.ai/v1
```

不要写成：

```text
https://doudi.ai/v1/chat/completions
```

## 配置检查清单

<div class="ml-checklist">

- 已打开 Zed Agent。
- 已进入 `AI` 设置页。
- 已确认 `LLM Providers` 是服务商配置入口。
- 已编辑 `C:\Users\你的用户名\AppData\Roaming\Zed\settings.json`。
- `api_url` 是 `https://doudi.ai/v1`。
- `provider` 名称前后一致。
- 模型 ID 使用 DouDi 页面中的完整名称。
- API Key 没有写进 `settings.json`。
- 重新打开 Zed 后，模型菜单能看到 DouDi 模型。

</div>
