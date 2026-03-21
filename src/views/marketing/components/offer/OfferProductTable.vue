<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import type { OfferProduct as Product } from '@/types/offer';

  const props = defineProps<{
    products: Product[];
    selectedGroupId: number | null;
    isVerlopen: boolean;
    groupName: string;
  }>();

  const emit = defineEmits<{
    (e: 'add-products'): void;
    (e: 'delete-products', ids: number[]): void;
    (e: 'delete-all-products'): void;
    (e: 'delete-filtered-products', ids: number[]): void;
    (e: 'delete-csv-products', codes: Set<string>): void;
  }>();

  const productSearch = ref('');
  const selectedProducts = ref<Product[]>([]);
  const productRows = ref(15);
  const productFirst = ref(0);
  const productMenuRef = ref<any>(null);
  const csvDeleteInput = ref<HTMLInputElement | null>(null);

  const activeProducts = computed(() => {
    if (!productSearch.value.trim()) return props.products;
    const q = productSearch.value.trim().toLowerCase();
    return props.products.filter(
      (p) => p.code.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.site.toLowerCase().includes(q)
    );
  });

  const paginatedProducts = computed(() =>
    activeProducts.value.slice(productFirst.value, productFirst.value + productRows.value)
  );

  watch(productSearch, () => { productFirst.value = 0; });

  watch(() => props.selectedGroupId, () => {
    selectedProducts.value = [];
    productSearch.value = '';
    productFirst.value = 0;
  });

  function onPage(e: { first: number; rows: number }) {
    productFirst.value = e.first;
    productRows.value = e.rows;
  }

  function deleteSelected() {
    emit('delete-products', selectedProducts.value.map((p) => p.id));
    selectedProducts.value = [];
  }

  function deleteAll() {
    emit('delete-all-products');
    selectedProducts.value = [];
    productMenuRef.value?.hide();
  }

  function deleteFiltered() {
    emit('delete-filtered-products', activeProducts.value.map((p) => p.id));
    selectedProducts.value = [];
    productSearch.value = '';
    productMenuRef.value?.hide();
  }

  function onCsvDeleteInput(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const codes = new Set(text.split(/[\n,;]/).map((c) => c.trim().toUpperCase()).filter((c) => c.length > 0));
      emit('delete-csv-products', codes);
      selectedProducts.value = [];
    };
    reader.readAsText(file);
    (e.target as HTMLInputElement).value = '';
    productMenuRef.value?.hide();
  }
</script>

