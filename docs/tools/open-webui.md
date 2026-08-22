# Open WebUI

Open WebUI 可把 DouDi 配成 OpenAI API 兼容后端，适合自建团队聊天入口。

## 配置值

```text
OpenAI API Base URL: https://doudi.ai/v1
OpenAI API Key: 你的 DouDi API Key
Model: 控制台可用模型名
```

## 接入步骤

1. 登录 Open WebUI 管理后台。
2. 打开 Connections 或模型服务设置。
3. 新增 OpenAI 兼容连接。
4. 填入 Base URL 和 API Key。
5. 同步或手动添加模型。
6. 用普通对话做一次测试。

## 团队部署注意

Open WebUI 是多人入口时，不要把个人测试 Key 当成团队生产 Key。建议按团队、环境或业务线拆 Key，并在 DouDi 控制台设置合适的额度。
