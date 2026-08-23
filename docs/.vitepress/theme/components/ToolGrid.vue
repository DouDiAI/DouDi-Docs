<script setup>
import { withBase } from "vitepress";

defineProps({
  tools: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="dd-tool-grid">
    <a
      v-for="tool in tools"
      :key="tool.href"
      class="dd-tool-card"
      :href="withBase(tool.href)"
    >
      <span class="dd-tool-icon" aria-hidden="true">
        <img v-if="tool.icon" :src="withBase(tool.icon)" alt="" loading="lazy">
      </span>
      <span class="dd-tool-copy">
        <strong>{{ tool.title }}</strong>
        <em>{{ tool.description }}</em>
      </span>
    </a>
  </div>
</template>
