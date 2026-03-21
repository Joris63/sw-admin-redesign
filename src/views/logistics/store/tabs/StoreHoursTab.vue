<script setup lang="ts">
import { ref, computed } from 'vue';
import EditableCard from '@/components/EditableCard.vue';
import { SITE_OPTIONS } from '@/mocks/options';
import type { OpeningHours, StoreException } from '@/mocks/stores';

const props = defineProps<{
  store: Record<string, any>;
  openingHours: OpeningHours[];
  exceptions: StoreException[];
  addException: () => void;
  removeException: (id: number) => void;
}>();

const isEditingHours = ref(false);
const isEditingExceptions = ref(false);

const siteviews = computed(() => {
  const result: { key: string; label: string }[] = [];
  for (const site of props.store.sites) {
    if (site === 'sawiday_be') {
      result.push({ key: 'sawiday_be_nl', label: 'sawiday.be (NL)' });
      result.push({ key: 'sawiday_be_fr', label: 'sawiday.be (FR)' });
    } else {
      const opt = SITE_OPTIONS.find((o) => o.value === site);
      result.push({ key: site, label: opt?.label ?? site });
    }
  }
  return result;
});

function formatDate(date: Date | null) {
  return date?.toLocaleDateString('nl-NL') ?? '—';
}
</script>

<template>
  <!-- Openingstijden -->
  <EditableCard v-model="isEditingHours" title="Openingstijden">
    <template #view>
      <div class="view-card-body">
        <div v-for="row in openingHours" :key="row.day" class="fr-row">
          <span class="fr-label">{{ row.day }}</span>
          <span v-if="row.closed" class="fr-empty">Gesloten</span>
          <span v-else class="fr-value">{{ row.from }} – {{ row.to }}</span>
        </div>
      </div>
    </template>
    <template #edit>
      <div class="view-card-body">
        <div v-for="row in openingHours" :key="row.day" class="fr-row">
          <span class="fr-label">{{ row.day }}</span>
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2">
              <Checkbox v-model="row.closed" binary :input-id="`closed-${row.day}`" />
              <label :for="`closed-${row.day}`" class="text-sm text-surface-500 cursor-pointer">Gesloten</label>
            </div>
            <template v-if="!row.closed">
              <InputText v-model="row.from" style="width: 5.5rem" placeholder="09:00" />
              <span class="text-surface-400 text-sm">–</span>
              <InputText v-model="row.to" style="width: 5.5rem" placeholder="17:30" />
            </template>
          </div>
        </div>
      </div>
    </template>
  </EditableCard>

  <!-- Uitzonderingen -->
  <EditableCard v-model="isEditingExceptions" title="Uitzonderingen">
    <template #view>
      <div class="view-card-body">
        <div v-if="!exceptions.length" class="fr-empty" style="padding: 0.25rem 0">
          Geen uitzonderingen ingesteld
        </div>
        <div v-for="ex in exceptions" :key="ex.id" class="exception-card">
          <div class="exception-header">
            <span class="exception-date">{{ formatDate(ex.date) }}</span>
            <span v-if="ex.closed" class="status-badge status-badge--no">Gesloten</span>
            <span v-else class="fr-value text-sm">{{ ex.from }} – {{ ex.to }}</span>
          </div>
          <div class="exception-reasons">
            <div class="exception-reasons-header">Reden per siteview</div>
            <div v-for="sv in siteviews" :key="sv.key" class="exception-reason-row">
              <span class="exception-reason-site">{{ sv.label }}</span>
              <span :class="ex.reason[sv.key] ? 'fr-value text-sm' : 'fr-empty text-sm'">{{
                ex.reason[sv.key] || '—'
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #edit>
      <div class="view-card-body">
        <div v-if="!exceptions.length" class="fr-empty" style="padding: 0.25rem 0">
          Geen uitzonderingen
        </div>
        <div v-for="ex in exceptions" :key="ex.id" class="exception-card">
          <div class="exception-header">
            <DatePicker v-model="ex.date" date-format="dd-mm-yy" placeholder="dd-mm-jj" style="width: 9rem" />
            <div class="flex items-center gap-2">
              <Checkbox v-model="ex.closed" binary :input-id="`ex-closed-${ex.id}`" />
              <label :for="`ex-closed-${ex.id}`" class="text-sm text-surface-600 cursor-pointer">Gesloten</label>
            </div>
            <template v-if="!ex.closed">
              <InputText v-model="ex.from" class="exception-time" placeholder="09:00" />
              <span class="text-surface-400 text-sm">–</span>
              <InputText v-model="ex.to" class="exception-time" placeholder="17:30" />
            </template>
            <Button
              icon="pi pi-trash"
              severity="danger"
              text
              size="small"
              rounded
              style="margin-left: auto"
              @click="removeException(ex.id)"
            />
          </div>
          <div class="exception-reasons">
            <div class="exception-reasons-header">Reden per siteview</div>
            <div v-for="sv in siteviews" :key="sv.key" class="exception-reason-row">
              <span class="exception-reason-site">{{ sv.label }}</span>
              <InputText v-model="ex.reason[sv.key]" class="flex-1" placeholder="Bijv. 1e Paasdag" />
            </div>
          </div>
        </div>
        <div style="padding-top: 0.5rem">
          <Button
            label="Nieuwe uitzondering toevoegen"
            icon="pi pi-plus"
            size="small"
            severity="secondary"
            outlined
            @click="addException"
          />
        </div>
      </div>
    </template>
  </EditableCard>
</template>

<style scoped>
.exception-card {
  border: 1px solid var(--p-surface-200);
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 0.625rem;
}
.exception-card:last-of-type {
  margin-bottom: 0;
}
.exception-header {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  background: var(--p-surface-50);
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--p-surface-200);
}
.exception-date {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--p-surface-700);
  min-width: 6rem;
}
.exception-time {
  width: 5.5rem;
}
.exception-reasons {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0;
}
.exception-reasons-header {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--p-surface-400);
  padding: 0.4rem 0.75rem 0.25rem;
  border-bottom: 1px solid var(--p-surface-100);
}
.exception-reason-row {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--p-surface-100);
}
.exception-reason-row:last-child {
  border-bottom: none;
}
.exception-reason-site {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--p-surface-500);
  width: 8.5rem;
  flex-shrink: 0;
}
</style>
