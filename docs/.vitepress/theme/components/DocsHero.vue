<script setup>
import { withBase } from "vitepress";
import TerminalSnippet from "./TerminalSnippet.vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  command: {
    type: String,
    required: true,
  },
  actions: {
    type: Array,
    default: () => [],
  },
  logo: {
    type: String,
    default: "/logo.png",
  },
});
</script>

<template>
  <section class="dd-home-hero">
    <img class="dd-home-hero__logo" :src="withBase(logo)" alt="DouDi.ai">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <div class="dd-home-hero__actions">
      <a
        v-for="action in actions"
        :key="action.href"
        class="dd-button"
        :class="action.primary ? 'dd-button--primary' : 'dd-button--secondary'"
        :href="withBase(action.href)"
      >
        {{ action.label }}
      </a>
    </div>
    <TerminalSnippet :command="command" />
  </section>
</template>
