<script setup lang="ts">
  import { ref, computed, provide } from 'vue';
  import EditPageLayout from '@/components/layout/EditPageLayout.vue';
  import EditPageHeader from '@/components/layout/EditPageHeader.vue';
  import EditPageNav from '@/components/layout/EditPageNav.vue';
  import type { NavGroup } from '@/components/layout/EditPageNav.vue';
  import type { CustomerData, RevenuePerYear, CustomerQuotation } from '@/types/customer';

  import CustomerPersonalTab from './tabs/customer/CustomerPersonalTab.vue';
  import CustomerAddressesTab from './tabs/customer/CustomerAddressesTab.vue';
  import CustomerSettingsTab from './tabs/customer/CustomerSettingsTab.vue';
  import CustomerAccountTab from './tabs/customer/CustomerAccountTab.vue';
  import CustomerActivityLogTab from './tabs/customer/CustomerActivityLogTab.vue';
  import CustomerQuotationsTab from './tabs/customer/CustomerQuotationsTab.vue';
  import CustomerRevenueTab from './tabs/customer/CustomerRevenueTab.vue';
  import CustomerCartTab from './tabs/customer/CustomerCartTab.vue';
  import CustomerWishlistTab from './tabs/customer/CustomerWishlistTab.vue';
  import CustomerDiscountsTab from './tabs/customer/CustomerDiscountsTab.vue';
  import CustomerCreditTab from './tabs/customer/CustomerCreditTab.vue';

  // ── Mock data ──────────────────────────────────────────────────────────────

  const customer = ref<CustomerData>({
    id: 3,
    companyName: 'Kamminga Installatietechniek B.V.',
    vatCountry: 'NL',
    vatNumber: '851234567B01',
    chamberOfCommerceNumber: '68123456',
    companyType: 'MKB',
    salutation: 'Dhr.',
    siteview: 'swnl-nl',
    firstName: 'Joris',
    lastName: 'Kamminga',
    email: 'joris.kamminga@sawiday.com',
    phoneCountry: 'BE',
    phone: '32318950',
    birthDate: new Date(1989, 2, 15),
    paymentMethod: 'Bankoverschrijving',
    preferredShowroom: 'Utrecht',
    showPrices: 'Excl. BTW',
    newsletter: true,
    appointmentUrlsActive: true,
    appointmentUrls: {
      swnl: 'https://www.sanitairwinkel.nl/showroom-consult/b2b/MTIxNQ==/',
      swbeNl: 'https://www.sawiday.be/nl-be/showroom-consult/b2b/MTIxNQ==/',
      swbeFr: 'https://www.sawiday.be/fr-be/showroom-consult/b2b/MTIxNQ==/',
    },
    financialEmail: 'administratie@kamminga-install.nl',
    reviewsActive: true,
    reviewInactiveReason: null,
    canPayOnAccount: true,
    debtorNumber: 'DEB-00234',
    creditLimit: 15000,
    invoiceDueDays: 30,
    allowTemporaryCredit: true,
    temporaryCreditLimit: 2500,
    temporaryCreditExpiryDate: new Date(2026, 2, 31),
    notes:
      'Vaste klant sinds 2019. Heeft voorkeur voor telefonisch contact. Let op: altijd factuur per post sturen naast de digitale verzending.',
    baseDiscount: 2.5,
    brandDiscounts: [
      { id: 1, brand: 'Grohe', discount: 12, defaultDiscount: 8 },
      { id: 2, brand: 'Villeroy & Boch', discount: 10, defaultDiscount: 7 },
      { id: 3, brand: 'Geberit', discount: 8, defaultDiscount: 5 },
      { id: 4, brand: 'Hansgrohe', discount: 15, defaultDiscount: 10 },
    ],
    productDiscounts: [
      {
        id: 1,
        productCode: 'SW1175 20',
        product: 'Saniclass klikwaste afvoerplug - 5/4" - chroom',
        price: 25.99,
        discountPrice: 22.09,
      },
      {
        id: 2,
        productCode: 'SW285741 3',
        product: 'Plieger Nexus rechthoekige spiegel met LED verlichting 60x80cm',
        price: 189.0,
        discountPrice: 160.65,
      },
      {
        id: 3,
        productCode: 'SW103948 22',
        product: 'Grohe Eurosmart wastafelkraan - opbouw - uitloop 12.5cm - chroom',
        price: 124.5,
        discountPrice: 105.83,
      },
    ],
    accountStatus: 'Actief',
    accountLastLogin: '22 februari 2026 18:10',
    addresses: [
      {
        id: 1,
        name: 'Dhr. Joris Kamminga',
        street: 'Verdiplein',
        houseNumber: '80',
        postalCode: '5049NP',
        city: 'Tilburg',
        country: 'Nederland',
        phone: '0683626242',
        isDefaultDelivery: true,
        isDefaultInvoice: true,
      },
      {
        id: 2,
        name: 'Fam. Joris Kamminga',
        street: 'Generaal Smutslaan',
        houseNumber: '544',
        postalCode: '5025AJ',
        city: 'Tilburg',
        country: 'Nederland',
        phone: '+31683626242',
        isDefaultDelivery: false,
        isDefaultInvoice: false,
      },
    ],
    cart: [
      {
        id: 1,
        name: 'Saniclass klikwaste afvoerplug - 5/4" - chroom',
        productCode: 'SW1175 20',
        quantity: 1,
        price: 25.99,
      },
    ],
    wishlists: [
      {
        id: 1,
        name: 'Mijn verlanglijst',
        items: [
          {
            id: 1,
            name: 'Baldocer Ceramica Arkety vloertegel - 60x60cm - 10mm - Vierkant - gerectificeerd - Betonlook - bit bone mat',
            productCode: 'SW359616 14',
            quantity: 1,
            price: 57.19,
          },
          {
            id: 2,
            name: 'Villeroy & Boch Pro architectura 3.0 vloertegel 5x5cm - 6mm mat R9 lagoon blue',
            productCode: 'SW494512 17',
            quantity: 1,
            price: 89.1,
          },
          {
            id: 3,
            name: 'The Mosaic Factory Barcelona mozaïektegel - 28.2x32.1cm - wandtegel - Zeshoek/Hexagon - Porselein - Bronze Metallic (brons) - per stuk',
            productCode: 'SW397934 11',
            quantity: 1,
            price: 29.95,
          },
          {
            id: 4,
            name: 'Fortifura Galeria Douchedeur - 80x200cm - scharnieren - deurgreep - vlak - helder veiligheidsglas - Geborsteld RVS',
            productCode: 'SW1122594 19',
            quantity: 1,
            price: 354.99,
          },
          {
            id: 5,
            name: 'Fortifura Galeria Douchecabine - 90x120x200cm - scharnieren - deurgreep - vlak - gesatineerd veiligheidsglas - Geborsteld RVS PVD (Rvs)',
            productCode: 'SW1222270 19',
            quantity: 1,
            price: 761.99,
          },
          {
            id: 6,
            name: 'Wiesbaden Caral inbouw doucheset rond met 20cm hoofddouche wandarm staafhanddouche mat zwart',
            productCode: 'SW242774 9',
            quantity: 1,
            price: 692.99,
          },
          {
            id: 7,
            name: 'Fortifura Galeria Douchecabine - 100x90x200cm - scharnieren - deurgreep - vlak - rookglas - Geborsteld RVS PVD (Rvs)',
            productCode: 'SW1222126 19',
            quantity: 1,
            price: 741.99,
          },
        ],
      },
      {
        id: 2,
        name: 'Badkamer verbouwing',
        items: [
          {
            id: 8,
            name: 'Plieger Nexus rechthoekige spiegel met indirecte LED verlichting 60x80cm',
            productCode: 'SW285741 3',
            quantity: 1,
            price: 189.0,
          },
          {
            id: 9,
            name: 'Wiesbaden Vigo vrijstaand bad 170x75cm acryl glanzend wit',
            productCode: 'SW641820 5',
            quantity: 1,
            price: 649.0,
          },
          {
            id: 10,
            name: 'Grohe Eurosmart wastafelkraan - opbouw - uitloop 12.5cm - chroom',
            productCode: 'SW103948 22',
            quantity: 2,
            price: 124.5,
          },
          {
            id: 11,
            name: 'Duravit D-Neo inbouwwastafel 60x40cm - 1 kraangat - wit',
            productCode: 'SW882310 8',
            quantity: 1,
            price: 312.0,
          },
          {
            id: 12,
            name: 'Geberit UP320 inbouwreservoir - diepspoel - voor wand-wc - inclusief bedieningsplaat',
            productCode: 'SW114406 14',
            quantity: 1,
            price: 278.95,
          },
        ],
      },
    ],
    deliveredUnpaid: [
      {
        id: 1,
        delivery: 'LVR-2024-8821',
        invoiceNumber: 'INV-20241105',
        invoiceDate: '5 nov 2024',
        dueDate: '19 nov 2024',
        value: 1842.3,
        isOverdue: true,
      },
      {
        id: 2,
        delivery: 'LVR-2025-1034',
        invoiceNumber: 'INV-20250318',
        invoiceDate: '18 mrt 2025',
        dueDate: '1 apr 2025',
        value: 14.95,
        isOverdue: true,
      },
      {
        id: 3,
        delivery: 'LVR-2026-0218',
        invoiceNumber: 'INV-20260218',
        invoiceDate: '18 feb 2026',
        dueDate: '19 mrt 2026',
        value: 654.8,
        isOverdue: false,
      },
    ],
    reservedCreditItems: [
      {
        id: 1,
        delivery: 'LVR-2026-0309',
        status: 'Bevestigd',
        dropshipping: false,
        scheduledDate: '15 mrt 2026',
        value: 3210.55,
      },
      {
        id: 2,
        delivery: 'LVR-2026-0312',
        status: 'In behandeling',
        dropshipping: true,
        scheduledDate: '20 mrt 2026',
        value: 892.0,
      },
    ],
    creditScheduled: [
      {
        id: 1,
        delivery: 'LVR-2026-0288',
        status: 'Voltooid',
        completed: true,
        scheduledDate: '5 mrt 2026',
        value: 380.2,
      },
      {
        id: 2,
        delivery: 'LVR-2026-0301',
        status: 'Ingepland',
        completed: false,
        scheduledDate: '12 mrt 2026',
        value: 1540.0,
      },
    ],
    creditIncoming: [
      { id: 1, delivery: 'LVR-2026-0315', scheduledDate: '18 mrt 2026', value: 2100.0 },
      { id: 2, delivery: 'LVR-2026-0318', scheduledDate: '22 mrt 2026', value: 750.5 },
    ],
  });

  provide('customer', customer);

  // ── Header computed ─────────────────────────────────────────────────────────

  const fullName = computed(() =>
    [customer.value.salutation, customer.value.firstName, customer.value.lastName]
      .filter(Boolean)
      .join(' ')
  );

  const initials = computed(() =>
    [customer.value.firstName, customer.value.lastName]
      .filter(Boolean)
      .map((s) => s[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  );

  // ── Header stats data (local copies for header display) ────────────────────

  const revenuePerYear: RevenuePerYear[] = [
    { year: 2025, revenue: 14.95 },
    { year: 2024, revenue: 1842.3 },
    { year: 2023, revenue: 3210.55 },
  ];

  const quotations: CustomerQuotation[] = [
    {
      id: 1,
      quotationNumber: '1761598',
      date: '19 mei 2022 14:53',
      by: 'Job Vermue',
      price: 3666.83,
      status: 'Geaccepteerd',
      notes: 0,
    },
    {
      id: 2,
      quotationNumber: '1895180',
      date: '20 oktober 2022 15:07',
      by: 'Bart Onstenk',
      price: 1595.1,
      status: 'Geaccepteerd',
      notes: 0,
    },
    {
      id: 3,
      quotationNumber: '1917050',
      date: '11 november 2022 12:22',
      by: 'Bart Onstenk',
      price: 2405.34,
      status: 'Geaccepteerd',
      notes: 0,
    },
    {
      id: 4,
      quotationNumber: '2005823',
      date: '03 februari 2023 16:01',
      by: 'Mark Roeters',
      price: 10380.6,
      status: 'Geaccepteerd',
      notes: 0,
    },
    {
      id: 5,
      quotationNumber: '2697404',
      date: '18 maart 2025 10:42',
      by: 'Luke Derkzen',
      price: 14.95,
      status: 'Niet geaccepteerd',
      notes: 0,
    },
  ];

  // ── Navigation ─────────────────────────────────────────────────────────────

  const activeSection = ref('details');

  const navGroups = computed<NavGroup[]>(() => [
    {
      label: 'Klantgegevens',
      items: [
        { id: 'details',      label: 'Persoonlijke gegevens', icon: 'pi-user'       },
        { id: 'addresses',    label: 'Adressen',              icon: 'pi-map-marker', badge: customer.value.addresses.length },
        { id: 'settings',     label: 'Instellingen',          icon: 'pi-cog'        },
        { id: 'account',      label: 'Account',               icon: 'pi-shield'     },
        { id: 'log',          label: 'Logboek',               icon: 'pi-history'    },
      ],
    },
    {
      label: 'Verkoop',
      items: [
        { id: 'quotations', label: 'Offertes', icon: 'pi-file'        },
        { id: 'revenue',    label: 'Omzet',    icon: 'pi-chart-bar'   },
        { id: 'credit',     label: 'Krediet',  icon: 'pi-credit-card' },
      ],
    },
    {
      label: 'Winkel',
      items: [
        { id: 'cart',      label: 'Winkelwagen',    icon: 'pi-shopping-cart', badge: customer.value.cart.length || undefined        },
        { id: 'wishlists', label: 'Verlanglijsten', icon: 'pi-heart',         badge: customer.value.wishlists.length || undefined   },
        { id: 'discounts', label: 'Kortingen',      icon: 'pi-tag'                                                                  },
      ],
    },
  ]);
</script>

<template>
  <EditPageLayout>
    <!-- ── Page header ─────────────────────────────────────────────────────── -->
    <EditPageHeader
      :title="fullName"
      :subtitle="customer.email"
      :back="{ name: 'CustomersOverview' }"
      avatar-class="ce-avatar"
    >
      <template #avatar>{{ initials }}</template>
      <template #pills>
        <span class="status-pill status-pill--open">B2B</span>
        <span class="status-pill status-pill--active">Account {{ customer.accountStatus.toLowerCase() }}</span>
      </template>
      <template #stats>
        <div class="edit-hdr-stats">
          <div class="edit-hdr-stat">
            <span class="edit-hdr-stat-val">€ {{ revenuePerYear.reduce((s, o) => s + o.revenue, 0).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.') }}</span>
            <span class="edit-hdr-stat-lbl">Omzet</span>
          </div>
          <div class="edit-hdr-stat-sep" />
          <div class="edit-hdr-stat">
            <span class="edit-hdr-stat-val">{{ quotations.length }}</span>
            <span class="edit-hdr-stat-lbl">Offertes</span>
          </div>
          <div class="edit-hdr-stat-sep" />
          <div class="edit-hdr-stat">
            <span class="edit-hdr-stat-val">{{ customer.addresses.length }}</span>
            <span class="edit-hdr-stat-lbl">Adressen</span>
          </div>
          <div class="edit-hdr-stat-sep" />
          <div class="edit-hdr-stat">
            <span class="edit-hdr-stat-val">{{ customer.wishlists.length }}</span>
            <span class="edit-hdr-stat-lbl">Verlanglijsten</span>
          </div>
        </div>
      </template>
      <template #actions>
        <Button icon="pi pi-ellipsis-v" severity="secondary" text rounded />
      </template>
    </EditPageHeader>

    <!-- ── Body ────────────────────────────────────────────────────────────── -->
    <div class="edit-body">
      <EditPageNav v-model="activeSection" :groups="navGroups" />
      <div class="edit-content">
        <CustomerPersonalTab v-if="activeSection === 'details'" />
        <CustomerAddressesTab v-else-if="activeSection === 'addresses'" />
        <CustomerSettingsTab v-else-if="activeSection === 'settings'" />
        <CustomerAccountTab v-else-if="activeSection === 'account'" />
        <CustomerActivityLogTab v-else-if="activeSection === 'log'" />
        <CustomerQuotationsTab v-else-if="activeSection === 'quotations'" />
        <CustomerRevenueTab v-else-if="activeSection === 'revenue'" />
        <CustomerCartTab v-else-if="activeSection === 'cart'" />
        <CustomerWishlistTab v-else-if="activeSection === 'wishlists'" />
        <CustomerDiscountsTab v-else-if="activeSection === 'discounts'" />
        <CustomerCreditTab v-else-if="activeSection === 'credit'" />
      </div>
    </div>
  </EditPageLayout>
</template>

<style scoped>
  /* ── Avatar color (layout handled by shared .edit-hdr-avatar) ────────── */
  :deep(.ce-avatar) {
    background: linear-gradient(135deg, var(--p-primary-400) 0%, var(--p-primary-600) 100%);
    color: white;
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.03em;
  }
</style>
