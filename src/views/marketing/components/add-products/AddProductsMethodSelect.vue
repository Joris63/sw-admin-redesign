<script setup lang="ts">
  export type AddMethod = 'zoeken' | 'merk' | 'csv';

  defineProps<{
    modelValue: AddMethod | null;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: AddMethod): void;
  }>();

  const METHODS: { value: AddMethod; icon: string; title: string; desc: string }[] = [
    {
      value: 'zoeken',
      icon: 'pi pi-search',
      title: 'Product zoeken',
      desc: 'Zoek op code, naam of merk en voeg producten één voor één toe.',
    },
    {
      value: 'merk',
      icon: 'pi pi-sliders-h',
      title: 'Merk / Serie / Categorie',
      desc: 'Selecteer merken, series en categorieën om producten in bulk toe te voegen.',
    },
    {
      value: 'csv',
      icon: 'pi pi-file-import',
      title: 'CSV importeren',
      desc: 'Upload een CSV met productcodes of producentcodes.',
    },
  ];
</script>

<template>
  <div class="drw-section">
    <p class="drw-section-hdr">Hoe wil je producten toevoegen?</p>
    <div class="method-grid">
      <button
        v-for="m in METHODS"
        :key="m.value"
        class="method-card"
        @click="emit('update:modelValue', m.value)"
      >
        <div class="method-card__icon">
          <i :class="m.icon" />
        </div>
        <strong class="method-card__title">{{ m.title }}</strong>
        <p class="method-card__desc">{{ m.desc }}</p>
      </button>
    </div>
  </div>
</template>

<style scoped>
  .method-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.625rem;
  }
  .method-card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
    padding: 0.875rem 1rem;
    border-radius: 0.5rem;
    border: 1.5px solid var(--p-gray-200);
    background: white;
    cursor: pointer;
    text-align: left;
    transition:
      border-color 0.15s,
      box-shadow 0.15s;
  }
  .method-card:hover {
    border-color: var(--p-primary-300);
    box-shadow: 0 0 0 3px var(--p-primary-50);
  }
  .method-card__icon {
    width: 2rem;
    height: 2rem;
    border-radius: 0.375rem;
    background: var(--p-gray-100);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    color: var(--p-gray-500);
    transition:
      background 0.15s,
      color 0.15s;
  }
  .method-card:hover .method-card__icon {
    background: var(--p-primary-50);
    color: var(--p-primary-500);
  }
  .method-card__title {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--p-surface-700);
  }
  .method-card__desc {
    font-size: 0.75rem;
    color: var(--p-gray-400);
    line-height: 1.4;
  }
</style>
