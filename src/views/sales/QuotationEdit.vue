<script setup lang="ts">
  import { ref, computed, provide } from 'vue';
  import EditPageLayout from '@/components/layout/EditPageLayout.vue';
  import EditPageHeader from '@/components/layout/EditPageHeader.vue';
  import EditPageNav from '@/components/layout/EditPageNav.vue';
  import type { NavGroup } from '@/components/layout/EditPageNav.vue';
  import QuotationCustomerTab from './tabs/quotation/QuotationCustomerTab.vue';
  import QuotationOfferTab from './tabs/quotation/QuotationOfferTab.vue';
  import QuotationDetailsTab from './tabs/quotation/QuotationDetailsTab.vue';
  import QuotationCommunicationTab from './tabs/quotation/QuotationCommunicationTab.vue';
  import QuotationTasksTab from './tabs/quotation/QuotationTasksTab.vue';
  import QuotationLogTab from './tabs/quotation/QuotationLogTab.vue';
  import type { QuotationData } from '@/types/quotations';

  // ── Mock data ──────────────────────────────────────────────────────────────

  const quotation = ref<QuotationData>({
    quotationNumber: '3028059',
    status: 'Open',
    site: 'sanitairwinkel.nl',

    firstName: 'Mariëlle',
    lastName: 'Vos-Hartman',
    country: 'Nederland',
    street: 'Oude Kerkstraat',
    houseNumber: '38',
    addition: 'B',
    postalCode: '2514CR',
    city: 'Den Haag',
    phoneCountry: 'NL',
    phone: '0703456789',
    alternative: '0612345678',

    customerEmail: 'm.vos-hartman@example.nl',
    customerHasAccount: true,
    customerType: 'Particulier',

    orderDate: '14 februari 2026 11:03',
    assistedBy: 'Sophie Meijer',
    channel: 'Showroom',
    branch: 'Den Haag',
    renovationYear: '2026',
    renovationMonth: 'juni',
    reference: 'Verbouwing badkamer + toilet',

    recommended: {
      company: 'Klant Jan de Groot',
      city: 'Den Haag',
      companyType: 'Particulier',
    },
    contractor: {
      company: 'Installatiebedrijf Smit & Zonen',
      city: 'Rijswijk',
      companyType: 'Installateur',
    },

    groups: [
      {
        id: '0',
        name: 'Badkamer',
        lines: [
          {
            id: 1,
            productCode: 'SW721043 2',
            name: 'Wiesbaden inloopdouche 120x200cm - 8mm veiligheidsglas - chroom',
            deliveryTime: '2-4 werkdagen',
            stock: 'in-stock',
            quantity: 1,
            oldPrice: 1299.0,
            price: 1089.0,
          },
          {
            id: 2,
            productCode: 'SW514882 7',
            name: 'QeramiQ Ducks toiletpot rimless - diepspoel - glans wit',
            deliveryTime: '1-2 werkdagen',
            stock: 'in-stock',
            quantity: 1,
            price: 349.0,
          },
          {
            id: 3,
            productCode: 'SW309417 1',
            name: 'Hotbath Cobber thermostaatkraan - 2-weg - chroom',
            deliveryTime: '3-5 werkdagen',
            stock: 'limited',
            quantity: 1,
            oldPrice: 589.0,
            price: 499.0,
          },
          {
            id: 4,
            productCode: 'SW102931 8',
            name: 'Villeroy & Boch Subway 2.0 opzetwastafel 50cm - glans wit',
            deliveryTime: '1-2 werkdagen',
            stock: 'in-stock',
            quantity: 1,
            price: 219.0,
          },
        ],
      },
      {
        id: '1',
        name: 'Toilet',
        lines: [
          {
            id: 5,
            productCode: 'SW884102 5',
            name: 'Geberit UP320 inbouwreservoir - 12cm - wit',
            deliveryTime: '2-3 werkdagen',
            stock: 'in-stock',
            quantity: 1,
            price: 189.0,
          },
          {
            id: 6,
            productCode: 'SW774231 9',
            name: 'Geberit Sigma20 bedieningsplaat - glans chroom / mat chroom',
            deliveryTime: '1-2 werkdagen',
            stock: 'in-stock',
            quantity: 1,
            price: 129.0,
          },
        ],
      },
      {
        id: '2',
        name: 'Tegels & Afwerking',
        lines: [
          {
            id: 7,
            productCode: 'SW302100 4',
            name: 'De Beer Isolatiemat EPS 100 - 10m² - R=2.0',
            deliveryTime: '2-4 werkdagen',
            stock: 'in-stock',
            quantity: 3,
            price: 119.0,
          },
          {
            id: 8,
            productCode: 'SW189021 3',
            name: 'Sanicare HVS radiator 60x120cm - 690W - mat zwart',
            deliveryTime: '4-6 werkdagen',
            stock: 'out-of-stock',
            quantity: 1,
            oldPrice: 499.0,
            price: 429.0,
          },
        ],
      },
    ],

    emails: [
      {
        id: 1,
        date: '14 feb 2026 11:18',
        subject: 'Uw offerte 3028059',
        to: 'm.vos-hartman@example.nl',
        type: 'Offerte',
      },
      {
        id: 2,
        date: '21 feb 2026 14:32',
        subject: 'Herinnering offerte 3028059',
        to: 'm.vos-hartman@example.nl',
        type: 'Herinnering',
      },
      {
        id: 3,
        date: '27 feb 2026 09:05',
        subject: 'Aanpassing offerte 3028059',
        to: 'm.vos-hartman@example.nl',
        type: 'Offerte',
      },
    ],

    notes: [
      {
        id: 1,
        date: '14 feb 2026 11:45',
        text: 'Klant wil graag dezelfde leverancier als vorige badkamer.',
        for: 'Inkoop',
        user: 'Sophie Meijer',
      },
      {
        id: 2,
        date: '21 feb 2026 10:12',
        text: 'Levering graag na 1 april i.v.m. aannemer planning.',
        for: 'Logistiek',
        user: 'Sophie Meijer',
      },
      {
        id: 3,
        date: '27 feb 2026 09:30',
        text: 'Prijs inloopdouche aangepast na overleg met klant.',
        for: 'Verkoop',
        user: 'Sophie Meijer',
      },
    ],

    documents: [
      {
        id: 1,
        name: 'Offerte_3028059_v1.pdf',
        date: '14 feb 2026',
        type: 'Offerte',
      },
      {
        id: 2,
        name: 'Offerte_3028059_v2.pdf',
        date: '27 feb 2026',
        type: 'Offerte',
      },
      {
        id: 3,
        name: 'Tekening_badkamer.pdf',
        date: '10 feb 2026',
        type: 'Bijlage',
      },
    ],

    tasks: [
      {
        id: 2816302,
        description: 'Offerte opvolgen na herinnering',
        deadline: '7 mrt 2026',
        status: 'Not started',
        department: 'Verkoop',
        user: 'Sophie Meijer',
        owner: 'Sophie Meijer',
      },
      {
        id: 2816415,
        description: 'Leveringstijd inloopdouche bevestigen bij leverancier',
        deadline: '5 mrt 2026',
        status: 'In progress',
        department: 'Inkoop',
        user: 'Bas Kuijpers',
        owner: 'Sophie Meijer',
      },
      {
        id: 2816891,
        description: 'Prijsaanpassing verwerken in offerte',
        deadline: '28 feb 2026',
        status: 'Completed',
        department: 'Verkoop',
        user: 'Sophie Meijer',
        owner: 'Sophie Meijer',
      },
    ],

    productLog: [
      {
        id: 1,
        date: '14 feb 2026 11:03',
        productId: '721043',
        productCode: 'SW721043 2',
        description: 'Wiesbaden inloopdouche 120x200cm',
        quantity: 1,
        price: 1299.0,
        action: 'Toegevoegd',
        user: 'Sophie Meijer',
      },
      {
        id: 2,
        date: '14 feb 2026 11:05',
        productId: '514882',
        productCode: 'SW514882 7',
        description: 'QeramiQ Ducks toiletpot rimless',
        quantity: 1,
        price: 349.0,
        action: 'Toegevoegd',
        user: 'Sophie Meijer',
      },
      {
        id: 3,
        date: '14 feb 2026 11:07',
        productId: '309417',
        productCode: 'SW309417 1',
        description: 'Hotbath Cobber thermostaatkraan',
        quantity: 1,
        price: 589.0,
        action: 'Toegevoegd',
        user: 'Sophie Meijer',
      },
      {
        id: 4,
        date: '27 feb 2026 09:02',
        productId: '721043',
        productCode: 'SW721043 2',
        description: 'Wiesbaden inloopdouche 120x200cm',
        quantity: 1,
        price: 1089.0,
        action: 'Gewijzigd',
        user: 'Sophie Meijer',
      },
      {
        id: 5,
        date: '27 feb 2026 09:04',
        productId: '309417',
        productCode: 'SW309417 1',
        description: 'Hotbath Cobber thermostaatkraan',
        quantity: 1,
        price: 499.0,
        action: 'Gewijzigd',
        user: 'Sophie Meijer',
      },
    ],

    generalLog: [
      {
        id: 1,
        date: '14 feb 2026 11:03',
        description: 'Offerte aangemaakt',
        action: 'Aangemaakt',
        user: 'Sophie Meijer',
      },
      {
        id: 2,
        date: '14 feb 2026 11:18',
        description: 'Offerte e-mail verstuurd naar klant',
        action: 'E-mail verstuurd',
        user: 'Systeem',
      },
      {
        id: 3,
        date: '21 feb 2026 14:32',
        description: 'Herinnering e-mail verstuurd',
        action: 'E-mail verstuurd',
        user: 'Systeem',
      },
      {
        id: 4,
        date: '27 feb 2026 09:05',
        description: 'Offerte bijgewerkt na klantoverleg',
        action: 'Gewijzigd',
        user: 'Sophie Meijer',
      },
      {
        id: 5,
        date: '27 feb 2026 09:05',
        description: 'Aangepaste offerte e-mail verstuurd',
        action: 'E-mail verstuurd',
        user: 'Systeem',
      },
    ],
  });

  provide('quotation', quotation);

  // ── Header computed ─────────────────────────────────────────────────────────

  const fullName = computed(() =>
    [quotation.value.firstName, quotation.value.lastName].filter(Boolean).join(' ')
  );

  const initials = computed(() =>
    [quotation.value.firstName, quotation.value.lastName]
      .filter(Boolean)
      .map((s) => s[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  );

  const productCount = computed(() =>
    quotation.value.groups.reduce((sum, g) => sum + g.lines.reduce((s, l) => s + l.quantity, 0), 0)
  );

  const totalPrice = computed(() =>
    quotation.value.groups.reduce(
      (sum, g) => sum + g.lines.reduce((s, l) => s + l.price * l.quantity, 0),
      0
    )
  );

  function formatTotal(n: number) {
    return (
      '€ ' +
      n
        .toFixed(2)
        .replace('.', ',')
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    );
  }

  // ── Navigation ─────────────────────────────────────────────────────────────

  const activeSection = ref('offer');

  const navGroups = computed<NavGroup[]>(() => [
    {
      label: 'Offerte',
      items: [
        { id: 'customer', label: 'Klant',   icon: 'pi-user'          },
        { id: 'offer',    label: 'Aanbod',  icon: 'pi-shopping-cart' },
        { id: 'details',  label: 'Details', icon: 'pi-cog'           },
      ],
    },
    {
      label: 'Beheer',
      items: [
        { id: 'communications', label: 'Communicatie', icon: 'pi-comment'    },
        { id: 'tasks',          label: 'Taken',        icon: 'pi-list-check', badge: quotation.value.tasks.length || undefined },
        { id: 'logs',           label: 'Log',          icon: 'pi-history'   },
      ],
    },
  ]);

  const statusStyle = computed(() => {
    const s = quotation.value.status;
    if (s === 'Converted') return 'status-pill--accepted';
    if (s === 'Expired') return 'status-pill--expired';
    if (s === 'Cancelled') return 'status-pill--cancelled';
    return 'status-pill--open';
  });
</script>

<template>
  <EditPageLayout>
    <!-- ── Page header ─────────────────────────────────────────────────────── -->
    <EditPageHeader
      :title="`Offerte ${quotation.quotationNumber}`"
      :subtitle="fullName"
      :back="{ name: 'QuotationsOverview' }"
      avatar-class="qe-avatar"
    >
      <template #avatar>{{ initials }}</template>
      <template #pills>
        <span class="status-pill" :class="statusStyle">{{ quotation.status }}</span>
        <span class="status-pill status-pill--site">{{ quotation.site }}</span>
      </template>
      <template #stats>
        <div class="edit-hdr-stats">
          <div class="edit-hdr-stat">
            <span class="edit-hdr-stat-val">{{ formatTotal(totalPrice) }}</span>
            <span class="edit-hdr-stat-lbl">Totaal</span>
          </div>
          <div class="edit-hdr-stat-sep" />
          <div class="edit-hdr-stat">
            <span class="edit-hdr-stat-val">{{ productCount }}</span>
            <span class="edit-hdr-stat-lbl">Producten</span>
          </div>
          <div class="edit-hdr-stat-sep" />
          <div class="edit-hdr-stat">
            <span class="edit-hdr-stat-val">{{ quotation.orderDate.split(' ').slice(0, 3).join(' ') }}</span>
            <span class="edit-hdr-stat-lbl">Datum</span>
          </div>
        </div>
      </template>
      <template #actions>
        <Button label="Omzetten" icon="pi pi-arrow-right-arrow-left" severity="secondary" text />
        <Button icon="pi pi-ellipsis-v" severity="secondary" text rounded />
      </template>
    </EditPageHeader>

    <!-- ── Body ─────────────────────────────────────────────────────────────── -->
    <div class="edit-body">
      <EditPageNav v-model="activeSection" :groups="navGroups" />

      <div class="edit-content">
        <QuotationCustomerTab v-if="activeSection === 'customer'" />
        <QuotationOfferTab v-else-if="activeSection === 'offer'" />
        <QuotationDetailsTab v-else-if="activeSection === 'details'" />
        <QuotationCommunicationTab v-else-if="activeSection === 'communications'" />
        <QuotationTasksTab v-else-if="activeSection === 'tasks'" />
        <QuotationLogTab v-else-if="activeSection === 'logs'" />
      </div>
    </div>
  </EditPageLayout>
</template>

<style scoped>
  /* ── Avatar color (layout handled by shared .edit-hdr-avatar) ────────── */
  :deep(.qe-avatar) {
    background: linear-gradient(135deg, var(--p-primary-400) 0%, var(--p-primary-600) 100%);
    color: white;
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.03em;
  }
</style>
