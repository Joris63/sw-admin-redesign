import type {
  OfferProduct as Product,
  OfferGroup as Group,
  PendingGroupChanges,
  PendingSiteChange,
} from '@/types/offer';

export const P_DOUCHESTELLEN: Product[] = [
  { id: 1, code: 'SW1440595', site: 'SWBE', merk: 'Grohe / Tempesta' },
  { id: 2, code: 'SW1440594', site: 'SWBE', merk: 'Grohe / Tempesta' },
  { id: 3, code: 'SW1440593', site: 'SWBE', merk: 'Grohe / Tempesta Cosmopolitan' },
  { id: 4, code: 'SW1440592', site: 'SWBE', merk: 'Grohe / Rainshower SmartControl' },
  { id: 5, code: 'SW1440591', site: 'SWBE', merk: 'Grohe / Rainshower SmartControl' },
  { id: 6, code: 'SW1440590', site: 'SWBE', merk: 'Grohe / Rainshower Allure' },
  { id: 7, code: 'SW1440589', site: 'SWBE', merk: 'Grohe / Rainshower Allure' },
  { id: 8, code: 'SW1440588', site: 'SWBE', merk: 'Grohe / Euphoria' },
  { id: 9, code: 'SW1440587', site: 'SWBE', merk: 'Grohe / Euphoria' },
  { id: 10, code: 'SW1440586', site: 'SWBE', merk: 'Grohe / Euphoria Cube' },
  { id: 11, code: 'SW1440585', site: 'SWBE', merk: 'Grohe / Euphoria Cube' },
  { id: 12, code: 'SW1440584', site: 'SWBE', merk: 'Grohe / Vitalio' },
  { id: 13, code: 'SW1440583', site: 'SWBE', merk: 'Grohe / Vitalio' },
  { id: 14, code: 'SW1440582', site: 'SWBE', merk: 'Grohe / Precision Flow' },
  { id: 15, code: 'SW1440581', site: 'SWBE', merk: 'Grohe / Precision Flow' },
  { id: 16, code: 'SW1440580', site: 'SWBE', merk: 'Grohe / Precision Flow XL' },
  { id: 17, code: 'SW1440579', site: 'SWBE', merk: 'Grohe / New Tempesta Rustic' },
  { id: 18, code: 'SW1440578', site: 'SWBE', merk: 'Grohe / New Tempesta Rustic' },
  { id: 19, code: 'SW1440577', site: 'SWBE', merk: 'Grohe / Vitalio Joy' },
  { id: 20, code: 'SW1440576', site: 'SWBE', merk: 'Grohe / Vitalio Joy' },
  { id: 21, code: 'SW1440575', site: 'SWBE', merk: 'Grohe / Vitalio Start' },
];

export const P_THERMOSTAATKRANEN: Product[] = [
  { id: 22, code: 'SW1440570', site: 'SWBE', merk: 'Grohe / Grohtherm 800' },
  { id: 23, code: 'SW1440569', site: 'SWBE', merk: 'Grohe / Grohtherm 800' },
  { id: 24, code: 'SW1440568', site: 'SWBE', merk: 'Grohe / Grohtherm 800 E' },
  { id: 25, code: 'SW1440567', site: 'SWBE', merk: 'Grohe / Grohtherm SmartControl' },
  { id: 26, code: 'SW1440566', site: 'SWBE', merk: 'Grohe / Grohtherm SmartControl' },
  { id: 27, code: 'SW1440565', site: 'SWBE', merk: 'Grohe / Grohtherm Cube' },
  { id: 28, code: 'SW1440564', site: 'SWBE', merk: 'Grohe / Grohtherm Cube' },
  { id: 29, code: 'SW1440563', site: 'SWBE', merk: 'Grohe / Grohtherm 3000' },
  { id: 30, code: 'SW1440562', site: 'SWBE', merk: 'Grohe / Grohtherm 3000 Cosmopolitan' },
];

