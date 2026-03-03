<script setup lang="ts">
  import { ref, computed, inject } from 'vue';
  import type { Ref } from 'vue';
  import type { CustomerData } from '@/types/customer';

  const customer = inject<Ref<CustomerData>>('customer')!;

  const selectedWishlistId = ref<number>(customer.value.wishlists[0]?.id ?? 0);

  const selectedWishlist = computed(
    () => customer.value.wishlists.find((w) => w.id === selectedWishlistId.value) ?? null
  );
</script>

<template>
  <div class="tab-scroll">
    <div class="view-card">
      <div class="view-card-hdr">
        <div class="flex gap-1.5">
          <button
            v-for="wl in customer.wishlists"
            :key="wl.id"
            class="wl-tab"
            :class="{ 'wl-tab--active': wl.id === selectedWishlistId }"
            @click="selectedWishlistId = wl.id"
          >
            {{ wl.naam }}
            <span class="wl-tab-count">{{ wl.items.length }}</span>
          </button>
        </div>
      </div>
      <DataTable v-if="selectedWishlist" :value="selectedWishlist.items" class="ce-table">
        <Column field="naam" header="Naam">
          <template #body="{ data }">
            <a href="#" class="text-primary-600 hover:underline text-sm">{{ data.naam }}</a>
          </template>
        </Column>
        <Column field="productcode" header="Productcode" style="width: 10rem" />
        <Column
          field="aantal"
          header="Aantal"
          :pt="{ columnheadercontent: { class: 'justify-end!' } }"
          body-class="col-right"
        />
        <Column
          field="prijs"
          header="Prijs"
          :pt="{ columnheadercontent: { class: 'justify-end!' } }"
          body-class="col-right"
        >
          <template #body="{ data }"
            >€ {{ data.prijs.toLocaleString('nl-NL', { minimumFractionDigits: 2 }) }}</template
          >
        </Column>
        <Column style="width: 3rem">
          <template #body
            ><i class="pi pi-external-link text-primary-400 cursor-pointer"
          /></template>
        </Column>
        <template #footer>
          <div v-if="selectedWishlist.items.length" class="table-subtotal">
            <span
              >Subtotaal, {{ selectedWishlist.items.reduce((s, i) => s + i.aantal, 0) }} product{{
                selectedWishlist.items.reduce((s, i) => s + i.aantal, 0) !== 1 ? 'en' : ''
              }}</span
            >
            <span
              >€
              {{
                selectedWishlist.items
                  .reduce((s, i) => s + i.prijs * i.aantal, 0)
                  .toLocaleString('nl-NL', { minimumFractionDigits: 2 })
              }}</span
            >
          </div>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<style scoped>
  .wl-tab {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.275rem 0.75rem;
    border-radius: 999px;
    font-size: 0.8125rem;
    border: 1px solid var(--p-gray-200);
    background: white;
    color: var(--p-surface-600);
    cursor: pointer;
    transition: all 0.1s;
  }
  .wl-tab:hover {
    background: var(--p-gray-50);
    border-color: var(--p-gray-300);
  }
  .wl-tab--active {
    background: var(--p-primary-50);
    border-color: var(--p-primary-200);
    color: var(--p-primary-700);
  }
  .wl-tab-count {
    font-size: 0.6875rem;
    font-weight: 600;
    background: var(--p-gray-100);
    color: var(--p-surface-500);
    padding: 0.05rem 0.35rem;
    border-radius: 999px;
  }
  .wl-tab--active .wl-tab-count {
    background: var(--p-primary-100);
    color: var(--p-primary-600);
  }
</style>
