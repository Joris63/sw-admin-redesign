<script setup lang="ts">
  import { ref } from 'vue';

  type AanbevolenMode = 'search' | 'manual' | null;

  const mode = ref<AanbevolenMode>(null);
  const found = ref(false);
  const searchQuery = ref('');
  const mockCustomer = { name: 'Showroomworks BV', email: 'info@showroomworks.nl' };

  const bedrijf = ref('');
  const woonplaats = ref('');
  const typeBedrijf = ref<string | null>(null);
  const typeBedrijfOptions = ['Aannemer', 'Installateur', 'Architect', 'Anders'];

  function deselect() {
    found.value = false;
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
    <span class="text-sm font-medium text-gray-500">Ben je aanbevolen door iemand?</span>
    <div class="grid grid-cols-2 gap-3">
      <button
        class="mode-card mode-card--neutral"
        :class="{ 'mode-card--active-neutral': mode === 'search' }"
        @click="mode = mode === 'search' ? null : 'search'"
      >
        <div class="mode-card__icon mode-card__icon--neutral"><i class="pi pi-search" /></div>
        <div class="flex flex-col text-left">
          <span class="font-semibold text-sm">Bestaande klant zoeken</span>
          <span class="text-xs text-gray-400 mt-0.5">Zoek op e-mail</span>
        </div>
        <i v-if="mode === 'search'" class="pi pi-check-circle ml-auto text-gray-400 shrink-0" />
      </button>
      <button
        class="mode-card mode-card--neutral"
        :class="{ 'mode-card--active-neutral': mode === 'manual' }"
        @click="mode = mode === 'manual' ? null : 'manual'"
      >
        <div class="mode-card__icon mode-card__icon--neutral"><i class="pi pi-pencil" /></div>
        <div class="flex flex-col text-left">
          <span class="font-semibold text-sm">Handmatig invoeren</span>
          <span class="text-xs text-gray-400 mt-0.5">Vul de gegevens handmatig in</span>
        </div>
        <i v-if="mode === 'manual'" class="pi pi-check-circle ml-auto text-gray-400 shrink-0" />
      </button>
    </div>

    <Transition name="fade-slide" mode="out-in">
      <!-- Search mode -->
      <div v-if="mode === 'search'" key="search" class="flex flex-col gap-3">
        <div class="flex gap-2">
          <IconField class="flex-1">
            <InputText v-model="searchQuery" class="w-full" placeholder="Zoek op naam of e-mailadres" />
            <InputIcon class="pi pi-search" />
          </IconField>
          <Button label="Klant zoeken" icon="pi pi-user" class="btn-outlined" />
        </div>
        <Transition name="fade">
          <div v-if="found" class="customer-indicator">
            <div class="customer-indicator__avatar"><i class="pi pi-building" /></div>
            <div class="flex flex-col leading-snug">
              <span class="text-sm font-semibold">{{ mockCustomer.name }}</span>
              <span class="text-xs text-gray-400">{{ mockCustomer.email }}</span>
            </div>
            <Button
              icon="pi pi-times"
              variant="text"
              severity="secondary"
              size="small"
              rounded
              class="ml-auto shrink-0"
              @click="deselect"
            />
          </div>
        </Transition>
      </div>

      <!-- Manual mode -->
      <div v-else-if="mode === 'manual'" key="manual" class="flex flex-col gap-4">
        <div class="form-row items-center">
          <span class="form-label">Aanbevolen door</span>
          <InputText v-model="bedrijf" placeholder="Bouwbedrijf de Vries" class="flex-1" />
        </div>
        <div class="form-row items-center">
          <span class="form-label">Woonplaats</span>
          <InputText v-model="woonplaats" placeholder="Amsterdam" class="flex-1" />
        </div>
        <div class="form-row items-center">
          <span class="form-label">Type bedrijf</span>
          <Select
            v-model="typeBedrijf"
            :options="typeBedrijfOptions"
            placeholder="Selecteer bedrijfstype"
            class="flex-1"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>
