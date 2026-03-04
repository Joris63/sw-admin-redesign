<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import type { FilterConfig } from '@/types/filters';
  import { useFilterBar } from '@/composables/useFilterBar';

  const router = useRouter();

  interface Quotation {
    id: number;
    offertenummer: string;
    datum: string;
    door: string;
    prijs: number;
  }

  const quotations = ref<Quotation[]>([
    {
      id: 15,
      offertenummer: '299452',
      datum: '04 maart 2025 15:21',
      door: 'Max Brouwer',
      prijs: 1995.5,
    },
    {
      id: 14,
      offertenummer: '299451',
      datum: '03 maart 2025 10:48',
      door: 'Sara van Dongen',
      prijs: 11250.8,
    },
    {
      id: 13,
      offertenummer: '299450',
      datum: '26 februari 2025 16:12',
      door: 'Ruben Dekker',
      prijs: 320.45,
    },
    {
      id: 12,
      offertenummer: '299449',
      datum: '24 februari 2025 09:26',
      door: 'Nina Bos',
      prijs: 2499.95,
    },
    {
      id: 11,
      offertenummer: '299448',
      datum: '20 februari 2025 14:03',
      door: 'Bram Willems',
      prijs: 6789.12,
    },
    {
      id: 10,
      offertenummer: '299447',
      datum: '18 februari 2025 11:34',
      door: 'Lotte Smit',
      prijs: 150.0,
    },
    {
      id: 9,
      offertenummer: '299446',
      datum: '17 februari 2025 10:17',
      door: 'Timo van Leeuwen',
      prijs: 9800.34,
    },
    {
      id: 8,
      offertenummer: '299445',
      datum: '13 februari 2025 15:55',
      door: 'Julia Hendriks',
      prijs: 560.6,
    },
    {
      id: 7,
      offertenummer: '299444',
      datum: '12 februari 2025 13:09',
      door: 'Finn Kuipers',
      prijs: 2390.77,
    },
    {
      id: 6,
      offertenummer: '299443',
      datum: '10 februari 2025 09:41',
      door: 'Mila Jansen',
      prijs: 76.25,
    },
    {
      id: 5,
      offertenummer: '299442',
      datum: '07 februari 2025 16:18',
      door: 'Daan Visser',
      prijs: 4520.0,
    },
    {
      id: 4,
      offertenummer: '299441',
      datum: '05 februari 2025 14:22',
      door: 'Sophie Bakker',
      prijs: 884.45,
    },
    {
      id: 3,
      offertenummer: '299440',
      datum: '04 februari 2025 10:05',
      door: 'Lars Meijer',
      prijs: 12999.99,
    },
    {
      id: 2,
      offertenummer: '299439',
      datum: '03 februari 2025 11:47',
      door: 'Noah Peters',
      prijs: 315.9,
    },
    {
      id: 1,
      offertenummer: '299438',
      datum: '03 februari 2025 09:12',
      door: 'Emma de Vries',
      prijs: 7421.58,
    },
  ]);

  const totalRecords = ref(1609688);

  // ── Filter definitions ──────────────────────────────────────────
  const allFilterDefs: FilterConfig[] = [
    {
      key: 'site',
      label: 'Site',
      type: 'select',
      placeholder: 'SWNL',
      options: [
        { label: 'SWNL', value: 'SWNL' },
        { label: 'SWBE', value: 'SWBE' },
        { label: 'SWFR', value: 'SWFR' },
        { label: 'SWDE', value: 'SWDE' },
      ],
      required: true,
    },
    { key: 'offertenummer', label: 'Offertenummer', type: 'text', placeholder: '12345678' },
    { key: 'email', label: 'Email', type: 'text', placeholder: 'jan@bedrijf.nl' },
    { key: 'achternaam', label: 'Achternaam', type: 'text', placeholder: 'de Vries' },
    { key: 'voornaam', label: 'Voornaam', type: 'text', placeholder: 'Jan' },
    {
      key: 'bedrijfsnaam',
      label: 'Bedrijfsnaam',
      type: 'text',
      placeholder: 'Bouwbedrijf de Vries',
    },
    { key: 'postcode', label: 'Postcode', type: 'text', placeholder: '1234 AB' },
    { key: 'huisnummer', label: 'Huisnummer', type: 'text', placeholder: '12' },
    { key: 'huisnummerToevoeging', label: 'Huisnummer toevoeging', type: 'text', placeholder: 'A' },
    { key: 'woonplaats', label: 'Woonplaats', type: 'text', placeholder: 'Amsterdam' },
    { key: 'telefoonnummer', label: 'Telefoonnummer', type: 'text', placeholder: '06 12345678' },
    { key: 'isB2BKlant', label: 'Is B2B Klant', type: 'boolean' },
  ];

  const {
    filterConfigs,
    filterValues,
    hasActiveFilters,
    setFilterPopover,
    toggleFilter,
    getDisplayValue,
    clearFilter,
    clearAllFilters,
    dialogVisible,
    dialogActiveKeys,
    dialogLeftSel,
    dialogRightSel,
    filterSearch,
    filterPopovers,
    dialogAvailable,
    filteredAvailable,
    hiddenCount,
    canMoveUp,
    canMoveDown,
    openDialog,
    saveDialog,
    toggleLeftSel,
    toggleRightSel,
    addFilters,
    addFilterDirectly,
    removeFilters,
    moveUp,
    moveDown,
    moveToTop,
    moveToBottom,
    getLabelForKey,
  } = useFilterBar(allFilterDefs, [
    { key: 'site', value: 'SWNL' },
    'offertenummer',
    'achternaam',
    'email',
  ]);
