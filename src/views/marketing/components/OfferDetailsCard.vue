<script setup lang="ts">
  import { ref } from 'vue';
  import EditableCard from '@/components/EditableCard.vue';
  import type { OfferStatus } from '@/types/offer';
  import { SITE_OPTIONS } from '@/mocks/options';
  import { PENDING_SITE_CHANGES } from '@/mocks/offers';

  type OfferData = {
    id: number;
    name: string;
    description: string;
    websites: string[];
    startDate: Date | null;
    endDate: Date | null;
    status: OfferStatus;
  };

  const props = defineProps<{
    offer: OfferData;
    isExpired: boolean;
  }>();

  const emit = defineEmits<{
    save: [updatedOffer: OfferData];
  }>();

  // ── Local edit state ────────────────────────────────────────────
  const editingDetails = ref(false);
  const detailsDraft = ref<OfferData>({ ...props.offer, websites: [...props.offer.websites] });

  function startEditDetails() {
    detailsDraft.value = { ...props.offer, websites: [...props.offer.websites] };
    editingDetails.value = true;
  }

  function saveDetails() {
    emit('save', { ...detailsDraft.value, websites: [...detailsDraft.value.websites] });
  }

  function cancelDetails() {
    // draft is discarded; EditableCard sets editingDetails = false
  }

  // ── Website labels / site map ───────────────────────────────────
  const websiteLabels: Record<string, string> = Object.fromEntries(
    SITE_OPTIONS.map((o) => [o.value, o.label])
  );


  function formatDate(d: Date | null) {
    if (!d) return '—';
    return d.toLocaleDateString('nl-NL', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }
</script>

<template>
  <div class="tab-scroll">
    <div class="view-card">
      <EditableCard
        v-model="editingDetails"
        title="Actiedetails"
        :disabled="isExpired"
        @save="saveDetails"
        @cancel="cancelDetails"
        @update:model-value="(v) => { if (v) startEditDetails(); }"
      >
        <!-- View mode -->
        <template #view>
          <div class="view-card-body">
            <div class="fr-row">
              <span class="fr-label">Naam</span>
              <span class="fr-value">{{ offer.name }}</span>
            </div>
            <div class="fr-row fr-row--top">
              <span class="fr-label">Website(s)</span>
              <div class="flex flex-col gap-2">
                <div class="flex flex-wrap gap-1">
                  <span v-for="w in offer.websites" :key="w" class="site-tag">
                    {{ websiteLabels[w] ?? w }}
                  </span>
                  <span v-if="!offer.websites.length" class="fr-empty">—</span>
                </div>
                <div v-if="PENDING_SITE_CHANGES.length" class="pending-sites">
                  <span class="pending-label">Vannacht:</span>
                  <div class="pending-chips">
                    <span
                      v-for="s in PENDING_SITE_CHANGES"
                      :key="s.site + s.action"
                      class="pending-chip"
                      :class="`pending-chip--${s.action}`"
                    >
                      <i :class="`pi ${s.action === 'add' ? 'pi-plus' : 'pi-minus'} text-xs`" />
                      {{ s.site }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="fr-row">
              <span class="fr-label">Looptijd</span>
              <span class="fr-value">
                {{ formatDate(offer.startDate) }} → {{ formatDate(offer.endDate) }}
              </span>
            </div>
            <div class="fr-row fr-row--top">
              <span class="fr-label">Omschrijving</span>
              <span v-if="offer.description" class="fr-value" style="white-space: pre-wrap">{{
                offer.description
              }}</span>
              <span v-else class="fr-empty">—</span>
            </div>
          </div>
        </template>

        <!-- Edit mode -->
        <template #edit>
          <div class="view-card-body">
            <div class="fr-row">
              <span class="fr-label">Naam <span class="fr-req">*</span></span>
              <InputText
                v-model="detailsDraft.name"
                class="w-full"
                placeholder="Bijv. 2026 Q1: Black Friday BE"
              />
            </div>
            <div class="fr-row fr-row--top">
              <span class="fr-label">Website(s) <span class="fr-req">*</span></span>
              <div class="flex flex-col gap-2">
                <MultiSelect
                  v-model="detailsDraft.websites"
                  :options="SITE_OPTIONS"
                  option-label="label"
                  option-value="value"
                  class="w-full"
                  placeholder="Selecteer website(s)"
                  display="chip"
                />
                <div v-if="PENDING_SITE_CHANGES.length" class="pending-sites">
                  <span class="pending-label">Vannacht:</span>
                  <div class="pending-chips">
                    <span
                      v-for="s in PENDING_SITE_CHANGES"
                      :key="s.site + s.action"
                      class="pending-chip"
                      :class="`pending-chip--${s.action}`"
                    >
                      <i :class="`pi ${s.action === 'add' ? 'pi-plus' : 'pi-minus'} text-xs`" />
                      {{ s.site }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="fr-row">
              <span class="fr-label">Looptijd <span class="fr-req">*</span></span>
              <div class="flex items-center gap-2">
                <DatePicker
                  v-model="detailsDraft.startDate"
                  date-format="dd-mm-yy"
                  show-icon
                  icon-display="input"
                  class="flex-1"
                  placeholder="Startdatum"
                />
                <span class="text-gray-300 text-sm shrink-0">→</span>
                <DatePicker
                  v-model="detailsDraft.endDate"
                  date-format="dd-mm-yy"
                  show-icon
                  icon-display="input"
                  class="flex-1"
                  placeholder="Einddatum"
                />
              </div>
            </div>
            <div class="fr-row fr-row--top">
              <span class="fr-label">Omschrijving</span>
              <Textarea
                v-model="detailsDraft.description"
                class="w-full"
                :rows="4"
                placeholder="Optionele omschrijving"
                auto-resize
              />
            </div>
          </div>
        </template>
      </EditableCard>
    </div>
  </div>
</template>

<style scoped>
  /* ── Pending sites ────────────────────────────────────────────── */
  .pending-sites {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  .pending-label {
    font-size: 0.75rem;
    color: var(--p-gray-400);
    white-space: nowrap;
    padding-top: 0.2rem;
  }
  .pending-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }
  .pending-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.175rem 0.5rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 500;
    border: 1px solid transparent;
  }
  .pending-chip--remove {
    background: var(--p-red-50);
    color: var(--p-red-600);
    border-color: var(--p-red-200);
  }
  .pending-chip--add {
    background: var(--p-green-50);
    color: var(--p-green-700);
    border-color: var(--p-green-200);
  }

  /* ── site-tag (view mode websites) ───────────────────────────── */
  .site-tag {
    display: inline-flex;
    align-items: center;
    padding: 0.125rem 0.5rem;
    border-radius: 0.375rem;
    font-size: 0.75rem;
    font-weight: 500;
    background: var(--p-gray-100);
    color: var(--p-gray-600);
    white-space: nowrap;
  }
</style>
