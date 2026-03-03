<script setup lang="ts">
  import { ref, inject } from 'vue';
  import type { Ref } from 'vue';
  import type { CustomerData } from '@/types/customer';

  const customer = inject<Ref<CustomerData>>('customer')!;

  const newAccountEmail = ref('');
  const emailWijzigenVisible = ref(false);

  function openEmailWijzigen() {
    newAccountEmail.value = '';
    emailWijzigenVisible.value = true;
  }
  function submitEmailWijzigen() {
    // TODO: call API
    emailWijzigenVisible.value = false;
  }
</script>

<template>
  <div class="tab-scroll">
    <!-- Card: Account informatie -->
    <div class="view-card">
      <div class="view-card-hdr">
        <span class="view-card-title">Account informatie</span>
      </div>
      <div class="view-card-body">
        <div class="fr-row">
          <span class="fr-label">Status</span>
          <span class="acct-status-badge">{{ customer.accountStatus }}</span>
        </div>
        <div class="fr-row">
          <span class="fr-label">Laatste login</span>
          <span class="fr-value">{{ customer.accountLaatsteLogin }}</span>
        </div>
      </div>
    </div>

    <!-- Card: Wachtwoord resetten -->
    <div class="view-card">
      <div class="view-card-hdr">
        <span class="view-card-title">Wachtwoord resetten</span>
      </div>
      <div class="view-card-body">
        <p class="acct-desc">
          Als de klant niet kan inloggen op zijn account, kun je een e-mail voor het opnieuw
          instellen van het wachtwoord naar zijn gekoppelde e-mailadres sturen.
        </p>
      </div>
      <div class="view-card-action">
        <Button
          label="Stuur wachtwoord reset e-mail"
          size="small"
          severity="secondary"
          outlined
        />
      </div>
    </div>

    <!-- Card: E-mail adres wijzigen -->
    <div class="view-card">
      <div class="view-card-hdr">
        <span class="view-card-title">E-mail adres wijzigen</span>
      </div>
      <div class="view-card-body">
        <p class="acct-desc">
          Wijzig het e-mailadres van de klant. Er wordt een bevestigingsmail gestuurd naar
          het nieuwe adres.
        </p>
      </div>
      <div class="view-card-action">
        <Button
          label="Stuur wijzig e-mail adres e-mail"
          size="small"
          severity="secondary"
          outlined
          @click="openEmailWijzigen"
        />
      </div>
    </div>
  </div>

  <Dialog
    v-model:visible="emailWijzigenVisible"
    header="E-mail adres wijzigen"
    :style="{ width: '28rem' }"
    modal
    :draggable="false"
  >
    <p class="acct-desc" style="margin-bottom: 1.25rem">
      Voer het nieuwe e-mailadres in. De klant ontvangt een bevestigingsmail op het nieuwe adres.
    </p>
    <div class="flex flex-col gap-1.5">
      <label class="fr-label">Nieuw e-mailadres</label>
      <InputText
        v-model="newAccountEmail"
        class="w-full"
        placeholder="naam@voorbeeld.nl"
        autofocus
      />
    </div>
    <template #footer>
      <Button
        label="Annuleren"
        severity="secondary"
        outlined
        @click="emailWijzigenVisible = false"
      />
      <Button label="Verstuur e-mail" :disabled="!newAccountEmail" @click="submitEmailWijzigen" />
    </template>
  </Dialog>
</template>

<style scoped>
  .acct-status-badge {
    width: fit-content;
    display: inline-flex;
    padding: 0.175rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8125rem;
    font-weight: 600;
    background: var(--p-green-100);
    color: var(--p-green-700);
  }
  .acct-desc {
    font-size: 0.875rem;
    color: var(--p-surface-500);
    line-height: 1.5;
    margin: 0;
  }
</style>
