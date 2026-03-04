<script setup lang="ts">
  import { inject, ref, computed, type Ref } from 'vue';
  import type { QuotationData } from '@/types/quotations';

  const quotation = inject<Ref<QuotationData>>('quotation')!;

  const isEditingAdres = ref(false);
  const isEditingDetails = ref(false);

  const landOptions = ['Nederland', 'België', 'Duitsland', 'Frankrijk', 'Luxemburg'];
  const telefoonLandOptions = [
    { label: '+31', value: 'NL' },
    { label: '+32', value: 'BE' },
    { label: '+49', value: 'DE' },
  ];

  const emailCopied = ref(false);
  function copyEmail() {
    navigator.clipboard.writeText(quotation.value.klantEmail);
    emailCopied.value = true;
    setTimeout(() => (emailCopied.value = false), 1500);
  }

  function telefoonPrefix(code: string) {
    return telefoonLandOptions.find((o) => o.value === code)?.label ?? code;
  }

  const klantInitials = computed(() =>
    quotation.value.voornaam && quotation.value.achternaam
      ? (quotation.value.voornaam[0] + quotation.value.achternaam[0]).toUpperCase()
      : '??'
  );
</script>

<template>
  <div class="tab-scroll">
    <!-- ── Gekoppelde klant ──────────────────────────────────────────── -->
    <div class="view-card">
      <div class="view-card-hdr">
        <span class="view-card-title">Gekoppelde klant</span>
        <Button
          label="Klant wijzigen"
          icon="pi pi-arrows-h"
          size="small"
          severity="secondary"
          text
        />
      </div>
      <div class="view-card-body">
        <div class="klant-profile">
          <div class="klant-avatar">{{ klantInitials }}</div>
          <div class="klant-info">
            <span class="klant-name">{{ quotation.voornaam }} {{ quotation.achternaam }}</span>
            <div class="klant-email-row">
              <span class="klant-email">{{ quotation.klantEmail }}</span>
              <Button
                :icon="emailCopied ? 'pi pi-check' : 'pi pi-copy'"
                size="small"
                text
                severity="secondary"
                rounded
                @click="copyEmail"
              />
            </div>
          </div>
        </div>
        <div class="klant-meta">
          <div class="klant-meta-item">
            <span class="klant-meta-label">Account</span>
            <Tag
              :value="quotation.klantHeeftAccount ? 'Actief' : 'Geen account'"
              :severity="quotation.klantHeeftAccount ? 'success' : 'secondary'"
            />
          </div>
          <div class="klant-meta-sep" />
          <div class="klant-meta-item">
            <span class="klant-meta-label">Type</span>
            <span class="klant-meta-val">{{ quotation.klantType }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Factuuradres ──────────────────────────────────────────────── -->
    <div class="view-card">
      <div class="view-card-hdr">
        <span class="view-card-title">Factuuradres</span>
        <template v-if="!isEditingAdres">
          <Button
            label="Bewerken"
            icon="pi pi-pencil"
            size="small"
            severity="secondary"
            text
            @click="isEditingAdres = true"
          />
        </template>
        <template v-else>
          <div class="flex gap-2">
            <Button label="Annuleren" size="small" severity="secondary" outlined @click="isEditingAdres = false" />
            <Button label="Opslaan" size="small" @click="isEditingAdres = false" />
          </div>
        </template>
      </div>

      <Transition name="card-fade" mode="out-in">
        <!-- View mode -->
        <div v-if="!isEditingAdres" key="view" class="view-card-body">
          <div class="fr-row">
            <span class="fr-label">Naam</span>
            <span class="fr-value">{{ quotation.voornaam }} {{ quotation.achternaam }}</span>
          </div>
          <div class="fr-row">
            <span class="fr-label">Land</span>
            <span class="fr-value">{{ quotation.land }}</span>
          </div>
          <div class="fr-row">
            <span class="fr-label">Adres</span>
            <span class="fr-value">
              {{ quotation.straat }} {{ quotation.huisnummer }}{{ quotation.toevoeging ? ' ' + quotation.toevoeging : '' }},
              {{ quotation.postcode }} {{ quotation.woonplaats }}
            </span>
          </div>
          <div class="fr-row">
            <span class="fr-label">Telefoon</span>
            <span :class="quotation.telefoon ? 'fr-value' : 'fr-empty'">
              {{ quotation.telefoon ? `${telefoonPrefix(quotation.telefoonLand)} ${quotation.telefoon}` : '—' }}
            </span>
          </div>
          <div class="fr-row">
            <span class="fr-label">Alt. telefoon</span>
            <span :class="quotation.alternatief ? 'fr-value' : 'fr-empty'">{{ quotation.alternatief || '—' }}</span>
          </div>
        </div>

        <!-- Edit mode -->
        <div v-else key="edit" class="view-card-body">
          <div class="fr-row">
            <label class="fr-label">Voornaam</label>
            <InputText v-model="quotation.voornaam" class="w-full" />
          </div>
          <div class="fr-row">
            <label class="fr-label">Achternaam</label>
            <InputText v-model="quotation.achternaam" class="w-full" />
          </div>
          <div class="fr-row">
            <label class="fr-label">Land</label>
            <Select v-model="quotation.land" :options="landOptions" class="w-full" />
          </div>
          <div class="fr-row fr-row--top">
            <label class="fr-label">Adres</label>
            <div class="addr-grid">
              <InputText v-model="quotation.postcode" placeholder="Postcode" />
              <InputText v-model="quotation.huisnummer" placeholder="Nr." />
              <InputText v-model="quotation.toevoeging" placeholder="Toev." />
              <InputText v-model="quotation.straat" placeholder="Straat" class="addr-full" />
              <InputText v-model="quotation.woonplaats" placeholder="Woonplaats" class="addr-full" />
            </div>
          </div>
          <div class="fr-row">
            <label class="fr-label">Telefoon</label>
            <div class="phone-row">
              <Select
                v-model="quotation.telefoonLand"
                :options="telefoonLandOptions"
                option-label="label"
                option-value="value"
                class="phone-flag"
              />
              <InputText v-model="quotation.telefoon" class="flex-1" placeholder="Telefoonnummer" />
            </div>
          </div>
          <div class="fr-row">
            <label class="fr-label">Alt. telefoon</label>
            <InputText v-model="quotation.alternatief" class="w-full" placeholder="Alternatief telefoonnummer" />
          </div>
        </div>
      </Transition>
    </div>

    <!-- ── Details ───────────────────────────────────────────────────── -->
    <div class="view-card">
      <div class="view-card-hdr">
        <span class="view-card-title">Details</span>
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
        <div v-if="!isEditingDetails" key="view" class="view-card-body">
          <div class="fr-row">
            <span class="fr-label">Referentie</span>
            <span :class="quotation.referentie ? 'fr-value' : 'fr-empty'">{{ quotation.referentie || '—' }}</span>
          </div>
        </div>
        <div v-else key="edit" class="view-card-body">
          <div class="fr-row">
            <label class="fr-label">Referentie</label>
            <InputText v-model="quotation.referentie" class="w-full" placeholder="Klantreferentie (optioneel)" />
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
  /* Linked customer profile */
  .klant-profile {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    padding-bottom: 0.875rem;
    border-bottom: 1px solid var(--p-gray-100);
    margin-bottom: 0.75rem;
  }
  .klant-avatar {
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--p-primary-400) 0%, var(--p-primary-600) 100%);
    color: white;
    font-size: 0.875rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    letter-spacing: 0.03em;
  }
  .klant-info {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    min-width: 0;
  }
  .klant-name {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--p-surface-800);
  }
  .klant-email-row {
    display: flex;
    align-items: center;
    gap: 0.125rem;
  }
  .klant-email {
    font-size: 0.8125rem;
    color: var(--p-surface-500);
  }
  .klant-meta {
    display: flex;
    align-items: center;
    gap: 0;
  }
  .klant-meta-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-right: 1rem;
  }
  .klant-meta-item:not(:first-child) {
    padding-left: 1rem;
  }
  .klant-meta-label {
    font-size: 0.8125rem;
    color: var(--p-surface-400);
  }
  .klant-meta-val {
    font-size: 0.8125rem;
    color: var(--p-surface-700);
    font-weight: 500;
  }
  .klant-meta-sep {
    width: 1px;
    height: 1.25rem;
    background: var(--p-gray-200);
    flex-shrink: 0;
  }

  /* Address & phone */
  .addr-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.5rem;
  }
  .addr-full { grid-column: 1 / -1; }
  .phone-row { display: flex; gap: 0.5rem; align-items: center; }
  .phone-flag { width: 7rem; flex-shrink: 0; }
</style>
