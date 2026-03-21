export type Feature = 'label' | 'actietimer' | 'prijsmodificatie' | 'prijskleur' | 'pretekst';

export const ALL_FEATURES: { key: Feature; label: string; icon: string }[] = [
  { key: 'label',            label: 'Label',                   icon: 'pi pi-tag'       },
  { key: 'actietimer',       label: 'Actietimer',              icon: 'pi pi-clock'     },
  { key: 'prijsmodificatie', label: 'Prijsmodificatie',        icon: 'pi pi-percentage'},
  { key: 'prijskleur',       label: 'Prijskleurmodificatie',   icon: 'pi pi-palette'   },
  { key: 'pretekst',         label: 'Pre-tekst per site',      icon: 'pi pi-align-left'},
];
