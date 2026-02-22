<script setup lang="ts">
  import type { NavigationSection } from '@/types/navigation';
  import NavigationItem from './NavigationItem.vue';

  interface Props {
    section: NavigationSection;
    index: number
  }

  const props = defineProps<Props>();
</script>

<template>
  <div class="px-2" :class="index === 0 ? 'mb-2' : 'my-2'">
    <div v-if="props.section.label" class="px-2 pt-1 pb-1">
      <span class="text-primary-500 text-xs font-bold tracking-widest uppercase">
        {{ props.section.label }}
      </span>
    </div>
    <div class="flex flex-col align-baseline just">
      <NavigationItem v-for="item in props.section.navItems" :key="item.label" :item="item" />
    </div>
  </div>
</template>
