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
  import EditableCard from '@/components/EditableCard.vue';

  import type { OfferStatus, OfferGroup as Group } from '@/types/offer';
  import { parseDMY } from '@/utils/format';
  import { MOCK_GROUPS, PENDING_CHANGES, PENDING_SITE_CHANGES } from '@/mocks/offers';

  const route = useRoute();
  const moreMenuRef = ref();

  // ── Tab ───────────────────────────────────────────────────────────
  const activeTab = ref('groups');

  // ── Actie ─────────────────────────────────────────────────────────
  const offer = ref({
    id: Number(route.params.id),
    name: '2026 Q1: GROHE COLORS BE',
    description: '',
    websites: ['sawiday_be'],
    startDate: parseDMY('11-02-2026') as Date | null,
    endDate: parseDMY('31-03-2026') as Date | null,
    status: 'Active' as OfferStatus,
  });

  // ── Details edit state ────────────────────────────────────────────
  const editingDetails = ref(false);
  const detailsDraft = ref({ ...offer.value, websites: [...offer.value.websites] });

  function startEditDetails() {
    detailsDraft.value = { ...offer.value, websites: [...offer.value.websites] };
    editingDetails.value = true;
  }

  function saveDetails() {
    Object.assign(offer.value, detailsDraft.value);
  }

  function cancelDetails() {
    // draft is discarded, EditableCard sets editingDetails = false
  }

  const websiteOptions = [
    { label: 'sanitairwinkel.nl', value: 'sanitairwinkel_nl' },
    { label: 'sawiday.be', value: 'sawiday_be' },
    { label: 'sawiday.fr', value: 'sawiday_fr' },
    { label: 'sawiday.de', value: 'sawiday_de' },
  ];

  const websiteLabels: Record<string, string> = {
    sanitairwinkel_nl: 'sanitairwinkel.nl',
    sawiday_be: 'sawiday.be',
    sawiday_fr: 'sawiday.fr',
    sawiday_de: 'sawiday.de',
  };

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

  // ── Groups state ──────────────────────────────────────────────────
  const groups = ref<Group[]>(MOCK_GROUPS);
  const selectedNodeId = ref<number>(3);

  // ── Dialog / drawer visibility ────────────────────────────────────
  const showAddProducts = ref(false);
  const showDuplicateDialog = ref(false);

  // ── Group drawer state ────────────────────────────────────────────
  const gdVisible = ref(false);
  const gdIsEdit = ref(false);
  const gdEditGroupId = ref<number | null>(null);
  const gdParentGroupId = ref<number | null>(null);
  const gdInitialName = ref('');

  // ── Computed ──────────────────────────────────────────────────────
  const isExpired = computed(() => offer.value.status === 'Expired');

  const websiteSubtitle = computed(
    () => offer.value.websites.map((w) => websiteLabels[w] ?? w).join(' · ') || '—'
  );

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

  // ── Tree helpers ──────────────────────────────────────────────────
  function findGroup(id: number, nodes: Group[] = groups.value): Group | null {
    for (const g of nodes) {
      if (g.id === id) return g;
      const found = findGroup(id, g.children);
      if (found) return found;
    }
    return null;
  }

  function nextId(): number {
    let max = 0;
    function traverse(ns: Group[]) {
      for (const g of ns) {
        if (g.id > max) max = g.id;
        traverse(g.children);
      }
    }
    traverse(groups.value);
    return max + 1;
  }

  function findPath(targetId: number, nodes: Group[], path: Group[] = []): Group[] | null {
    for (const g of nodes) {
      const newPath = [...path, g];
      if (g.id === targetId) return newPath;
      const found = findPath(targetId, g.children, newPath);
      if (found) return found;
    }
    return null;
  }

  function toTreeNodes(nodes: Group[]): any[] {
    return nodes.map((g) => ({
      key: String(g.id),
      label: g.name,
      selectable: true,
      children: g.children.length ? toTreeNodes(g.children) : undefined,
    }));
  }

  function flattenGroups(nodes: Group[], depth = 0): { node: Group; depth: number }[] {
    const items: { node: Group; depth: number }[] = [];
    for (const g of nodes) {
      items.push({ node: g, depth });
      if (g.expanded && g.children.length) items.push(...flattenGroups(g.children, depth + 1));
    }
    return items;
  }

  const selectedNode = computed(() => findGroup(selectedNodeId.value));
  const selectedPath = computed(() => findPath(selectedNodeId.value, groups.value) ?? []);
  const flatGroups = computed(() => flattenGroups(groups.value));
  const parentGroupOptions = computed(() => toTreeNodes(groups.value));
  const gdEditingRootGroup = computed(() => gdIsEdit.value);
  const activeNodeName = computed(() => selectedNode.value?.name ?? '');
  const activeProducts = computed(() => selectedNode.value?.products ?? []);

  // ── Group actions ─────────────────────────────────────────────────
  function selectNode(nodeId: number) {
    selectedNodeId.value = nodeId;
  }
  function toggleGroup(nodeId: number) {
    const g = findGroup(nodeId);
    if (g) g.expanded = !g.expanded;
  }

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

  function handleGroupSave(data: {
    isEdit: boolean;
    editGroupId: number | null;
    parentGroupId: number | null;
    name: string;
  }) {
    if (data.isEdit) {
      const node = findGroup(data.editGroupId!);
      if (node) node.name = data.name;
    } else if (data.parentGroupId !== null) {
      const parent = findGroup(data.parentGroupId);
      if (!parent) return;
      const newId = nextId();
      parent.children.push({
        id: newId,
        name: data.name,
        expanded: false,
        children: [],
        products: [],
      });
      parent.expanded = true;
      selectNode(newId);
    } else {
      const newId = nextId();
      groups.value.push({
        id: newId,
        name: data.name,
        expanded: false,
        children: [],
        products: [],
      });
      selectNode(newId);
    }
  }

  function deleteGroup(id: number) {
    function removeFrom(nodes: Group[]): boolean {
      const idx = nodes.findIndex((g) => g.id === id);
      if (idx !== -1) {
        nodes.splice(idx, 1);
        return true;
      }
      for (const g of nodes) {
        if (removeFrom(g.children)) return true;
      }
      return false;
    }
    removeFrom(groups.value);
    if (selectedNodeId.value === id) {
      const next = flatGroups.value[0]?.node.id;
      if (next) selectNode(next);
    }
  }

  // ── Product actions ───────────────────────────────────────────────
  function handleDeleteProducts(ids: number[]) {
    const idSet = new Set(ids);
    const target = selectedNode.value;
    if (target) target.products = target.products.filter((p) => !idSet.has(p.id));
  }
  function handleDeleteAllProducts() {
    const target = selectedNode.value;
    if (target) target.products = [];
  }
  function handleDeleteFilteredProducts(ids: number[]) {
    const idSet = new Set(ids);
    const target = selectedNode.value;
    if (target) target.products = target.products.filter((p) => !idSet.has(p.id));
  }
  function handleDeleteCsvProducts(codes: Set<string>) {
    const target = selectedNode.value;
    if (target) target.products = target.products.filter((p) => !codes.has(p.code.toUpperCase()));
  }
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
    <div v-if="activeTab === 'details'" class="tab-scroll">
      <div class="view-card">
        <EditableCard
          v-model="editingDetails"
          title="Actiedetails"
          :disabled="isExpired"
          @save="saveDetails"
          @cancel="cancelDetails"
          @update:model-value="
            (v) => {
              if (v) startEditDetails();
            }
          "
        >
          <!-- View mode -->
          <template #view>
            <div class="view-card-body">
              <div class="fr-row">
                <span class="fr-label">Naam</span>
                <span class="fr-value">{{ offer.name }}</span>
              </div>
              <div class="fr-row fr-row--top">
                <span class="fr-label">Website(s)</span>
                <div class="flex flex-col gap-2">
                  <div class="flex flex-wrap gap-1">
                    <span v-for="w in offer.websites" :key="w" class="site-tag">{{
                      websiteLabels[w] ?? w
                    }}</span>
                    <span v-if="!offer.websites.length" class="fr-empty">—</span>
                  </div>
                  <div v-if="PENDING_SITE_CHANGES.length" class="pending-sites">
                    <span class="pending-label">Vannacht:</span>
                    <div class="pending-chips">
                      <span
                        v-for="s in PENDING_SITE_CHANGES"
                        :key="s.site + s.action"
                        class="pending-chip"
                        :class="`pending-chip--${s.action}`"
                      >
                        <i :class="`pi ${s.action === 'add' ? 'pi-plus' : 'pi-minus'} text-xs`" />
                        {{ s.site }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="fr-row">
                <span class="fr-label">Looptijd</span>
                <span class="fr-value">
                  {{ formatDate(offer.startDate) }} → {{ formatDate(offer.endDate) }}
                </span>
              </div>
              <div class="fr-row fr-row--top">
                <span class="fr-label">Omschrijving</span>
                <span v-if="offer.description" class="fr-value" style="white-space: pre-wrap">{{
                  offer.description
                }}</span>
                <span v-else class="fr-empty">—</span>
              </div>
            </div>
          </template>

          <!-- Edit mode -->
          <template #edit>
            <div class="view-card-body">
              <div class="fr-row">
                <span class="fr-label">Naam <span class="fr-req">*</span></span>
                <InputText
                  v-model="detailsDraft.name"
                  class="w-full"
                  placeholder="Bijv. 2026 Q1: Black Friday BE"
                />
              </div>
              <div class="fr-row fr-row--top">
                <span class="fr-label">Website(s) <span class="fr-req">*</span></span>
                <div class="flex flex-col gap-2">
                  <MultiSelect
                    v-model="detailsDraft.websites"
                    :options="websiteOptions"
                    option-label="label"
                    option-value="value"
                    class="w-full"
                    placeholder="Selecteer website(s)"
                    display="chip"
                  />
                  <div v-if="PENDING_SITE_CHANGES.length" class="pending-sites">
                    <span class="pending-label">Vannacht:</span>
                    <div class="pending-chips">
                      <span
                        v-for="s in PENDING_SITE_CHANGES"
                        :key="s.site + s.action"
                        class="pending-chip"
                        :class="`pending-chip--${s.action}`"
                      >
                        <i :class="`pi ${s.action === 'add' ? 'pi-plus' : 'pi-minus'} text-xs`" />
                        {{ s.site }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="fr-row">
                <span class="fr-label">Looptijd <span class="fr-req">*</span></span>
                <div class="flex items-center gap-2">
                  <DatePicker
                    v-model="detailsDraft.startDate"
                    date-format="dd-mm-yy"
                    show-icon
                    icon-display="input"
                    class="flex-1"
                    placeholder="Startdatum"
                  />
                  <span class="text-gray-300 text-sm shrink-0">→</span>
                  <DatePicker
                    v-model="detailsDraft.endDate"
                    date-format="dd-mm-yy"
                    show-icon
                    icon-display="input"
                    class="flex-1"
                    placeholder="Einddatum"
                  />
                </div>
              </div>
              <div class="fr-row fr-row--top">
                <span class="fr-label">Omschrijving</span>
                <Textarea
                  v-model="detailsDraft.description"
                  class="w-full"
                  :rows="4"
                  placeholder="Optionele omschrijving"
                  auto-resize
                />
              </div>
            </div>
          </template>
        </EditableCard>
      </div>
    </div>

    <!-- ── Tab 2: Groepen ─────────────────────────────────────────── -->
    <div v-else-if="activeTab === 'groups'" class="oe-groepen-tab">
      <!-- Groups card -->
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

      <!-- Products card -->
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

<style scoped>
  /* ── Avatar color (layout handled by shared .edit-hdr-avatar) ────────── */
  :deep(.oe-avatar) {
    background: var(--p-primary-100);
    color: var(--p-primary-600);
  }

  /* ── Pills ───────────────────────────────────────────────────────────────── */
  /* (pill colors now use shared status-pill--* from cards.css) */

  /* ── Verlopen banner ─────────────────────────────────────────── */
  .verlopen-banner {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    padding: 0.75rem 1rem;
    margin: 0.875rem 1.25rem 0;
    background: var(--p-blue-50);
    border: 1px solid var(--p-blue-200);
    border-radius: 0.5rem;
    font-size: 0.875rem;
    color: var(--p-blue-700);
    flex-shrink: 0;
  }
  .verlopen-copy-btn {
    margin-left: auto;
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--p-blue-700);
    background: none;
    border: 1.5px solid var(--p-blue-300);
    border-radius: 0.375rem;
    padding: 0.25rem 0.75rem;
    cursor: pointer;
    transition: background 0.15s;
  }
  .verlopen-copy-btn:hover {
    background: var(--p-blue-100);
  }
  /* ── Tab 2: Groepen layout ───────────────────────────────────── */
  .oe-groepen-tab {
    display: flex;
    gap: 1.25rem;
    flex: 1;
    min-height: 0;
    padding: 1.5rem;
    background: var(--p-surface-50);
    overflow: clip;
  }
  .oe-groups-card {
    flex: 0 0 40%;
    display: flex;
    flex-direction: column;
    overflow: clip;
  }
  .oe-products-card {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    overflow: clip;
  }

  /* ── Pending sites (details edit mode) ───────────────────────── */
  .pending-sites {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  .pending-label {
    font-size: 0.75rem;
    color: var(--p-gray-400);
    white-space: nowrap;
    padding-top: 0.2rem;
  }
  .pending-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }
  .pending-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.175rem 0.5rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 500;
    border: 1px solid transparent;
  }
  .pending-chip--remove {
    background: var(--p-red-50);
    color: var(--p-red-600);
    border-color: var(--p-red-200);
  }
  .pending-chip--add {
    background: var(--p-green-50);
    color: var(--p-green-700);
    border-color: var(--p-green-200);
  }

  /* ── site-tag (view mode websites) ───────────────────────────── */
  .site-tag {
    display: inline-flex;
    align-items: center;
    padding: 0.125rem 0.5rem;
    border-radius: 0.375rem;
    font-size: 0.75rem;
    font-weight: 500;
    background: var(--p-gray-100);
    color: var(--p-gray-600);
    white-space: nowrap;
  }

  /* ── Context menu ────────────────────────────────────────────── */
  .ctx-menu {
    display: flex;
    flex-direction: column;
    min-width: 10rem;
  }
  .ctx-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    text-align: left;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    color: var(--p-gray-700);
    background: none;
    border: none;
    cursor: pointer;
    border-radius: 0.25rem;
    transition: background 0.1s;
  }
  .ctx-item:hover {
    background: var(--p-gray-50);
  }
  .ctx-item--danger {
    color: var(--p-red-600);
  }
  .ctx-item--danger:hover {
    background: var(--p-red-50);
  }
  .ctx-sep {
    height: 1px;
    background: var(--p-gray-100);
    margin: 0.25rem 0;
  }

  /* ── Transitions ─────────────────────────────────────────────── */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.15s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
