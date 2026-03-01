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
  <Drawer
    v-model:visible="visible"
    header="Zoek klant"
    position="right"
    class="w-120!"
    :pt="{ content: { class: 'flex flex-col gap-0 p-0! overflow-hidden' } }"
  >
    <div class="drw-section">
      <div class="drw-field">
        <label class="drw-label">E-mail</label>
        <InputText v-model="email" placeholder="jan@bedrijf.nl" />
      </div>
      <div class="drw-field">
        <label class="drw-label">Bedrijfsnaam</label>
        <InputText v-model="bedrijfsnaam" placeholder="Showroomworks BV" />
      </div>
      <div class="drw-field">
        <label class="drw-label">Achternaam</label>
        <InputText v-model="achternaam" placeholder="de Vries" />
      </div>
      <div class="grid grid-cols-2 gap-2">
        <div class="drw-field">
          <label class="drw-label">Postcode</label>
          <InputText v-model="postcode" placeholder="1234 AB" />
        </div>
        <div class="drw-field">
          <label class="drw-label">Huisnummer</label>
          <InputText v-model="huisnummer" placeholder="12" />
        </div>
      </div>
      <Button label="Zoeken" :disabled="!canSearch" class="mt-5" />
    </div>
  </Drawer>
</template>

