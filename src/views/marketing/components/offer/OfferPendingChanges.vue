<script setup lang="ts">
  import { ref, computed } from 'vue';
  import type { PendingGroupChanges } from '@/types/offer';

  const props = defineProps<{
    pending: PendingGroupChanges;
  }>();

  const wijzigingenOpen = ref(false);
  const showAllProducts = ref(false);
  const showProductsDialog = ref(false);
  const dialogSearch = ref('');

  const PRODUCT_PREVIEW = 6;
  const LARGE_THRESHOLD = 50;

  const pendingAddCount = computed(() => {
    if (props.pending.groupAction) return 0;
    return props.pending.options.filter((c) => c.action === 'add').length + props.pending.products.filter((c) => c.action === 'add').length;
  });
  const pendingRemoveCount = computed(() => {
    if (props.pending.groupAction) return 0;
    return props.pending.options.filter((c) => c.action === 'remove').length + props.pending.products.filter((c) => c.action === 'remove').length;
  });
  const pendingProductAddCount = computed(() => props.pending.products.filter((c) => c.action === 'add').length);
  const pendingProductRemoveCount = computed(() => props.pending.products.filter((c) => c.action === 'remove').length);
  const totalPendingProducts = computed(() => props.pending.products.length);
  const isLargeList = computed(() => totalPendingProducts.value > LARGE_THRESHOLD);
  const visiblePendingProducts = computed(() => {
    const list = props.pending.products;
    return showAllProducts.value ? list : list.slice(0, PRODUCT_PREVIEW);
  });
  const hiddenPendingCount = computed(() => Math.max(0, totalPendingProducts.value - PRODUCT_PREVIEW));
  const dialogProducts = computed(() => {
    const list = props.pending.products;
    if (!dialogSearch.value.trim()) return list;
    const q = dialogSearch.value.trim().toLowerCase();
    return list.filter((p) => p.code.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
  });

  function reset() {
    wijzigingenOpen.value = false;
    showAllProducts.value = false;
    showProductsDialog.value = false;
    dialogSearch.value = '';
  }

  defineExpose({ reset });
</script>

<template>
  <div class="wijz-strip">
    <button class="wijz-hdr" @click="wijzigingenOpen = !wijzigingenOpen">
      <div class="wijz-hdr__left">
        <i class="pi pi-clock wijz-clock" />
        <span class="wijz-hdr__label">Vannacht</span>
        <template v-if="pending.groupAction">
          <span class="wijz-badge" :class="pending.groupAction === 'remove' ? 'wijz-badge--remove' : 'wijz-badge--add'">
            Groep {{ pending.groupAction === 'remove' ? 'verwijderd' : 'toegevoegd' }}
          </span>
        </template>
        <template v-else>
          <span v-if="pendingAddCount" class="wijz-badge wijz-badge--add">+{{ pendingAddCount }}</span>
          <span v-if="pendingRemoveCount" class="wijz-badge wijz-badge--remove">−{{ pendingRemoveCount }}</span>
        </template>
      </div>
      <i class="pi wijz-chevron" :class="wijzigingenOpen ? 'pi-chevron-up' : 'pi-chevron-down'" />
    </button>

    <Transition name="collapse">
      <div v-if="wijzigingenOpen" class="wijz-list">
        <template v-if="pending.groupAction">
          <div class="wijz-group-action" :class="`wijz-group-action--${pending.groupAction}`">
            <i :class="`pi ${pending.groupAction === 'remove' ? 'pi-trash' : 'pi-plus-circle'}`" />
            <span>Deze groep wordt vannacht {{ pending.groupAction === 'remove' ? 'verwijderd' : 'toegevoegd' }}</span>
          </div>
        </template>

        <template v-if="pending.options.length">
          <div v-if="pending.groupAction" class="wijz-separator" />
          <div class="wijz-section-label">Opties</div>
          <div class="wijz-options">
            <div v-for="opt in pending.options" :key="opt.label + opt.action" class="wijz-opt-chip" :class="`wijz-opt-chip--${opt.action}`">
              <i :class="`pi ${opt.icon} wijz-opt-icon`" />
              <span class="wijz-opt-label">{{ opt.label }}</span>
              <span class="wijz-opt-action">{{ opt.action === 'add' ? 'toegevoegd' : 'verwijderd' }}</span>
            </div>
          </div>
          <div v-if="pending.products.length" class="wijz-separator" />
        </template>

        <template v-if="pending.products.length">
          <div class="wijz-section-label">
            Producten
            <span class="wijz-prod-counts">
              <span v-if="pendingProductAddCount" class="wijz-prod-count--add">+{{ pendingProductAddCount }}</span>
              <span v-if="pendingProductRemoveCount" class="wijz-prod-count--remove">−{{ pendingProductRemoveCount }}</span>
            </span>
          </div>
          <div v-for="change in visiblePendingProducts" :key="change.code + change.action" class="wijz-item" :class="`wijz-item--${change.action}`">
            <span class="wijz-sign">{{ change.action === 'add' ? '+' : '−' }}</span>
            <span class="wijz-code">{{ change.code }}</span>
            <span class="wijz-merk">{{ change.brand }}</span>
          </div>
          <button v-if="!showAllProducts && hiddenPendingCount > 0" class="wijz-show-more"
            @click="isLargeList ? (showProductsDialog = true) : (showAllProducts = true)">
            en {{ hiddenPendingCount }} meer&hellip;
          </button>
        </template>
      </div>
    </Transition>
  </div>

  <Dialog v-model:visible="showProductsDialog" modal :header="`Wijzigingen vannacht · ${totalPendingProducts} producten`" :style="{ width: '480px' }" @hide="dialogSearch = ''">
    <div class="pdlg-body">
      <div class="pdlg-summary">
        <span v-if="pendingProductAddCount" class="pdlg-sum--add">+{{ pendingProductAddCount }} toegevoegd</span>
        <span v-if="pendingProductAddCount && pendingProductRemoveCount" class="pdlg-sum-sep">·</span>
        <span v-if="pendingProductRemoveCount" class="pdlg-sum--remove">−{{ pendingProductRemoveCount }} verwijderd</span>
      </div>
      <IconField class="pdlg-search">
        <InputIcon class="pi pi-search" />
        <InputText v-model="dialogSearch" placeholder="Zoeken op code of merk…" size="small" class="w-full" autofocus />
      </IconField>
      <div class="pdlg-list">
        <div v-for="change in dialogProducts" :key="change.code + change.action" class="pdlg-item" :class="`pdlg-item--${change.action}`">
          <span class="pdlg-sign">{{ change.action === 'add' ? '+' : '−' }}</span>
          <span class="pdlg-code">{{ change.code }}</span>
          <span class="pdlg-merk">{{ change.brand }}</span>
        </div>
        <div v-if="dialogProducts.length === 0" class="pdlg-empty">Geen resultaten gevonden</div>
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
  .wijz-strip { flex-shrink: 0; border-bottom: 1px solid var(--p-gray-100); }
  .wijz-hdr { display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 0.375rem 1rem; background: none; border: none; cursor: pointer; text-align: left; transition: background 0.1s; }
  .wijz-hdr:hover { background: var(--p-gray-50); }
  .wijz-hdr__left { display: flex; align-items: center; gap: 0.4rem; }
  .wijz-hdr__label { font-size: 0.75rem; font-weight: 500; color: var(--p-gray-500); }
  .wijz-clock { font-size: 0.75rem; color: var(--p-gray-400); }
  .wijz-chevron { font-size: 0.6rem; color: var(--p-gray-400); }
  .wijz-badge { display: inline-flex; align-items: center; padding: 0.05rem 0.4rem; border-radius: 999px; font-size: 0.73rem; font-weight: 700; line-height: 1.4; }
  .wijz-badge--add { background: var(--p-green-100); color: var(--p-green-700); }
  .wijz-badge--remove { background: var(--p-red-100); color: var(--p-red-600); }
  .wijz-list { display: flex; flex-direction: column; padding: 0 1rem 0.625rem; gap: 0.2rem; max-height: 16rem; overflow-y: auto; }
  .wijz-show-more { align-self: flex-start; margin-top: 0.1rem; padding: 0; background: none; border: none; cursor: pointer; font-size: 0.75rem; color: var(--p-primary-500); font-weight: 500; }
  .wijz-show-more:hover { text-decoration: underline; }
  .wijz-group-action { display: flex; align-items: center; gap: 0.5rem; padding: 0.35rem 0.5rem; border-radius: 0.375rem; font-size: 0.8125rem; font-weight: 500; }
  .wijz-group-action--remove { background: var(--p-red-50); color: var(--p-red-600); }
  .wijz-group-action--add { background: var(--p-green-50); color: var(--p-green-700); }
  .wijz-group-action .pi { font-size: 0.75rem; }
  .wijz-section-label { display: flex; align-items: center; gap: 0.375rem; font-size: 0.6875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--p-gray-400); padding: 0.25rem 0 0.125rem; }
  .wijz-prod-counts { display: flex; gap: 0.25rem; }
  .wijz-prod-count--add { color: var(--p-green-600); font-weight: 700; }
  .wijz-prod-count--remove { color: var(--p-red-500); font-weight: 700; }
  .wijz-separator { height: 1px; background: var(--p-gray-100); margin: 0.375rem 0; }
  .wijz-options { display: flex; flex-wrap: wrap; gap: 0.375rem; padding-bottom: 0.125rem; }
  .wijz-opt-chip { display: inline-flex; align-items: center; gap: 0.3rem; padding: 0.2rem 0.55rem; border-radius: 999px; font-size: 0.75rem; font-weight: 500; border: 1px solid transparent; }
  .wijz-opt-chip--add { background: var(--p-green-50); color: var(--p-green-700); border-color: var(--p-green-200); }
  .wijz-opt-chip--remove { background: var(--p-red-50); color: var(--p-red-600); border-color: var(--p-red-200); }
  .wijz-opt-icon { font-size: 0.65rem; }
  .wijz-opt-action { font-weight: 400; opacity: 0.7; }
  .wijz-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8125rem; }
  .wijz-sign { font-weight: 700; width: 0.75rem; text-align: center; flex-shrink: 0; }
  .wijz-item--add .wijz-sign { color: var(--p-green-600); }
  .wijz-item--remove .wijz-sign { color: var(--p-red-500); }
  .wijz-code { font-family: monospace; font-size: 0.8rem; font-weight: 500; color: var(--p-surface-700); }
  .wijz-merk { color: var(--p-gray-400); font-size: 0.75rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .collapse-enter-active, .collapse-leave-active { transition: opacity 0.15s ease; }
  .collapse-enter-from, .collapse-leave-to { opacity: 0; }
  .pdlg-body { display: flex; flex-direction: column; gap: 0.75rem; }
  .pdlg-summary { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8125rem; font-weight: 500; }
  .pdlg-sum--add { color: var(--p-green-600); }
  .pdlg-sum--remove { color: var(--p-red-500); }
  .pdlg-sum-sep { color: var(--p-gray-300); }
  .pdlg-search { width: 100%; }
  .pdlg-list { display: flex; flex-direction: column; gap: 0.15rem; max-height: 22rem; overflow-y: auto; }
  .pdlg-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8125rem; padding: 0.1rem 0; }
  .pdlg-sign { font-weight: 700; width: 0.75rem; text-align: center; flex-shrink: 0; }
  .pdlg-item--add .pdlg-sign { color: var(--p-green-600); }
  .pdlg-item--remove .pdlg-sign { color: var(--p-red-500); }
  .pdlg-code { font-family: monospace; font-size: 0.8rem; font-weight: 500; color: var(--p-surface-700); flex-shrink: 0; }
  .pdlg-merk { color: var(--p-gray-400); font-size: 0.75rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .pdlg-empty { font-size: 0.8125rem; color: var(--p-gray-400); text-align: center; padding: 1rem 0; }
</style>
