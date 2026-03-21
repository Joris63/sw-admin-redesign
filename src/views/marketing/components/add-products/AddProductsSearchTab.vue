<script setup lang="ts">
  import { ref, watch } from 'vue';

  interface Product {
    id: number;
    code: string;
    naam: string;
    merk: string;
  }

  const emit = defineEmits<{
    (e: 'change-method'): void;
    (e: 'update:selectedProds', value: Product[]): void;
  }>();

  const props = defineProps<{
    selectedProds: Product[];
  }>();

  const MOCK_ALL: Product[] = [
    { id: 1, code: 'SW1440595', naam: 'Grohe Dice doucheset', merk: 'Grohe / Dice' },
    {
      id: 2,
      code: 'SW1440594',
      naam: 'Grohe Precision Smart Control kraan',
      merk: 'Grohe / Precision Smart Control',
    },
    { id: 3, code: 'SW1440593', naam: 'Grohe Get douchekop', merk: 'Grohe / Get' },
    { id: 4, code: 'SW1440592', naam: 'Grohe Get douche set', merk: 'Grohe / Get' },
    {
      id: 5,
      code: 'SW1440591',
      naam: 'Grohe Start Loop doucheset 2020',
      merk: 'Grohe / Start Loop 2020',
    },
    {
      id: 6,
      code: 'SW1440590',
      naam: 'Grohe Precision Flow doucheset',
      merk: 'Grohe / Precision Flow',
    },
  ];

  const searchQuery = ref('');
  const searchResults = ref<Product[]>([]);

  watch(searchQuery, (q) => {
    if (!q.trim()) {
      searchResults.value = [];
      return;
    }
    const ids = new Set(props.selectedProds.map((p) => p.id));
    searchResults.value = MOCK_ALL.filter(
      (p) =>
        !ids.has(p.id) &&
        (p.code.toLowerCase().includes(q.toLowerCase()) ||
          p.naam.toLowerCase().includes(q.toLowerCase()) ||
          p.merk.toLowerCase().includes(q.toLowerCase()))
    );
  });

  function addProduct(p: Product) {
    emit('update:selectedProds', [...props.selectedProds, p]);
    searchResults.value = searchResults.value.filter((x) => x.id !== p.id);
    searchQuery.value = '';
  }

  function removeProduct(id: number) {
    emit(
      'update:selectedProds',
      props.selectedProds.filter((p) => p.id !== id)
    );
  }
</script>

<template>
  <div class="drw-section">
    <div class="drw-method-hdr">
      <p class="drw-section-hdr">Producten zoeken</p>
      <button class="drw-change-btn" @click="emit('change-method')">Andere methode</button>
    </div>
    <div class="search-box">
      <IconField>
        <InputIcon class="pi pi-search" />
        <InputText
          v-model="searchQuery"
          class="w-full"
          placeholder="Zoek op productcode, naam, merk of EAN"
          autofocus
        />
      </IconField>
      <div v-if="searchQuery.trim() && !searchResults.length" class="ac-dropdown ac-empty">
        Geen resultaten voor "{{ searchQuery }}"
      </div>
      <div v-else-if="searchResults.length" class="ac-dropdown">
        <button
          v-for="p in searchResults"
          :key="p.id"
          class="ac-item"
          @click="addProduct(p)"
        >
          <span class="sr-naam">{{ p.naam }}</span>
          <span class="sr-code">{{ p.code }}</span>
        </button>
      </div>
    </div>

    <div v-if="selectedProds.length" class="selected-list">
      <div class="selected-list__hdr">
        <span>Geselecteerde producten</span>
        <span class="sel-count">{{ selectedProds.length }}</span>
      </div>
      <div class="selected-items">
        <div v-for="p in selectedProds" :key="p.id" class="selected-item">
          <span class="sr-naam">{{ p.naam }}</span>
          <span class="sr-code">{{ p.code }}</span>
          <button class="si-remove" @click="removeProduct(p.id)">
            <i class="pi pi-times" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .drw-method-hdr {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .drw-change-btn {
    padding: 0.2rem 0.375rem;
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 0.75rem;
    color: var(--p-primary-500);
    border-radius: 0.25rem;
    text-decoration: underline;
    text-underline-offset: 2px;
    text-decoration-color: var(--p-primary-300);
    transition:
      color 0.15s ease,
      background 0.15s ease;
  }
  .drw-change-btn:hover {
    color: var(--p-primary-700);
    background: var(--p-primary-50);
    text-decoration-color: var(--p-primary-500);
  }

  .search-box {
    position: relative;
  }
  .ac-dropdown {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    z-index: 10;
    background: white;
    border: 1px solid var(--p-gray-200);
    border-radius: 0.5rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.09);
    overflow: hidden;
  }
  .ac-empty {
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    color: var(--p-gray-400);
  }
  .ac-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.5rem 0.75rem;
    width: 100%;
    background: none;
    border: none;
    border-bottom: 1px solid var(--p-gray-100);
    cursor: pointer;
    text-align: left;
    transition: background 0.1s;
  }
  .ac-item:last-child {
    border-bottom: none;
  }
  .ac-item:hover {
    background: var(--p-primary-50);
  }
  .sr-naam {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--p-surface-700);
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .sr-code {
    font-family: monospace;
    font-size: 0.775rem;
    color: var(--p-gray-500);
    flex-shrink: 0;
  }

  .selected-list {
    margin-top: 0.25rem;
  }
  .selected-list__hdr {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--p-gray-100);
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--p-gray-400);
  }
  .sel-count {
    font-size: 0.6875rem;
    font-weight: 600;
    background: var(--p-primary-100);
    color: var(--p-primary-700);
    border-radius: 999px;
    padding: 0.1rem 0.5rem;
  }
  .selected-items {
    margin-top: 0.25rem;
  }
  .selected-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.4rem 0.375rem;
    border-bottom: 1px solid var(--p-gray-50);
  }
  .selected-item:last-child {
    border-bottom: none;
  }
  .si-remove {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.375rem;
    height: 1.375rem;
    border-radius: 0.25rem;
    flex-shrink: 0;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--p-gray-400);
    font-size: 0.75rem;
    transition:
      background 0.1s,
      color 0.1s;
  }
  .si-remove:hover {
    background: var(--p-red-50);
    color: var(--p-red-500);
  }
</style>
