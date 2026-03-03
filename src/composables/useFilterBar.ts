import { ref, computed } from 'vue';
import type { FilterConfig } from '@/types/filters';

export function useFilterBar(allFilterDefs: FilterConfig[], defaultActiveKeys: string[]) {
  // Which filter keys are currently shown as chips (ordered)
  const activeFilterKeys = ref<string[]>([...defaultActiveKeys]);

  // Derived: only the configs for active keys, in order
  const filterConfigs = computed(() =>
    activeFilterKeys.value
      .map((k) => allFilterDefs.find((f) => f.key === k))
      .filter((f): f is FilterConfig => f !== undefined)
  );

  // One value slot per possible filter (never shrinks)
  const filterValues = ref<Record<string, string | boolean | null>>(
    Object.fromEntries(allFilterDefs.map((f) => [f.key, f.type === 'boolean' ? null : '']))
  );

  // ── Popover management ───────────────────────────────────────────
  const filterPopovers = ref(new Map<string, any>());

  function setFilterPopover(key: string, el: any) {
    if (el) filterPopovers.value.set(key, el);
    else filterPopovers.value.delete(key);
  }

  function toggleFilter(key: string, event: MouseEvent) {
    filterConfigs.value.forEach((f) => {
      if (f.key !== key) filterPopovers.value.get(f.key)?.hide();
    });
    filterPopovers.value.get(key)?.toggle(event);
  }

  // ── Filter chip helpers ──────────────────────────────────────────
  function getDisplayValue(key: string): string | null {
    const config = allFilterDefs.find((f) => f.key === key)!;
    const val = filterValues.value[key];
    if (val === '' || val === null || val === undefined) return null;
    if (config.type === 'boolean') return val ? 'Ja' : 'Nee';
    return String(val);
  }

  function clearFilter(key: string, event?: MouseEvent) {
    event?.stopPropagation();
    const config = allFilterDefs.find((f) => f.key === key);
    filterValues.value[key] = config?.type === 'boolean' ? null : '';
    filterPopovers.value.get(key)?.hide();
  }

  function clearAllFilters() {
    allFilterDefs.forEach((f) => {
      filterValues.value[f.key] = f.type === 'boolean' ? null : '';
    });
  }

  const hasActiveFilters = computed(() =>
    filterConfigs.value.some((f) => getDisplayValue(f.key) !== null)
  );

  // ── Filters beheren dialog ───────────────────────────────────────
  const dialogVisible = ref(false);
  const dialogActiveKeys = ref<string[]>([]);
  const dialogLeftSel = ref<string[]>([]);
  const dialogRightSel = ref<string[]>([]);
  const filterSearch = ref('');

  const dialogAvailable = computed(() => {
    const activeSet = new Set(dialogActiveKeys.value);
    return allFilterDefs.filter((f) => !activeSet.has(f.key));
  });

  const filteredAvailable = computed(() => {
    const q = filterSearch.value.trim().toLowerCase();
    return q
      ? dialogAvailable.value.filter((f) => f.label.toLowerCase().includes(q))
      : dialogAvailable.value;
  });

  const hiddenCount = computed(() => dialogAvailable.value.length - filteredAvailable.value.length);

  const canMoveUp = computed(
    () =>
      dialogLeftSel.value.length === 1 && dialogActiveKeys.value.indexOf(dialogLeftSel.value[0]) > 0
  );

  const canMoveDown = computed(
    () =>
      dialogLeftSel.value.length === 1 &&
      dialogActiveKeys.value.indexOf(dialogLeftSel.value[0]) < dialogActiveKeys.value.length - 1
  );

  function openDialog() {
    dialogActiveKeys.value = [...activeFilterKeys.value];
    dialogLeftSel.value = [];
    dialogRightSel.value = [];
    filterSearch.value = '';
    dialogVisible.value = true;
  }

  function saveDialog() {
    activeFilterKeys.value = [...dialogActiveKeys.value];
    allFilterDefs.forEach((f) => {
      if (!activeFilterKeys.value.includes(f.key)) {
        filterValues.value[f.key] = f.type === 'boolean' ? null : '';
      }
    });
    dialogVisible.value = false;
  }

  function toggleLeftSel(key: string) {
    dialogRightSel.value = [];
    const idx = dialogLeftSel.value.indexOf(key);
    if (idx >= 0) dialogLeftSel.value.splice(idx, 1);
    else dialogLeftSel.value.push(key);
  }

  function toggleRightSel(key: string) {
    dialogLeftSel.value = [];
    const idx = dialogRightSel.value.indexOf(key);
    if (idx >= 0) dialogRightSel.value.splice(idx, 1);
    else dialogRightSel.value.push(key);
  }

  function addFilters() {
    if (!dialogRightSel.value.length) return;
    dialogActiveKeys.value = [...dialogActiveKeys.value, ...dialogRightSel.value];
    dialogRightSel.value = [];
  }

  function addFilterDirectly(key: string) {
    dialogRightSel.value = [key];
    addFilters();
  }

  function removeFilters() {
    if (!dialogLeftSel.value.length) return;
    const removeSet = new Set(dialogLeftSel.value);
    dialogActiveKeys.value = dialogActiveKeys.value.filter((k) => !removeSet.has(k));
    dialogLeftSel.value = [];
  }

  function moveUp() {
    if (!canMoveUp.value) return;
    const key = dialogLeftSel.value[0];
    const idx = dialogActiveKeys.value.indexOf(key);
    const arr = [...dialogActiveKeys.value];
    [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
    dialogActiveKeys.value = arr;
  }

  function moveDown() {
    if (!canMoveDown.value) return;
    const key = dialogLeftSel.value[0];
    const idx = dialogActiveKeys.value.indexOf(key);
    const arr = [...dialogActiveKeys.value];
    [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
    dialogActiveKeys.value = arr;
  }

  function moveToTop() {
    if (dialogLeftSel.value.length !== 1) return;
    const key = dialogLeftSel.value[0];
    dialogActiveKeys.value = [key, ...dialogActiveKeys.value.filter((k) => k !== key)];
  }

  function moveToBottom() {
    if (dialogLeftSel.value.length !== 1) return;
    const key = dialogLeftSel.value[0];
    dialogActiveKeys.value = [...dialogActiveKeys.value.filter((k) => k !== key), key];
  }

  function getLabelForKey(key: string) {
    return allFilterDefs.find((f) => f.key === key)?.label ?? key;
  }

  return {
    filterConfigs,
    filterValues,
    hasActiveFilters,
    filterPopovers,
    setFilterPopover,
    toggleFilter,
    getDisplayValue,
    clearFilter,
    clearAllFilters,
    dialogVisible,
    dialogActiveKeys,
    dialogLeftSel,
    dialogRightSel,
    filterSearch,
    dialogAvailable,
    filteredAvailable,
    hiddenCount,
    canMoveUp,
    canMoveDown,
    openDialog,
    saveDialog,
    toggleLeftSel,
    toggleRightSel,
    addFilters,
    addFilterDirectly,
    removeFilters,
    moveUp,
    moveDown,
    moveToTop,
    moveToBottom,
    getLabelForKey,
  };
}
