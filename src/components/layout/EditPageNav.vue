<script setup lang="ts">
  export interface NavItem {
    id: string;
    label: string;
    icon?: string;
    badge?: number;
  }

  export interface NavGroup {
    label: string;
    items: NavItem[];
  }

  defineProps<{
    groups: NavGroup[];
    modelValue: string;
  }>();

  defineEmits<{
    'update:modelValue': [value: string];
  }>();
</script>

<template>
  <nav class="edit-nav">
    <template v-for="group in groups" :key="group.label">
      <div class="edit-nav-group">{{ group.label }}</div>
      <button
        v-for="item in group.items"
        :key="item.id"
        class="edit-nav-item"
        :class="{ 'edit-nav-item--active': modelValue === item.id }"
        @click="$emit('update:modelValue', item.id)"
      >
        <i v-if="item.icon" class="pi edit-nav-icon" :class="item.icon" />
        <span>{{ item.label }}</span>
        <span v-if="item.badge" class="edit-nav-badge">{{ item.badge }}</span>
      </button>
    </template>
  </nav>
</template>
