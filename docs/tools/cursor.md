# Cursor

Cursor 接入 DouDi 后，可以把代码解释、生成、重构等请求转到自定义模型。建议为 Cursor 单独创建一个 Key，方便限制额度和查看消耗。

## 下载地址

- 官方下载页：[https://cursor.com/download](https://cursor.com/download)
- 新手建议：Windows 用户直接选择 Windows 版本；macOS 用户根据电脑芯片选择 Apple Silicon 或 Intel。

## 准备工作

1. 在 DouDi 控制台创建一个 `cursor` 专用 Key。
2. 在 DouDi 控制台确认你要使用的模型名。
3. 打开 Cursor，确认当前版本支持自定义 OpenAI API 或 OpenAI Compatible Provider。

## 第 1 步：进入模型设置

打开 Cursor 设置页，找到 `Models`、`AI`、`API Provider` 或类似名称的区域。

<div class="ml-guide-note">
界面位置参考：通常在 Cursor 的 Settings 里，和模型选择、API Key、自定义 Provider 放在同一组。不同版本名称可能略有变化，但核心字段都是 Base URL、API Key、Model。
</div>

## 第 2 步：新增 OpenAI 兼容配置

在 Provider 类型里选择 OpenAI 兼容配置。常见名称包括：

![DouDi 通用 Provider 配置示意图](/tutorial-shots/common-provider.svg)

- `OpenAI Compatible`
- `Custom OpenAI`
- `OpenAI API`
- `Custom Provider`

如果 Cursor 只显示官方 OpenAI Key 输入框，先找是否有 `Override OpenAI Base URL` 或 `自定义地址` 选项。

## 第 3 步：填写连接字段

如果 Cursor 的界面和图片不完全一样，也不用紧张。只要找到相同含义的四个字段：Provider 名称、Base URL、API Key、Model，就可以按图填写。

<div class="ml-field-table">
  <div class="ml-field-row">
    <div>Provider 名称</div>
    <div>建议填写 <code>DouDi</code>。</div>
    <div>方便以后和官方 OpenAI、Claude 等配置区分。</div>
  </div>
  <div class="ml-field-row">
    <div>API Key</div>
    <div>粘贴 Cursor 专用 DouDi Key。</div>
    <div>只复制 Key 本身，不要带引号。</div>
  </div>
  <div class="ml-field-row">
    <div>Base URL</div>
    <div><code>https://doudi.ai/v1</code></div>
    <div>如果控制台展示了其他接入地址，以控制台为准。</div>
  </div>
  <div class="ml-field-row">
    <div>Model</div>
    <div>填写 DouDi 控制台里的完整模型名。</div>
    <div>代码任务优先选择编程能力更强的模型。</div>
  </div>
</div>

## 第 4 步：保存并测试

保存后先不要直接打开大项目测试，建议按下面顺序验证：

1. 新建一个空白文件。
2. 输入一段很短的函数，例如加法函数。
3. 让 Cursor 解释这段代码。
4. 能正常返回后，再测试代码补全、重构和长上下文任务。

## 推荐配置方式

| 使用场景 | 建议 |
| --- | --- |
| 日常补全 | 选响应快、消耗低的模型 |
| 复杂重构 | 选代码能力强、上下文更长的模型 |
| 多设备使用 | 使用同一个 Cursor 专用 Key，方便查日志 |
| 团队共享 | 每个人单独 Key，避免费用混在一起 |

## 常见问题

| 现象 | 排查方向 |
| --- | --- |
| 显示认证失败 | 重新复制 API Key，确认没有空格、没有填错 Key |
| 显示模型不可用 | 检查模型名和 Key 分组是否匹配 |
| 没有自定义 Base URL | 当前 Cursor 版本或入口不支持，需要升级或换支持自定义 Provider 的入口 |
| 响应慢 | 先确认本机网络和代理，再以 DouDi 控制台展示的接入地址为准 |
