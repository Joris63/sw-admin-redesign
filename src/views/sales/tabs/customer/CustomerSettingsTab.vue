<script setup lang="ts">
  import { ref, inject } from 'vue';
  import type { Ref } from 'vue';
  import type { CustomerData } from '@/types/customer';

  const customer = inject<Ref<CustomerData>>('customer')!;

  const isEditingInstellingen = ref(false);
  const isEditingKrediet = ref(false);

  const reviewInactiefRedenOptions = ['Email vertraagd', 'Weigering', 'Overig'];
</script>

<template>
  <div class="tab-scroll">
    <!-- Card: Instellingen -->
    <div class="view-card">
      <div class="view-card-hdr">
        <span class="view-card-title">Instellingen</span>
        <template v-if="!isEditingInstellingen">
          <Button
            label="Bewerken"
            icon="pi pi-pencil"
            size="small"
            severity="secondary"
            text
            @click="isEditingInstellingen = true"
          />
        </template>
        <template v-else>
          <div class="flex gap-2">
            <Button
              label="Annuleren"
              size="small"
              severity="secondary"
              outlined
              @click="isEditingInstellingen = false"
            />
            <Button label="Opslaan" size="small" @click="isEditingInstellingen = false" />
          </div>
        </template>
      </div>
      <Transition name="card-fade" mode="out-in">
        <div v-if="!isEditingInstellingen" key="view" class="view-card-body">
          <div class="fr-row">
            <span class="fr-label">Financieel e-mailadres</span>
            <span class="fr-value">{{ customer.financieelEmail || '—' }}</span>
          </div>
          <div class="fr-row">
            <span class="fr-label">Reviews</span>
            <span class="fr-value">{{
              customer.reviewsActief ? 'Actief' : 'Inactief'
            }}</span>
          </div>
          <div v-if="!customer.reviewsActief" class="fr-row">
            <span class="fr-label">Inactief reden</span>
            <span class="fr-value">{{ customer.reviewInactiefReden || '—' }}</span>
          </div>
          <div class="fr-row fr-row--top">
            <span class="fr-label">Opmerkingen</span>
            <span
              :class="customer.opmerkingen ? 'fr-value' : 'fr-empty'"
              style="white-space: pre-wrap"
              >{{ customer.opmerkingen || '—' }}</span
            >
          </div>
        </div>
        <div v-else key="edit" class="view-card-body">
          <div class="fr-row">
            <label class="fr-label">Financieel e-mailadres</label>
            <InputText
              v-model="customer.financieelEmail"
              class="w-full"
              placeholder="Financieel e-mailadres"
            />
          </div>
          <div class="fr-row">
            <label class="fr-label">Reviews</label>
            <div class="flex items-center gap-3">
              <ToggleSwitch v-model="customer.reviewsActief" input-id="reviews" />
              <label for="reviews" class="text-sm text-surface-600 cursor-pointer"
                >Reviews actief</label
              >
            </div>
          </div>
          <div v-if="!customer.reviewsActief" class="fr-row">
            <label class="fr-label">Inactief reden</label>
            <Select
              v-model="customer.reviewInactiefReden"
              :options="reviewInactiefRedenOptions"
              class="w-full"
              placeholder="Selecteer reden"
              show-clear
            />
          </div>
          <div class="fr-row fr-row--top">
            <label class="fr-label">Opmerkingen</label>
            <Textarea
              v-model="customer.opmerkingen"
              class="w-full"
              :rows="4"
              placeholder="Opmerkingen"
              auto-resize
            />
          </div>
        </div>
      </Transition>
    </div>

    <!-- Card: Krediet -->
    <div class="view-card">
      <div class="view-card-hdr">
        <span class="view-card-title">Krediet</span>
        <template v-if="!isEditingKrediet">
          <Button
            label="Bewerken"
            icon="pi pi-pencil"
            size="small"
            severity="secondary"
            text
            @click="isEditingKrediet = true"
          />
        </template>
        <template v-else>
          <div class="flex gap-2">
            <Button
              label="Annuleren"
              size="small"
              severity="secondary"
              outlined
              @click="isEditingKrediet = false"
            />
            <Button label="Opslaan" size="small" @click="isEditingKrediet = false" />
          </div>
        </template>
      </div>
      <Transition name="card-fade" mode="out-in">
        <div v-if="!isEditingKrediet" key="view" class="view-card-body">
          <div class="fr-row">
            <span class="fr-label">Betalen op rekening</span>
            <span class="fr-value">{{ customer.kanBetalenOpRekening ? 'Ja' : 'Nee' }}</span>
          </div>
          <Transition name="fade-slide">
            <div v-if="customer.kanBetalenOpRekening">
              <div class="fr-row">
                <span class="fr-label">Debiteur nummer</span>
                <span class="fr-value">{{ customer.debiteurNummer || '—' }}</span>
              </div>
              <div class="fr-row">
                <span class="fr-label">Kredietlimiet</span>
                <span class="fr-value">{{
                  customer.kredietlimiet ? `€ ${customer.kredietlimiet}` : '—'
                }}</span>
              </div>
              <div class="fr-row">
                <span class="fr-label">Vervaldagen factuur</span>
                <span class="fr-value">{{ customer.vervaldagenFactuur }} dagen</span>
              </div>
              <div class="fr-row">
                <span class="fr-label">Tijdelijk krediet</span>
                <span class="fr-value">{{
                  customer.tijdelijkKredietToestaan ? 'Toegestaan' : 'Niet toegestaan'
                }}</span>
              </div>
              <Transition name="fade-slide">
                <div v-if="customer.tijdelijkKredietToestaan">
                  <div class="fr-row">
                    <span class="fr-label">Tijdelijk limiet</span>
                    <span class="fr-value">{{
                      customer.tijdelijkKredietLimiet
                        ? `€ ${customer.tijdelijkKredietLimiet}`
                        : '—'
                    }}</span>
                  </div>
                  <div class="fr-row">
                    <span class="fr-label">Vervaldatum</span>
                    <span class="fr-value">{{
                      customer.tijdelijkKredietVervalDatum?.toLocaleDateString('nl-NL') ||
                      '—'
                    }}</span>
                  </div>
                </div>
              </Transition>
            </div>
          </Transition>
        </div>
        <div v-else key="edit" class="view-card-body">
          <div class="fr-row">
            <label class="fr-label">Betalen op rekening</label>
            <div class="flex items-center gap-3">
              <ToggleSwitch
                v-model="customer.kanBetalenOpRekening"
                input-id="betalen-rekening"
              />
              <label for="betalen-rekening" class="text-sm text-surface-600 cursor-pointer"
                >Kan betalen op rekening</label
              >
            </div>
          </div>
          <Transition name="fade-slide">
            <div v-if="customer.kanBetalenOpRekening">
              <div class="fr-row">
                <label class="fr-label">Debiteur nummer</label>
                <InputText
                  v-model="customer.debiteurNummer"
                  class="w-full"
                  placeholder="Debiteur nummer"
                />
              </div>
              <div class="fr-row">
                <label class="fr-label">Kredietlimiet</label>
                <InputNumber
                  v-model="customer.kredietlimiet"
                  class="w-full"
                  placeholder="0"
                />
              </div>
              <div class="fr-row">
                <label class="fr-label">Vervaldagen factuur</label>
                <div class="flex items-center gap-2">
                  <InputNumber
                    v-model="customer.vervaldagenFactuur"
                    style="width: 8rem"
                    placeholder="14"
                  />
                  <span class="text-sm text-surface-500">Dagen</span>
                </div>
              </div>
              <div class="fr-row">
                <label class="fr-label">Tijdelijk krediet</label>
                <div class="flex items-center gap-3">
                  <ToggleSwitch
                    v-model="customer.tijdelijkKredietToestaan"
                    input-id="tijdelijk-krediet"
                  />
                  <label
                    for="tijdelijk-krediet"
                    class="text-sm text-surface-600 cursor-pointer"
                    >Tijdelijk krediet toestaan</label
                  >
                </div>
              </div>
              <Transition name="fade-slide">
                <div v-if="customer.tijdelijkKredietToestaan">
                  <div class="fr-row">
                    <label class="fr-label">Tijdelijk limiet</label>
                    <InputNumber
                      v-model="customer.tijdelijkKredietLimiet"
                      class="w-full"
                      placeholder="0"
                    />
                  </div>
                  <div class="fr-row">
                    <label class="fr-label">Vervaldatum</label>
                    <DatePicker
                      v-model="customer.tijdelijkKredietVervalDatum"
                      date-format="dd-mm-yy"
                      show-icon
                      icon-display="input"
                      class="w-full"
                      placeholder="Selecteer een datum"
                    />
                  </div>
                </div>
              </Transition>
            </div>
          </Transition>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition:
      opacity 0.15s ease,
      transform 0.15s ease;
  }
  .fade-slide-enter-from {
    opacity: 0;
    transform: translateY(6px);
  }
  .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-6px);
  }
</style>
