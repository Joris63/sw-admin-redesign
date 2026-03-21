<script setup lang="ts">
  import { computed } from 'vue';
  import type { Feature } from './groupFeatures';
  import { ALL_FEATURES } from './groupFeatures';

  const props = defineProps<{
    activeFeatures: Feature[];
    siteLabels: string[];
    labelColorOverride: boolean;
    labelColorHex: string;
    labelTextsOpen: boolean;
    labelTexts: Record<string, string>;
    preTextsOpen: boolean;
    preTexts: Record<string, string>;
    actietimerDagen: number;
    prijsBedrag: string;
    prijsModType: 'percentage' | 'bedrag';
    prijsVergelijking: 'van-voor' | 'advies';
  }>();

  const emit = defineEmits<{
    'remove-feature': [key: Feature];
    'add-feature': [key: Feature];
    'update:labelColorOverride': [val: boolean];
    'update:labelColorHex': [val: string];
    'update:labelTextsOpen': [val: boolean];
    'update:labelTexts': [val: Record<string, string>];
    'update:preTextsOpen': [val: boolean];
    'update:preTexts': [val: Record<string, string>];
    'update:actietimerDagen': [val: number];
    'update:prijsBedrag': [val: string];
    'update:prijsModType': [val: 'percentage' | 'bedrag'];
    'update:prijsVergelijking': [val: 'van-voor' | 'advies'];
  }>();

  const availableFeatures = computed(() =>
    ALL_FEATURES.filter((f) => !props.activeFeatures.includes(f.key))
  );

  function hasFeature(key: Feature) {
    return props.activeFeatures.includes(key);
  }

  // ColorPicker uses hex without '#'
  const labelColor = computed({
    get: () => props.labelColorHex.replace('#', ''),
    set: (v: string) => emit('update:labelColorHex', `#${v}`),
  });

  const PRIJS_MOD_OPTIONS = [
    { label: 'Percentage %', value: 'percentage' },
    { label: 'Bedrag €', value: 'bedrag' },
  ];

  const PRIJS_VERGELIJKING_OPTIONS = [
    { label: 'Van-voor prijs', value: 'van-voor' },
    { label: 'Adviesprijs', value: 'advies' },
  ];
</script>

