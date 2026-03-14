<script setup lang="ts">
  import PhoneField from '@/components/form/PhoneField.vue';
import EditPageHeader from '@/components/layout/EditPageHeader.vue';
  import EditPageLayout from '@/components/layout/EditPageLayout.vue';
  import { MOCK_WAREHOUSEGROUPS } from '@/mocks/warehouseGroups';
  import { ref } from 'vue';

  const warehouse = ref({
    name: 'Inkomend Tilburg',
    street: 'AaBe-straat',
    houseNumber: '28',
    addition: '',
    city: 'Tilburg',
    postalCode: '5021 AV',
    country: 'NL',
    gln: '8719338021457',
    containsGoods: true,
    warehouseGroup: 'Voorraad Tilburg',
    email: 'info@sanitairwinkel.nl',
    phoneCountry: 'NL',
    phoneNumber: '30 123 4567',
    webstockDepartments: ['23'],
  });

  const countryOptions = [
    { label: 'Nederland', value: 'NL' },
    { label: 'België', value: 'BE' },
    { label: 'Frankrijk', value: 'FR' },
    { label: 'Duitsland', value: 'DE' },
  ];

  const warehouseGroups = MOCK_WAREHOUSEGROUPS.map(({ name }) => ({
    label: name,
    value: name,
  }));

  const isEditingGeneral = ref(false);
  const isEditingAddress = ref(false);
</script>

