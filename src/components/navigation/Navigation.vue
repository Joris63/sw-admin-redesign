<script setup lang="ts">
  import logoRaw from '@/assets/logo.svg?raw';
  import { ref, provide } from 'vue';
  import NavigationSection from './NavigationSection.vue';
  import { navigationSections } from './navigationData';

  const visible = ref(true);

  const openNavItem = ref<string | null>(null);
  provide('openNavItem', openNavItem);
  provide('setOpenNavItem', (label: string | null) => { openNavItem.value = label; });
</script>

<template>
  <aside
    class="flex flex-col h-screen border-r border-gray-200 bg-white shrink-0 overflow-hidden"
    :style="{ width: visible ? '20rem' : '4rem', transition: 'width 0.3s ease' }"
  >
    <!-- Header: always rendered, logo fades out when collapsed -->
    <div
      class="bg-primary-500 flex items-center h-16.5 shrink-0"
      :class="visible ? 'justify-between pl-4 pr-2' : 'justify-center'"
    >
      <span
        class="inline-flex items-center gap-2 transition-opacity duration-200"
        :class="visible ? 'opacity-100' : 'opacity-0 pointer-events-none w-0 overflow-hidden'"
      >
        <span v-html="logoRaw" class="h-8 flex items-center text-neutral-50"></span>
      </span>
      <Button
        type="button"
        @click="visible = !visible"
        :icon="visible ? 'pi pi-arrow-left' : 'pi pi-bars'"
        rounded
        variant="text"
        class="text-neutral-50! hover:text-primary-500!"
      />
    </div>

    <!-- Nav content -->
    <div class="pt-2 overflow-y-auto flex-1">
      <NavigationSection
        v-for="(section, index) in navigationSections"
        :key="section.label ?? `emptySectionLabel-${index}`"
        :section="section"
        :index="index"
        :collapsed="!visible"
      />
    </div>
  </aside>
</template>
