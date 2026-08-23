<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  command: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "$",
  },
});

const copied = ref(false);
const buttonText = computed(() => (copied.value ? "已复制" : "复制"));

const copyCommand = async () => {
  try {
    await navigator.clipboard.writeText(props.command);
    copied.value = true;
    window.setTimeout(() => {
      copied.value = false;
    }, 1600);
  } catch {
    copied.value = false;
  }
};
</script>

<template>
  <div class="dd-install-snippet" role="group" aria-label="可复制命令">
    <span class="dd-install-snippet__prompt">{{ label }}</span>
    <code>{{ command }}</code>
    <button type="button" @click="copyCommand">{{ buttonText }}</button>
  </div>
</template>
