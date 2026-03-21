<script setup lang="ts">
  import { ref, computed } from 'vue';
  import type { FilterConfig } from '@/types/filters';

  const props = defineProps<{
    allFilterDefs: FilterConfig[];
    activeKeys: string[];
  }>();

  const emit = defineEmits<{
    'add-filter': [key: string];
    'remove-filter': [key: string];
  }>();

  const popoverRef = ref<any>(null);

  const items = computed(() =>
    props.allFilterDefs.map((f) => ({
      ...f,
      active: f.required || props.activeKeys.includes(f.key),
    }))
  );

  function toggle(event: Event) {
    popoverRef.value?.toggle(event);
  }

  function onToggleItem(key: string, active: boolean) {
    if (active) emit('remove-filter', key);
    else emit('add-filter', key);
  }

  defineExpose({ toggle });
</script>

<template>
  <button class="customize-btn" title="Filters aanpassen" @click="toggle($event)">
    <i class="pi pi-sliders-h" />
  </button>
  <Popover ref="popoverRef">
    <div class="customize-popover">
      <p class="customize-popover__title">Filters aanpassen</p>
      <div class="customize-list">
        <label
          v-for="item in items"
          :key="item.key"
          class="customize-item"
          :class="{ 'customize-item--required': item.required }"
        >
          <Checkbox
            :model-value="item.active"
            :binary="true"
            :disabled="item.required"
            @update:model-value="!item.required && onToggleItem(item.key, item.active)"
          />
          <span>{{ item.label }}</span>
          <i v-if="item.required" class="pi pi-lock customize-item__lock" />
        </label>
        <div v-if="!items.length" class="customize-empty">
          Geen filters beschikbaar
        </div>
      </div>
    </div>
  </Popover>
</template>

<style scoped>
  .customize-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border: none;
    background: none;
    color: var(--p-surface-400);
    cursor: pointer;
    border-radius: 0.375rem;
    font-size: 0.9rem;
    flex-shrink: 0;
    transition: color 0.15s, background 0.15s;
  }

  .customize-btn:hover {
    color: var(--p-surface-700);
    background: var(--p-surface-100);
  }

  .customize-popover {
    min-width: 13rem;
  }

  .customize-popover__title {
    font-size: 0.6875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--p-surface-400);
    margin: 0 0 0.5rem;
  }

  .customize-list {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    margin: 0 -0.75rem -0.75rem;
  }

  .customize-item {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    font-size: 0.875rem;
    color: var(--p-surface-700);
    transition: background 0.1s;
  }

  .customize-item:hover {
    background: var(--p-surface-50);
  }

  .customize-item--required {
    opacity: 0.65;
    cursor: default;
  }

  .customize-item--required:hover {
    background: transparent;
  }

  .customize-item__lock {
    margin-left: auto;
    font-size: 0.65rem;
    color: var(--p-surface-400);
  }

  .customize-empty {
    padding: 0.75rem;
    font-size: 0.8125rem;
    color: var(--p-surface-400);
    text-align: center;
    font-style: italic;
  }
</style>
