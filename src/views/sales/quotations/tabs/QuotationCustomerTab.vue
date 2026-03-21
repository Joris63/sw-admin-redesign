<script setup lang="ts">
  import { inject, ref, computed, type Ref } from 'vue';
  import type { QuotationData } from '@/types/quotations';
  import { COUNTRY_NAME_OPTIONS, PHONE_COUNTRY_OPTIONS } from '@/mocks/options';
  import EditableCard from '@/components/EditableCard.vue';

  const quotation = inject<Ref<QuotationData>>('quotation')!;

  const isEditingAddress = ref(false);
  const isEditingDetails = ref(false);

  const emailCopied = ref(false);
  function copyEmail() {
    navigator.clipboard.writeText(quotation.value.customerEmail);
    emailCopied.value = true;
    setTimeout(() => (emailCopied.value = false), 1500);
  }

  function phonePrefix(code: string) {
    return PHONE_COUNTRY_OPTIONS.find((o) => o.value === code)?.label ?? code;
  }

  const customerInitials = computed(() =>
    quotation.value.firstName && quotation.value.lastName
      ? (quotation.value.firstName[0] + quotation.value.lastName[0]).toUpperCase()
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
          <div class="klant-avatar">{{ customerInitials }}</div>
          <div class="klant-info">
            <span class="klant-name">{{ quotation.firstName }} {{ quotation.lastName }}</span>
            <div class="klant-email-row">
              <span class="klant-email">{{ quotation.customerEmail }}</span>
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
              :value="quotation.customerHasAccount ? 'Actief' : 'Geen account'"
              :severity="quotation.customerHasAccount ? 'success' : 'secondary'"
            />
          </div>
          <div class="klant-meta-sep" />
          <div class="klant-meta-item">
            <span class="klant-meta-label">Type</span>
            <span class="klant-meta-val">{{ quotation.customerType }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Factuuradres ──────────────────────────────────────────────── -->
    <EditableCard v-model="isEditingAddress" title="Factuuradres">
      <template #view>
        <div class="view-card-body">
          <div class="fr-row">
            <span class="fr-label">Naam</span>
            <span class="fr-value">{{ quotation.firstName }} {{ quotation.lastName }}</span>
          </div>
          <div class="fr-row">
            <span class="fr-label">Land</span>
            <span class="fr-value">{{ quotation.country }}</span>
          </div>
          <div class="fr-row">
            <span class="fr-label">Adres</span>
            <span class="fr-value">
              {{ quotation.street }} {{ quotation.houseNumber }}{{ quotation.addition ? ' ' + quotation.addition : '' }},
              {{ quotation.postalCode }} {{ quotation.city }}
            </span>
          </div>
          <div class="fr-row">
            <span class="fr-label">Telefoon</span>
            <span :class="quotation.phone ? 'fr-value' : 'fr-empty'">
              {{ quotation.phone ? `${phonePrefix(quotation.phoneCountry)} ${quotation.phone}` : '—' }}
            </span>
          </div>
          <div class="fr-row">
            <span class="fr-label">Alt. telefoon</span>
            <span :class="quotation.alternative ? 'fr-value' : 'fr-empty'">{{ quotation.alternative || '—' }}</span>
          </div>
        </div>
      </template>
      <template #edit>
        <div class="view-card-body">
          <div class="fr-row">
            <label class="fr-label">Voornaam</label>
            <InputText v-model="quotation.firstName" class="w-full" />
          </div>
          <div class="fr-row">
            <label class="fr-label">Achternaam</label>
            <InputText v-model="quotation.lastName" class="w-full" />
          </div>
          <div class="fr-row">
            <label class="fr-label">Land</label>
            <Select v-model="quotation.country" :options="COUNTRY_NAME_OPTIONS" class="w-full" />
          </div>
          <div class="fr-row fr-row--top">
            <label class="fr-label">Adres</label>
            <div class="addr-grid">
              <InputText v-model="quotation.postalCode" placeholder="Postcode" />
              <InputText v-model="quotation.houseNumber" placeholder="Nr." />
              <InputText v-model="quotation.addition" placeholder="Toev." />
              <InputText v-model="quotation.street" placeholder="Straat" class="addr-full" />
              <InputText v-model="quotation.city" placeholder="Woonplaats" class="addr-full" />
            </div>
          </div>
          <div class="fr-row">
            <label class="fr-label">Telefoon</label>
            <div class="phone-row">
              <Select
                v-model="quotation.phoneCountry"
                :options="PHONE_COUNTRY_OPTIONS"
                option-label="label"
                option-value="value"
                class="phone-flag"
              />
              <InputText v-model="quotation.phone" class="flex-1" placeholder="Telefoonnummer" />
            </div>
          </div>
          <div class="fr-row">
            <label class="fr-label">Alt. telefoon</label>
            <InputText v-model="quotation.alternative" class="w-full" placeholder="Alternatief telefoonnummer" />
          </div>
        </div>
      </template>
    </EditableCard>

    <!-- ── Details ───────────────────────────────────────────────────── -->
    <EditableCard v-model="isEditingDetails" title="Details">
      <template #view>
        <div class="view-card-body">
          <div class="fr-row">
            <span class="fr-label">Referentie</span>
            <span :class="quotation.reference ? 'fr-value' : 'fr-empty'">{{ quotation.reference || '—' }}</span>
          </div>
        </div>
      </template>
      <template #edit>
        <div class="view-card-body">
          <div class="fr-row">
            <label class="fr-label">Referentie</label>
            <InputText v-model="quotation.reference" class="w-full" placeholder="Klantreferentie (optioneel)" />
          </div>
        </div>
      </template>
    </EditableCard>
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
