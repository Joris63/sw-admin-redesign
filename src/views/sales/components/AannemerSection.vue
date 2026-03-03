<script setup lang="ts">
  import { ref } from 'vue';

  type AannemerMode = 'search' | 'manual' | null;

  const aannemerMode = ref<AannemerMode>(null);
  const aannemerFound = ref(false);
  const aannemerSearchQuery = ref('');
  const mockAannemerCustomer = { name: 'Bouwbedrijf De Vries', email: 'devries@bouw.nl' };

  const aanbevolenBedrijf = ref('');
  const aanbevolenWoonplaats = ref('');
  const aanbevolenTypeBedrijf = ref<string | null>(null);
  const typeBedrijfOptions = ['Aannemer', 'Installateur', 'Architect', 'Anders'];

  function deselectAannemer() {
    aannemerFound.value = false;
  }
</script>

<template>
  <div class="flex flex-col gap-3">
    <span class="text-sm font-medium text-gray-500">Heb je al een aannemer / installateur?</span>
    <div class="grid grid-cols-2 gap-3">
      <button
        class="mode-card mode-card--neutral"
        :class="{ 'mode-card--active-neutral': aannemerMode === 'search' }"
        @click="aannemerMode = aannemerMode === 'search' ? null : 'search'"
      >
        <div class="mode-card__icon mode-card__icon--neutral"><i class="pi pi-search" /></div>
        <div class="flex flex-col text-left">
          <span class="font-semibold text-sm">Klant zoeken</span>
          <span class="text-xs text-gray-400 mt-0.5">Zoek op naam of e-mail</span>
        </div>
        <i
          v-if="aannemerMode === 'search'"
          class="pi pi-check-circle ml-auto text-gray-400 shrink-0"
        />
      </button>
      <button
        class="mode-card mode-card--neutral"
        :class="{ 'mode-card--active-neutral': aannemerMode === 'manual' }"
        @click="aannemerMode = aannemerMode === 'manual' ? null : 'manual'"
      >
        <div class="mode-card__icon mode-card__icon--neutral"><i class="pi pi-pencil" /></div>
        <div class="flex flex-col text-left">
          <span class="font-semibold text-sm">Handmatig invoeren</span>
          <span class="text-xs text-gray-400 mt-0.5">Vul de gegevens handmatig in</span>
        </div>
        <i
          v-if="aannemerMode === 'manual'"
          class="pi pi-check-circle ml-auto text-gray-400 shrink-0"
        />
      </button>
    </div>
    <Transition name="fade-slide" mode="out-in">
      <div v-if="aannemerMode === 'search'" key="aannemer-search" class="flex flex-col gap-3">
        <div class="flex gap-2">
          <IconField class="flex-1">
            <InputText
              v-model="aannemerSearchQuery"
              class="w-full"
              placeholder="Zoek op naam of e-mailadres"
            />
            <InputIcon class="pi pi-search" />
          </IconField>
          <Button label="Klant zoeken" icon="pi pi-search" class="btn-outlined" />
        </div>
        <Transition name="fade">
          <div v-if="aannemerFound" class="customer-indicator">
            <div class="customer-indicator__avatar"><i class="pi pi-building" /></div>
            <div class="flex flex-col leading-snug">
              <span class="text-sm font-semibold">{{ mockAannemerCustomer.name }}</span>
              <span class="text-xs text-gray-400">{{ mockAannemerCustomer.email }}</span>
            </div>
            <Button
              icon="pi pi-times"
              variant="text"
              severity="secondary"
              size="small"
              rounded
              class="ml-auto shrink-0"
              @click="deselectAannemer"
            />
          </div>
        </Transition>
      </div>
      <div
        v-else-if="aannemerMode === 'manual'"
        key="aannemer-manual"
        class="flex flex-col gap-4"
      >
        <div class="form-row items-center">
          <span class="form-label">Naam bedrijf</span>
          <InputText
            v-model="aanbevolenBedrijf"
            placeholder="Bouwbedrijf de Vries"
            class="flex-1"
          />
        </div>
        <div class="form-row items-center">
          <span class="form-label">Woonplaats</span>
          <InputText v-model="aanbevolenWoonplaats" placeholder="Amsterdam" class="flex-1" />
        </div>
        <div class="form-row items-center">
          <span class="form-label">Type bedrijf</span>
          <Select
            v-model="aanbevolenTypeBedrijf"
            :options="typeBedrijfOptions"
            placeholder="Selecteer bedrijfstype"
            class="flex-1"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>
