<script setup>
import pricingSnapshot from "../../../data/doudi-pricing.json";

const rawData = pricingSnapshot?.data ?? [];
const list = Array.isArray(rawData)
  ? rawData
  : Array.isArray(rawData?.data)
    ? rawData.data
    : [];

const models = list
  .map((item) => ({
    name: item.model_name || item.name || item.model || "未命名模型",
    type: item.type || item.model_type || item.owner || "模型",
    ratio: item.model_ratio ?? item.ratio ?? item.quota_type ?? null,
    groups: item.groups || item.available_groups || item.usable_groups || null,
  }))
  .slice(0, 24);
</script>

<template>
  <section class="dd-model-snapshot" aria-label="模型公开快照">
    <div class="dd-model-snapshot__head">
      <h2>公开模型快照</h2>
      <p>
        这里展示构建时同步到的公开模型信息。若为空，请以 DouDi 控制台的模型广场和价格页为准。
      </p>
    </div>

    <div v-if="models.length" class="dd-model-grid">
      <article v-for="model in models" :key="model.name" class="dd-model-card">
        <strong>{{ model.name }}</strong>
        <span>{{ model.type }}</span>
        <small v-if="model.ratio !== null">倍率: {{ model.ratio }}</small>
        <small v-else>倍率以控制台为准</small>
      </article>
    </div>

    <div v-else class="dd-empty-state">
      <strong>本地还没有公开模型快照</strong>
      <p>在项目根目录运行 <code>pnpm data:sync</code> 后重新构建，页面会自动读取最新快照。</p>
    </div>
  </section>
</template>
