<script setup lang="ts">
  import type { CustomerOfferte } from '@/types/customer';

  const offertes: CustomerOfferte[] = [
    {
      id: 1,
      offertenummer: '1761598',
      datum: '19 mei 2022 14:53',
      door: 'Job Vermue',
      prijs: 3666.83,
      status: 'Geaccepteerd',
      opmerkingen: 0,
    },
    {
      id: 2,
      offertenummer: '1895180',
      datum: '20 oktober 2022 15:07',
      door: 'Bart Onstenk',
      prijs: 1595.1,
      status: 'Geaccepteerd',
      opmerkingen: 0,
    },
    {
      id: 3,
      offertenummer: '1917050',
      datum: '11 november 2022 12:22',
      door: 'Bart Onstenk',
      prijs: 2405.34,
      status: 'Geaccepteerd',
      opmerkingen: 0,
    },
    {
      id: 4,
      offertenummer: '2005823',
      datum: '03 februari 2023 16:01',
      door: 'Mark Roeters',
      prijs: 10380.6,
      status: 'Geaccepteerd',
      opmerkingen: 0,
    },
    {
      id: 5,
      offertenummer: '2697404',
      datum: '18 maart 2025 10:42',
      door: 'Luke Derkzen',
      prijs: 14.95,
      status: 'Niet geaccepteerd',
      opmerkingen: 0,
    },
  ];
</script>

<template>
  <div class="tab-scroll">
    <div class="view-card">
      <div class="view-card-hdr">
        <span class="view-card-title">Offertes</span>
      </div>
      <DataTable :value="offertes" class="ce-table">
        <Column field="offertenummer" header="Offertenummer" style="width: 9rem" />
        <Column field="datum" header="Datum aangemaakt" style="width: 13rem" />
        <Column field="door" header="Door" />
        <Column
          field="prijs"
          header="Prijs"
          style="width: 9rem"
          :pt="{ columnheadercontent: { class: 'justify-end!' } }"
          body-class="text-right!"
        >
          <template #body="{ data }">
            €
            {{ data.prijs.toLocaleString('nl-NL', { minimumFractionDigits: 2 }) }}
          </template>
        </Column>
        <Column
          field="status"
          header="Status"
          style="width: 14rem"
          :pt="{ columnheadercontent: { class: 'justify-center!' } }"
          body-class="text-center!"
        >
          <template #body="{ data }">
            <span
              class="offerte-badge"
              :class="
                data.status === 'Geaccepteerd' ? 'offerte-badge--success' : 'offerte-badge--warn'
              "
            >
              {{ data.status }}
            </span>
          </template>
        </Column>
        <Column field="opmerkingen" header="Opmerkingen" style="width: 9rem">
          <template #body="{ data }">{{ data.opmerkingen || 'Geen' }}</template>
        </Column>
        <Column style="width: 3rem">
          <template #body><i class="pi pi-pencil text-primary-400 cursor-pointer" /></template>
        </Column>
        <template #empty
          ><span class="table-empty">Er zijn geen resultaten gevonden</span></template
        >
      </DataTable>
    </div>
  </div>
</template>

<style scoped>
  .offerte-badge {
    display: inline-flex;
    padding: 0.2rem 0.625rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
    border: 1px solid;
  }
  .offerte-badge--success {
    background: var(--p-green-50);
    border-color: var(--p-green-200);
    color: var(--p-green-700);
  }
  .offerte-badge--warn {
    background: var(--p-orange-50);
    border-color: var(--p-orange-200);
    color: var(--p-orange-700);
  }
</style>
