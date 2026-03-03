<script setup lang="ts">
  import type { OmzetPerJaar } from '@/types/customer';

  const omzetPerJaar: OmzetPerJaar[] = [
    { jaar: 2025, omzet: 14.95 },
    { jaar: 2024, omzet: 1842.3 },
    { jaar: 2023, omzet: 3210.55 },
  ];
</script>

<template>
  <div class="tab-scroll">
    <div class="view-card">
      <div class="view-card-hdr">
        <span class="view-card-title">Omzet per jaar</span>
        <Button
          label="Bekijk bestellingen"
          icon="pi pi-shopping-cart"
          size="small"
          severity="secondary"
          outlined
        />
      </div>
      <DataTable :value="omzetPerJaar" class="ce-table">
        <Column field="jaar" header="Jaar" style="width: 8rem" />
        <Column field="omzet" header="Omzet">
          <template #body="{ data }"
            >€ {{ data.omzet.toLocaleString('nl-NL', { minimumFractionDigits: 2 }) }}</template
          >
        </Column>
        <template #empty><span class="table-empty">Geen omzet gevonden</span></template>
      </DataTable>
    </div>
  </div>
</template>
