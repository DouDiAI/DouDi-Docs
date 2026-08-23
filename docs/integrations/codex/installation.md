# 安装 Codex CLI

Codex CLI 是 OpenAI 推出的 AI 编码命令行工具，可在终端中直接进行 AI 辅助编码。

如果你已经安装 Codex 本地客户端，并且终端中可以运行 `codex` 命令，可直接进入下一步配置模型供应商。

## 前置要求

*   [DouDi.ai API Key](https://doudi.ai/keys)  （注册即可获取）
*   [Node.js](https://nodejs.org)  （建议 v18+）

## 安装

```
npm install -g @openai/codex
```

![安装 Codex CLI](/imported/haoai/integrations-codex-installation-01.webp)

## 验证安装

```
codex --version
# 正常输出版本号即表示安装成功
```

![验证安装](/imported/haoai/integrations-codex-installation-02.webp)

如提示 `command not found`，请确认 Node.js 已正确安装（`node --version`），然后重新运行安装命令。

## 下一步

*   [配置模型供应商](/integrations/codex/model-provider) — 使用 CC Switch 管理 DouDi.ai API Key 和请求地址

> 本页按 DouDi.ai 接入语境整理，覆盖同类教程的结构和步骤。
> 实际模型、分组、价格和权限以 DouDi 控制台为准。
