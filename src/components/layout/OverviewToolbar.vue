<script setup lang="ts">
  withDefaults(defineProps<{
    count: number;
    label: string;
    rows?: number;
  }>(), { rows: 15 });
</script>

<template>
  <div class="flex items-center justify-between gap-3">
    <span class="text-xs font-semibold uppercase tracking-wider text-gray-400 whitespace-nowrap">
      {{ count.toLocaleString('nl-NL') }} {{ label }}
    </span>
    <Paginator
      v-if="count > rows"
      :rows="rows"
      :total-records="count"
      :rows-per-page-options="[15, 30, 50]"
      class="p-0! border-0! bg-transparent!"
      template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
    />
  </div>
</template>
