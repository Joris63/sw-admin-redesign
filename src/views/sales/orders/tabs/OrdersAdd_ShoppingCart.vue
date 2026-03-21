<script setup lang="ts">
import { ref } from 'vue';
import { useOrderCart } from '@/composables/useOrderCart';
import CartSidebar from '@/views/sales/orders/components/cart/CartSidebar.vue';
import CartAccordion from '@/views/sales/orders/components/cart/CartAccordion.vue';
import CartTotals from '@/views/sales/orders/components/cart/CartTotals.vue';

const props = withDefaults(defineProps<{ readonly?: boolean }>(), { readonly: false });
const emit = defineEmits<{ addToGroup: [groupId: string] }>();

useOrderCart();

const activeGroups = ref<string[]>(['0', '1', '2']);
const activeGroupId = ref<string | null>(null);

function scrollToGroup(groupId: string) {
  activeGroupId.value = groupId;
  if (!activeGroups.value.includes(groupId)) {
    activeGroups.value = [...activeGroups.value, groupId];
  }
  setTimeout(() => {
    document
      .getElementById(`group-${groupId}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 50);
}
</script>

<template>
  <div class="cart-shell">
    <CartSidebar
      :readonly="props.readonly"
      :active-group-id="activeGroupId"
      @scroll-to-group="scrollToGroup"
    />

    <div class="cart-main">
      <CartAccordion
        :readonly="props.readonly"
        :active-groups="activeGroups"
        @update:active-groups="activeGroups = $event"
        @add-to-group="emit('addToGroup', $event)"
      />

      <CartTotals :readonly="props.readonly" />
    </div>
  </div>
</template>

<style scoped>
/* ── Shell layout ────────────────────────────────────────── */
.cart-shell {
  display: flex;
  flex: 1;
  min-height: 0;
}

/* ── Main cart area ──────────────────────────────────────── */
.cart-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0;
  overflow-y: auto;
}
</style>
