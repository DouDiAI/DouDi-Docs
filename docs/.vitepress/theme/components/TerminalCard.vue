<script setup>
defineProps({
  title: {
    type: String,
    default: "terminal",
  },
  lines: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <figure class="dd-terminal-card">
    <figcaption class="dd-terminal-card__header">
      <span class="dd-traffic" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </span>
      <span>{{ title }}</span>
    </figcaption>
    <pre class="dd-terminal-card__body"><code><span
      v-for="(line, index) in lines"
      :key="`${line.text}-${index}`"
      class="dd-terminal-line"
      :class="line.kind ? `dd-terminal-line--${line.kind}` : ''"
    ><span v-if="line.prompt" class="dd-terminal-prompt">{{ line.prompt }}</span>{{ line.text }}</span></code></pre>
  </figure>
</template>
