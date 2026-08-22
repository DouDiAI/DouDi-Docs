<script setup>
import statusSnapshot from "../../../data/doudi-status.json";
import pricingSnapshot from "../../../data/doudi-pricing.json";

const statusData = statusSnapshot?.data ?? {};
const pricingData = pricingSnapshot?.data ?? [];
const pricingList = Array.isArray(pricingData)
  ? pricingData
  : Array.isArray(pricingData?.data)
    ? pricingData.data
    : [];

const modelCount = pricingList.length;
const updatedText = statusSnapshot?.fetchedAt
  ? new Date(statusSnapshot.fetchedAt).toLocaleString("zh-CN", {
      dateStyle: "medium",
      timeStyle: "short",
    })
  : "等待首次同步";

const cards = [
  {
    title: "API 地址",
    value: statusData.api_base_url || "https://doudi.ai/v1",
    details: "兼容 OpenAI 的客户端优先填写这个 Base URL。",
  },
  {
    title: "模型快照",
    value: modelCount > 0 ? `${modelCount} 个模型` : "以控制台为准",
    details: "构建时会尝试从公开价格接口同步模型列表。",
  },
  {
    title: "适合场景",
    value: "下游与批量接入",
    details: "更重视稳定线路、清晰计费和可排查的请求链路。",
  },
  {
    title: "数据更新",
    value: updatedText,
    details: "运行 pnpm data:sync 可刷新本地公开快照。",
  },
];
</script>

<template>
  <section class="dd-home-cards" aria-label="DouDi 文档概览">
    <article v-for="card in cards" :key="card.title" class="dd-home-card">
      <p>{{ card.title }}</p>
      <strong>{{ card.value }}</strong>
      <span>{{ card.details }}</span>
    </article>
  </section>
</template>
