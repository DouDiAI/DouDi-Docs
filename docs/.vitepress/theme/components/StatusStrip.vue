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

const updatedText = statusSnapshot?.fetchedAt
  ? new Intl.DateTimeFormat("zh-CN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Shanghai",
    }).format(new Date(statusSnapshot.fetchedAt))
  : "等待同步";

const items = [
  {
    label: "Base URL",
    value: statusData.api_base_url || "https://doudi.ai/v1",
  },
  {
    label: "模型快照",
    value: pricingList.length > 0 ? `${pricingList.length} 个模型` : "以控制台为准",
  },
  {
    label: "协议入口",
    value: "OpenAI/Anthropic/Grok",
  },
  {
    label: "数据更新时间",
    value: updatedText,
  },
];
</script>

<template>
  <dl class="dd-status-strip" aria-label="DouDi 接入信息">
    <div v-for="item in items" :key="item.label">
      <dt>{{ item.label }}</dt>
      <dd>{{ item.value }}</dd>
    </div>
  </dl>
</template>
