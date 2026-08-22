# 开发指南

这里整理 DouDi.ai 的开发接入路径。第一次接入先完成一条最小请求；已经能请求成功后，再按协议、能力和稳定性需求继续阅读。

<div class="ml-route-grid">
  <a class="ml-route-card" href="/quick-start">
    <span>快速开始</span>
    <p>准备 API Key、Base URL 和模型名，用 cURL、Python 或 TypeScript 完成第一次请求。</p>
  </a>
  <a class="ml-route-card" href="/develop/authentication">
    <span>认证与 Key</span>
    <p>理解不同协议的鉴权 Header、Key 管理方式和常见认证失败原因。</p>
  </a>
  <a class="ml-route-card" href="/develop/models">
    <span>模型目录</span>
    <p>确认模型 ID、能力边界、协议入口和供应商命名方式。</p>
  </a>
  <a class="ml-route-card" href="/api/">
    <span>API 参考</span>
    <p>按 OpenAI、Anthropic、Grok / xAI 和 DouDi OpenAPI 查看端点细节。</p>
  </a>
</div>

## 接入基础

| 页面 | 适合场景 |
| --- | --- |
| [快速开始](/quick-start) | 还没有发出第一条请求，需要最短路径跑通 DouDi。 |
| [认证与 Key](/develop/authentication) | 需要确认 `Authorization`、`x-api-key`、Key 失效和权限问题。 |
| [模型目录](/develop/models) | 需要确认模型命名、协议入口和模型能力差异。 |

## 进阶指南

<div class="ml-route-grid">
  <a class="ml-route-card" href="/develop/guides/streaming">
    <span>流式响应</span>
    <p>让客户端逐段接收输出，适合聊天、代码生成和长回答。</p>
  </a>
  <a class="ml-route-card" href="/develop/guides/function-calling">
    <span>Function Calling</span>
    <p>让模型调用工具函数，适合结构化任务、查询和自动化流程。</p>
  </a>
  <a class="ml-route-card" href="/develop/guides/structured-output">
    <span>结构化输出</span>
    <p>约束模型返回 JSON 或固定字段，降低解析失败概率。</p>
  </a>
  <a class="ml-route-card" href="/develop/guides/vision">
    <span>视觉输入</span>
    <p>处理图片、多模态提示和视觉模型请求。</p>
  </a>
  <a class="ml-route-card" href="/develop/guides/error-handling">
    <span>错误处理</span>
    <p>按状态码、错误体和上游异常定位请求失败。</p>
  </a>
</div>

## 高级功能

| 页面 | 解决的问题 |
| --- | --- |
| [频率限制](/develop/guides/rate-limits) | 理解 RPM、团队级聚合限制和 `429` 重试策略。 |
| [供应商路由](/develop/advanced/provider-routing) | 按延迟、成本、供应商或模型能力选择路由策略。 |
| [故障回退](/develop/advanced/fallback) | 当首选供应商不可用时自动切换备选模型或线路。 |
| [Prompt Caching](/develop/advanced/prompt-caching) | 通过可缓存上下文降低重复请求成本。 |

## 可观测性

<div class="ml-route-grid">
  <a class="ml-route-card" href="/develop/observability/dashboard">
    <span>仪表盘</span>
    <p>查看请求趋势、错误分布和整体使用情况。</p>
  </a>
  <a class="ml-route-card" href="/develop/observability/usage-tracking">
    <span>用量追踪</span>
    <p>按 Key、模型、时间范围和业务系统追踪消耗。</p>
  </a>
  <a class="ml-route-card" href="/develop/observability/pricing">
    <span>价格观察</span>
    <p>对照模型价格、供应商价格和实际扣费变化。</p>
  </a>
</div>

## 推荐阅读顺序

1. 新接入先看 [快速开始](/quick-start)、[认证与 Key](/develop/authentication) 和 [API 概览](/api/)。
2. 做用户界面或聊天客户端时，优先补 [流式响应](/develop/guides/streaming) 和 [错误处理](/develop/guides/error-handling)。
3. 做生产服务时，继续补 [频率限制](/develop/guides/rate-limits)、[故障回退](/develop/advanced/fallback) 和 [用量追踪](/develop/observability/usage-tracking)。
