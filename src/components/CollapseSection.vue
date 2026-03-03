<script setup lang="ts">
  const open = defineModel<boolean>({ required: true });

  defineProps<{
    title: string;
    count?: number;
  }>();
</script>

<template>
  <div>
    <div class="view-card-hdr">
      <div class="flex items-center gap-2">
        <span class="view-card-title">{{ title }}</span>
        <span v-if="count !== undefined" class="kort-count-badge">{{ count }}</span>
      </div>
      <Button
        :icon="open ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"
        size="small"
        severity="secondary"
        text
        @click="open = !open"
      />
    </div>
    <Transition name="card-fade">
      <div v-if="open">
        <slot />
      </div>
    </Transition>
  </div>
</template>
