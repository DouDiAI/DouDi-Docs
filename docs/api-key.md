# 创建 API Key

API Key 是你调用 DouDi 的凭证。任何拿到 Key 的人都可能消耗你的额度，所以它应该像密码一样保管。

## 创建步骤

1. 打开 [令牌页面](https://doudi.ai)。
2. 点击创建或添加令牌。
3. 填写名称，建议用用途命名，例如 `claude-code`、`cherry-studio`、`test-script`。
4. 选择分组。新手优先选择 `auto`，需要固定线路时再选择具体分组。
5. 根据需要设置额度限制、过期时间或允许模型范围。
6. 创建后复制 Key，并保存到你的密码管理器或本地安全位置。

::: warning 注意
不要把 API Key 写进公开仓库、截图、聊天记录或文档示例。提交代码前请检查 `.env`、配置文件和终端历史。
:::

## 分组怎么选

公开配置显示 DouDi 支持多个分组，并且默认启用自动分组。对新手来说：

- `auto`：适合大多数情况，失败时可按配置切换可用分组。
- `Codex-Basic` / `Codex-Value` / `Codex-Official`：偏 Codex 场景，不同分组在消耗、稳定性和限制上不同。
- `CC-MAX` / `CC-KIRO`：偏 Claude Code 或 Anthropic 相关场景。
- `生图视频专用分组`：适合图像或视频任务。

具体名称和倍率会变化，最终以 DouDi 控制台当前显示的可用分组和模型为准。

## 建议的 Key 管理方式

| 场景 | 建议 |
| --- | --- |
| 日常客户端 | 单独创建一个长期 Key，设置合理额度上限 |
| 测试脚本 | 创建低额度 Key，测试完可禁用 |
| 多个客户端 | 每个客户端单独一个 Key，方便排查用量 |
| 团队共享 | 不共享个人 Key，按成员或项目分开创建 |
| 高风险实验 | 使用单独 Key 和独立额度上限 |

## 在代码中使用 Key

不要直接把 Key 写死在代码里。推荐放在环境变量：

```bash
DOUDI_API_KEY=sk-your-key
DOUDI_BASE_URL=https://doudi.ai/v1
```

Node.js 示例：

```js
const response = await fetch(`${process.env.DOUDI_BASE_URL}/chat/completions`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.DOUDI_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "<MODEL_ID>",
    messages: [{ role: "user", content: "你好" }],
  }),
});

const data = await response.json();
console.log(data);
```

## 什么时候需要重新生成 Key

- 怀疑 Key 泄露。
- Key 被写入公开代码仓库。
- 某个客户端异常消耗额度。
- 想把旧分组迁移到新分组。
- 想按不同用途重新拆分额度限制。
