# Open WebUI

Open WebUI 常用于本地或服务器部署，把 DouDi 配成 OpenAI 兼容后端后，就可以在网页里统一使用模型。它适合多人使用，也适合长期沉淀聊天和知识库。

## 下载地址

- 官方安装文档：[https://docs.openwebui.com/getting-started/](https://docs.openwebui.com/getting-started/)
- 官方 GitHub：[https://github.com/open-webui/open-webui](https://github.com/open-webui/open-webui)
- 新手建议：Open WebUI 更像“网页服务”，不是普通聊天客户端。推荐有 Docker 或服务器基础后再部署。

## 准备工作

1. 创建一个 `open-webui` 专用 DouDi Key。
2. 准备好部署方式：Docker、服务器面板、本地启动或云平台。
3. 确认你有权限修改环境变量或进入 Open WebUI 管理后台。

## 第 1 步：选择配置方式

Open WebUI 常见有两种配置方式：

| 方式 | 适合情况 |
| --- | --- |
| 环境变量 | Docker、服务器部署、需要固定后端地址 |
| 管理后台 | 已经进入 Open WebUI 页面，想直接在界面里添加连接 |

如果你是新手，优先使用管理后台方式；如果你是用 Docker 部署，环境变量方式更稳定。

## 第 2 步：环境变量方式

在启动 Open WebUI 时设置下面变量：

```bash
OPENAI_API_BASE_URL=https://doudi.ai/v1
OPENAI_API_KEY=YOUR_API_KEY
```

不同 Open WebUI 版本变量名可能略有差异，请以你当前版本显示为准。核心填写内容不变：Base URL 填 DouDi 地址，Key 填控制台创建的 Key。

<div class="ml-guide-note">
如果你使用 Docker Compose，通常把这些变量写在 compose 文件的 environment 区域；如果用面板部署，一般在“环境变量”或“启动变量”里填写。
</div>

## 第 3 步：管理后台方式

进入 Open WebUI 后按下面顺序操作：

1. 打开管理员设置。
2. 找到 `Connections`、`OpenAI API` 或模型连接配置。
3. 新增一个 OpenAI 兼容连接。
4. 填写 Base URL 和 API Key。
5. 保存后刷新模型列表。
6. 如果列表为空，手动添加模型名。

## 第 4 步：填写连接字段

Open WebUI 管理后台的字段可能比普通客户端更多。新手只需要先确认下面三项：Base URL、API Key、模型名。

![DouDi 通用 Provider 配置示意图](/tutorial-shots/common-provider.svg)

<div class="ml-field-table">
  <div class="ml-field-row">
    <div>连接名称</div>
    <div><code>DouDi</code></div>
    <div>方便管理员识别。</div>
  </div>
  <div class="ml-field-row">
    <div>Base URL</div>
    <div><code>https://doudi.ai/v1</code></div>
    <div>如果控制台当前展示了其他接入地址，以控制台当前展示为准。</div>
  </div>
  <div class="ml-field-row">
    <div>API Key</div>
    <div>填写 Open WebUI 专用 Key。</div>
    <div>多人使用时不要用私人测试 Key。</div>
  </div>
  <div class="ml-field-row">
    <div>模型</div>
    <div>刷新或手动添加完整模型名。</div>
    <div>建议只开放团队常用模型。</div>
  </div>
</div>

## 第 5 步：多人使用建议

Open WebUI 如果给多人使用，要额外注意额度和权限：

- 为 Open WebUI 单独创建 Key，不和个人客户端共用。
- 给 Key 设置额度上限，避免团队误用。
- 只开放常用模型，减少误选高成本模型的概率。
- 定期查看 DouDi 控制台日志和余额。

## 常见问题

| 现象 | 处理方法 |
| --- | --- |
| 模型列表为空 | 手动添加模型名，或检查 `/v1/models` 是否可访问 |
| 用户无法调用 | 检查管理员是否把模型开放给普通用户 |
| 请求失败 | 确认服务器能访问 `doudi.ai` |
| 消耗不好区分 | 按团队或用途拆分多个 Key |
