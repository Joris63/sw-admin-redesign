<script setup lang="ts">
  defineProps<{ title: string }>();
</script>

<template>
  <div class="flex items-center justify-between">
    <h1 class="text-2xl font-semibold text-surface-800">{{ title }}</h1>
    <slot name="actions" />
  </div>
</template>
