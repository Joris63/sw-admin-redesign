<script setup lang="ts">
  import { inject, ref, type Ref } from 'vue';
  import type { QuotationData } from '@/types/quotations';
  import ContractorSection from '@/views/sales/components/ContractorSection.vue';
  import RecommendedBySection from '@/views/sales/components/RecommendedBySection.vue';
  import { CHANNEL_OPTIONS, BRANCH_OPTIONS, MONTH_OPTIONS, getYearOptions } from '@/mocks/options';
  import EditableCard from '@/components/EditableCard.vue';

  const quotation = inject<Ref<QuotationData>>('quotation')!;

  const isEditingDetails = ref(false);
  const isEditingContacts = ref(false);

  const jaarOptions = getYearOptions(6);
</script>

<template>
  <div class="tab-scroll">
    <!-- ── Offerte gegevens ──────────────────────────────────────── -->
    <EditableCard v-model="isEditingDetails" title="Offerte gegevens">
      <template #view>
        <div class="view-card-body">
          <div class="fr-row">
            <span class="fr-label">Besteldatum</span>
            <span class="fr-value">{{ quotation.orderDate }}</span>
          </div>
          <div class="fr-row">
            <span class="fr-label">Geholpen door</span>
            <span class="fr-value">{{ quotation.assistedBy }}</span>
          </div>
          <div class="fr-row">
            <span class="fr-label">Kanaal</span>
            <span class="fr-value">{{ quotation.channel }}</span>
          </div>
          <div class="fr-row">
            <span class="fr-label">Vestiging</span>
            <span class="fr-value">{{ quotation.branch }}</span>
          </div>
          <div class="fr-row">
            <span class="fr-label">Wanneer verbouwen</span>
            <span :class="quotation.renovationMonth ? 'fr-value' : 'fr-empty'">
              {{ quotation.renovationMonth && quotation.renovationYear
                ? `${quotation.renovationMonth} ${quotation.renovationYear}`
                : '—' }}
            </span>
          </div>
        </div>
      </template>
      <template #edit>
        <div class="view-card-body">
          <div class="fr-row">
            <span class="fr-label">Besteldatum</span>
            <span class="fr-value">{{ quotation.orderDate }}</span>
          </div>
          <div class="fr-row">
            <span class="fr-label">Geholpen door</span>
            <span class="fr-value">{{ quotation.assistedBy }}</span>
          </div>
          <div class="fr-row">
            <label class="fr-label">Kanaal</label>
            <Select v-model="quotation.channel" :options="CHANNEL_OPTIONS" class="w-full" />
          </div>
          <div class="fr-row">
            <label class="fr-label">Vestiging</label>
            <Select v-model="quotation.branch" :options="BRANCH_OPTIONS" class="w-full" />
          </div>
          <div class="fr-row fr-row--top">
            <label class="fr-label">Wanneer verbouwen</label>
            <div class="verbouwen-grid">
              <Select v-model="quotation.renovationMonth" :options="MONTH_OPTIONS" placeholder="Maand" class="w-full" />
              <Select v-model="quotation.renovationYear" :options="jaarOptions" placeholder="Jaar" class="w-full" />
            </div>
          </div>
        </div>
      </template>
    </EditableCard>

    <!-- ── Externe contacten ─────────────────────────────────────── -->
    <EditableCard v-model="isEditingContacts" title="Externe contacten">
      <template #view>
        <div class="view-card-body">
          <div class="fr-row">
            <span class="fr-label">Aanbevolen door</span>
            <span :class="quotation.recommended?.company ? 'fr-value' : 'fr-empty'">
              {{ quotation.recommended?.company || '—' }}
            </span>
          </div>
          <div class="fr-row">
            <span class="fr-label">Aannemer</span>
            <span :class="quotation.contractor?.company ? 'fr-value' : 'fr-empty'">
              {{ quotation.contractor?.company || '—' }}
            </span>
          </div>
        </div>
      </template>
      <template #edit>
        <div class="view-card-body ext-edit">
          <div class="ext-section">
            <div class="ext-section-hdr">
              <span class="ext-section-title">Aanbevolen door</span>
            </div>
            <RecommendedBySection />
          </div>

          <div class="ext-sep" />

          <div class="ext-section">
            <div class="ext-section-hdr">
              <span class="ext-section-title">Aannemer / Installateur</span>
            </div>
            <ContractorSection />
          </div>
        </div>
      </template>
    </EditableCard>
  </div>
</template>

<style scoped>
  .verbouwen-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }

  .ext-edit {
    display: flex;
    flex-direction: column;
    padding: 0;
  }

  .ext-section { display: flex; flex-direction: column; padding: 1.25rem 1.25rem 0; }
  .ext-section:last-child { padding-bottom: 1.25rem; }
  .ext-section-hdr { margin-bottom: 0.75rem; }
  .ext-section-title {
    font-size: 0.6875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--p-surface-400);
  }
  .ext-sep {
    height: 1px;
    background: var(--p-gray-100);
    margin: 1.25rem 1.25rem 0;
  }
</style>
