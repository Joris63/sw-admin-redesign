<script setup lang="ts"></script>

<template>
  <StepPanel v-slot="{ activateCallback }" :value="3" class="flex flex-col grow">
    <div class="flex flex-col grow">
      <div
        class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
      >
        Content III
      </div>
    </div>
    <div class="pt-6">
      <Button
        label="Back"
        severity="secondary"
        icon="pi pi-arrow-left"
        @click="activateCallback(2)"
      />
    </div>
  </StepPanel>
</template>
