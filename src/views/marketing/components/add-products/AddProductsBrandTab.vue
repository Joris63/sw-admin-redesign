<script setup lang="ts">
  import { ref } from 'vue';

  const emit = defineEmits<{
    (e: 'change-method'): void;
    (e: 'update:selectedMerkenSeries', value: string[]): void;
    (e: 'update:selectedCategories', value: string[]): void;
    (e: 'update:exclusionCsvFile', value: File | null): void;
  }>();

  const props = defineProps<{
    selectedMerkenSeries: string[];
    selectedCategories: string[];
    exclusionCsvFile: File | null;
  }>();

  const EXCLUSION_LABELS = [
    'OUTLET producten',
    'STORE producten',
    'Obsolete producten',
    'SHOWROOM producten',
    'HM producten',
  ];
  const exclusions = ref<Record<string, boolean>>(
    Object.fromEntries(EXCLUSION_LABELS.map((l) => [l, true]))
  );

  const MOCK_MERKEN_SERIES = [
    'Grohe',
    'Grohe / Dice',
    'Grohe / Get',
    'Grohe / Euphoria',
    'Grohe / Rainshower',
    'Grohe / Tempesta',
    'Hansgrohe',
    'Villeroy & Boch',
    'Duravit',
    'Geberit',
  ];
  const MOCK_CATEGORIES = [
    'Douchesets',
    'Thermostaatkranen',
    'Inbouwkranen',
    'Wastafelmengkranen',
    'Douchepanelen',
  ];

  const exclusionFileInput = ref<HTMLInputElement | null>(null);
  const isExclDragging = ref(false);

  function onExclusionDrop(e: DragEvent) {
    isExclDragging.value = false;
    const file = e.dataTransfer?.files?.[0];
    if (file?.name.endsWith('.csv')) emit('update:exclusionCsvFile', file);
  }

  function onExclusionFileInput(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) emit('update:exclusionCsvFile', file);
  }
</script>

<template>
  <div class="drw-section">
    <div class="drw-method-hdr">
      <p class="drw-section-hdr">Merk / Serie / Categorie</p>
      <button class="drw-change-btn" @click="emit('change-method')">Andere methode</button>
    </div>
    <div class="drw-field">
      <label class="drw-label">Merk / Serie</label>
      <MultiSelect
        :model-value="selectedMerkenSeries"
        :options="MOCK_MERKEN_SERIES"
        class="w-full"
        placeholder="Alle merken en series"
        display="chip"
        @update:model-value="emit('update:selectedMerkenSeries', $event)"
      />
    </div>
    <div class="drw-field">
      <label class="drw-label">Categorieën</label>
      <MultiSelect
        :model-value="selectedCategories"
        :options="MOCK_CATEGORIES"
        class="w-full"
        placeholder="Alle categorieën"
        display="chip"
        @update:model-value="emit('update:selectedCategories', $event)"
      />
    </div>

    <div class="drw-sep drw-sep--sm" />

    <div class="drw-field">
      <p class="drw-label">Uitsluiten</p>
      <div class="excl-grid">
        <label v-for="lbl in EXCLUSION_LABELS" :key="lbl" class="excl-item">
          <Checkbox v-model="exclusions[lbl]" :input-id="`m-${lbl}`" binary />
          <span>{{ lbl }}</span>
        </label>
      </div>
      <div
        v-if="!exclusionCsvFile"
        class="excl-csv-drop"
        :class="{ 'excl-csv-drop--over': isExclDragging }"
        @click="exclusionFileInput?.click()"
        @dragover.prevent="isExclDragging = true"
        @dragleave="isExclDragging = false"
        @drop.prevent="onExclusionDrop"
      >
        <i class="pi pi-file-import" />
        <span>
          Of sluit uit via CSV —
          <button class="csv-select-btn" @click.stop="exclusionFileInput?.click()">
            bestand selecteren
          </button>
        </span>
      </div>
      <div v-else class="csv-file-row">
        <div class="csv-file-icon"><i class="pi pi-file" /></div>
        <div class="flex flex-col gap-0.5">
          <span class="text-sm font-medium text-surface-700">{{ exclusionCsvFile.name }}</span>
          <span class="text-xs text-surface-400">Uitsluitingen via CSV</span>
        </div>
        <button
          class="si-remove"
          style="margin-left: auto"
          @click="emit('update:exclusionCsvFile', null)"
        >
          <i class="pi pi-times" />
        </button>
      </div>
    </div>

    <p class="drw-info">
      <i class="pi pi-info-circle shrink-0" />
      Het exacte aantal producten is pas bekend na het toevoegen.
    </p>

    <input
      ref="exclusionFileInput"
      type="file"
      accept=".csv"
      class="hidden"
      @change="onExclusionFileInput"
    />
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

  .drw-info {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    font-size: 0.8125rem;
    color: var(--p-gray-500);
    line-height: 1.5;
    padding: 0.75rem 1rem;
    background: var(--p-blue-50);
    border-radius: 0.5rem;
    border: 1px solid var(--p-blue-100);
  }

  .excl-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem 1.5rem;
    margin-top: 0.25rem;
  }
  .excl-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.875rem;
    color: var(--p-surface-700);
  }
  .excl-csv-drop {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.375rem;
    padding: 0.5rem 0.875rem;
    border: 1.5px dashed var(--p-gray-200);
    border-radius: 0.5rem;
    background: var(--p-gray-50);
    cursor: pointer;
    color: var(--p-gray-400);
    font-size: 0.8125rem;
    transition:
      border-color 0.15s,
      background 0.15s;
  }
  .excl-csv-drop:hover,
  .excl-csv-drop--over {
    border-color: var(--p-primary-300);
    background: var(--p-primary-50);
  }
  .csv-select-btn {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--p-primary-600);
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: color 0.1s;
  }
  .csv-select-btn:hover {
    color: var(--p-primary-800);
    text-decoration: underline;
  }
  .csv-file-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    background: var(--p-gray-50);
    border: 1px solid var(--p-gray-100);
    border-radius: 0.5rem;
  }
  .csv-file-icon {
    width: 2rem;
    height: 2rem;
    border-radius: 0.375rem;
    flex-shrink: 0;
    background: var(--p-primary-100);
    color: var(--p-primary-600);
    display: flex;
    align-items: center;
    justify-content: center;
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
