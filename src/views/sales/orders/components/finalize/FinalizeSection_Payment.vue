<script setup lang="ts">
import { ref } from 'vue';
import { POS_PAYMENT_METHOD_OPTIONS } from '@/mocks/options';

const paymentMethod = ref('Ideal');
const paymentMethodOptions = POS_PAYMENT_METHOD_OPTIONS;
</script>

<template>
  <div>
    <div class="form-row items-center">
      <span class="form-label">Betaalmethode</span>
      <SelectButton v-model="paymentMethod" :options="paymentMethodOptions" />
    </div>
  </div>
</template>

<style scoped>
.form-row {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.875rem;
  color: var(--p-gray-500);
  padding-top: 0.375rem;
}
</style>
