<script setup lang="ts">
  import { OrdersAddStep } from '@/types/orders';

  interface Props {
    step: OrdersAddStep;
    value: number;
    currentStep: number;
    lastStep: boolean;
  }

  const props = defineProps<Props>();

  const stepIsComplete = (active: boolean, value: number) => {
    return !active && value < props.currentStep;
  };
</script>

<template>
  <Step :value="props.value" as-child>
    <template #default="{ active, value, activateCallback }">
      <div class="flex gap-3 pr-3" :class="{ 'w-full': !props.lastStep, 'w-fit': props.lastStep }">
        <button
          type="button"
          class="bg-transparent border-0 flex gap-2 items-center grow cursor-pointer rounded-md px-3 py-2 -mx-3 -my-2 hover:bg-gray-100 transition-colors duration-150"
          @click="activateCallback"
        >
          <span
            v-if="stepIsComplete(active, Number(value))"
            class="text-green-500 border-green-500 border-2 rounded-full h-8 w-8 flex justify-center items-center"
          >
            <i class="pi pi-check" style="font-size: 1rem" />
          </span>
          <span
            v-else
            class="p-step-number transition-[border] duration-200 ease-in-out"
            :class="{ 'border-primary-500! text-primary-500!': active }"
          >
            {{ value }}
          </span>

          <span
            class="text-lg font-semibold text-gray-500 transition-[color] duration-200 ease-in-out text-nowrap"
            :class="{
              'text-primary-500!': active,
              'text-green-500!': stepIsComplete(active, Number(value)),
            }"
          >
            {{ props.step.label }}
          </span>
        </button>
        <Divider v-if="!props.lastStep" class="before:border-bs-2!" />
      </div>
    </template>
  </Step>
</template>
