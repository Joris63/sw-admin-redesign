<script setup lang="ts">
  import type { LogboekEntry } from '@/types/customer';

  const logboek: LogboekEntry[] = [
    {
      id: 1,
      gebruiker: 'nejat.karanzai@sawiday.com',
      datum: '24 februari 2025 15:22',
      eigenschap: 'vatCode',
      oudeWaarde: '0',
      nieuweWaarde: 'NL',
    },
    {
      id: 2,
      gebruiker: 'webshop@sawiday.com',
      datum: '03 december 2024 06:30',
      eigenschap: 'temporaryCreditExpireDate',
      oudeWaarde: '2024-12-02',
      nieuweWaarde: '0',
    },
    {
      id: 3,
      gebruiker: 'richard.laven@sawiday.com',
      datum: '25 november 2024 11:49',
      eigenschap: 'temporaryCreditExpireDate',
      oudeWaarde: '0',
      nieuweWaarde: '2024-12-02',
    },
    {
      id: 4,
      gebruiker: 'webshop@sawiday.com',
      datum: '17 mei 2024 11:01',
      eigenschap: 'phoneNumber',
      oudeWaarde: '0651302704',
      nieuweWaarde: '+31651302704',
    },
    {
      id: 5,
      gebruiker: 'webshop@sawiday.com',
      datum: '21 december 2023 11:16',
      eigenschap: 'companyType',
      oudeWaarde: '',
      nieuweWaarde: 'Installateur',
    },
    {
      id: 6,
      gebruiker: 'akin.bektas@sawiday.com',
      datum: '07 augustus 2023 11:49',
      eigenschap: 'isPayAfterAllowed',
      oudeWaarde: '0',
      nieuweWaarde: '1',
    },
  ];
</script>

<template>
  <div class="tab-scroll">
    <div class="view-card">
      <div class="view-card-hdr">
        <span class="view-card-title">Logboek</span>
      </div>
      <DataTable :value="logboek" class="ce-table">
        <Column header="Gebruiker" style="width: 17rem">
          <template #body="{ data }">
            <a href="#" class="text-primary-600 hover:underline text-sm">{{
              data.gebruiker
            }}</a>
            <div class="text-xs text-gray-400 mt-0.5">{{ data.datum }}</div>
          </template>
        </Column>
        <Column header="Eigenschap" style="width: 13rem">
          <template #body="{ data }">
            <span class="log-prop">{{ data.eigenschap }}</span>
          </template>
        </Column>
        <Column header="Wijziging">
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              <span class="log-old">{{ data.oudeWaarde || '—' }}</span>
              <i class="pi pi-arrow-right text-gray-300" style="font-size: 0.7rem" />
              <span class="log-new">{{ data.nieuweWaarde || '—' }}</span>
            </div>
          </template>
        </Column>
        <template #empty
          ><span class="table-empty">Geen activiteit gevonden</span></template
        >
      </DataTable>
    </div>
  </div>
</template>

<style scoped>
  .log-prop {
    display: inline-block;
    padding: 0.1rem 0.375rem;
    border-radius: 3px;
    background: var(--p-gray-100);
    color: var(--p-surface-600);
    font-family: ui-monospace, monospace;
    font-size: 0.8125rem;
  }
  .log-old {
    font-size: 0.8125rem;
    color: var(--p-surface-400);
    text-decoration: line-through;
  }
  .log-new {
    font-size: 0.8125rem;
    color: var(--p-green-700);
    font-weight: 500;
  }
</style>
