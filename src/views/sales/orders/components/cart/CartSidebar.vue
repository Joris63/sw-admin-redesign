<script setup lang="ts">
import { ref } from 'vue';
import { useOrderCart } from '@/composables/useOrderCart';

const props = defineProps<{
  readonly?: boolean;
  activeGroupId: string | null;
}>();

const emit = defineEmits<{
  scrollToGroup: [groupId: string];
}>();

const { groups } = useOrderCart();

const SUGGESTIONS = [
  'Badmeubel',
  'Douche',
  'Verwarming',
  'Tegels',
  'Toilet',
  'Onderhoudsmiddelen',
];

const groupMenu = ref();
const groupMenuItems = [
  { label: 'Hernoemen', icon: 'pi pi-pencil' },
  { label: 'Dupliceren', icon: 'pi pi-clone' },
  { separator: true },
  { label: 'Verwijderen', icon: 'pi pi-trash', class: 'text-red-500' },
];

function toggleGroupMenu(event: Event) {
  groupMenu.value.toggle(event);
}
</script>

<template>
  <div class="cart-sidebar flex flex-col shrink-0">
    <!-- Groups -->
    <div class="sidebar-section">
      <div class="sidebar-section-hdr">
        <span class="sidebar-label">Groepen</span>
        <Button
          v-if="!props.readonly"
          icon="pi pi-plus"
          variant="text"
          severity="secondary"
          rounded
          size="small"
          class="sidebar-add-btn"
          v-tooltip.top="'Groep toevoegen'"
        />
      </div>

      <Menu ref="groupMenu" :model="groupMenuItems" popup />
      <div class="flex flex-col gap-0.5">
        <div
          v-for="group in groups"
          :key="group.id"
          class="group sidebar-group-item"
          :class="{ 'sidebar-group-item--active': props.activeGroupId === group.id }"
          @click="emit('scrollToGroup', group.id)"
        >
          <span class="truncate text-sm flex-1">{{ group.name }}</span>
          <div class="sidebar-item-end">
            <span v-if="group.items.length > 0" class="sidebar-count group-hover:opacity-0">{{
              group.items.length
            }}</span>
            <button
              v-if="!props.readonly"
              class="sidebar-group-menu opacity-0 group-hover:opacity-100"
              @click.stop="toggleGroupMenu($event)"
            >
              <i class="pi pi-ellipsis-h" style="font-size: 0.7rem" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Suggestions -->
    <div v-if="!props.readonly" class="sidebar-section mt-4">
      <div class="sidebar-section-hdr">
        <span class="sidebar-label">Suggesties</span>
      </div>
      <div class="flex flex-col">
        <Button
          v-for="s in SUGGESTIONS"
          :key="s"
          :label="s"
          variant="text"
          severity="secondary"
          icon="pi pi-plus"
          class="justify-start! px-2!"
          size="small"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-sidebar {
  width: 17rem;
  flex-shrink: 0;
  border-right: 1px solid var(--p-gray-200);
  background: var(--p-gray-50);
  padding: 0.75rem 0.625rem 0.75rem;
  overflow-y: auto;
}

.sidebar-section {
  display: flex;
  flex-direction: column;
}

.sidebar-section-hdr {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem 0.375rem;
}

.sidebar-label {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--p-surface-400);
}

.sidebar-add-btn {
  width: 1.625rem !important;
  height: 1.625rem !important;
  min-width: 0 !important;
  padding: 0 !important;
  font-size: 0.7rem !important;
}

.sidebar-group-item {
  display: flex;
  align-items: center;
  position: relative;
  gap: 0.375rem;
  padding: 0.375rem 0.625rem;
  border-radius: 0.375rem;
  cursor: pointer;
  color: var(--p-gray-600);
  transition:
    background 0.1s ease,
    color 0.1s ease;
  font-size: 0.8125rem;
}

.sidebar-group-item:hover {
  background: var(--p-gray-100);
  color: var(--p-gray-800);
}

.sidebar-group-item--active {
  background: var(--p-primary-50);
  color: var(--p-primary-700);
}

.sidebar-group-item--active:hover {
  background: var(--p-primary-100);
}

.sidebar-item-end {
  position: relative;
  width: 1.375rem;
  height: 1.375rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
}

.sidebar-count {
  font-size: 0.7rem;
  background: var(--p-gray-200);
  color: var(--p-gray-500);
  border-radius: 999px;
  padding: 0.1rem 0.4rem;
  line-height: 1.3;
  white-space: nowrap;
  transition: opacity 0.1s ease;
}

.sidebar-group-item--active .sidebar-count {
  background: var(--p-primary-100);
  color: var(--p-primary-600);
}

.sidebar-group-menu {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  border-radius: 0.25rem;
  cursor: pointer;
  color: var(--p-gray-400);
  transition:
    background 0.1s ease,
    color 0.1s ease,
    opacity 0.1s ease;
}

.sidebar-group-menu:hover {
  background: var(--p-gray-200);
  color: var(--p-gray-700);
}
</style>
