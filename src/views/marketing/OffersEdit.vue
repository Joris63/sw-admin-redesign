<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import EditPageLayout from '@/components/layout/EditPageLayout.vue';
  import EditPageHeader from '@/components/layout/EditPageHeader.vue';
  import EditPageTabs from '@/components/layout/EditPageTabs.vue';
  import type { TabDef } from '@/components/layout/EditPageTabs.vue';
  import GroupDrawer from './components/GroupDrawer.vue';
  import AddProductsDialog from './components/AddProductsDialog.vue';
  import DuplicateDialog from './components/DuplicateDialog.vue';
  import OfferGroupTree from './components/OfferGroupTree.vue';
  import OfferProductPanel from './components/OfferProductPanel.vue';
  import OfferDetailsCard from './components/OfferDetailsCard.vue';

  import type { OfferStatus, OfferGroup as Group } from '@/types/offer';
  import { parseDMY } from '@/utils/format';
  import { MOCK_GROUPS, PENDING_CHANGES, PENDING_SITE_CHANGES } from '@/mocks/offers';
  import { useOfferGroups } from '@/composables/useOfferGroups';

  const route = useRoute();
  const moreMenuRef = ref();

  // ── Tab ───────────────────────────────────────────────────────────
  const activeTab = ref('groups');

  // ── Offer ─────────────────────────────────────────────────────────
  const offer = ref({
    id: Number(route.params.id),
    name: '2026 Q1: GROHE COLORS BE',
    description: '',
    websites: ['sawiday_be'],
    startDate: parseDMY('11-02-2026') as Date | null,
    endDate: parseDMY('31-03-2026') as Date | null,
    status: 'Active' as OfferStatus,
  });

  function handleDetailsSave(updated: typeof offer.value) {
    Object.assign(offer.value, updated);
  }

  // ── Groups state ──────────────────────────────────────────────────
  const groups = ref<Group[]>(MOCK_GROUPS);

  const {
    selectedNodeId,
    selectedPath,
    parentGroupOptions,
    activeNodeName,
    activeProducts,
    findGroup,
    selectNode,
    toggleGroup,
    handleGroupSave,
    deleteGroup,
    handleDeleteProducts,
    handleDeleteAllProducts,
    handleDeleteFilteredProducts,
    handleDeleteCsvProducts,
  } = useOfferGroups(groups);

  // ── Dialog / drawer visibility ────────────────────────────────────
  const showAddProducts = ref(false);
  const showDuplicateDialog = ref(false);

  // ── Group drawer state ────────────────────────────────────────────
  const gdVisible = ref(false);
  const gdIsEdit = ref(false);
  const gdEditGroupId = ref<number | null>(null);
  const gdParentGroupId = ref<number | null>(null);
  const gdInitialName = ref('');
  const gdEditingRootGroup = computed(() => gdIsEdit.value);

  function openCreateGroup(parentGroupId: number | null = null) {
    gdVisible.value = true;
    gdIsEdit.value = false;
    gdEditGroupId.value = null;
    gdParentGroupId.value = parentGroupId;
    gdInitialName.value = '';
  }

  function openEditGroup(nodeId: number) {
    const node = findGroup(nodeId);
    if (!node) return;
    gdVisible.value = true;
    gdIsEdit.value = true;
    gdEditGroupId.value = nodeId;
    gdParentGroupId.value = null;
    gdInitialName.value = node.name;
  }

  // ── Computed ──────────────────────────────────────────────────────
  const isExpired = computed(() => offer.value.status === 'Expired');

  const websiteLabels: Record<string, string> = {
    sanitairwinkel_nl: 'sanitairwinkel.nl',
    sawiday_be: 'sawiday.be',
    sawiday_fr: 'sawiday.fr',
    sawiday_de: 'sawiday.de',
  };

  const websiteSubtitle = computed(
    () => offer.value.websites.map((w) => websiteLabels[w] ?? w).join(' · ') || '—'
  );

  const siteMap: Record<string, { code: string; langs: string[] }> = {
    sanitairwinkel_nl: { code: 'SWNL', langs: ['nl-NL'] },
    sawiday_be: { code: 'SWBE', langs: ['nl-BE', 'fr-BE'] },
    sawiday_fr: { code: 'SWFR', langs: ['fr-FR'] },
    sawiday_de: { code: 'SWDE', langs: ['de-DE'] },
  };

  const siteLabels = computed(() =>
    offer.value.websites.flatMap((w) => {
      const s = siteMap[w];
      return s ? s.langs.map((lang) => `${s.code} (${lang})`) : [];
    })
  );

  function formatDate(d: Date | null) {
    if (!d) return '—';
    return d.toLocaleDateString('nl-NL', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  const totalGroups = computed(() => {
    function count(nodes: Group[]): number {
      return nodes.reduce((sum, g) => sum + 1 + count(g.children), 0);
    }
    return count(groups.value);
  });

  const totalProducts = computed(() => {
    function count(nodes: Group[]): number {
      return nodes.reduce((sum, g) => sum + g.products.length + count(g.children), 0);
    }
    return count(groups.value);
  });

  const looptijdLabel = computed(
    () => `${formatDate(offer.value.startDate)} – ${formatDate(offer.value.endDate)}`
  );

  const statusBadgeClass = computed(() => {
    const map: Record<OfferStatus, string> = {
      Active: 'status-pill--active',
      Expired: 'status-pill--expired',
      Planned: 'status-pill--planned',
    };
    return map[offer.value.status];
  });

  const tabs: TabDef[] = [
    { id: 'details', label: 'Details', icon: 'pi-info-circle' },
    { id: 'groups',  label: 'Groepen', icon: 'pi-sitemap'     },
    { id: 'tasks',   label: 'Taken',   icon: 'pi-list-check', soon: true, disabled: true },
  ];
</script>

<template>
  <EditPageLayout>
    <!-- ── Header ────────────────────────────────────────────────── -->
    <EditPageHeader
      :title="offer.name"
      :subtitle="websiteSubtitle"
      :back="{ name: 'OffersOverview' }"
      avatar-class="oe-avatar"
    >
      <template #avatar><i class="pi pi-tag" /></template>
      <template #pills>
        <span class="status-pill" :class="statusBadgeClass">{{ offer.status }}</span>
      </template>
      <template #stats>
        <div class="edit-hdr-stats">
          <div class="edit-hdr-stat">
            <span class="edit-hdr-stat-val">{{ totalGroups }}</span>
            <span class="edit-hdr-stat-lbl">Groepen</span>
          </div>
          <div class="edit-hdr-stat-sep" />
          <div class="edit-hdr-stat">
            <span class="edit-hdr-stat-val">{{ totalProducts }}</span>
            <span class="edit-hdr-stat-lbl">Producten</span>
          </div>
          <div class="edit-hdr-stat-sep" />
          <div class="edit-hdr-stat">
            <span class="edit-hdr-stat-val">{{ looptijdLabel }}</span>
            <span class="edit-hdr-stat-lbl">Looptijd</span>
          </div>
        </div>
      </template>
      <template #actions>
        <Button
          icon="pi pi-ellipsis-v"
          severity="secondary"
          text
          rounded
          @click="(moreMenuRef as any)?.toggle($event)"
        />
        <Popover ref="moreMenuRef">
          <div class="ctx-menu">
            <button class="ctx-item" @click="showDuplicateDialog = true; moreMenuRef?.hide()">
              <i class="pi pi-copy" />Kopieer actie
            </button>
            <div class="ctx-sep" />
            <button class="ctx-item ctx-item--danger">
              <i class="pi pi-trash" />Verwijder actie
            </button>
          </div>
        </Popover>
      </template>
    </EditPageHeader>

    <!-- ── Verlopen banner ────────────────────────────────────────── -->
    <Transition name="fade">
      <div v-if="isExpired" class="verlopen-banner">
        <i class="pi pi-info-circle shrink-0" />
        <span>Deze actie is verlopen en kan niet meer bewerkt worden.</span>
        <button class="verlopen-copy-btn" @click="showDuplicateDialog = true">
          Maak een kopie
        </button>
      </div>
    </Transition>

    <!-- ── Tabs ───────────────────────────────────────────────────── -->
    <EditPageTabs v-model="activeTab" :tabs="tabs" />

    <!-- ── Tab 1: Details ─────────────────────────────────────────── -->
    <OfferDetailsCard
      v-if="activeTab === 'details'"
      :offer="offer"
      :is-expired="isExpired"
      @save="handleDetailsSave"
    />

    <!-- ── Tab 2: Groepen ─────────────────────────────────────────── -->
    <div v-else-if="activeTab === 'groups'" class="oe-groepen-tab">
      <div class="view-card oe-groups-card">
        <div class="view-card-hdr">
          <span class="view-card-title">Groepen</span>
          <Button
            v-if="!isExpired"
            label="Toevoegen"
            icon="pi pi-plus"
            size="small"
            severity="secondary"
            text
            @click="openCreateGroup(null)"
          />
        </div>
        <OfferGroupTree
          :groups="groups"
          :selected-group-id="selectedNodeId"
          :pending-changes="PENDING_CHANGES"
          :is-verlopen="isExpired"
          :headless="true"
          @select-group="selectNode"
          @toggle-group="toggleGroup"
          @add-group="openCreateGroup"
          @edit-group="openEditGroup"
          @delete-group="deleteGroup"
        />
      </div>

      <div class="view-card oe-products-card">
        <OfferProductPanel
          :products="activeProducts"
          :selected-group-id="selectedNodeId"
          :selected-path="selectedPath"
          :pending-changes="PENDING_CHANGES"
          :pending-site-changes="PENDING_SITE_CHANGES"
          :is-verlopen="isExpired"
          :group-name="activeNodeName"
          @add-products="showAddProducts = true"
          @delete-products="handleDeleteProducts"
          @delete-all-products="handleDeleteAllProducts"
          @delete-filtered-products="handleDeleteFilteredProducts"
          @delete-csv-products="handleDeleteCsvProducts"
          @select-group="selectNode"
          @edit-group="openEditGroup"
          @delete-group="deleteGroup"
        />
      </div>
    </div>

    <!-- ── Tab 3: Taken (placeholder) ────────────────────────────── -->
    <div v-else-if="activeTab === 'tasks'" class="tab-scroll">
      <div class="view-card">
        <div class="view-card-hdr">
          <span class="view-card-title">Achtergrondtaken</span>
        </div>
        <div class="view-card-body">
          <p class="table-empty" style="text-align: center; padding: 1.5rem 0">
            Nog geen taken beschikbaar
          </p>
        </div>
      </div>
    </div>

    <!-- ── Dialogs & Drawers ──────────────────────────────────────── -->
    <AddProductsDialog v-model:visible="showAddProducts" :group-naam="activeNodeName" />

    <DuplicateDialog
      v-model:visible="showDuplicateDialog"
      :actie-naam="offer.name"
      :actie-websites="offer.websites"
      :actie-startdatum="offer.startDate"
      :actie-einddatum="offer.endDate"
    />

    <GroupDrawer
      v-model:visible="gdVisible"
      :is-edit="gdIsEdit"
      :edit-group-id="gdEditGroupId"
      :parent-group-id="gdParentGroupId"
      :initial-name="gdInitialName"
      :site-labels="siteLabels"
      :parent-group-options="parentGroupOptions"
      :editing-root-group="gdEditingRootGroup"
      @save="handleGroupSave"
    />
  </EditPageLayout>
</template>
