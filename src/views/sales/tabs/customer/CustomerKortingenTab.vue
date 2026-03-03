<script setup lang="ts">
  import { ref, computed, inject } from 'vue';
  import type { Ref } from 'vue';
  import type { CustomerData } from '@/types/customer';

  const customer = inject<Ref<CustomerData>>('customer')!;

  const isEditingBasisKorting = ref(false);
  const merkKortingenOpen = ref(true);
  const productKortingenOpen = ref(true);
  const merkFilter = ref('');
  const productFilter = ref('');

  const filteredMerkKortingen = computed(() => {
    const q = merkFilter.value.toLowerCase();
    return customer.value.merkKortingen.filter((m) => m.merk.toLowerCase().includes(q));
  });

  const filteredProductKortingen = computed(() => {
    const q = productFilter.value.toLowerCase();
    return customer.value.productKortingen.filter(
      (p) => p.product.toLowerCase().includes(q) || p.productcode.toLowerCase().includes(q)
    );
  });
</script>

<template>
  <div class="tab-scroll">
    <!-- Basis korting -->
    <div class="view-card">
      <div class="view-card-hdr">
        <span class="view-card-title">Basis korting</span>
        <template v-if="!isEditingBasisKorting">
          <Button
            label="Bewerken"
            icon="pi pi-pencil"
            size="small"
            severity="secondary"
            text
            @click="isEditingBasisKorting = true"
          />
        </template>
        <template v-else>
          <div class="flex gap-2">
            <Button
              label="Annuleren"
              size="small"
              severity="secondary"
              outlined
              @click="isEditingBasisKorting = false"
            />
            <Button label="Opslaan" size="small" @click="isEditingBasisKorting = false" />
          </div>
        </template>
      </div>
      <Transition name="card-fade" mode="out-in">
        <div v-if="!isEditingBasisKorting" key="view" class="view-card-body">
          <div class="fr-row">
            <span class="fr-label">Basis korting</span>
            <span class="fr-value">{{ customer.basisKorting }}%</span>
          </div>
        </div>
        <div v-else key="edit" class="view-card-body">
          <div class="fr-row">
            <label class="fr-label">Basis korting</label>
            <InputNumber
              v-model="customer.basisKorting"
              suffix="%"
              :min="0"
              :max="100"
              :min-fraction-digits="1"
              :max-fraction-digits="2"
              class="w-full"
            />
          </div>
        </div>
      </Transition>
    </div>

    <!-- Merk kortingen -->
    <div class="view-card">
      <div class="view-card-hdr">
        <div class="flex items-center gap-2">
          <span class="view-card-title">Merk kortingen</span>
          <span class="kort-count-badge">{{ customer.merkKortingen.length }}</span>
        </div>
        <div class="flex items-center gap-1">
          <Button icon="pi pi-plus" size="small" severity="secondary" text />
          <Button
            :icon="merkKortingenOpen ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"
            size="small"
            severity="secondary"
            text
            @click="merkKortingenOpen = !merkKortingenOpen"
          />
        </div>
      </div>
      <Transition name="card-fade">
        <div v-if="merkKortingenOpen">
          <div class="kort-filter-bar">
            <InputText
              v-model="merkFilter"
              size="small"
              placeholder="Zoek merk..."
              class="w-full"
            />
          </div>
          <DataTable :value="filteredMerkKortingen" class="ce-table" :empty-message="' '">
            <template #empty>
              <span class="table-empty">{{
                merkFilter ? 'Geen merken gevonden' : 'Geen merk kortingen'
              }}</span>
            </template>
            <Column selection-mode="multiple" style="width: 3rem" />
            <Column field="merk" header="Merk" />
            <Column field="korting" header="Korting">
              <template #body="{ data }">{{ data.korting }}%</template>
            </Column>
            <Column field="standaardKorting" header="Standaard kortingen">
              <template #body="{ data }">{{ data.standaardKorting }}%</template>
            </Column>
          </DataTable>
        </div>
      </Transition>
    </div>

    <!-- Product kortingen -->
    <div class="view-card">
      <div class="view-card-hdr">
        <div class="flex items-center gap-2">
          <span class="view-card-title">Product kortingen</span>
          <span class="kort-count-badge">{{ customer.productKortingen.length }}</span>
        </div>
        <div class="flex items-center gap-1">
          <Button icon="pi pi-plus" size="small" severity="secondary" text />
          <Button
            :icon="productKortingenOpen ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"
            size="small"
            severity="secondary"
            text
            @click="productKortingenOpen = !productKortingenOpen"
          />
        </div>
      </div>
      <Transition name="card-fade">
        <div v-if="productKortingenOpen">
          <div class="kort-filter-bar">
            <InputText
              v-model="productFilter"
              size="small"
              placeholder="Zoek product..."
              class="w-full"
            />
          </div>
          <DataTable :value="filteredProductKortingen" class="ce-table" :empty-message="' '">
            <template #empty>
              <span class="table-empty">{{
                productFilter ? 'Geen producten gevonden' : 'Geen product kortingen'
              }}</span>
            </template>
            <Column selection-mode="multiple" style="width: 3rem" />
            <Column field="productcode" header="Productcode" />
            <Column field="product" header="Product" />
            <Column
              field="prijs"
              header="Prijs"
              :pt="{ columnheadercontent: { class: 'justify-end!' } }"
              body-class="col-right"
            >
              <template #body="{ data }">€ {{ data.prijs.toFixed(2) }}</template>
            </Column>
            <Column
              field="kortingPrijs"
              header="Korting prijs"
              :pt="{ columnheadercontent: { class: 'justify-end!' } }"
              body-class="col-right"
            >
              <template #body="{ data }">€ {{ data.kortingPrijs.toFixed(2) }}</template>
            </Column>
          </DataTable>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
  .kort-filter-bar {
    display: flex;
    align-items: center;
    padding: 0.625rem 1rem;
    border-bottom: 1px solid var(--p-gray-100);
  }
</style>
