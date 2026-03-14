<script setup lang="ts">
  import { inject, ref, type Ref } from 'vue';
  import type { QuotationData } from '@/types/quotations';

  const quotation = inject<Ref<QuotationData>>('quotation')!;

  const activeTab = ref<'products' | 'general'>('products');

  const tabs = [
    { id: 'products', label: 'Product informatie' },
    { id: 'general', label: 'Algemene informatie' },
  ] as const;

  const actieSeverity: Record<string, string> = {
    Toegevoegd: 'success',
    Verwijderd: 'danger',
    Gewijzigd: 'info',
    Aangemaakt: 'success',
    'E-mail verstuurd': 'info',
  };
</script>

<template>
  <div class="log-layout">
    <div class="log-tabbar">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="log-tab"
        :class="{ 'log-tab--active': activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="log-scroll">
      <template v-if="activeTab === 'products'">
        <div class="view-card">
          <div class="view-card-hdr">
            <span class="view-card-title">Product informatie</span>
          </div>
          <DataTable :value="quotation.productLog" class="ce-table" >
            <Column header="Datum" field="date" style="width: 11rem" />
            <Column header="Productcode" style="width: 9rem">
              <template #body="{ data }">
                <span class="text-xs text-gray-600">{{ data.productCode ?? '—' }}</span>
              </template>
            </Column>
            <Column header="Omschrijving" field="description" />
            <Column header="Aantal" style="width: 5rem">
              <template #body="{ data }">
                <span class="text-sm">{{ data.quantity ?? '—' }}</span>
              </template>
            </Column>
            <Column header="Prijs" style="width: 7rem">
              <template #body="{ data }">
                <span class="text-sm">
                  {{ data.price != null ? `€\u00a0${data.price.toFixed(2).replace('.', ',')}` : '—' }}
                </span>
              </template>
            </Column>
            <Column header="Actie" style="width: 8rem">
              <template #body="{ data }">
                <Tag :value="data.action" :severity="actieSeverity[data.action] || 'secondary'" />
              </template>
            </Column>
            <Column header="Gebruiker" field="user" style="width: 9rem" />
            <template #empty>
              <span class="table-empty">Geen product log entries.</span>
            </template>
          </DataTable>
        </div>
      </template>

      <template v-else-if="activeTab === 'general'">
        <div class="view-card">
          <div class="view-card-hdr">
            <span class="view-card-title">Algemene informatie</span>
          </div>
          <DataTable :value="quotation.generalLog" class="ce-table" >
            <Column header="Datum" field="date" style="width: 11rem" />
            <Column header="Omschrijving" field="description" />
            <Column header="Gebruiker" field="user" style="width: 9rem" />
            <template #empty>
              <span class="table-empty">Geen log entries.</span>
            </template>
          </DataTable>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
  .log-layout {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
  }

  .log-tabbar {
    display: flex;
    border-bottom: 1px solid var(--p-gray-100);
    background: white;
    flex-shrink: 0;
    padding: 0 1rem;
  }
  .log-tab {
    padding: 0.625rem 1rem;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    font-size: 0.875rem;
    color: var(--p-surface-500);
    font-weight: 500;
    transition: color 0.15s, border-color 0.15s;
    margin-bottom: -1px;
  }
  .log-tab:hover { color: var(--p-surface-700); }
  .log-tab--active {
    color: var(--p-primary-600);
    border-bottom-color: var(--p-primary-500);
  }

  .log-scroll {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    background: var(--p-surface-50);
  }
</style>