<template>
  <!-- Active feature cards -->
  <TransitionGroup name="feature" tag="div" class="flex flex-col gap-2">
    <!-- Label -->
    <div v-if="hasFeature('label')" key="label" class="opt-card">
      <div class="opt-card__hdr">
        <div class="opt-card__title"><i class="pi pi-tag" /> Label</div>
        <button class="opt-remove" @click="emit('remove-feature', 'label')">
          <i class="pi pi-times" />
        </button>
      </div>
      <div class="opt-card__body">
        <div class="drw-field">
          <div class="drw-row">
            <div>
              <label class="drw-label">Kleur aanpassen</label>
              <p class="drw-hint">Overschrijf de standaard labelkleur</p>
            </div>
            <ToggleSwitch
              :model-value="labelColorOverride"
              @update:model-value="emit('update:labelColorOverride', $event)"
            />
          </div>
          <Transition name="collapse">
            <div v-if="labelColorOverride" class="drw-inset flex items-center gap-3">
              <ColorPicker v-model="labelColor" format="hex" />
              <InputText
                :model-value="labelColorHex"
                class="flex-1"
                size="small"
                placeholder="#000000"
                @update:model-value="(v: string | undefined) => emit('update:labelColorHex', v ?? '')"
              />
            </div>
          </Transition>
        </div>
        <div class="drw-field">
          <button class="drw-collapsible" @click="emit('update:labelTextsOpen', !labelTextsOpen)">
            <span class="drw-label">Tekst per site</span>
            <i
              :class="`pi ${labelTextsOpen ? 'pi-chevron-up' : 'pi-chevron-down'}`"
              class="drw-chevron"
            />
          </button>
          <Transition name="collapse">
            <div v-if="labelTextsOpen" class="drw-collapsible-body">
              <template v-if="siteLabels.length">
                <div v-for="site in siteLabels" :key="site" class="drw-field">
                  <label class="drw-label"><span class="drw-site">{{ site }}</span></label>
                  <InputText
                    :model-value="labelTexts[site]"
                    class="w-full"
                    placeholder="Bijv. Actie, Sale, …"
                    @update:model-value="(v: string | undefined) => emit('update:labelTexts', { ...labelTexts, [site]: v ?? '' })"
                  />
                </div>
              </template>
              <p v-else class="drw-hint">Selecteer eerst websites in de actie details.</p>
            </div>
          </Transition>
        </div>
      </div>
    </div>

    <!-- Actietimer -->
    <div v-if="hasFeature('actietimer')" key="actietimer" class="opt-card">
      <div class="opt-card__hdr">
        <div class="opt-card__title"><i class="pi pi-clock" /> Actietimer</div>
        <button class="opt-remove" @click="emit('remove-feature', 'actietimer')">
          <i class="pi pi-times" />
        </button>
      </div>
      <div class="opt-card__body">
        <div class="flex items-center gap-3">
          <span class="drw-hint flex-1">Afteltimer start X dagen voor de einddatum</span>
          <InputNumber
            :model-value="actietimerDagen"
            :min="1"
            :max="365"
            style="width: 5rem; flex-shrink: 0"
            :input-style="{ width: '100%' }"
            @update:model-value="emit('update:actietimerDagen', $event)"
          />
        </div>
      </div>
    </div>

    <!-- Prijsmodificatie -->
    <div v-if="hasFeature('prijsmodificatie')" key="prijsmodificatie" class="opt-card">
      <div class="opt-card__hdr">
        <div class="opt-card__title"><i class="pi pi-percentage" /> Prijsmodificatie</div>
        <button class="opt-remove" @click="emit('remove-feature', 'prijsmodificatie')">
          <i class="pi pi-times" />
        </button>
      </div>
      <div class="opt-card__body">
        <div class="flex items-center gap-2">
          <InputText
            :model-value="prijsBedrag"
            class="flex-1"
            placeholder="0"
            @update:model-value="(v: string | undefined) => emit('update:prijsBedrag', v ?? '')"
          />
          <Select
            :model-value="prijsModType"
            :options="PRIJS_MOD_OPTIONS"
            option-label="label"
            option-value="value"
            style="width: 9.5rem"
            @update:model-value="emit('update:prijsModType', $event)"
          />
        </div>
        <SelectButton
          :model-value="prijsVergelijking"
          :options="PRIJS_VERGELIJKING_OPTIONS"
          option-label="label"
          option-value="value"
          @update:model-value="emit('update:prijsVergelijking', $event)"
        />
      </div>
    </div>

    <!-- Prijskleurmodificatie -->
    <div v-if="hasFeature('prijskleur')" key="prijskleur" class="opt-card">
      <div class="opt-card__hdr">
        <div class="opt-card__title"><i class="pi pi-palette" /> Prijskleurmodificatie</div>
        <button class="opt-remove" @click="emit('remove-feature', 'prijskleur')">
          <i class="pi pi-times" />
        </button>
      </div>
      <div class="opt-card__body">
        <p class="drw-hint">Prijzen worden getoond in de kleur van de actie.</p>
      </div>
    </div>

    <!-- Pre-tekst -->
    <div v-if="hasFeature('pretekst')" key="pretekst" class="opt-card">
      <div class="opt-card__hdr">
        <div class="opt-card__title"><i class="pi pi-align-left" /> Pre-tekst per site</div>
        <button class="opt-remove" @click="emit('remove-feature', 'pretekst')">
          <i class="pi pi-times" />
        </button>
      </div>
      <div class="opt-card__body">
        <template v-if="siteLabels.length">
          <div v-for="site in siteLabels" :key="site" class="drw-field">
            <label class="drw-label drw-site">{{ site }}</label>
            <Textarea
              :model-value="preTexts[site]"
              class="w-full"
              :rows="3"
              placeholder="Tekst bij de productbeschrijving…"
              @update:model-value="emit('update:preTexts', { ...preTexts, [site]: $event })"
            />
          </div>
        </template>
        <p v-else class="drw-hint">Selecteer eerst websites in de actie details.</p>
      </div>
    </div>
  </TransitionGroup>

  <!-- Add list -->
  <div
    v-if="availableFeatures.length"
    class="opt-add-list"
    :class="{ 'opt-add-list--mt': activeFeatures.length }"
  >
    <button
      v-for="f in availableFeatures"
      :key="f.key"
      class="opt-add-btn"
      @click="emit('add-feature', f.key)"
    >
      <i class="pi pi-plus opt-add-btn__icon" />
      <span>{{ f.label }}</span>
    </button>
  </div>
