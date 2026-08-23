# Codex 模型供应商配置

推荐先用 CC Switch 配好 DouDi.ai 供应商和 API Key。完成后再开启 WebSocket，让 Codex 长时间编码会话更流畅。

## 使用 CC Switch 图形化配置

[CC Switch](https://github.com/farion1231/cc-switch)  是开源的供应商管理工具，适合偏好图形界面的用户。

### 1\. 安装 CC Switch

### macOS

```
brew install --cask cc-switch
```

或前往 [Releases](https://github.com/farion1231/cc-switch/releases)  下载 `.dmg` 手动安装。

### Windows

前往 [Releases](https://github.com/farion1231/cc-switch/releases)  下载 `.msi` 安装程序。

### Linux

```
# Debian / Ubuntu
sudo dpkg -i CC-Switch-*.deb

# Fedora / RHEL
sudo rpm -i CC-Switch-*.rpm

# AppImage
chmod +x CC-Switch-*.AppImage && ./CC-Switch-*.AppImage
```

支持 macOS 12+、Windows 10+、Ubuntu 22.04+ / Debian 11+ / Fedora 34+

### 2\. 添加 DouDi.ai 供应商

### 步骤一：新增供应商

切换到顶部 **Codex** 标签页，点击右上角 **+** 按钮。

![CC Switch Codex 标签页](/imported/haoai/integrations-codex-model-provider-01.webp)

### 步骤二：填写配置

按下表填写，点击 **\+ 添加** 完成。

![CC Switch Codex 供应商配置](/imported/haoai/integrations-codex-model-provider-02.webp)

| 配置项 | 值 | 说明 |
| --- | --- | --- |
| ❶ 供应商名称 | `haoai` | 推荐使用，后续 WebSocket 配置更容易对应 |
| ❷ 官网链接 | `https://doudi.ai` | 供应商官网 |
| ❸ API Key | 你的 DouDi.ai API Key | 在 [doudi.ai/keys](https://doudi.ai/keys)  获取 |
| ❹ 请求地址 | `https://doudi.ai/v1` | 末尾不要加斜杠 |
| ❺ API 格式 | `OpenAI Compatible` | 选择 OpenAI 兼容格式 |
| ❻ 写入通用配置 | ✅ 勾选 | 写入全局配置，所有项目生效 |

CC Switch 自动写入配置文件，无需手动编辑任何文件。

### 步骤三：启用供应商

添加完成后回到列表，选中 `haoai`，点击**使用**按钮，看到「切换成功」提示即完成。确认 **写入通用配置** 已勾选，配置会自动写入 `config.toml`。

![CC Switch 写入通用配置](/imported/haoai/integrations-codex-model-provider-03.webp)

## 验证配置

```
codex "hello"
```

![Codex CLI 运行效果](/imported/haoai/integrations-codex-model-provider-04.webp)

正常返回 AI 响应即表示配置成功。

## 下一步

*   [开启 WebSocket（推荐）](/integrations/codex/websocket) — 补齐 Responses 协议格式和 WebSocket 长连接配置，让长时间编码会话更流畅

## 指定模型

```
codex --model <model-id> "重构这个函数"
```

Codex CLI 需要使用 **Responses 协议格式**（`wire_api = "responses"`）来接收编码任务中的流式响应和工具调用，并非所有模型都支持此格式。选择模型时，请在 [DouDi.ai 模型广场/价格页面](https://doudi.ai/pricing)  确认该模型支持 **Responses** 协议，否则会报错。

推荐模型请参考 [DouDi.ai 模型广场/价格页面](https://doudi.ai/pricing)  。

## 故障排除

**Q: 提示 “Authentication error”**

确认 API Key 已正确填写，并检查请求地址末尾无斜杠。

**Q: 连接超时**

确认请求地址为 `https://doudi.ai/v1`，末尾不带斜杠。
