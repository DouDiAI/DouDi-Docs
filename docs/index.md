---
layout: home

hero:
  name: DouDi 文档
  text: 兜底 API 接入手册
  tagline: 从注册、Key、Base URL、模型分组到工具配置，按真实接入流程整理。
  image:
    src: /logo.png
    alt: DouDi.ai
  actions:
    - theme: brand
      text: 快速开始
      link: /quick-start
    - theme: alt
      text: 查看工具接入
      link: /tools/

features:
  - title: 面向真实接入
    details: 把 API Key、Base URL、模型名、分组和额度拆开讲，先完成最小可用调用。
  - title: 偏向稳定用量
    details: 重点说明批量调用、下游接入、请求排查和成本确认，不只写面向散户的按钮教程。
  - title: 独立维护
    details: 文档站独立于兜底主服务源码，使用 VitePress 和公开数据快照长期维护。
---

<HomeDataCards />

## DouDi.ai 是什么

DouDi.ai 是一个 AI API 聚合网关。你可以把多个模型服务理解成一个统一入口，在控制台里管理账户、余额、API Key、模型、分组和请求日志。

对第一次接入的人，先抓住四个概念：

1. **控制台**：注册登录、充值、查看余额、创建 API Key。
2. **Base URL**：客户端或代码里填写的 API 地址，OpenAI Compatible 场景使用 `https://doudi.ai/v1`。
3. **模型**：决定请求能力和基础计费规则，例如文本、代码、图片或多模态模型。
4. **分组**：决定可用线路、稳定性、价格倍率和调度范围。

## 推荐阅读顺序

从 [快速开始](/quick-start) 完成一次最小请求，然后阅读 [创建 API Key](/api-key)、[模型与分组](/models-groups) 和 [计费与额度](/billing-quota)。如果你已经知道要配置哪个客户端，可以直接进入 [工具接入](/tools/)。
