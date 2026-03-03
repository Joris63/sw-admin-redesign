<script setup lang="ts">
  import { ref, inject } from 'vue';
  import type { Ref } from 'vue';
  import type { CustomerData, CustomerAddress } from '@/types/customer';
  import type { AddressForm } from '@/types/address';
  import AddressDrawer from '../../components/AddressDrawer.vue';

  const customer = inject<Ref<CustomerData>>('customer')!;

  const addrDrawerVisible = ref(false);
  const addrDrawerAddress = ref<AddressForm | null>(null);

  function openAddAddress() {
    addrDrawerAddress.value = null;
    addrDrawerVisible.value = true;
  }

  function openEditAddress(addr: CustomerAddress) {
    addrDrawerAddress.value = {
      id: addr.id,
      aanhef: null,
      voornaam: addr.naam,
      achternaam: '',
      telefoonLand: '+31',
      telefoon: addr.telefoon,
      terAttentieVan: '',
      land: addr.land,
      postcode: addr.postcode,
      huisnummer: addr.huisnummer,
      toevoeging: '',
      straat: addr.straat,
      woonplaats: addr.woonplaats,
    };
    addrDrawerVisible.value = true;
  }

  function saveAddress(data: AddressForm) {
    if (data.id) {
      const idx = customer.value.addresses.findIndex((a) => a.id === data.id);
      if (idx !== -1) {
        customer.value.addresses[idx] = {
          ...customer.value.addresses[idx],
          naam: [data.aanhef, data.voornaam, data.achternaam].filter(Boolean).join(' '),
          straat: data.straat,
          huisnummer: data.huisnummer,
          postcode: data.postcode,
          woonplaats: data.woonplaats,
          land: data.land,
          telefoon: `${data.telefoonLand} ${data.telefoon}`.trim(),
        };
      }
    } else {
      const newId = Math.max(0, ...customer.value.addresses.map((a) => a.id)) + 1;
      customer.value.addresses.push({
        id: newId,
        naam: [data.aanhef, data.voornaam, data.achternaam].filter(Boolean).join(' '),
        straat: data.straat,
        huisnummer: data.huisnummer,
        postcode: data.postcode,
        woonplaats: data.woonplaats,
        land: data.land,
        telefoon: `${data.telefoonLand} ${data.telefoon}`.trim(),
        isStandaardBezorg: false,
        isStandaardFactuur: false,
      });
    }
  }

  function deleteAddress(id: number) {
    customer.value.addresses = customer.value.addresses.filter((a) => a.id !== id);
  }

  function makeStandaardBezorg(id: number) {
    customer.value.addresses.forEach((a) => {
      a.isStandaardBezorg = a.id === id;
    });
  }

  function makeStandaardFactuur(id: number) {
    customer.value.addresses.forEach((a) => {
      a.isStandaardFactuur = a.id === id;
    });
  }
</script>

<template>
  <div class="tab-scroll">
    <div class="addr-topbar">
      <Button
        label="Nieuw adres toevoegen"
        icon="pi pi-plus"
        size="small"
        @click="openAddAddress"
      />
    </div>
    <div class="addr-grid">
      <div v-for="addr in customer.addresses" :key="addr.id" class="addr-card">
        <div class="addr-card-head">
          <div class="addr-name">{{ addr.naam }}</div>
          <div class="addr-card-actions">
            <Button
              icon="pi pi-pencil"
              severity="secondary"
              text
              rounded
              size="small"
              @click="openEditAddress(addr)"
            />
            <Button
              v-if="!addr.isStandaardBezorg && !addr.isStandaardFactuur"
              icon="pi pi-trash"
              severity="danger"
              text
              rounded
              size="small"
              @click="deleteAddress(addr.id)"
            />
          </div>
        </div>
        <div class="addr-line">
          {{ addr.straat }} {{ addr.huisnummer }}, {{ addr.postcode }} {{ addr.woonplaats }}
        </div>
        <div class="addr-line">{{ addr.land }}</div>
        <div v-if="addr.telefoon" class="addr-line">{{ addr.telefoon }}</div>
        <div class="addr-chips">
          <button
            class="addr-chip"
            :class="addr.isStandaardBezorg ? 'addr-chip--active' : 'addr-chip--inactive'"
            :disabled="addr.isStandaardBezorg"
            @click="makeStandaardBezorg(addr.id)"
          >
            <i class="pi" :class="addr.isStandaardBezorg ? 'pi-check' : 'pi-home'" />
            Bezorgadres
          </button>
          <button
            class="addr-chip"
            :class="addr.isStandaardFactuur ? 'addr-chip--active' : 'addr-chip--inactive'"
            :disabled="addr.isStandaardFactuur"
            @click="makeStandaardFactuur(addr.id)"
          >
            <i class="pi" :class="addr.isStandaardFactuur ? 'pi-check' : 'pi-file'" />
            Factuuradres
          </button>
        </div>
      </div>
    </div>
  </div>

  <AddressDrawer
    v-model:visible="addrDrawerVisible"
    :address="addrDrawerAddress"
    @save="saveAddress"
  />
</template>

<style scoped>
  .addr-topbar {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
  }

  .addr-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  .addr-card {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    border: 1px solid var(--p-gray-200);
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
    background: white;
  }

  .addr-card-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 0.1rem;
  }
  .addr-card-actions {
    display: flex;
    gap: 0.1rem;
    margin: -0.375rem -0.375rem 0 0;
  }

  .addr-name {
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--p-surface-800);
  }
  .addr-line {
    font-size: 0.8375rem;
    color: var(--p-surface-600);
  }

  .addr-chips {
    display: flex;
    gap: 0.4rem;
    margin-top: 0.75rem;
    flex-wrap: wrap;
  }

  .addr-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.2rem 0.625rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 500;
    border: 1px solid;
    cursor: pointer;
    transition: opacity 0.1s;
  }
  .addr-chip:disabled {
    cursor: default;
  }
  .addr-chip--active {
    background: var(--p-primary-50);
    border-color: var(--p-primary-200);
    color: var(--p-primary-700);
  }
  .addr-chip--inactive {
    background: white;
    border-color: var(--p-gray-300);
    color: var(--p-surface-500);
  }
  .addr-chip--inactive:hover {
    background: var(--p-gray-50);
    border-color: var(--p-gray-400);
  }
</style>
