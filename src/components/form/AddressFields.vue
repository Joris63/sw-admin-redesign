<script setup lang="ts">
  const postalCode = defineModel<string>('postalCode', { required: true });
  const houseNumber = defineModel<string>('houseNumber', { required: true });
  const addition = defineModel<string>('addition', { required: true });
  const street = defineModel<string>('street', { required: true });
  const city = defineModel<string>('city', { required: true });
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="grid grid-cols-3 gap-2">
      <InputText v-model="postalCode" placeholder="1234 AB" />
      <InputText v-model="houseNumber" placeholder="12" />
      <InputText v-model="addition" placeholder="A" />
    </div>
    <div class="grid grid-cols-2 gap-2">
      <InputText v-model="street" placeholder="Kerkstraat" />
      <InputText v-model="city" placeholder="Amsterdam" />
    </div>
  </div>
</template>
