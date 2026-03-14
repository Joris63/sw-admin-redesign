<script setup lang="ts">
  import { inject, ref, type Ref } from 'vue';
  import type { QuotationData } from '@/types/quotations';
  import ContractorSection from '@/views/sales/components/ContractorSection.vue';
  import RecommendedBySection from '@/views/sales/components/RecommendedBySection.vue';

  const quotation = inject<Ref<QuotationData>>('quotation')!;

  const isEditingDetails = ref(false);
  const isEditingContacts = ref(false);

  const channelOptions = ['Showroom', 'Telefoon', 'E-mail', 'Chat', 'Website'];
  const branchOptions = ['Amsterdam', 'Rotterdam', 'Utrecht', 'Veenendaal', 'Den Haag'];
  const jaarOptions = Array.from({ length: 6 }, (_, i) => String(new Date().getFullYear() + i));
  const maandOptions = [
    'januari', 'februari', 'maart', 'april', 'mei', 'juni',
    'juli', 'augustus', 'september', 'oktober', 'november', 'december',
  ];
</script>

<template>
  <div class="tab-scroll">
    <!-- ── Offerte gegevens ──────────────────────────────────────── -->
    <div class="view-card">
      <div class="view-card-hdr">
        <span class="view-card-title">Offerte gegevens</span>
        <template v-if="!isEditingDetails">
          <Button
            label="Bewerken"
            icon="pi pi-pencil"
            size="small"
            severity="secondary"
            text
            @click="isEditingDetails = true"
          />
        </template>
        <template v-else>
          <div class="flex gap-2">
            <Button label="Annuleren" size="small" severity="secondary" outlined @click="isEditingDetails = false" />
            <Button label="Opslaan" size="small" @click="isEditingDetails = false" />
          </div>
        </template>
      </div>

      <Transition name="card-fade" mode="out-in">
        <!-- View mode -->
        <div v-if="!isEditingDetails" key="view" class="view-card-body">
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

        <!-- Edit mode -->
        <div v-else key="edit" class="view-card-body">
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
            <Select v-model="quotation.channel" :options="channelOptions" class="w-full" />
          </div>
          <div class="fr-row">
            <label class="fr-label">Vestiging</label>
            <Select v-model="quotation.branch" :options="branchOptions" class="w-full" />
          </div>
          <div class="fr-row fr-row--top">
            <label class="fr-label">Wanneer verbouwen</label>
            <div class="verbouwen-grid">
              <Select v-model="quotation.renovationMonth" :options="maandOptions" placeholder="Maand" class="w-full" />
              <Select v-model="quotation.renovationYear" :options="jaarOptions" placeholder="Jaar" class="w-full" />
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- ── Externe contacten ─────────────────────────────────────── -->
    <div class="view-card">
      <div class="view-card-hdr">
        <span class="view-card-title">Externe contacten</span>
        <template v-if="!isEditingContacts">
          <Button
            label="Bewerken"
            icon="pi pi-pencil"
            size="small"
            severity="secondary"
            text
            @click="isEditingContacts = true"
          />
        </template>
        <template v-else>
          <div class="flex gap-2">
            <Button label="Annuleren" size="small" severity="secondary" outlined @click="isEditingContacts = false" />
            <Button label="Opslaan" size="small" @click="isEditingContacts = false" />
          </div>
        </template>
      </div>

      <Transition name="card-fade" mode="out-in">
        <!-- View mode: summary -->
        <div v-if="!isEditingContacts" key="view" class="view-card-body">
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

        <!-- Edit mode: mode-card pickers -->
        <div v-else key="edit" class="view-card-body ext-edit">
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
      </Transition>
    </div>
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
