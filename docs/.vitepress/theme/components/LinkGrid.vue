<script setup>
import { withBase } from "vitepress";

defineProps({
  items: {
    type: Array,
    required: true,
  },
  compact: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="dd-link-grid" :class="{ 'dd-link-grid--compact': compact }">
    <a
      v-for="item in items"
      :key="item.href"
      class="dd-link-card"
      :href="withBase(item.href)"
    >
      <span v-if="item.meta" class="dd-link-card__meta">{{ item.meta }}</span>
      <strong>{{ item.title }}</strong>
      <p>{{ item.description }}</p>
    </a>
  </div>
</template>
