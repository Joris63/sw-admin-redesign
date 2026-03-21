<script setup lang="ts">
import { ref, computed } from 'vue';
import EditPageLayout from '@/components/layout/EditPageLayout.vue';
import EditPageHeader from '@/components/layout/EditPageHeader.vue';
import EditPageTabs from '@/components/layout/EditPageTabs.vue';
import type { TabDef } from '@/components/layout/EditPageTabs.vue';
import { SITE_OPTIONS } from '@/mocks/options';
import { MOCK_STORE, MOCK_OPENING_HOURS, MOCK_EXCEPTIONS } from '@/mocks/stores';
import type { OpeningHours, StoreException } from '@/mocks/stores';
import StoreGeneralTab from './tabs/StoreGeneralTab.vue';
import StoreHoursTab from './tabs/StoreHoursTab.vue';
import StoreMediaTab from './tabs/StoreMediaTab.vue';

const store = ref({ ...MOCK_STORE });
const openingHours = ref<OpeningHours[]>(MOCK_OPENING_HOURS.map((h) => ({ ...h })));
const exceptions = ref<StoreException[]>(MOCK_EXCEPTIONS.map((e) => ({ ...e })));

let nextExceptionId = 12;

function addException() {
  const reason: Record<string, string> = {};
  for (const sv of siteviews.value) reason[sv.key] = '';
  exceptions.value.push({
    id: nextExceptionId++,
    date: null,
    from: '09:00',
    to: '17:30',
    closed: false,
    reason,
  });
}

function removeException(id: number) {
  exceptions.value = exceptions.value.filter((u) => u.id !== id);
}

const activeTab = ref('algemeen');

const tabs: TabDef[] = [
  { id: 'algemeen', label: 'Algemene informatie', icon: 'pi-shop' },
  { id: 'openingstijden', label: 'Openingstijden', icon: 'pi-clock' },
  { id: 'content', label: 'Content website', icon: 'pi-globe' },
];

const siteviews = computed(() => {
  const result: { key: string; label: string }[] = [];
  for (const site of store.value.sites) {
    if (site === 'sawiday_be') {
      result.push({ key: 'sawiday_be_nl', label: 'sawiday.be (NL)' });
      result.push({ key: 'sawiday_be_fr', label: 'sawiday.be (FR)' });
    } else {
      const opt = SITE_OPTIONS.find((o) => o.value === site);
      result.push({ key: site, label: opt?.label ?? site });
    }
  }
  return result;
});

const currentTabComponent = computed(() => {
  switch (activeTab.value) {
    case 'algemeen': return StoreGeneralTab;
    case 'openingstijden': return StoreHoursTab;
    case 'content': return StoreMediaTab;
    default: return StoreGeneralTab;
  }
});
</script>

<template>
  <EditPageLayout>
    <!-- ── Header ──────────────────────────────────────────────────────────── -->
    <EditPageHeader
      :title="store.name"
      :subtitle="`${store.street} ${store.houseNumber}, ${store.postalCode} ${store.city}`"
      :back="{ name: 'LocationsOverview', query: { tab: 'stores' } }"
    >
      <template #avatar><i class="pi pi-shop" /></template>
      <template #pills>
        <span class="status-pill status-pill--type">{{ store.abbreviation }}</span>
        <span
          class="status-pill"
          :class="store.active ? 'status-pill--active' : 'status-pill--inactive'"
        >
          {{ store.active ? 'Actief' : 'Inactief' }}
        </span>
      </template>
      <template #actions>
        <Button icon="pi pi-ellipsis-v" severity="secondary" text rounded />
      </template>
    </EditPageHeader>

    <!-- ── Tabs ─────────────────────────────────────────────────────────────── -->
    <EditPageTabs v-model="activeTab" :tabs="tabs" />

    <!-- ── Tab content ──────────────────────────────────────────────────────── -->
    <div class="tab-scroll">
      <component
        :is="currentTabComponent"
        :store="store"
        :opening-hours="openingHours"
        :exceptions="exceptions"
        :add-exception="addException"
        :remove-exception="removeException"
      />
    </div>
  </EditPageLayout>
</template>
