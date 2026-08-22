# Hermes / OpenClaw 403 代理

Hermes 或 OpenClaw 遇到 `403` 时，常见原因是请求路径、鉴权头、代理规则或上游限制不匹配。

## 先确认三件事

1. API Key 是否有效。
2. Base URL 是否填 `https://doudi.ai/v1`，或控制台当前展示的接入地址。
3. 客户端发送的接口格式是否和模型支持的端点一致。

## 代理配置建议

如果工具需要代理转发，确保代理没有改掉这些内容：

- `Authorization: Bearer YOUR_API_KEY`
- `Content-Type: application/json`
- 请求路径中的 `/v1`
- 请求体里的 `model`

## 403 排查

| 现象 | 处理 |
| --- | --- |
| 立即 403 | 检查 Key、分组权限、模型是否可用 |
| 代理后 403 | 检查代理是否丢失鉴权头 |
| 某个模型 403 | 换同分组其他模型测试 |
| 某个工具 403 | 用 curl 直接请求同一个模型对比 |

## 最小对比测试

先用 curl 跳过工具本身：

```bash
curl https://doudi.ai/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"<MODEL_ID>","messages":[{"role":"user","content":"test"}]}'
```

curl 能通而工具 403，问题通常在工具或代理配置。