<template>
  <!-- search toolbar -->
  <div class="products-toolbar">
    <IconField class="flex-1">
      <InputIcon class="pi pi-search" />
      <InputText v-model="productSearch" placeholder="Zoeken op code, merk of site…" size="small" class="w-full" />
    </IconField>
    <template v-if="!isVerlopen">
      <Button label="Toevoegen" icon="pi pi-plus" size="small" @click="emit('add-products')" />
      <Button icon="pi pi-trash" label="Verwijderen" severity="danger" outlined size="small" @click="productMenuRef?.toggle($event)" />
      <Popover ref="productMenuRef">
        <div class="ctx-menu">
          <button v-if="productSearch.trim()" class="ctx-item ctx-item--danger" @click="deleteFiltered">
            <i class="pi pi-filter" />Verwijder zoekresultaten ({{ activeProducts.length }})
          </button>
          <button class="ctx-item ctx-item--danger" @click="csvDeleteInput?.click()"><i class="pi pi-file-import" />Verwijder via CSV</button>
          <div class="ctx-sep" />
          <button class="ctx-item ctx-item--danger" @click="deleteAll"><i class="pi pi-trash" />Verwijder alle producten</button>
        </div>
      </Popover>
      <input ref="csvDeleteInput" type="file" accept=".csv" class="hidden" @change="onCsvDeleteInput" />
    </template>
  </div>

  <!-- empty: no products -->
  <div v-if="activeProducts.length === 0 && !productSearch.trim()" class="products-empty">
    <div class="products-empty__icon"><i class="pi pi-box" /></div>
    <p class="products-empty__title">Geen producten</p>
    <p class="products-empty__sub">Voeg producten toe aan <strong>{{ groupName }}</strong></p>
    <Button v-if="!isVerlopen" label="Producten toevoegen" icon="pi pi-plus" outlined size="small" severity="secondary" @click="emit('add-products')" />
  </div>

  <!-- empty: no search results -->
  <div v-else-if="activeProducts.length === 0" class="products-empty">
    <div class="products-empty__icon"><i class="pi pi-search" /></div>
    <p class="products-empty__title">Geen resultaten</p>
    <p class="products-empty__sub">Niets gevonden voor "{{ productSearch }}"</p>
    <button class="products-empty__reset" @click="productSearch = ''">Zoekopdracht wissen</button>
  </div>

  <!-- table + paginator -->
  <template v-else>
    <Paginator :first="productFirst" :rows="productRows" :total-records="activeProducts.length"
      :rows-per-page-options="[15, 25, 50]"
      template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      class="products-pager" @page="onPage" />
    <div class="products-table-wrap">
      <DataTable v-model:selection="selectedProducts" :value="paginatedProducts" class="products-table"
        selection-mode="multiple" :meta-key-selection="false">
        <Column selection-mode="multiple" style="width: 2.5rem; padding-left: 0.75rem" />
        <Column field="code" header="Productcode">
          <template #body="{ data }"><span class="font-medium text-surface-700 tabular-nums">{{ data.code }}</span></template>
        </Column>
        <Column field="site" header="Site" style="width: 6rem">
          <template #body="{ data }"><span class="site-tag">{{ data.site }}</span></template>
        </Column>
        <Column field="brand" header="Merk / Serie">
          <template #body="{ data }"><span class="text-surface-500 text-sm">{{ data.brand }}</span></template>
        </Column>
      </DataTable>
    </div>
  </template>

  <!-- floating selection bar -->
  <Transition name="slide-up">
    <div v-if="selectedProducts.length" class="selection-bar">
      <div class="selection-bar__inner">
        <span class="selection-bar__count">{{ selectedProducts.length }} geselecteerd</span>
        <div class="selection-bar__actions">
          <button class="selection-bar__clear" @click="selectedProducts = []">Wissen</button>
          <Button label="Verwijderen" icon="pi pi-trash" severity="danger" size="small" @click="deleteSelected" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
  .products-toolbar { display: flex; align-items: center; gap: 0.5rem; padding: 0.375rem 0.75rem; border-bottom: 1px solid var(--p-gray-100); flex-shrink: 0; }
  .products-pager { border-bottom: 1px solid var(--p-surface-100); background: transparent; flex-shrink: 0; padding: 0.125rem 0.5rem; }
  .products-pager :deep(.p-paginator-page), .products-pager :deep(.p-paginator-first), .products-pager :deep(.p-paginator-prev), .products-pager :deep(.p-paginator-next), .products-pager :deep(.p-paginator-last) { min-width: 2rem; height: 2rem; font-size: 0.8125rem; }
  .products-empty { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.625rem; padding: 3rem 2rem; text-align: center; }
  .products-empty__icon { width: 3.5rem; height: 3.5rem; border-radius: 50%; background: var(--p-gray-100); display: flex; align-items: center; justify-content: center; font-size: 1.375rem; color: var(--p-gray-400); margin-bottom: 0.25rem; }
  .products-empty__title { font-size: 0.9375rem; font-weight: 600; color: var(--p-surface-600); }
  .products-empty__sub { font-size: 0.8125rem; color: var(--p-gray-400); }
  .products-empty__reset { font-size: 0.8125rem; color: var(--p-primary-600); background: none; border: none; padding: 0; cursor: pointer; transition: color 0.1s; }
  .products-empty__reset:hover { color: var(--p-primary-800); text-decoration: underline; }
  .products-table-wrap { flex: 1; overflow-y: auto; display: flex; flex-direction: column; }
  .products-table :deep(th) { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--p-surface-400); background: transparent; border-bottom: 1px solid var(--p-surface-200); padding: 0.5rem 0.75rem; }
  .products-table :deep(td) { padding: 0.625rem 0.75rem; border-bottom: 1px solid var(--p-surface-100); }
  .products-table :deep(tr:last-child td) { border-bottom: none; }
  .products-table :deep(tr:hover td) { background: var(--p-surface-50); }
  .products-table :deep(.p-datatable-tbody > tr) { transition: background 0.1s; }
  .site-tag { display: inline-flex; align-items: center; padding: 0.125rem 0.5rem; border-radius: 0.375rem; font-size: 0.75rem; font-weight: 500; background: var(--p-gray-100); color: var(--p-gray-600); white-space: nowrap; }
  .selection-bar { position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%); z-index: 50; pointer-events: none; }
  .selection-bar__inner { display: flex; align-items: center; gap: 1rem; background: var(--p-surface-800); color: white; border-radius: 2rem; padding: 0.5rem 0.625rem 0.5rem 1.25rem; box-shadow: 0 4px 24px rgba(0,0,0,0.22); pointer-events: all; white-space: nowrap; }
  .selection-bar__count { font-size: 0.875rem; font-weight: 500; }
  .selection-bar__actions { display: flex; align-items: center; gap: 0.5rem; }
  .selection-bar__clear { font-size: 0.8125rem; color: rgba(255,255,255,0.55); background: none; border: none; padding: 0; cursor: pointer; transition: color 0.1s; }
  .selection-bar__clear:hover { color: white; }
  .ctx-menu { display: flex; flex-direction: column; min-width: 10rem; }
  .ctx-item { display: flex; align-items: center; gap: 0.5rem; width: 100%; text-align: left; padding: 0.5rem 0.75rem; font-size: 0.875rem; color: var(--p-gray-700); background: none; border: none; cursor: pointer; border-radius: 0.25rem; transition: background 0.1s; }
  .ctx-item:hover { background: var(--p-gray-50); }
  .ctx-item--danger { color: var(--p-red-600); }
  .ctx-item--danger:hover { background: var(--p-red-50); }
  .ctx-sep { height: 1px; background: var(--p-gray-100); margin: 0.25rem 0; }
  .slide-up-enter-active { transition: all 0.22s cubic-bezier(0.34,1.56,0.64,1); }
  .slide-up-leave-active { transition: all 0.15s ease; }
  .slide-up-enter-from { opacity: 0; transform: translateX(-50%) translateY(0.75rem) scale(0.95); }
  .slide-up-leave-to { opacity: 0; transform: translateX(-50%) translateY(0.5rem) scale(0.97); }
</style>
