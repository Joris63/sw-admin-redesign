<script setup lang="ts">
  import { ref, inject } from 'vue';
  import type { Ref } from 'vue';
  import type { CustomerData } from '@/types/customer';

  const customer = inject<Ref<CustomerData>>('customer')!;

  const isEditingBedrijf = ref(false);
  const isEditingPersoonlijk = ref(false);
  const isEditingVoorkeuren = ref(false);

  const aanhefOptions = ['Fam.', 'Dhr.', 'Mevr.'];
  const btwLandOptions = ['NL', 'BE', 'DE', 'FR'];
  const typeBedrijfOptions = ['Particulier', 'ZZP', 'MKB', 'Grootzakelijk'];
  const telefoonLandOptions = [
    { label: '+31', value: 'NL' },
    { label: '+32', value: 'BE' },
    { label: '+33', value: 'FR' },
    { label: '+49', value: 'DE' },
  ];
  const betaalmethodeOptions = ['iDEAL', 'Bankoverschrijving', 'Creditcard', 'Klarna'];
  const showroomOptions = ['Amsterdam', 'Rotterdam', 'Utrecht', 'Den Haag'];
  const toonPrijzenOptions = ['Incl. BTW', 'Excl. BTW'];

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }
</script>

<template>
  <div class="tab-scroll">
    <!-- Card: Bedrijfsgegevens -->
    <div class="view-card">
      <div class="view-card-hdr">
        <span class="view-card-title">Bedrijfsgegevens</span>
        <template v-if="!isEditingBedrijf">
          <Button
            label="Bewerken"
            icon="pi pi-pencil"
            size="small"
            severity="secondary"
            text
            @click="isEditingBedrijf = true"
          />
        </template>
        <template v-else>
          <div class="flex gap-2">
            <Button
              label="Annuleren"
              size="small"
              severity="secondary"
              outlined
              @click="isEditingBedrijf = false"
            />
            <Button label="Opslaan" size="small" @click="isEditingBedrijf = false" />
          </div>
        </template>
      </div>
      <Transition name="card-fade" mode="out-in">
        <div v-if="!isEditingBedrijf" key="view" class="view-card-body">
          <div class="fr-row">
            <span class="fr-label">Type bedrijf</span>
            <span :class="customer.typeBedrijf ? 'fr-value' : 'fr-empty'">{{
              customer.typeBedrijf || '—'
            }}</span>
          </div>
          <div class="fr-row">
            <span class="fr-label">Bedrijfsnaam</span>
            <span :class="customer.bedrijfsnaam ? 'fr-value' : 'fr-empty'">{{
              customer.bedrijfsnaam || '—'
            }}</span>
          </div>
          <div class="fr-row">
            <span class="fr-label">BTW-nummer</span>
            <span :class="customer.btwNummer ? 'fr-value' : 'fr-empty'">{{
              customer.btwNummer ? `${customer.btwLand} ${customer.btwNummer}` : '—'
            }}</span>
          </div>
          <div class="fr-row">
            <span class="fr-label">KVK-nummer</span>
            <span :class="customer.kvkNummer ? 'fr-value' : 'fr-empty'">{{
              customer.kvkNummer || '—'
            }}</span>
          </div>
        </div>
        <div v-else key="edit" class="view-card-body">
          <div class="fr-row">
            <label class="fr-label">Type bedrijf</label>
            <Select
              v-model="customer.typeBedrijf"
              :options="typeBedrijfOptions"
              class="w-full"
              placeholder="Type bedrijf"
              show-clear
            />
          </div>
          <div class="fr-row">
            <label class="fr-label">Bedrijfsnaam</label>
            <InputText v-model="customer.bedrijfsnaam" class="w-full" placeholder="Bedrijfsnaam" />
          </div>
          <div class="fr-row">
            <label class="fr-label">BTW-nummer</label>
            <div class="flex gap-2">
              <Select v-model="customer.btwLand" :options="btwLandOptions" style="width: 7.5rem">
                <template #value="{ value }">
                  <div class="flex items-center gap-2">
                    <span
                      :class="`fi fi-${value.toLowerCase()}`"
                      style="
                        width: 1.5rem;
                        height: 1.125rem;
                        display: inline-block;
                        flex-shrink: 0;
                        background-size: cover;
                        background-position: center;
                      "
                    />
                    <span>{{ value }}</span>
                  </div>
                </template>
                <template #option="{ option }">
                  <div class="flex items-center gap-2">
                    <span
                      :class="`fi fi-${option.toLowerCase()}`"
                      style="
                        width: 1.5rem;
                        height: 1.125rem;
                        display: inline-block;
                        flex-shrink: 0;
                        background-size: cover;
                        background-position: center;
                      "
                    />
                    <span>{{ option }}</span>
                  </div>
                </template>
              </Select>
              <InputText v-model="customer.btwNummer" class="flex-1" placeholder="BTW-nummer" />
            </div>
          </div>
          <div class="fr-row">
            <label class="fr-label">KVK-nummer</label>
            <InputText v-model="customer.kvkNummer" class="w-full" placeholder="KVK-nummer" />
          </div>
        </div>
      </Transition>
    </div>

    <!-- Card: Persoonlijke gegevens -->
    <div class="view-card">
      <div class="view-card-hdr">
        <span class="view-card-title">Persoonlijke gegevens</span>
        <template v-if="!isEditingPersoonlijk">
          <Button
            label="Bewerken"
            icon="pi pi-pencil"
            size="small"
            severity="secondary"
            text
            @click="isEditingPersoonlijk = true"
          />
        </template>
        <template v-else>
          <div class="flex gap-2">
            <Button
              label="Annuleren"
              size="small"
              severity="secondary"
              outlined
              @click="isEditingPersoonlijk = false"
            />
            <Button label="Opslaan" size="small" @click="isEditingPersoonlijk = false" />
          </div>
        </template>
      </div>
      <Transition name="card-fade" mode="out-in">
        <div v-if="!isEditingPersoonlijk" key="view" class="view-card-body">
          <div class="fr-row">
            <span class="fr-label">Aanhef</span>
            <span :class="customer.aanhef ? 'fr-value' : 'fr-empty'">{{
              customer.aanhef || '—'
            }}</span>
          </div>
          <div class="fr-row">
            <span class="fr-label">Voornaam</span>
            <span class="fr-value">{{ customer.voornaam }}</span>
          </div>
          <div class="fr-row">
            <span class="fr-label">Achternaam</span>
            <span class="fr-value">{{ customer.achternaam }}</span>
          </div>
          <div class="fr-row">
            <span class="fr-label">E-mail</span>
            <span class="fr-value">{{ customer.email }}</span>
          </div>
          <div class="fr-row">
            <span class="fr-label">Telefoonnummer</span>
            <span :class="customer.telefoon ? 'fr-value' : 'fr-empty'">{{
              customer.telefoon
                ? `${telefoonLandOptions.find((o) => o.value === customer.telefoonLand)?.label} ${customer.telefoon}`
                : '—'
            }}</span>
          </div>
          <div class="fr-row">
            <span class="fr-label">Geboortedatum</span>
            <span :class="customer.geboortedatum ? 'fr-value' : 'fr-empty'">{{
              customer.geboortedatum?.toLocaleDateString('nl-NL') || '—'
            }}</span>
          </div>
          <div class="fr-row">
            <span class="fr-label">Siteview</span>
            <span class="fr-value">{{ customer.siteview }}</span>
          </div>
        </div>
        <div v-else key="edit" class="view-card-body">
          <div class="fr-row">
            <label class="fr-label">Aanhef</label>
            <SelectButton v-model="customer.aanhef" :options="aanhefOptions" size="small" />
          </div>
          <div class="fr-row">
            <label class="fr-label">Voornaam <span class="fr-req">*</span></label>
            <InputText v-model="customer.voornaam" class="w-full" placeholder="Voornaam" />
          </div>
          <div class="fr-row">
            <label class="fr-label">Achternaam <span class="fr-req">*</span></label>
            <InputText v-model="customer.achternaam" class="w-full" placeholder="Achternaam" />
          </div>
          <div class="fr-row">
            <span class="fr-label">E-mail</span>
            <span class="fr-value">{{ customer.email }}</span>
          </div>
          <div class="fr-row">
            <label class="fr-label">Telefoonnummer</label>
            <div class="flex gap-2">
              <Select
                :options="telefoonLandOptions"
                v-model="customer.telefoonLand"
                option-label="label"
                option-value="value"
                style="width: 8.5rem"
              >
                <template #value="{ value }">
                  <div class="flex items-center gap-2">
                    <span
                      :class="`fi fi-${value.toLowerCase()}`"
                      style="
                        width: 1.5rem;
                        height: 1.125rem;
                        display: inline-block;
                        flex-shrink: 0;
                        background-size: cover;
                        background-position: center;
                      "
                    />
                    <span>{{ telefoonLandOptions.find((o) => o.value === value)?.label }}</span>
                  </div>
                </template>
              </Select>
              <InputText v-model="customer.telefoon" class="flex-1" placeholder="Telefoonnummer" />
            </div>
          </div>
          <div class="fr-row">
            <label class="fr-label">Geboortedatum</label>
            <DatePicker
              v-model="customer.geboortedatum"
              date-format="dd-mm-yy"
              show-icon
              icon-display="input"
              class="w-full"
              placeholder="Geboortedatum"
            />
          </div>
          <div class="fr-row">
            <span class="fr-label">Siteview</span>
            <span class="fr-value">{{ customer.siteview }}</span>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Card: Voorkeuren -->
    <div class="view-card">
      <div class="view-card-hdr">
        <span class="view-card-title">Voorkeuren</span>
        <template v-if="!isEditingVoorkeuren">
          <Button
            label="Bewerken"
            icon="pi pi-pencil"
            size="small"
            severity="secondary"
            text
            @click="isEditingVoorkeuren = true"
          />
        </template>
        <template v-else>
          <div class="flex gap-2">
            <Button
              label="Annuleren"
              size="small"
              severity="secondary"
              outlined
              @click="isEditingVoorkeuren = false"
            />
            <Button label="Opslaan" size="small" @click="isEditingVoorkeuren = false" />
          </div>
        </template>
      </div>
      <Transition name="card-fade" mode="out-in">
        <div v-if="!isEditingVoorkeuren" key="view" class="view-card-body">
          <div class="fr-row">
            <span class="fr-label">Betaalmethode</span>
            <span :class="customer.betaalmethode ? 'fr-value' : 'fr-empty'">{{
              customer.betaalmethode || '—'
            }}</span>
          </div>
          <div class="fr-row">
            <span class="fr-label">Voorkeur showroom</span>
            <span :class="customer.voorkeurShowroom ? 'fr-value' : 'fr-empty'">{{
              customer.voorkeurShowroom || '—'
            }}</span>
          </div>
          <div class="fr-row">
            <span class="fr-label">Toon prijzen</span>
            <span class="fr-value">{{ customer.toonPrijzen }}</span>
          </div>
          <div class="fr-row">
            <span class="fr-label">Nieuwsbrief</span>
            <span :class="customer.nieuwsbrief ? 'fr-value' : 'fr-empty'">{{
              customer.nieuwsbrief ? 'Aangemeld' : '—'
            }}</span>
          </div>
        </div>
        <div v-else key="edit" class="view-card-body">
          <div class="fr-row">
            <label class="fr-label">Betaalmethode</label>
            <Select
              v-model="customer.betaalmethode"
              :options="betaalmethodeOptions"
              class="w-full"
              placeholder="Betaalmethode"
              show-clear
            />
          </div>
          <div class="fr-row">
            <label class="fr-label">Voorkeur showroom</label>
            <Select
              v-model="customer.voorkeurShowroom"
              :options="showroomOptions"
              class="w-full"
              placeholder="Voorkeur showroom"
              show-clear
            />
          </div>
          <div class="fr-row">
            <label class="fr-label">Toon prijzen</label>
            <SelectButton
              v-model="customer.toonPrijzen"
              :options="toonPrijzenOptions"
              size="small"
            />
          </div>
          <div class="fr-row">
            <label class="fr-label">Nieuwsbrief</label>
            <div class="flex items-center gap-2">
              <Checkbox v-model="customer.nieuwsbrief" binary input-id="nieuwsbrief" />
              <label for="nieuwsbrief" class="text-sm text-surface-600 cursor-pointer"
                >Aangemeld voor nieuwsbrief</label
              >
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Card: Afspraken URLs -->
    <div class="view-card">
      <div class="view-card-hdr">
        <span class="view-card-title">Afspraken URLs</span>
        <div class="flex items-center gap-2">
          <ToggleSwitch v-model="customer.afspraakURLsActief" />
          <span class="view-card-toggle-lbl">
            {{ customer.afspraakURLsActief ? 'Actief' : 'Inactief' }}
          </span>
        </div>
      </div>
      <div v-if="customer.afspraakURLsActief" class="view-card-body">
        <div class="fr-row">
          <span class="fr-label">SWNL</span>
          <div class="url-row">
            <span class="fr-value url-text">{{ customer.afspraakURLs.swnl }}</span>
            <Button
              icon="pi pi-copy"
              size="small"
              severity="secondary"
              text
              @click="copyToClipboard(customer.afspraakURLs.swnl)"
            />
          </div>
        </div>
        <div class="fr-row">
          <span class="fr-label">SWBE (Nederlandstalig)</span>
          <div class="url-row">
            <span class="fr-value url-text">{{ customer.afspraakURLs.swbeNl }}</span>
            <Button
              icon="pi pi-copy"
              size="small"
              severity="secondary"
              text
              @click="copyToClipboard(customer.afspraakURLs.swbeNl)"
            />
          </div>
        </div>
        <div class="fr-row">
          <span class="fr-label">SWBE (Franstalig)</span>
          <div class="url-row">
            <span class="fr-value url-text">{{ customer.afspraakURLs.swbeFr }}</span>
            <Button
              icon="pi pi-copy"
              size="small"
              severity="secondary"
              text
              @click="copyToClipboard(customer.afspraakURLs.swbeFr)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .view-card-toggle-lbl {
    font-size: 0.8125rem;
    color: var(--p-surface-500);
  }
  .url-row {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    min-width: 0;
  }
  .url-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--p-primary-600);
    font-size: 0.8125rem;
  }
</style>
