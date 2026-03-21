import { ref, computed } from 'vue';
import type { Ref } from 'vue';
import type { OfferGroup as Group } from '@/types/offer';

export function useOfferGroups(groups: Ref<Group[]>) {
  const selectedNodeId = ref<number>(3);

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

  // ── Computed ──────────────────────────────────────────────────────
  const selectedNode = computed(() => findGroup(selectedNodeId.value));
  const selectedPath = computed(() => findPath(selectedNodeId.value, groups.value) ?? []);
  const flatGroups = computed(() => flattenGroups(groups.value));
  const parentGroupOptions = computed(() => toTreeNodes(groups.value));
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

  return {
    selectedNodeId,
    selectedNode,
    selectedPath,
    flatGroups,
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
  };
}
