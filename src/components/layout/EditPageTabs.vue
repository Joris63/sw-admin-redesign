<script setup lang="ts">
  export interface TabDef {
    id: string;
    label: string;
    icon?: string;
    badge?: number;
    disabled?: boolean;
    soon?: boolean;
  }

  defineProps<{
    tabs: TabDef[];
    modelValue: string;
  }>();

  defineEmits<{
    'update:modelValue': [value: string];
  }>();
</script>

<template>
  <div class="edit-tabs">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      class="edit-tab"
      :class="{ 'edit-tab--active': modelValue === tab.id }"
      :disabled="tab.disabled"
      @click="!tab.disabled && $emit('update:modelValue', tab.id)"
    >
      <i v-if="tab.icon" class="pi" :class="tab.icon" />
      {{ tab.label }}
      <span v-if="tab.badge" class="edit-tab-badge">{{ tab.badge }}</span>
      <span v-if="tab.soon" class="tab-soon">binnenkort</span>
    </button>
  </div>
</template>
