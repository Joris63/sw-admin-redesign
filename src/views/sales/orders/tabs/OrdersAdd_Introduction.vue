<script setup lang="ts">
import { ref } from 'vue';
import AddPageNav from '@/components/layout/AddPageNav.vue';
import IntroductionSection_Details from '../components/introduction/IntroductionSection_Details.vue';
import IntroductionSection_Address from '../components/introduction/IntroductionSection_Address.vue';
import IntroductionSection_Channel from '../components/introduction/IntroductionSection_Channel.vue';
import IntroductionSection_Recommended from '../components/introduction/IntroductionSection_Recommended.vue';

const sections = [
  { id: 'details', label: 'Je gegevens', description: 'Naam, e-mail en contact' },
  { id: 'address', label: 'Je adres', description: 'Bezorgadres' },
  { id: 'channel', label: 'Kanaal', description: 'Verkoop en vestiging' },
  { id: 'recommended', label: 'Aanbevolen', description: 'Optioneel' },
];

// customerMode is shared between details and address sections
type CustomerMode = 'search' | 'new' | null;
const customerMode = ref<CustomerMode>('search');
</script>

<template>
  <StepPanel :value="2" class="flex flex-col grow view-card p-5">
    <div class="flex grow items-start">
      <!-- ── Section nav ─────────────────────────────────────── -->
      <AddPageNav :sections="sections" />

      <!-- ── Main content ────────────────────────────────────── -->
      <div class="flex flex-col flex-1 min-w-0 py-2 pl-5 border-l border-gray-100">
        <!-- Je gegevens ──────────────────────────────────────── -->
        <section id="details" class="add-section">
          <div class="add-section-hdr">
            <i class="pi pi-user add-section-icon" />
            <div class="add-section-title">Je gegevens</div>
          </div>
          <IntroductionSection_Details v-model:customer-mode="customerMode" />
        </section>

        <!-- Je adres ──────────────────────────────────────────── -->
        <section id="address" class="add-section">
          <div class="add-section-hdr">
            <i class="pi pi-map-marker add-section-icon" />
            <div class="add-section-title">Je adres</div>
          </div>
          <IntroductionSection_Address :customer-mode="customerMode" />
        </section>

        <!-- Kanaal ───────────────────────────────────────────── -->
        <section id="channel" class="add-section">
          <div class="add-section-hdr">
            <i class="pi pi-send add-section-icon" />
            <div class="add-section-title">Kanaal</div>
          </div>
          <IntroductionSection_Channel />
        </section>

        <!-- Aanbevolen door ───────────────────────────────────── -->
        <section id="recommended" class="add-section">
          <div class="add-section-hdr">
            <i class="pi pi-thumbs-up add-section-icon" />
            <div class="add-section-title">Ben je aanbevolen door iemand?</div>
          </div>
          <IntroductionSection_Recommended />
        </section>
      </div>
    </div>
  </StepPanel>
</template>
