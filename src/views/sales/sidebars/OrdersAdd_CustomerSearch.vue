<script setup lang="ts">
  import { ref, computed } from 'vue';

  const visible = defineModel<boolean>();

  const email = ref('');
  const companyName = ref('');
  const lastName = ref('');
  const postalCode = ref('');
  const houseNumber = ref('');

  const canSearch = computed(
    () =>
      email.value.trim() ||
      companyName.value.trim() ||
      lastName.value.trim() ||
      postalCode.value.trim() ||
      houseNumber.value.trim()
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
        <InputText v-model="companyName" placeholder="Showroomworks BV" />
      </div>
      <div class="drw-field">
        <label class="drw-label">Achternaam</label>
        <InputText v-model="lastName" placeholder="de Vries" />
      </div>
      <div class="grid grid-cols-2 gap-2">
        <div class="drw-field">
          <label class="drw-label">Postcode</label>
          <InputText v-model="postalCode" placeholder="1234 AB" />
        </div>
        <div class="drw-field">
          <label class="drw-label">Huisnummer</label>
          <InputText v-model="houseNumber" placeholder="12" />
        </div>
      </div>
      <Button label="Zoeken" :disabled="!canSearch" class="mt-5" />
    </div>
  </Drawer>
</template>
