# DouDi Docs

DouDi.ai 面向用户和下游渠道的中文文档站。站点使用 VitePress，放在 `E:\Project\Github_DouDi\DouDi-Docs`，不改动兜底主服务源码。

## 本地开发

```bash
pnpm install
pnpm data:sync
pnpm docs:dev
```

## 构建

```bash
pnpm docs:build
```

## 数据来源

`scripts/sync-public-data.mjs` 会尝试读取 DouDi 的公开接口，并把快照写入 `docs/data/`。如果当前网络访问失败，脚本会保留已有快照，文档仍可构建。

- `https://doudi.ai/api/status`
- `https://doudi.ai/api/pricing`