</script>

<template>
  <div class="flex flex-col gap-5 grow">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold text-surface-800">Offertes</h1>
      <Button label="Nieuwe offerte toevoegen" icon="pi pi-plus" icon-pos="right" />
    </div>

    <!-- Filter bar -->
    <div class="flex items-center gap-2 flex-wrap">
      <!-- Filter chips -->
      <template v-for="filter in filterConfigs" :key="filter.key">
        <button
          class="filter-chip"
          :class="{ 'filter-chip--active': getDisplayValue(filter.key) !== null }"
          @click="toggleFilter(filter.key, $event)"
        >
          <span class="chip-label">{{ filter.label }}</span>
          <template v-if="getDisplayValue(filter.key) !== null">
            <span class="chip-sep">·</span>
            <span class="chip-value">{{ getDisplayValue(filter.key) }}</span>
          </template>
          <i
            class="pi shrink-0 text-xs ml-0.5"
            :class="
              getDisplayValue(filter.key) !== null && !filter.required
                ? 'pi-times'
                : 'pi-chevron-down'
            "
            @click.stop="
              getDisplayValue(filter.key) !== null && !filter.required
                ? clearFilter(filter.key, $event)
                : undefined
            "
          />
        </button>

        <!-- Filter popover -->
        <Popover :ref="(el: any) => setFilterPopover(filter.key, el)">
          <div class="flex flex-col gap-2" style="min-width: 13rem">
            <span class="popover-filter-label">{{ filter.label }}</span>
            <InputText
              v-if="filter.type === 'text'"
              v-model="filterValues[filter.key] as string"
              :placeholder="filter.placeholder"
              class="w-full"
              autofocus
              @keydown.enter="filterPopovers.get(filter.key)?.hide()"
            />
            <SelectButton
              v-else-if="filter.type === 'boolean'"
              v-model="filterValues[filter.key]"
              :options="[
                { label: 'Ja', value: true },
                { label: 'Nee', value: false },
              ]"
              option-label="label"
              option-value="value"
            />
            <Select
              v-else-if="filter.type === 'select'"
              v-model="filterValues[filter.key]"
              :options="filter.options!"
              option-label="label"
              option-value="value"
            />
            <button
              v-if="getDisplayValue(filter.key) !== null && !filter.required"
              class="clear-value-btn"
              @click="clearFilter(filter.key)"
            >
              Waarde wissen ×
            </button>
          </div>
        </Popover>
      </template>

      <!-- Separator -->
      <span class="filter-divider" />

      <!-- Clear all filters -->
      <Transition name="fade">
        <button v-if="hasActiveFilters" class="clear-all-btn" @click="clearAllFilters">
          <i class="pi pi-times" />
          Alle waardes wissen
        </button>
      </Transition>

      <!-- Filters beheren -->
      <button class="filters-beheren-btn" @click="openDialog">Filters beheren</button>
    </div>

    <!-- Result count + pagination -->
    <div class="flex items-center justify-between">
      <span class="text-xs font-semibold uppercase tracking-wider text-gray-400">
        {{ totalRecords.toLocaleString('nl-NL') }} offertes
      </span>
      <Paginator
        :rows="15"
        :total-records="totalRecords"
        :rows-per-page-options="[15, 30, 50]"
        class="p-0! border-0! bg-transparent!"
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
      />
    </div>

    <!-- Table -->
    <DataTable
      :value="quotations"
      class="quotations-table"
      :pt="{ thead: { class: 'border-b border-gray-200' } }"
    >
      <Column field="offertenummer" header="Offertenummer">
        <template #body="{ data }">
          <span class="font-medium text-surface-700">{{ data.offertenummer }}</span>
        </template>
      </Column>
      <Column field="door" header="Naam">
        <template #body="{ data }">
          <a class="text-primary-600 hover:text-primary-800 hover:underline cursor-pointer">
            {{ data.door }}
          </a>
        </template>
      </Column>
      <Column field="datum" header="Datum">
        <template #body="{ data }">
          <span class="text-surface-400 text-sm">{{ data.datum }}</span>
        </template>
      </Column>
      <Column field="prijs" header="Prijs">
        <template #body="{ data }">
          €
          {{ data.prijs.toLocaleString('nl-NL', { minimumFractionDigits: 2 }) }}
        </template>
      </Column>
      <Column header="" style="width: 3rem">
        <template #body="{ data }">
          <div class="flex items-center gap-1">
            <Button
              icon="pi pi-pencil"
              variant="text"
              severity="secondary"
              size="small"
              rounded
              @click="router.push({ name: 'QuotationEdit', params: { id: data.id } })"
            />
            <Button
              icon="pi pi-cart-plus"
              variant="text"
              severity="secondary"
              size="small"
              rounded
            />
          </div>
        </template>
      </Column>
    </DataTable>

    <!-- ── Filters beheren dialog ─────────────────────────────── -->
    <Dialog
      v-model:visible="dialogVisible"
      header="Filters beheren"
      :style="{ width: '50rem' }"
      modal
      :draggable="false"
    >
      <div class="flex gap-3" style="height: 22rem">
        <!-- Reorder buttons -->
        <div class="reorder-btns flex flex-col justify-center gap-1">
          <Button
            icon="pi pi-angle-double-up"
            size="small"
            severity="secondary"
            outlined
            :disabled="!canMoveUp"
            @click="moveToTop"
          />
          <Button
            icon="pi pi-angle-up"
            size="small"
            severity="secondary"
            outlined
            :disabled="!canMoveUp"
            @click="moveUp"
          />
          <Button
            icon="pi pi-angle-down"
            size="small"
            severity="secondary"
            outlined
            :disabled="!canMoveDown"
            @click="moveDown"
          />
          <Button
            icon="pi pi-angle-double-down"
            size="small"
            severity="secondary"
            outlined
            :disabled="!canMoveDown"
            @click="moveToBottom"
          />
        </div>

        <!-- Left panel: current filters -->
        <div class="dialog-panel flex-1">
          <div class="dialog-panel__header">Huidige filterset</div>
          <div class="dialog-panel__body">
            <button
              v-for="key in dialogActiveKeys"
              :key="key"
              class="dialog-item"
              :class="{ 'dialog-item--sel': dialogLeftSel.includes(key) }"
              @click="toggleLeftSel(key)"
            >
              {{ getLabelForKey(key) }}
            </button>
            <div v-if="!dialogActiveKeys.length" class="dialog-empty">
              Geen filters geselecteerd
            </div>
          </div>
        </div>

        <!-- Transfer buttons -->
        <div class="transfer-btns flex flex-col justify-center gap-2">
          <Button
            icon="pi pi-chevron-right"
            severity="secondary"
            outlined
            :disabled="!dialogLeftSel.length"
            @click="removeFilters"
          />
          <Button
            icon="pi pi-chevron-left"
            severity="secondary"
            outlined
            :disabled="!dialogRightSel.length"
            @click="addFilters"
          />
        </div>

        <!-- Right panel: available filters -->
        <div class="dialog-panel flex-1">
          <div class="dialog-panel__header">Beschikbare filters</div>
          <div class="dialog-panel__search">
            <IconField>
              <InputIcon class="pi pi-search" />
              <InputText
                v-model="filterSearch"
                placeholder="Zoek een filter"
                class="w-full"
                size="small"
              />
            </IconField>
          </div>
          <div class="dialog-panel__body">
            <button
              v-for="filter in filteredAvailable"
              :key="filter.key"
              class="dialog-item"
              :class="{ 'dialog-item--sel': dialogRightSel.includes(filter.key) }"
              @click="toggleRightSel(filter.key)"
              @dblclick="addFilterDirectly(filter.key)"
            >
              {{ filter.label }}
            </button>
            <div v-if="filterSearch && hiddenCount > 0" class="dialog-search-hint">
              {{ filteredAvailable.length }} gevonden · {{ hiddenCount }} verborgen
              <button class="dialog-show-all" @click="filterSearch = ''">Alles tonen</button>
            </div>
            <div v-if="!dialogAvailable.length" class="dialog-empty">Alle filters zijn actief</div>
          </div>
        </div>
      </div>

      <template #footer>
        <Button label="Annuleren" severity="secondary" outlined @click="dialogVisible = false" />
        <Button label="Opslaan" @click="saveDialog" />
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
  /* ── Filter chips ─────────────────────────────────────────── */
  .filter-chip {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.75rem;
    border: 1.5px solid var(--p-gray-200);
    border-radius: 0.5rem;
    background: white;
    cursor: pointer;
    color: var(--p-gray-600);
    transition:
      border-color 0.15s ease,
      background 0.15s ease,
      color 0.15s ease;
    white-space: nowrap;
  }

  .filter-chip:hover:not(.filter-chip--active) {
    border-color: var(--p-gray-400);
    color: var(--p-gray-800);
  }

  .filter-chip--active {
    background: var(--p-primary-500);
    border-color: var(--p-primary-500);
    color: white;
  }

  .filter-chip--active:hover {
    background: var(--p-primary-600);
    border-color: var(--p-primary-600);
  }

  .chip-label {
    font-size: 0.8125rem;
    font-weight: 500;
  }

  .chip-sep {
    font-size: 0.75rem;
    opacity: 0.6;
  }

  .chip-value {
    font-size: 0.8125rem;
    font-weight: 600;
    max-width: 8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* ── Popover content ─────────────────────────────────────── */
  .popover-filter-label {
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--p-gray-400);
  }

  .clear-value-btn {
    font-size: 0.8125rem;
    color: var(--p-primary-600);
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    text-align: left;
    transition: color 0.1s ease;
  }

  .clear-value-btn:hover {
    color: var(--p-primary-800);
    text-decoration: underline;
  }

  /* ── Filter bar right actions ────────────────────────────── */
  .filter-divider {
    align-self: center;
    height: 1.25rem;
    border-left: 1.5px solid var(--p-gray-200);
    margin: 0 0.125rem;
  }

  .clear-all-btn {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--p-gray-500);
    background: none;
    border: 1.5px solid var(--p-gray-200);
    border-radius: 0.5rem;
    padding: 0.375rem 0.75rem;
    cursor: pointer;
    white-space: nowrap;
    transition:
      color 0.15s ease,
      border-color 0.15s ease;
  }

  .clear-all-btn:hover {
    color: var(--p-red-600);
    border-color: var(--p-red-300);
  }

  .filters-beheren-btn {
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--p-gray-500);
    background: none;
    border: none;
    padding: 0.375rem 0.5rem;
    cursor: pointer;
    white-space: nowrap;
    transition: color 0.15s ease;
  }

  .filters-beheren-btn:hover {
    color: var(--p-gray-800);
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  /* ── Filters beheren dialog panels ──────────────────────── */
  .dialog-panel {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--p-gray-200);
    border-radius: 0.5rem;
    overflow: hidden;
  }

  .dialog-panel__header {
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--p-gray-500);
    background: var(--p-gray-50);
    border-bottom: 1px solid var(--p-gray-200);
    flex-shrink: 0;
  }

  .dialog-panel__search {
    padding: 0.5rem;
    border-bottom: 1px solid var(--p-gray-100);
    flex-shrink: 0;
  }

  .dialog-panel__body {
    overflow-y: auto;
    flex: 1;
  }

  .dialog-item {
    display: block;
    width: 100%;
    text-align: left;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    color: var(--p-gray-700);
    background: none;
    border: none;
    cursor: pointer;
    transition: background 0.1s ease;
  }

  .dialog-item:hover:not(.dialog-item--sel) {
    background: var(--p-gray-50);
  }

  .dialog-item--sel {
    background: var(--p-primary-50);
    color: var(--p-primary-700);
    font-weight: 500;
  }

  .dialog-empty {
    padding: 1.5rem 1rem;
    text-align: center;
    font-size: 0.8125rem;
    color: var(--p-gray-400);
    font-style: italic;
  }

  .dialog-search-hint {
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
    color: var(--p-gray-400);
  }

  .dialog-show-all {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font-size: 0.75rem;
    color: var(--p-primary-600);
    margin-left: 0.25rem;
  }

  .dialog-show-all:hover {
    text-decoration: underline;
  }

  /* ── Dialog button disabled state ───────────────────────── */
  .reorder-btns :deep(.p-button:disabled),
  .transfer-btns :deep(.p-button:disabled) {
    opacity: 0.2;
    cursor: not-allowed;
  }

  /* ── DataTable ───────────────────────────────────────────── */
  .quotations-table :deep(th) {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--p-surface-400);
    background: transparent;
    border-bottom: 1px solid var(--p-surface-200);
    padding: 0.625rem 0.75rem;
  }

  .quotations-table :deep(td) {
    padding: 0.75rem;
    border-bottom: 1px solid var(--p-surface-100);
  }

  .quotations-table :deep(tr:last-child td) {
    border-bottom: none;
  }

  .quotations-table :deep(tr:hover td) {
    background: var(--p-surface-50);
  }

  .quotations-table :deep(.p-datatable-tbody > tr) {
    transition: background 0.1s ease;
  }

  /* ── Transitions ─────────────────────────────────────────── */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.15s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  .offerte-badge {
    display: inline-flex;
    padding: 0.2rem 0.625rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
    border: 1px solid;
  }
  .offerte-badge--info {
    background: var(--p-info-50);
    border-color: var(--p-info-200);
    color: var(--p-info-700);
  }
</style>