</template>

<style scoped>
  .drw-site {
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--p-gray-500);
  }

  .drw-collapsible {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    text-align: left;
  }
  .drw-collapsible:hover .drw-label {
    color: var(--p-primary-600);
  }
  .drw-collapsible:hover .drw-chevron {
    color: var(--p-primary-400);
  }
  .drw-chevron {
    font-size: 0.6875rem;
    color: var(--p-gray-400);
    transition: color 0.1s;
  }
  .drw-collapsible-body {
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
    margin-top: 0.75rem;
  }

  /* Feature cards */
  .opt-card {
    border: 1.5px solid var(--p-gray-200);
    border-radius: 0.625rem;
    overflow: hidden;
  }
  .opt-card__hdr {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0.75rem;
    background: var(--p-gray-50);
    border-bottom: 1px solid var(--p-gray-100);
  }
  .opt-card__title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--p-surface-700);
  }
  .opt-card__title .pi {
    font-size: 0.8rem;
    color: var(--p-gray-400);
  }
  .opt-card__body {
    padding: 0.875rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
  }
  .opt-remove {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.375rem;
    height: 1.375rem;
    border-radius: 0.25rem;
    flex-shrink: 0;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--p-gray-400);
    font-size: 0.7rem;
    transition: background 0.1s, color 0.1s;
  }
  .opt-remove:hover {
    background: var(--p-red-50);
    color: var(--p-red-500);
  }

  /* Add list */
  .opt-add-list {
    display: flex;
    flex-direction: column;
  }
  .opt-add-list--mt {
    margin-top: 0.25rem;
    padding-top: 0.75rem;
    border-top: 1px solid var(--p-gray-100);
  }
  .opt-add-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 0.5rem;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 0.875rem;
    color: var(--p-gray-500);
    border-radius: 0.375rem;
    text-align: left;
    transition: background 0.1s, color 0.1s;
  }
  .opt-add-btn:hover {
    background: var(--p-primary-50);
    color: var(--p-primary-600);
  }
  .opt-add-btn:hover .opt-add-btn__icon {
    color: var(--p-primary-500);
  }
  .opt-add-btn__icon {
    font-size: 0.7rem;
    color: var(--p-gray-400);
    transition: color 0.1s;
  }

  .collapse-enter-active {
    transition: opacity 0.18s ease, transform 0.18s ease;
  }
  .collapse-leave-active {
    transition: opacity 0.12s ease, transform 0.12s ease;
  }
  .collapse-enter-from,
  .collapse-leave-to {
    opacity: 0;
    transform: translateY(-0.25rem);
  }

  .feature-enter-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
  }
  .feature-leave-active {
    transition: opacity 0.15s ease, transform 0.15s ease;
  }
  .feature-enter-from,
  .feature-leave-to {
    opacity: 0;
    transform: translateY(-0.5rem);
  }
</style>
