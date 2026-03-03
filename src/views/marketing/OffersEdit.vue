<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import GroupDrawer from './components/GroupDrawer.vue';
  import DetailsDrawer from './components/DetailsDrawer.vue';
  import AddProductsDialog from './components/AddProductsDialog.vue';
  import DuplicateDialog from './components/DuplicateDialog.vue';
  import OfferGroupTree from './components/OfferGroupTree.vue';
  import OfferProductPanel from './components/OfferProductPanel.vue';

  import type {
    OfferStatus,
    OfferGroup as Group,
  } from '@/types/offer';
  import { parseDMY } from '@/utils/format';
  import {
    MOCK_GROUPS,
    PENDING_CHANGES,
    PENDING_SITE_CHANGES,
  } from '@/mocks/offers';

  const route = useRoute();
  const router = useRouter();

  // ── Actie ─────────────────────────────────────────────────────────
  const actie = ref({
    id: Number(route.params.id),
    naam: '2026 Q1: GROHE COLORS BE',
    omschrijving: '',
    websites: ['sawiday_be'],
    startdatum: parseDMY('11-02-2026') as Date | null,
    einddatum: parseDMY('31-03-2026') as Date | null,
    status: 'Actief' as OfferStatus,
  });

  const websiteOptions = [
    { label: 'sawiday_be', value: 'sawiday_be' },
    { label: 'sawiday_nl', value: 'sawiday_nl' },
    { label: 'sawiday_fr', value: 'sawiday_fr' },
    { label: 'sawiday_de', value: 'sawiday_de' },
  ];

  const siteMap: Record<string, { code: string; langs: string[] }> = {
    sawiday_be: { code: 'SWBE', langs: ['nl-BE', 'fr-BE'] },
    sawiday_nl: { code: 'SWNL', langs: ['nl-NL'] },
    sawiday_fr: { code: 'SWFR', langs: ['fr-FR'] },
    sawiday_de: { code: 'SWDE', langs: ['de-DE'] },
  };

  const siteLabels = computed(() =>
    actie.value.websites.flatMap((w) => {
      const s = siteMap[w];
      return s ? s.langs.map((lang) => `${s.code} (${lang})`) : [];
    })
  );

  // ── Groups state ──────────────────────────────────────────────────
  const groups = ref<Group[]>(MOCK_GROUPS);
  const selectedNodeId = ref<number>(3);

  // ── Dialog / drawer visibility ────────────────────────────────────
  const showAddProducts = ref(false);
  const showDetailsDrawer = ref(false);
  const showDuplicateDialog = ref(false);
  const moreMenuRef = ref<any>(null);

  // ── Group drawer state ────────────────────────────────────────────
  const gdVisible = ref(false);
  const gdIsEdit = ref(false);
  const gdEditGroupId = ref<number | null>(null);
  const gdParentGroupId = ref<number | null>(null);
  const gdInitialNaam = ref('');

  // ── Computed ──────────────────────────────────────────────────────
  const isVerlopen = computed(() => actie.value.status === 'Verlopen');

  const statusConfig: Record<OfferStatus, { classes: string }> = {
    Actief: { classes: 'status--actief' },
    Verlopen: { classes: 'status--verlopen' },
    'Binnenkort gepland': { classes: 'status--gepland' },
  };

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
      label: g.naam,
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
  const activeNodeNaam = computed(() => selectedNode.value?.naam ?? '');
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
    gdInitialNaam.value = '';
  }

  function openEditGroup(nodeId: number) {
    const node = findGroup(nodeId);
    if (!node) return;
    gdVisible.value = true;
    gdIsEdit.value = true;
    gdEditGroupId.value = nodeId;
    gdParentGroupId.value = null;
    gdInitialNaam.value = node.naam;
  }

  function handleGroupSave(data: {
    isEdit: boolean;
    editGroupId: number | null;
    parentGroupId: number | null;
    naam: string;
  }) {
    if (data.isEdit) {
      const node = findGroup(data.editGroupId!);
      if (node) node.naam = data.naam;
    } else if (data.parentGroupId !== null) {
      const parent = findGroup(data.parentGroupId);
      if (!parent) return;
      const newId = nextId();
      parent.children.push({
        id: newId,
        naam: data.naam,
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
        naam: data.naam,
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

  function goBack() {
    router.push({ name: 'OffersOverview' });
  }
</script>

<template>
  <div class="page">
    <!-- ── Header ────────────────────────────────────────────────── -->
    <div class="page-header">
      <div class="flex items-center gap-3 min-w-0">
        <button class="back-btn" @click="goBack"><i class="pi pi-arrow-left" /></button>
        <h1 class="page-title">{{ actie.naam }}</h1>
        <span class="status-badge" :class="statusConfig[actie.status].classes">{{
          actie.status
        }}</span>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <Button
          label="Details"
          icon="pi pi-pencil"
          severity="secondary"
          outlined
          size="small"
          @click="showDetailsDrawer = true"
        />
        <Button
          icon="pi pi-ellipsis-v"
          severity="secondary"
          variant="text"
          size="small"
          rounded
          @click="(moreMenuRef as any)?.toggle($event)"
        />
        <Popover ref="moreMenuRef">
          <div class="ctx-menu">
            <button
              class="ctx-item"
              @click="
                showDuplicateDialog = true;
                moreMenuRef?.hide();
              "
            >
              <i class="pi pi-copy" />Kopieer actie
            </button>
            <div class="ctx-sep" />
            <button class="ctx-item ctx-item--danger">
              <i class="pi pi-trash" />Verwijder actie
            </button>
          </div>
        </Popover>
      </div>
    </div>

    <!-- ── Verlopen banner ────────────────────────────────────────── -->
    <Transition name="fade">
      <div v-if="isVerlopen" class="verlopen-banner">
        <i class="pi pi-info-circle shrink-0" />
        <span>Deze actie is verlopen en kan niet meer bewerkt worden.</span>
        <button class="verlopen-copy-btn" @click="showDuplicateDialog = true">
          Maak een kopie
        </button>
      </div>
    </Transition>

    <!-- ── Main body ─────────────────────────────────────────────── -->
    <div class="groepen-body">
      <OfferGroupTree
        :groups="groups"
        :selected-group-id="selectedNodeId"
        :pending-changes="PENDING_CHANGES"
        :is-verlopen="isVerlopen"
        @select-group="selectNode"
        @toggle-group="toggleGroup"
        @add-group="openCreateGroup"
        @edit-group="openEditGroup"
        @delete-group="deleteGroup"
      />

      <OfferProductPanel
        :products="activeProducts"
        :selected-group-id="selectedNodeId"
        :selected-path="selectedPath"
        :pending-changes="PENDING_CHANGES"
        :pending-site-changes="PENDING_SITE_CHANGES"
        :is-verlopen="isVerlopen"
        :group-naam="activeNodeNaam"
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

    <!-- ── Dialogs & Drawers ──────────────────────────────────────── -->
    <AddProductsDialog v-model:visible="showAddProducts" :group-naam="activeNodeNaam" />

    <DuplicateDialog
      v-model:visible="showDuplicateDialog"
      :actie-naam="actie.naam"
      :actie-websites="actie.websites"
      :actie-startdatum="actie.startdatum"
      :actie-einddatum="actie.einddatum"
    />

    <GroupDrawer
      v-model:visible="gdVisible"
      :is-edit="gdIsEdit"
      :edit-group-id="gdEditGroupId"
      :parent-group-id="gdParentGroupId"
      :initial-naam="gdInitialNaam"
      :site-labels="siteLabels"
      :parent-group-options="parentGroupOptions"
      :editing-root-group="gdEditingRootGroup"
      @save="handleGroupSave"
    />

    <DetailsDrawer
      v-model:visible="showDetailsDrawer"
      :naam="actie.naam"
      :websites="actie.websites"
      :startdatum="actie.startdatum"
      :einddatum="actie.einddatum"
      :omschrijving="actie.omschrijving"
      :website-options="websiteOptions"
      :is-verlopen="isVerlopen"
      :pending-sites="PENDING_SITE_CHANGES"
      @save="(d) => Object.assign(actie, d)"
    />
  </div>
</template>

<style scoped>
  /* ── Page ────────────────────────────────────────────────────── */
  .page {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
  }

  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--p-gray-100);
    gap: 1rem;
    flex-shrink: 0;
  }
  .page-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--p-surface-800);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .back-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 0.375rem;
    flex-shrink: 0;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--p-gray-400);
    transition:
      background 0.1s,
      color 0.1s;
  }
  .back-btn:hover {
    background: var(--p-gray-100);
    color: var(--p-gray-700);
  }

  /* ── Status badges ───────────────────────────────────────────── */
  .status-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.2rem 0.75rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
    white-space: nowrap;
  }
  .status--actief {
    background: var(--p-green-100);
    color: var(--p-green-700);
  }
  .status--verlopen {
    background: var(--p-gray-100);
    color: var(--p-gray-500);
  }
  .status--gepland {
    background: var(--p-blue-100);
    color: var(--p-blue-700);
  }

  /* ── Verlopen banner ─────────────────────────────────────────── */
  .verlopen-banner {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    padding: 0.75rem 1rem;
    margin-top: 0.875rem;
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

  /* ── Groepen body ────────────────────────────────────────────── */
  .groepen-body {
    display: flex;
    gap: 0;
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }

  /* ── Context menus (header popover) ─────────────────────────── */
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
