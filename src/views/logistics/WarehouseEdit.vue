<script setup lang="ts">
  import EditPageHeader from '@/components/layout/EditPageHeader.vue';
  import EditPageLayout from '@/components/layout/EditPageLayout.vue';
  import { ref } from 'vue';

  const warehouse = ref({
    naam: 'Inkomend Tilburg',
    straat: 'AaBe-straat',
    huisnummer: '28',
    toevoeging: '',
    stad: 'Tilburg',
    postcode: '5021 AV',
    land: 'NL',
  });


</script>

<template>
  <EditPageLayout>
    <!-- ── Header ──────────────────────────────────────────────────────────── -->
    <EditPageHeader
      :title="warehouse.naam"
      :subtitle="`${warehouse.straat} ${warehouse.huisnummer}, ${warehouse.stad}`"
      :back="{ name: 'LocationsOverview', query: { tab: 'warehouse' } }"
    >
      <template #avatar><i class="pi pi-warehouse" /></template>
    </EditPageHeader>
  </EditPageLayout>
</template>
