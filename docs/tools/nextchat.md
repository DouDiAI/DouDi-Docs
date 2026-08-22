# NextChat 网页版

NextChat 是一个开源聊天网页应用，可以在浏览器里接入 OpenAI 兼容接口。对新手来说，直接使用网页版就可以，不需要下载安装 Windows 软件。

## 先说明下载问题

你在 GitHub Releases 里看到的两个文件是：

- `Source code (zip)`
- `Source code (tar.gz)`

它们都是项目源码，不是 Windows 安装包，不能直接双击安装。当前页面没有提供现成的 `.exe` 桌面安装程序。

::: tip
新手不要下载这两个源码包。直接打开 NextChat 网页版即可；如果一定要使用本地桌面版，就需要自己编译源码，步骤比较复杂。
:::

## 打开地址

- 官方网站：[https://nextchat.club](https://nextchat.club)
- 网页体验入口：[https://app.nextchat.dev](https://app.nextchat.dev)
- 官方 GitHub：[https://github.com/ChatGPTNextWeb/NextChat](https://github.com/ChatGPTNextWeb/NextChat)
- GitHub Releases：[https://github.com/ChatGPTNextWeb/NextChat/releases](https://github.com/ChatGPTNextWeb/NextChat/releases)

打开网页后，直接在浏览器中使用即可。浏览器版不需要安装，也不会在 Windows 开始菜单里出现一个 NextChat 软件。

## 配置前准备

先准备好：

1. DouDi 控制台创建的 API Key。
2. DouDi 的 OpenAI 兼容接口地址。
3. DouDi 控制台里的完整模型 ID。

推荐先使用：

```text
Base URL: https://doudi.ai/v1
```

如果你的 DouDi 控制台展示了其他接入域名，以控制台当前显示的地址为准，不要照抄其他站点的旧域名。

## 第 1 步：打开网页版

用浏览器打开：

```text
https://app.nextchat.dev
```

如果这个入口暂时无法访问，也可以先打开官网，再从官网进入网页版。

网页版本的设置入口通常在左下角或侧边栏中，名称可能显示为 `设置`、齿轮图标或 `Settings`。不同版本的按钮位置可能略有区别。

## 第 2 步：找到 OpenAI 兼容配置

进入设置后，寻找下面其中一种入口：

- `OpenAI`
- `OpenAI Compatible`
- `自定义接口`
- `模型提供商`

NextChat 不同版本的文字可能不完全一样，但目标都是找到可以填写 `API Key`、`Base URL` 和 `模型` 的页面。

## 第 3 步：填写 DouDi

按下面填写：

| 配置项 | 填写内容 |
| --- | --- |
| API Key | 粘贴 DouDi 控制台创建的 Key |
| Base URL | `https://doudi.ai/v1` |
| 模型 | 从 DouDi 控制台复制完整模型 ID |

如果网页把 `Base URL` 写成 `API Host`、`API 地址` 或 `接口地址`，也是填写同一个地址。

::: warning
不要把真实 API Key 发给别人，也不要把 Key 写进公开截图、公开仓库或网页前端代码。
:::

## 第 4 步：保存并测试

保存配置后，新建一个聊天，发送：

```text
请只回复：NextChat 已连接 DouDi
```

能正常回复，就说明网页版接入成功。

如果页面要求先设置默认模型，选择刚刚填写的完整模型 ID，再重新新建会话测试。

## 如果你想自己部署

自己部署 NextChat 时，通常需要在 Vercel、Docker 或其他部署平台里配置环境变量。常见思路是：

```text
OPENAI_API_KEY=你的 DouDi Key
BASE_URL=https://doudi.ai/v1
```

具体变量名称要以你使用的 NextChat 版本和官方部署说明为准。新手先使用网页版，不需要处理这些部署变量。

## 常见问题

| 现象 | 处理方法 |
| --- | --- |
| GitHub 只有两个源码包 | 这是正常情况，当前 Release 没有现成 Windows 安装包，直接用网页版 |
| 网页打不开 | 换浏览器、检查网络，或先确认代理软件是否正常 |
| 提示 API Key 错误 | 重新复制 DouDi Key，检查前后是否有空格 |
| 提示模型不存在 | 从DouDi 控制台重新复制完整模型 ID |
| 提示接口地址错误 | 确认地址包含 `https://`，并按当前控制台要求保留 `/v1` |
| 配置后没有回复 | 检查模型是否已选中、Key 是否有额度、网页是否仍处于登录或授权状态 |

## 配置检查清单

<div class="ml-checklist">

- 已打开 NextChat 网页版。
- 没有误把 `Source code` 源码包当成安装包。
- 已找到 OpenAI 或自定义接口配置。
- 已填写 DouDi Key。
- 已填写正确的 Base URL。
- 已填写 DouDi 当前可用的完整模型 ID。
- 已发送短消息完成测试。

</div>
