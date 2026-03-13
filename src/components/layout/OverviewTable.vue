<script setup lang="ts">
  defineOptions({ inheritAttrs: false });
</script>

<template>
  <DataTable
    v-bind="$attrs"
    class="overview-table"
    :pt="{ thead: { class: 'border-b border-gray-200' } }"
  >
    <slot />
  </DataTable>
</template>