<template>
  <EditPageLayout>
    <!-- ── Header ──────────────────────────────────────────────────────────── -->
    <EditPageHeader
      :title="warehouse.name"
      :subtitle="`${warehouse.street} ${warehouse.houseNumber}, ${warehouse.postalCode} ${warehouse.city}`"
      :back="{ name: 'LocationsOverview', query: { tab: 'warehouses' } }"
    >
      <template #avatar><i class="pi pi-warehouse" /></template>
    </EditPageHeader>

    <div class="tab-scroll">
      <!-- Basisgegevens -->
      <div class="view-card">
        <div class="view-card-hdr">
          <span class="view-card-title">Basisgegevens</span>
          <template v-if="!isEditingGeneral">
            <Button
              label="Bewerken"
              icon="pi pi-pencil"
              size="small"
              severity="secondary"
              text
              @click="isEditingGeneral = true"
            />
          </template>
          <template v-else>
            <div class="flex gap-2">
              <Button
                label="Annuleren"
                size="small"
                severity="secondary"
                outlined
                @click="isEditingGeneral = false"
              />
              <Button label="Opslaan" size="small" @click="isEditingGeneral = false" />
            </div>
          </template>
        </div>
        <Transition name="card-fade" mode="out-in">
          <div v-if="!isEditingGeneral" key="view" class="view-card-body">
            <div class="fr-row">
              <span class="fr-label">Naam</span>
              <span class="fr-value">{{ warehouse.name }}</span>
            </div>
            <div class="fr-row">
              <span class="fr-label">Global Location Number (GLN)</span>
              <span class="fr-value">{{ warehouse.gln }}</span>
            </div>
            <div class="fr-row">
              <span class="fr-label">Bevat goederen</span>
              <span class="fr-value">
                <span
                  :class="
                    warehouse.containsGoods
                      ? 'status-badge status-badge--yes'
                      : 'status-badge status-badge--no'
                  "
                >
                  {{ warehouse.containsGoods ? 'Ja' : 'Nee' }}
                </span>
              </span>
            </div>
            <div class="fr-row">
              <span class="fr-label">Magazijngroep</span>
              <span class="fr-value">{{ warehouse.warehouseGroup }}</span>
            </div>
            <div class="fr-row">
              <span class="fr-label">E-mail</span>
              <span class="fr-value">{{ warehouse.email }}</span>
            </div>
            <div class="fr-row">
                <span class="fr-label">Telefoonnummer</span>
                <span :class="warehouse.phoneNumber ? 'fr-value' : 'fr-empty'">
                  {{
                    warehouse.phoneNumber
                      ? `+${warehouse.phoneCountry === 'NL' ? '31' : warehouse.phoneCountry === 'BE' ? '32' : '33'} ${warehouse.phoneNumber}`
                      : '—'
                  }}
                </span>
              </div>
            <div class="fr-row">
              <span class="fr-label">Webstock afdelingen</span>
              <div class="flex flex-wrap gap-1">
                <span v-for="tag in warehouse.webstockDepartments" :key="tag" class="site-tag">
                  {{ tag }}
                </span>
                <span v-if="!warehouse.webstockDepartments.length" class="fr-empty">—</span>
              </div>
            </div>
          </div>
          <div v-else key="edit" class="view-card-body">
            <div class="fr-row">
              <label class="fr-label">Naam <span class="fr-req">*</span></label>
              <InputText v-model="warehouse.name" class="w-full" placeholder="Naam magazijn" />
            </div>
            <div class="fr-row">
              <label class="fr-label">
                Global Location Number (GLN)
                <span class="fr-req">*</span>
              </label>
              <InputText v-model="warehouse.gln" class="w-full" placeholder="8712345678901" />
            </div>
            <div class="fr-row">
              <label class="fr-label">Bevat goederen</label>
              <ToggleSwitch v-model="warehouse.containsGoods" />
            </div>
            <div class="fr-row">
              <label class="fr-label">Magazijngroepen <span class="fr-req">*</span></label>
              <Select
                v-model="warehouse.warehouseGroup"
                :options="warehouseGroups"
                class="w-full"
                show-clear
                placeholder="Selecteer magazijngroep"
              />
            </div>
            <div class="fr-row">
              <label class="fr-label">E-mail <span class="fr-req">*</span></label>
              <InputText
                v-model="warehouse.email"
                class="w-full"
                placeholder="winkel@sanitairwinkel.nl"
              />
            </div>
            <div class="fr-row">
              <label class="fr-label">Telefoonnummer <span class="fr-req">*</span></label>
              <PhoneField
                v-model:country="warehouse.phoneCountry"
                v-model:number="warehouse.phoneNumber"
                class="w-full"
              />
            </div>
            <div class="fr-row fr-row--top">
              <label class="fr-label">Webstock afdelingen <span class="fr-req">*</span></label>
              <InputChips
                v-model="warehouse.webstockDepartments"
                class="w-full"
                placeholder="Voer een afdeling in"
              />
            </div>
          </div>
        </Transition>
      </div>

      <!-- Adres -->
      <div class="view-card">
        <div class="view-card-hdr">
          <span class="view-card-title">Adres</span>
          <template v-if="!isEditingAddress">
            <Button
              label="Bewerken"
              icon="pi pi-pencil"
              size="small"
              severity="secondary"
              text
              @click="isEditingAddress = true"
            />
          </template>
          <template v-else>
            <div class="flex gap-2">
              <Button
                label="Annuleren"
                size="small"
                severity="secondary"
                outlined
                @click="isEditingAddress = false"
              />
              <Button label="Opslaan" size="small" @click="isEditingAddress = false" />
            </div>
          </template>
        </div>
        <Transition name="card-fade" mode="out-in">
          <div v-if="!isEditingAddress" key="view" class="view-card-body">
            <div class="fr-row">
              <span class="fr-label">Land</span>
              <span class="fr-value"
                ><span class="site-tag">{{ warehouse.country }}</span></span
              >
            </div>
            <div class="fr-row">
              <span class="fr-label">Adres</span>
              <span class="fr-value">
                {{ warehouse.street }} {{ warehouse.houseNumber }}
                {{ warehouse.addition ? ' ' + warehouse.addition : '' }},
                {{ warehouse.postalCode }}
                {{ warehouse.city }}
              </span>
            </div>
          </div>
          <div v-else key="edit" class="view-card-body">
            <div class="fr-row">
              <label class="fr-label">Land <span class="fr-req">*</span></label>
              <Select
                v-model="warehouse.country"
                :options="countryOptions"
                option-label="label"
                option-value="value"
                class="w-full"
              />
            </div>
            <div class="fr-row fr-row--top">
              <label class="fr-label">Adres <span class="fr-req">*</span></label>
              <AddressFields
                v-model:postalCode="warehouse.postalCode"
                v-model:houseNumber="warehouse.houseNumber"
                v-model:addition="warehouse.addition"
                v-model:street="warehouse.street"
                v-model:city="warehouse.city"
              />
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </EditPageLayout>
</template>
