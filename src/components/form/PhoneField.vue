<script setup lang="ts">
  const land = defineModel<string>('land', { default: '+31' });
  const nummer = defineModel<string>('nummer', { required: true });

  const options = [
    { label: '+31', value: '+31', code: 'nl' },
    { label: '+32', value: '+32', code: 'be' },
    { label: '+33', value: '+33', code: 'fr' },
    { label: '+49', value: '+49', code: 'de' },
  ];

  const flagCode = (value: string) => options.find((o) => o.value === value)?.code ?? 'nl';
</script>

<template>
  <div class="flex gap-2">
    <Select
      v-model="land"
      :options="options"
      option-label="label"
      option-value="value"
      style="width: 8.5rem"
    >
      <template #value="{ value }">
        <div class="flex items-center gap-2">
          <span
            :class="`fi fi-${flagCode(value)}`"
            style="
              width: 1.5rem;
              height: 1.125rem;
              display: inline-block;
              flex-shrink: 0;
              background-size: cover;
              background-position: center;
            "
          />
          <span>{{ value }}</span>
        </div>
      </template>
      <template #option="{ option }">
        <div class="flex items-center gap-2">
          <span
            :class="`fi fi-${option.code}`"
            style="
              width: 1.5rem;
              height: 1.125rem;
              display: inline-block;
              flex-shrink: 0;
              background-size: cover;
              background-position: center;
            "
          />
          <span>{{ option.label }}</span>
        </div>
      </template>
    </Select>
    <InputText v-model="nummer" class="flex-1" placeholder="Telefoonnummer" />
  </div>
</template>
