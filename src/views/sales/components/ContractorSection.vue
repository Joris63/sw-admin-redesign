<script setup lang="ts">
  import { ref } from 'vue';

  type ContractorMode = 'search' | 'manual' | null;

  const contractorMode = ref<ContractorMode>(null);
  const contractorFound = ref(false);
  const contractorSearchQuery = ref('');
  const mockContractorCustomer = { name: 'Bouwbedrijf De Vries', email: 'devries@bouw.nl' };

  const contractorCompany = ref('');
  const contractorCity = ref('');
  const contractorCompanyType = ref<string | null>(null);
  const companyTypeOptions = ['Aannemer', 'Installateur', 'Architect', 'Anders'];

  function deselectContractor() {
    contractorFound.value = false;
  }
</script>

<style scoped>
  .form-row {
    display: grid;
    grid-template-columns: 160px 1fr;
    gap: 0.5rem;
  }
  .form-label {
    font-size: 0.875rem;
    color: var(--p-gray-500);
    padding-top: 0.375rem;
  }

  .mode-card {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    padding: 1rem 1.25rem;
    border: 1.5px solid var(--p-surface-200);
    border-radius: 0.625rem;
    background: var(--p-surface-0);
    cursor: pointer;
    transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
    text-align: left;
  }
  .mode-card--neutral:hover { border-color: var(--p-gray-400); }
  .mode-card--active-neutral {
    border-color: var(--p-gray-400);
    background: var(--p-gray-50);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--p-gray-500) 10%, transparent);
  }
  .mode-card__icon {
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.95rem;
    flex-shrink: 0;
    transition: background 0.15s ease;
  }
  .mode-card__icon--neutral { background: var(--p-gray-100); color: var(--p-gray-500); }
  .mode-card--active-neutral .mode-card__icon--neutral { background: var(--p-gray-200); color: var(--p-gray-600); }

  .customer-indicator {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border: 1.5px solid var(--p-gray-300);
    border-radius: 0.625rem;
    background: var(--p-gray-50);
  }
  .customer-indicator__avatar {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: var(--p-gray-200);
    color: var(--p-gray-600);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    flex-shrink: 0;
  }

  .fade-slide-enter-active, .fade-slide-leave-active {
    transition: opacity 0.15s ease, transform 0.15s ease;
  }
  .fade-slide-enter-from { opacity: 0; transform: translateY(6px); }
  .fade-slide-leave-to { opacity: 0; transform: translateY(-6px); }
  .fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
  .fade-enter-from, .fade-leave-to { opacity: 0; }
</style>

<template>
  <div class="flex flex-col gap-3">
    <span class="text-sm font-medium text-gray-500">Heb je al een aannemer / installateur?</span>
    <div class="grid grid-cols-2 gap-3">
      <button
        class="mode-card mode-card--neutral"
        :class="{ 'mode-card--active-neutral': contractorMode === 'search' }"
        @click="contractorMode = contractorMode === 'search' ? null : 'search'"
      >
        <div class="mode-card__icon mode-card__icon--neutral"><i class="pi pi-search" /></div>
        <div class="flex flex-col text-left">
          <span class="font-semibold text-sm">Klant zoeken</span>
          <span class="text-xs text-gray-400 mt-0.5">Zoek op naam of e-mail</span>
        </div>
        <i
          v-if="contractorMode === 'search'"
          class="pi pi-check-circle ml-auto text-gray-400 shrink-0"
        />
      </button>
      <button
        class="mode-card mode-card--neutral"
        :class="{ 'mode-card--active-neutral': contractorMode === 'manual' }"
        @click="contractorMode = contractorMode === 'manual' ? null : 'manual'"
      >
        <div class="mode-card__icon mode-card__icon--neutral"><i class="pi pi-pencil" /></div>
        <div class="flex flex-col text-left">
          <span class="font-semibold text-sm">Handmatig invoeren</span>
          <span class="text-xs text-gray-400 mt-0.5">Vul de gegevens handmatig in</span>
        </div>
        <i
          v-if="contractorMode === 'manual'"
          class="pi pi-check-circle ml-auto text-gray-400 shrink-0"
        />
      </button>
    </div>
    <Transition name="fade-slide" mode="out-in">
      <div v-if="contractorMode === 'search'" key="contractor-search" class="flex flex-col gap-3">
        <div class="flex gap-2">
          <IconField class="flex-1">
            <InputText
              v-model="contractorSearchQuery"
              class="w-full"
              placeholder="Zoek op naam of e-mailadres"
            />
            <InputIcon class="pi pi-search" />
          </IconField>
          <Button label="Klant zoeken" icon="pi pi-search" class="btn-outlined" />
        </div>
        <Transition name="fade">
          <div v-if="contractorFound" class="customer-indicator">
            <div class="customer-indicator__avatar"><i class="pi pi-building" /></div>
            <div class="flex flex-col leading-snug">
              <span class="text-sm font-semibold">{{ mockContractorCustomer.name }}</span>
              <span class="text-xs text-gray-400">{{ mockContractorCustomer.email }}</span>
            </div>
            <Button
              icon="pi pi-times"
              variant="text"
              severity="secondary"
              size="small"
              rounded
              class="ml-auto shrink-0"
              @click="deselectContractor"
            />
          </div>
        </Transition>
      </div>
      <div v-else-if="contractorMode === 'manual'" key="contractor-manual" class="flex flex-col gap-4">
        <div class="form-row items-center">
          <span class="form-label">Naam bedrijf</span>
          <InputText
            v-model="contractorCompany"
            placeholder="Bouwbedrijf de Vries"
            class="flex-1"
          />
        </div>
        <div class="form-row items-center">
          <span class="form-label">Woonplaats</span>
          <InputText v-model="contractorCity" placeholder="Amsterdam" class="flex-1" />
        </div>
        <div class="form-row items-center">
          <span class="form-label">Type bedrijf</span>
          <Select
            v-model="contractorCompanyType"
            :options="companyTypeOptions"
            placeholder="Selecteer bedrijfstype"
            class="flex-1"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>
