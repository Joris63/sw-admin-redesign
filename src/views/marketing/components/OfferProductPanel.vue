<script setup lang="ts">
  import { computed, watch, ref } from 'vue';
  import type {
    OfferProduct as Product,
    OfferGroup as Group,
    PendingGroupChanges,
    PendingSiteChange,
  } from '@/types/offer';
  import OfferProductTable from './offer/OfferProductTable.vue';
  import OfferPendingChanges from './offer/OfferPendingChanges.vue';

  const props = defineProps<{
    products: Product[];
    selectedGroupId: number | null;
    selectedPath: Group[];
    pendingChanges: Record<number, PendingGroupChanges>;
    pendingSiteChanges: PendingSiteChange[];
    isVerlopen: boolean;
    groupName: string;
  }>();

  const emit = defineEmits<{
    (e: 'add-products'): void;
    (e: 'delete-products', ids: number[]): void;
    (e: 'delete-all-products'): void;
    (e: 'delete-filtered-products', ids: number[]): void;
    (e: 'delete-csv-products', codes: Set<string>): void;
    (e: 'select-group', id: number): void;
    (e: 'edit-group', id: number): void;
    (e: 'delete-group', id: number): void;
  }>();

  const pendingChangesRef = ref<InstanceType<typeof OfferPendingChanges> | null>(null);

  const selectedGroupPending = computed((): PendingGroupChanges | null =>
    props.selectedGroupId !== null ? (props.pendingChanges[props.selectedGroupId] ?? null) : null
  );

  watch(
    () => props.selectedGroupId,
    () => { pendingChangesRef.value?.reset(); }
  );
</script>

<template>
  <div class="products-panel">
    <template v-if="selectedGroupId !== null">
      <!-- breadcrumb header + group actions -->
      <div class="products-panel__header">
        <div class="products-nav">
          <template v-for="(pathNode, i) in selectedPath" :key="pathNode.id">
            <button class="nav-crumb" :class="{ 'nav-crumb--leaf': i === selectedPath.length - 1 }"
              @click="i < selectedPath.length - 1 ? emit('select-group', pathNode.id) : undefined">
              {{ pathNode.name }}
            </button>
            <i v-if="i < selectedPath.length - 1" class="pi pi-chevron-right nav-sep" />
          </template>
        </div>
        <div class="header-group-actions">
          <Button label="Bewerken" icon="pi pi-pencil" severity="secondary" text size="small" @click="emit('edit-group', selectedGroupId!)" />
          <Button v-if="!isVerlopen" label="Verwijderen" icon="pi pi-trash" severity="danger" text size="small" @click="emit('delete-group', selectedGroupId!)" />
        </div>
      </div>

      <!-- wijzigingen vannacht strip -->
      <Transition name="fade">
        <OfferPendingChanges
          v-if="selectedGroupPending"
          ref="pendingChangesRef"
          :pending="selectedGroupPending"
        />
      </Transition>

      <!-- toolbar + table + selection bar -->
      <OfferProductTable
        :products="products"
        :selected-group-id="selectedGroupId"
        :is-verlopen="isVerlopen"
        :group-name="groupName"
        @add-products="emit('add-products')"
        @delete-products="emit('delete-products', $event)"
        @delete-all-products="emit('delete-all-products')"
        @delete-filtered-products="emit('delete-filtered-products', $event)"
        @delete-csv-products="emit('delete-csv-products', $event)"
      />
    </template>
  </div>
</template>

<style scoped>
  .products-panel { flex: 1; min-width: 0; display: flex; flex-direction: column; overflow: clip; position: relative; }
  .products-panel__header { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; padding: 0.5rem 0.75rem 0.5rem 1.25rem; min-height: 2.75rem; flex-shrink: 0; background: var(--p-gray-50); border-bottom: 1px solid var(--p-gray-100); }
  .products-nav { display: flex; align-items: center; gap: 0.375rem; flex: 1; min-width: 0; }
  .nav-crumb { font-size: 0.8125rem; font-weight: 500; color: var(--p-gray-400); background: none; border: none; padding: 0; cursor: pointer; max-width: 16rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; transition: color 0.1s; }
  .nav-crumb:hover { color: var(--p-gray-700); }
  .nav-crumb--leaf { color: var(--p-surface-700); cursor: default; }
  .nav-sep { font-size: 0.625rem; color: var(--p-gray-300); }
  .header-group-actions { display: flex; align-items: center; gap: 0.125rem; flex-shrink: 0; }
  .fade-enter-active, .fade-leave-active { transition: opacity 0.15s ease; }
  .fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
