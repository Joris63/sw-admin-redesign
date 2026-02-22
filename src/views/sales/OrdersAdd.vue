<script setup lang="ts">
  import { ref } from 'vue';
  import OrdersAdd_Introduction from './tabs/OrdersAdd_Introduction.vue';
  import OrdersAdd_Overview from './tabs/OrdersAdd_Overview.vue';
  import OrdersAdd_Products from './tabs/OrdersAdd_Products.vue';
  import { OrdersAddStep } from '@/types/orders';
  import OrdersAdd_Step from './tabs/OrdersAdd_Step.vue';

  const currentStep = ref<number>(1);
  const steps = ref<OrdersAddStep[]>([
    { label: 'Product toevoegen' },
    { label: 'Even voorstellen' },
    { label: 'Overzicht' },
  ]);
</script>

<template>
  <div class="flex flex-col">
    <Stepper v-model:value="currentStep" class="flex flex-col">
      <StepList class="overflow-hidden pb-3! border-b border-gray-200">
        <OrdersAdd_Step
          v-for="(step, index) in steps"
          :key="step.label"
          :step="step"
          :value="index + 1"
          :current-step="currentStep"
        />
      </StepList>
      <StepPanels class="grow flex flex-col pb-0! pt-5!">
        <OrdersAdd_Products />
        <OrdersAdd_Introduction />
        <OrdersAdd_Overview />
      </StepPanels>
    </Stepper>
  </div>
</template>
