<script setup lang="ts">
  import type { RevenuePerYear } from '@/types/customer';

  const revenuePerYear: RevenuePerYear[] = [
    { year: 2025, revenue: 14.95 },
    { year: 2024, revenue: 1842.3 },
    { year: 2023, revenue: 3210.55 },
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
      <DataTable :value="revenuePerYear" class="ce-table">
        <Column field="year" header="Jaar" style="width: 8rem" />
        <Column field="revenue" header="Omzet">
          <template #body="{ data }"
            >€ {{ data.revenue.toLocaleString('nl-NL', { minimumFractionDigits: 2 }) }}</template
          >
        </Column>
        <template #empty><span class="table-empty">Geen omzet gevonden</span></template>
      </DataTable>
    </div>
  </div>
</template>
