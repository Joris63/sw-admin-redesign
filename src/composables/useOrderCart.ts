import { ref, computed } from 'vue';

export interface CartItem {
  naam: string;
  productcode: string;
  levertijd: string;
  voorraad: number;
  aantal: number;
  prijs: number;
  imageUrl?: string;
  discountPercent: number;
  discountAmount: number;
  prijscorrectie: boolean;
}

export interface CartGroup {
  id: string;
  name: string;
  items: CartItem[];
}

// ── Singleton state (shared across all component instances) ───
const groups = ref<CartGroup[]>([
  {
    id: '0',
    name: 'Ongegroepeerd',
    items: [
      {
        naam: 'Saniclass klikwaste afvoerplug - 5/4" - chroom',
        productcode: 'SW1175 20',
        levertijd: '1 Dag',
        voorraad: 5,
        imageUrl: 'https://static.rorix.nl/image/product/overig/320x320/547889564e421.jpg',
        aantal: 1,
        prijs: 19.99,
        discountPercent: 0,
        discountAmount: 0,
        prijscorrectie: false,
      },
    ],
  },
  {
    id: '1',
    name: 'Bad',
    items: [],
  },
  {
    id: '2',
    name: 'Garantiepakketten (optioneel)',
    items: [
      {
        naam: 'Extra garantiepakket totaal (+3 jaar)',
        productcode: 'SW353906 20',
        levertijd: '1 Dag',
        imageUrl:
          'https://static.rorix.nl/image/product/overig/320x320/531e3526127d15e89326245ac1de3730.jpg',
        voorraad: 5,
        aantal: 1,
        prijs: 199.99,
        discountPercent: 0,
        discountAmount: 0,
        prijscorrectie: false,
      },
    ],
  },
  {
    id: '3',
    name: 'Accessoires',
    items: [
      {
        naam: 'Hansgrohe Flowstar huls voor hoekstopkraan chroom',
        productcode: '0606227 8',
        levertijd: '61 Dagen',
        imageUrl: 'https://static.rorix.nl/image/product/plieger/320x320/606227.jpg',
        voorraad: 0,
        aantal: 1,
        prijs: 37.99,
        discountPercent: 0,
        discountAmount: 0,
        prijscorrectie: false,
      },
      {
        naam: 'Laufen Toebehoren flexibele sifon kunststof',
        productcode: '0080673 8',
        levertijd: '38 Dagen',
        imageUrl: 'https://static.rorix.nl/image/product/overig/320x320/528b769c9afdb.jpg',
        voorraad: 0,
        aantal: 1,
        prijs: 42.99,
        discountPercent: 0,
        discountAmount: 0,
        prijscorrectie: false,
      },
    ],
  },
]);

// ── Order-level discount ──────────────────────────────────────
const orderDiscountExpanded = ref(false);
const orderDiscountPercent = ref(0);
const orderDiscountAmount = ref(0);
const orderPrijscorrectie = ref(false);
const verzendkostenValue = ref(0);

// ── Helper functions ──────────────────────────────────────────
function formatPrice(value: number) {
  return '€\u00a0' + value.toFixed(2).replace('.', ',');
}

function rowTotal(item: CartItem): number {
  const unitPrice = item.prijs * (1 - item.discountPercent / 100) - item.discountAmount;
  return Math.max(0, item.aantal * unitPrice);
}

function groupTotal(group: CartGroup): number {
  return group.items.reduce((sum, item) => sum + rowTotal(item), 0);
}

function groupItemCount(group: CartGroup): number {
  return group.items.reduce((sum, item) => sum + item.aantal, 0);
}

// ── Computed totals ───────────────────────────────────────────
const cartItemCount = computed(() =>
  groups.value.reduce((sum, g) => sum + g.items.reduce((s, i) => s + i.aantal, 0), 0)
);

const cartSubtotal = computed(() =>
  groups.value.reduce((sum, g) => sum + g.items.reduce((s, i) => s + i.prijs * i.aantal, 0), 0)
);

const cartTotal = computed(() =>
  groups.value.reduce((sum, g) => sum + g.items.reduce((s, i) => s + rowTotal(i), 0), 0)
);

const cartDiscount = computed(() => cartSubtotal.value - cartTotal.value);

const orderDiscountValue = computed(
  () =>
    Math.max(0, cartTotal.value * (orderDiscountPercent.value / 100)) + orderDiscountAmount.value
);

const orderTotal = computed(() =>
  Math.max(0, cartTotal.value - orderDiscountValue.value + verzendkostenValue.value)
);

// ── Finalize mode ─────────────────────────────────────────────
type FinalizeMode = 'offerte' | 'bestelling' | null;
const finalizeMode = ref<FinalizeMode>(null);

// ── Non-empty groups (for overview) ──────────────────────────
const nonEmptyGroups = computed(() => groups.value.filter((g) => g.items.length > 0));

const firstProductImage = computed(() => {
  for (const g of groups.value) {
    for (const item of g.items) {
      if (item.imageUrl) return item.imageUrl;
    }
  }
  return undefined;
});

export function useOrderCart() {
  return {
    groups,
    nonEmptyGroups,
    firstProductImage,
    orderDiscountExpanded,
    orderDiscountPercent,
    orderDiscountAmount,
    orderPrijscorrectie,
    verzendkostenValue,
    cartItemCount,
    cartSubtotal,
    cartTotal,
    cartDiscount,
    orderDiscountValue,
    orderTotal,
    formatPrice,
    rowTotal,
    groupTotal,
    groupItemCount,
    finalizeMode,
  };
}
