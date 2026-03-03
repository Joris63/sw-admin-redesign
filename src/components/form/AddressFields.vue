<script setup lang="ts">
  const postcode = defineModel<string>('postcode', { required: true });
  const huisnummer = defineModel<string>('huisnummer', { required: true });
  const toevoeging = defineModel<string>('toevoeging', { required: true });
  const straat = defineModel<string>('straat', { required: true });
  const woonplaats = defineModel<string>('woonplaats', { required: true });
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="grid grid-cols-3 gap-2">
      <InputText v-model="postcode" placeholder="1234 AB" />
      <InputText v-model="huisnummer" placeholder="12" />
      <InputText v-model="toevoeging" placeholder="A" />
    </div>
    <div class="grid grid-cols-2 gap-2">
      <InputText v-model="straat" placeholder="Kerkstraat" />
      <InputText v-model="woonplaats" placeholder="Amsterdam" />
    </div>
  </div>
</template>
