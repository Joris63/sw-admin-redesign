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
@reference "tailwindcss";
  .customize-btn {
    @apply flex items-center justify-center border-none bg-none text-[var(--p-surface-400)] cursor-pointer rounded-md shrink-0 w-8 h-8;
    font-size: 0.9rem;
    border: none;
    background: none;
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
    @apply m-0 mb-2 font-bold uppercase text-[var(--p-surface-400)];
    font-size: 0.6875rem;
    letter-spacing: 0.06em;
  }

  .customize-list {
    @apply flex flex-col gap-0.5 -mx-3 -mb-3;
  }

  .customize-item {
    @apply flex items-center cursor-pointer text-sm text-[var(--p-surface-700)] gap-2.5 px-3 py-2;
    transition: background 0.1s;
  }

  .customize-item:hover {
    background: var(--p-surface-50);
  }

  .customize-item--required {
    @apply opacity-[0.65] cursor-default;
  }

  .customize-item--required:hover {
    background: transparent;
  }

  .customize-item__lock {
    @apply ml-auto text-[var(--p-surface-400)];
    font-size: 0.65rem;
  }

  .customize-empty {
    @apply text-[var(--p-surface-400)] text-center italic p-3;
    font-size: 0.8125rem;
  }
</style>
