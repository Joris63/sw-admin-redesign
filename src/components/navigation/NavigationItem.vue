<script setup lang="ts">
  import type { NavItem } from '@/types/navigation';
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';

  interface Props {
    item: NavItem;
    isChild?: boolean;
  }

  const router = useRouter();

  const props = defineProps<Props>();

  const isOpen = ref(false);
  const hasChildren = computed(() => 'children' in props.item);

  const isOldAdminRoute = computed<boolean>(() => 'isOldAdmin' in props.item);

  const goToRoute = () => {
    if ('route' in props.item) {
      router.push(props.item.route);
    }
  };
</script>

<template>
  <template v-if="hasChildren">
    <Button
      variant="text"
      severity="contrast"
      :class="[
        'justify-start! w-full! transition-colors duration-150',
        isOpen ? 'text-primary-600!' : 'text-gray-700!',
      ]"
      @click="isOpen = !isOpen"
    >
      <i :class="`pi ${props.item.icon} text-gray-400`"></i>
      <span class="flex-1 text-left font-medium">{{ props.item.label }}</span>
      <i :class="`pi ${isOpen ? 'pi-chevron-up' : 'pi-chevron-down'} text-gray-400 text-xs`" />
    </Button>
    <div
      class="grid transition-[grid-template-rows] duration-200 ease-in-out"
      :style="{ gridTemplateRows: isOpen ? '1fr' : '0fr' }"
    >
      <div class="overflow-hidden">
        <div class="flex flex-col ml-3 pl-2 border-l-2 border-gray-200 mb-1">
          <NavigationItem
            v-for="child in (item as any).children"
            :key="child.label"
            :item="child"
            :is-child="true"
          />
        </div>
      </div>
    </div>
  </template>
  <Button
    v-else
    variant="text"
    severity="contrast"
    :class="['justify-start! w-full!', isChild ? 'text-gray-500! font-normal!' : 'text-gray-700!']"
    @click="goToRoute"
  >
    <i :class="`pi ${props.item.icon} text-gray-400`"></i>
    <span class="flex-1 text-left font-medium">{{ props.item.label }}</span>
    <i v-if="isOldAdminRoute" class="pi pi-external-link text-gray-400 text-xs" />
  </Button>
</template>

<style scoped>
  :deep(.p-button) {
    padding-top: 0.35rem;
    padding-bottom: 0.35rem;
  }
</style>
