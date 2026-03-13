<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import type { RouteLocationRaw } from 'vue-router';
  import Button from 'primevue/button';

  defineProps<{
    title: string;
    subtitle?: string;
    back?: RouteLocationRaw;
    avatarClass?: string;
  }>();

  const router = useRouter();
</script>

<template>
  <div class="edit-hdr">
    <Button
      v-if="back"
      icon="pi pi-arrow-left"
      severity="secondary"
      text
      rounded
      @click="router.push(back)"
    />
    <div class="edit-hdr-avatar" :class="avatarClass">
      <slot name="avatar" />
    </div>
    <div class="edit-hdr-info">
      <div class="edit-hdr-top">
        <span class="edit-hdr-title">{{ title }}</span>
        <slot name="pills" />
      </div>
      <span v-if="subtitle || $slots.subtitle" class="edit-hdr-subtitle">
        <slot name="subtitle">{{ subtitle }}</slot>
      </span>
    </div>
    <slot name="stats" />
    <div class="edit-hdr-actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<style scoped>
  .edit-hdr-actions {
    margin-left: auto;
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
</style>
