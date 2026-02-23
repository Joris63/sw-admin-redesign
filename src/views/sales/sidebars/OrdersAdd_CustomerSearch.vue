<script setup lang="ts">
  import { ref, computed } from 'vue';

  const visible = defineModel<boolean>();

  const email = ref('');
  const bedrijfsnaam = ref('');
  const achternaam = ref('');
  const postcode = ref('');
  const huisnummer = ref('');

  const canSearch = computed(
    () =>
      email.value.trim() ||
      bedrijfsnaam.value.trim() ||
      achternaam.value.trim() ||
      postcode.value.trim() ||
      huisnummer.value.trim()
  );
</script>

<template>
  <Drawer v-model:visible="visible" header="Zoek klant" position="right" class="w-120!">
    <div class="flex flex-col gap-2">
      <div class="flex flex-col gap-1">
        <label class="form-label">E-mail</label>
        <InputText v-model="email" placeholder="Voer een emailadres in" />
      </div>
      <div class="flex flex-col gap-1">
        <label class="form-label">Bedrijfsnaam</label>
        <InputText v-model="bedrijfsnaam" placeholder="Voer een bedrijfsnaam in" />
      </div>
      <div class="flex flex-col gap-1">
        <label class="form-label">Achternaam</label>
        <InputText v-model="achternaam" placeholder="Voer een achternaam in" />
      </div>
      <div class="grid grid-cols-2 gap-2">
        <div class="flex flex-col gap-1">
          <label class="form-label">Postcode</label>
          <InputText v-model="postcode" placeholder="Voer een postcode in" />
        </div>
        <div class="flex flex-col gap-1">
          <label class="form-label">Huisnummer</label>
          <InputText v-model="huisnummer" placeholder="Voer een huisnummer in" />
        </div>
      </div>
      <Button label="Zoeken" :disabled="!canSearch" class="mt-5" />
    </div>
  </Drawer>
</template>

<style scoped>
  .form-label {
    font-size: 0.875rem;
    color: var(--p-gray-500);
    padding-top: 0.375rem;
  }
</style>