export const P_KEUKENMENGERS: Product[] = [
  { id: 31, code: 'SW1440555', site: 'SWBE', merk: 'Grohe / Minta' },
  { id: 32, code: 'SW1440554', site: 'SWBE', merk: 'Grohe / Minta' },
  { id: 33, code: 'SW1440553', site: 'SWBE', merk: 'Grohe / Minta Touch' },
  { id: 34, code: 'SW1440552', site: 'SWBE', merk: 'Grohe / Minta Touch' },
  { id: 35, code: 'SW1440551', site: 'SWBE', merk: 'Grohe / Eurosmart' },
  { id: 36, code: 'SW1440550', site: 'SWBE', merk: 'Grohe / Eurosmart' },
  { id: 37, code: 'SW1440549', site: 'SWBE', merk: 'Grohe / Eurosmart Cosmopolitan' },
  { id: 38, code: 'SW1440548', site: 'SWBE', merk: 'Grohe / Eurosmart Cosmopolitan' },
  { id: 39, code: 'SW1440547', site: 'SWBE', merk: 'Grohe / Concetto' },
  { id: 40, code: 'SW1440546', site: 'SWBE', merk: 'Grohe / Concetto' },
  { id: 41, code: 'SW1440545', site: 'SWBE', merk: 'Grohe / Essence' },
  { id: 42, code: 'SW1440544', site: 'SWBE', merk: 'Grohe / Essence' },
  { id: 43, code: 'SW1440543', site: 'SWBE', merk: 'Grohe / Ladylux' },
  { id: 44, code: 'SW1440542', site: 'SWBE', merk: 'Grohe / Ladylux' },
  { id: 45, code: 'SW1440541', site: 'SWBE', merk: 'Grohe / K7' },
  { id: 46, code: 'SW1440540', site: 'SWBE', merk: 'Grohe / K7' },
  { id: 47, code: 'SW1440539', site: 'SWBE', merk: 'Grohe / K4' },
];

export const P_BADKRANEN: Product[] = [
  { id: 48, code: 'SW1440530', site: 'SWBE', merk: 'Grohe / Grandera' },
  { id: 49, code: 'SW1440529', site: 'SWBE', merk: 'Grohe / Grandera' },
  { id: 50, code: 'SW1440528', site: 'SWBE', merk: 'Grohe / Allure Brilliant' },
  { id: 51, code: 'SW1440527', site: 'SWBE', merk: 'Grohe / Allure Brilliant' },
  { id: 52, code: 'SW1440526', site: 'SWBE', merk: 'Grohe / Atrio' },
  { id: 53, code: 'SW1440525', site: 'SWBE', merk: 'Grohe / Atrio' },
  { id: 54, code: 'SW1440524', site: 'SWBE', merk: 'Grohe / Lineare' },
];

export const P_SPECIALS: Product[] = [
  { id: 55, code: 'SW1440520', site: 'SWBE', merk: 'Grohe / Sense' },
  { id: 56, code: 'SW1440519', site: 'SWBE', merk: 'Grohe / Sense Guard' },
  { id: 57, code: 'SW1440518', site: 'SWBE', merk: 'Grohe / Blue Home' },
  { id: 58, code: 'SW1440517', site: 'SWBE', merk: 'Grohe / Blue Professional' },
  { id: 59, code: 'SW1440516', site: 'SWBE', merk: 'Grohe / Red Mono' },
];

export const MOCK_GROUPS: Group[] = [
  {
    id: 1,
    naam: '2026 Q1: GROHE COLORS BE',
    expanded: true,
    products: [],
    children: [
      {
        id: 2,
        naam: 'Douche & Bad',
        expanded: true,
        products: [],
        children: [
          {
            id: 3,
            naam: 'Douchestellen',
            expanded: false,
            children: [],
            products: P_DOUCHESTELLEN,
          },
          {
            id: 4,
            naam: 'Thermostaatkranen',
            expanded: false,
            children: [],
            products: P_THERMOSTAATKRANEN,
          },
          { id: 5, naam: 'Badkranen', expanded: false, children: [], products: P_BADKRANEN },
        ],
      },
      { id: 6, naam: 'Keukenmengers', expanded: false, children: [], products: P_KEUKENMENGERS },
      { id: 7, naam: 'Specials BE', expanded: false, children: [], products: P_SPECIALS },
    ],
  },
];

export const PENDING_CHANGES: Record<number, PendingGroupChanges> = {
  3: {
    options: [{ label: 'Label', icon: 'pi-tag', action: 'add' }],
    products: [
      { code: 'SW1440400', merk: 'Grohe / Tempesta Cosmopolitan', action: 'add' },
      { code: 'SW1440399', merk: 'Grohe / Tempesta Cosmopolitan', action: 'add' },
      { code: 'SW1440398', merk: 'Grohe / Euphoria XXL', action: 'add' },
    ],
  },
  4: { groupAction: 'remove', options: [], products: [] },
  6: {
    options: [
      { label: 'Actietimer', icon: 'pi-clock', action: 'remove' },
      { label: 'Prijsmodificatie', icon: 'pi-percentage', action: 'remove' },
    ],
    products: [
      { code: 'SW1440540', merk: 'Grohe / K7', action: 'add' },
      { code: 'SW1440554', merk: 'Grohe / Minta', action: 'remove' },
      { code: 'SW1440553', merk: 'Grohe / Minta Touch', action: 'remove' },
    ],
  },
};

export const PENDING_SITE_CHANGES: PendingSiteChange[] = [
  { site: 'sawiday_nl', action: 'remove' },
  { site: 'sawiday_fr', action: 'add' },
];
