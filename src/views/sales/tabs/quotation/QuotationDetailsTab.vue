<script setup lang="ts">
  import { inject, ref, type Ref } from 'vue';
  import type { QuotationData } from '@/types/quotations';
  import AannemerSection from '@/views/sales/components/AannemerSection.vue';
  import AanbevolenDoorSection from '@/views/sales/components/AanbevolenDoorSection.vue';

  const quotation = inject<Ref<QuotationData>>('quotation')!;

  const isEditingGegevens = ref(false);
  const isEditingContacten = ref(false);

  const kanaalOptions = ['Showroom', 'Telefoon', 'E-mail', 'Chat', 'Website'];
  const vestigingOptions = ['Amsterdam', 'Rotterdam', 'Utrecht', 'Veenendaal', 'Den Haag'];
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
        <template v-if="!isEditingGegevens">
          <Button
            label="Bewerken"
            icon="pi pi-pencil"
            size="small"
            severity="secondary"
            text
            @click="isEditingGegevens = true"
          />
        </template>
        <template v-else>
          <div class="flex gap-2">
            <Button label="Annuleren" size="small" severity="secondary" outlined @click="isEditingGegevens = false" />
            <Button label="Opslaan" size="small" @click="isEditingGegevens = false" />
          </div>
        </template>
      </div>

      <Transition name="card-fade" mode="out-in">
        <!-- View mode -->
        <div v-if="!isEditingGegevens" key="view" class="view-card-body">
          <div class="fr-row">
            <span class="fr-label">Besteldatum</span>
            <span class="fr-value">{{ quotation.besteldatum }}</span>
          </div>
          <div class="fr-row">
            <span class="fr-label">Geholpen door</span>
            <span class="fr-value">{{ quotation.geholpenDoor }}</span>
          </div>
          <div class="fr-row">
            <span class="fr-label">Kanaal</span>
            <span class="fr-value">{{ quotation.kanaal }}</span>
          </div>
          <div class="fr-row">
            <span class="fr-label">Vestiging</span>
            <span class="fr-value">{{ quotation.vestiging }}</span>
          </div>
          <div class="fr-row">
            <span class="fr-label">Wanneer verbouwen</span>
            <span :class="quotation.wanneerVerbouwenMaand ? 'fr-value' : 'fr-empty'">
              {{ quotation.wanneerVerbouwenMaand && quotation.wanneerVerbouwenJaar
                ? `${quotation.wanneerVerbouwenMaand} ${quotation.wanneerVerbouwenJaar}`
                : '—' }}
            </span>
          </div>
        </div>

        <!-- Edit mode -->
        <div v-else key="edit" class="view-card-body">
          <div class="fr-row">
            <span class="fr-label">Besteldatum</span>
            <span class="fr-value">{{ quotation.besteldatum }}</span>
          </div>
          <div class="fr-row">
            <span class="fr-label">Geholpen door</span>
            <span class="fr-value">{{ quotation.geholpenDoor }}</span>
          </div>
          <div class="fr-row">
            <label class="fr-label">Kanaal</label>
            <Select v-model="quotation.kanaal" :options="kanaalOptions" class="w-full" />
          </div>
          <div class="fr-row">
            <label class="fr-label">Vestiging</label>
            <Select v-model="quotation.vestiging" :options="vestigingOptions" class="w-full" />
          </div>
          <div class="fr-row fr-row--top">
            <label class="fr-label">Wanneer verbouwen</label>
            <div class="verbouwen-grid">
              <Select v-model="quotation.wanneerVerbouwenMaand" :options="maandOptions" placeholder="Maand" class="w-full" />
              <Select v-model="quotation.wanneerVerbouwenJaar" :options="jaarOptions" placeholder="Jaar" class="w-full" />
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- ── Externe contacten ─────────────────────────────────────── -->
    <div class="view-card">
      <div class="view-card-hdr">
        <span class="view-card-title">Externe contacten</span>
        <template v-if="!isEditingContacten">
          <Button
            label="Bewerken"
            icon="pi pi-pencil"
            size="small"
            severity="secondary"
            text
            @click="isEditingContacten = true"
          />
        </template>
        <template v-else>
          <div class="flex gap-2">
            <Button label="Annuleren" size="small" severity="secondary" outlined @click="isEditingContacten = false" />
            <Button label="Opslaan" size="small" @click="isEditingContacten = false" />
          </div>
        </template>
      </div>

      <Transition name="card-fade" mode="out-in">
        <!-- View mode: summary -->
        <div v-if="!isEditingContacten" key="view" class="view-card-body">
          <div class="fr-row">
            <span class="fr-label">Aanbevolen door</span>
            <span :class="quotation.aanbevolen?.bedrijf ? 'fr-value' : 'fr-empty'">
              {{ quotation.aanbevolen?.bedrijf || '—' }}
            </span>
          </div>
          <div class="fr-row">
            <span class="fr-label">Aannemer</span>
            <span :class="quotation.aannemer?.bedrijf ? 'fr-value' : 'fr-empty'">
              {{ quotation.aannemer?.bedrijf || '—' }}
            </span>
          </div>
        </div>

        <!-- Edit mode: mode-card pickers -->
        <div v-else key="edit" class="view-card-body ext-edit">
          <div class="ext-section">
            <div class="ext-section-hdr">
              <span class="ext-section-title">Aanbevolen door</span>
            </div>
            <AanbevolenDoorSection />
          </div>

          <div class="ext-sep" />

          <div class="ext-section">
            <div class="ext-section-hdr">
              <span class="ext-section-title">Aannemer / Installateur</span>
            </div>
            <AannemerSection />
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
