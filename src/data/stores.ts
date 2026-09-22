/**
 * Bob's Bulk Booze store list, taken from bobsbulkbooze.com.au/bobs-stores.
 * Coordinates are approximate suburb centroids for nearest-store sorting only;
 * directions use the street address, not the coordinates.
 */
export type DayHours = { days: string; open: string; close: string; openH: number; closeH: number; dayIdx: number[] };

export type Store = {
  id: string;
  name: string;
  address: string;
  suburb: string;
  phone: string;
  lat: number;
  lng: number;
  hours: DayHours[];
};

// dayIdx uses JS getDay(): 0 = Sunday … 6 = Saturday
const SUN_THU = [0, 1, 2, 3, 4];
const FRI_SAT = [5, 6];
const SUN_TUE = [0, 1, 2];
const WED_SAT = [3, 4, 5, 6];
const SUN_WED = [0, 1, 2, 3];
const THU_SAT = [4, 5, 6];
const MON_WED = [1, 2, 3];
const MON_THU = [1, 2, 3, 4];
const ALL = [0, 1, 2, 3, 4, 5, 6];

export const stores: Store[] = [
  {
    id: 'arana-hills',
    name: 'Arana Hills',
    address: '2 Patricks Rd, Arana Hills QLD 4054',
    suburb: 'Arana Hills',
    phone: '07 3506 1271',
    lat: -27.3966,
    lng: 152.9575,
    hours: [
      { days: 'Sun – Thu', open: '9am', close: '9pm', openH: 9, closeH: 21, dayIdx: SUN_THU },
      { days: 'Fri – Sat', open: '9am', close: '10pm', openH: 9, closeH: 22, dayIdx: FRI_SAT },
    ],
  },
  {
    id: 'forest-lake',
    name: 'Forest Lake',
    address: 'Shop 6/251 Forest Lake Blvd, Forest Lake QLD 4078',
    suburb: 'Forest Lake',
    phone: '07 3879 2784',
    lat: -27.6255,
    lng: 152.9694,
    hours: [{ days: 'Mon – Sun', open: '9am', close: '9pm', openH: 9, closeH: 21, dayIdx: ALL }],
  },
  {
    id: 'garbutt',
    name: 'Garbutt',
    address: '106 Hugh St, Garbutt QLD 4814',
    suburb: 'Townsville',
    phone: '07 4728 9742',
    lat: -19.2626,
    lng: 146.7729,
    hours: [{ days: 'Mon – Sun', open: '9am', close: '9pm', openH: 9, closeH: 21, dayIdx: ALL }],
  },
  {
    id: 'hermit-park',
    name: 'Hermit Park',
    address: '172 Charters Towers Rd, Hermit Park QLD 4812',
    suburb: 'Townsville',
    phone: '07 4459 4517',
    lat: -19.2818,
    lng: 146.7938,
    hours: [
      { days: 'Sun – Wed', open: '9am', close: '8pm', openH: 9, closeH: 20, dayIdx: SUN_WED },
      { days: 'Thu – Sat', open: '9am', close: '9pm', openH: 9, closeH: 21, dayIdx: THU_SAT },
    ],
  },
  {
    id: 'mount-pleasant',
    name: 'Mount Pleasant',
    address: '73 Phillip St, Mount Pleasant QLD 4740',
    suburb: 'Mackay',
    phone: '07 4960 1983',
    lat: -21.1109,
    lng: 149.1612,
    hours: [
      { days: 'Sun – Tue', open: '9am', close: '8pm', openH: 9, closeH: 20, dayIdx: SUN_TUE },
      { days: 'Wed – Sat', open: '9am', close: '9pm', openH: 9, closeH: 21, dayIdx: WED_SAT },
    ],
  },
  {
    id: 'berserker',
    name: 'Berserker',
    address: '7-13 Linnett St, Berserker QLD 4701',
    suburb: 'Rockhampton',
    phone: '07 4994 2400',
    lat: -23.3641,
    lng: 150.5262,
    hours: [
      { days: 'Sun – Wed', open: '9am', close: '8pm', openH: 9, closeH: 20, dayIdx: SUN_WED },
      { days: 'Thu – Sat', open: '9am', close: '9pm', openH: 9, closeH: 21, dayIdx: THU_SAT },
    ],
  },
  {
    id: 'bundaberg-west',
    name: 'Bundaberg West',
    address: '107 Takalvan St, Bundaberg West QLD 4670',
    suburb: 'Bundaberg',
    phone: '07 4111 2756',
    lat: -24.8724,
    lng: 152.3268,
    hours: [
      { days: 'Sun – Thu', open: '9am', close: '8pm', openH: 9, closeH: 20, dayIdx: SUN_THU },
      { days: 'Fri – Sat', open: '9am', close: '9pm', openH: 9, closeH: 21, dayIdx: FRI_SAT },
    ],
  },
  {
    id: 'park-avenue',
    name: 'Park Avenue',
    address: '379 Yaamba Rd, Park Avenue QLD 4701',
    suburb: 'Rockhampton',
    phone: '07 4994 2401',
    lat: -23.3418,
    lng: 150.5126,
    hours: [
      { days: 'Sun – Thu', open: '9am', close: '9pm', openH: 9, closeH: 21, dayIdx: SUN_THU },
      { days: 'Fri – Sat', open: '9am', close: '10pm', openH: 9, closeH: 22, dayIdx: FRI_SAT },
    ],
  },
  {
    id: 'rothwell',
    name: 'Rothwell',
    address: '763 Deception Bay Rd, Rothwell QLD 4022',
    suburb: 'Rothwell',
    phone: '07 2104 7373',
    lat: -27.2135,
    lng: 153.0475,
    hours: [
      { days: 'Sun – Tue', open: '9am', close: '8pm', openH: 9, closeH: 20, dayIdx: SUN_TUE },
      { days: 'Wed – Sat', open: '9am', close: '9pm', openH: 9, closeH: 21, dayIdx: WED_SAT },
    ],
  },
  {
    id: 'logan-central',
    name: 'Logan Central',
    address: '2 Wembley Rd, Logan Central QLD 4114',
    suburb: 'Logan Central',
    phone: '07 2800 6769',
    lat: -27.6432,
    lng: 153.1078,
    hours: [
      { days: 'Mon – Wed', open: '9am', close: '8pm', openH: 9, closeH: 20, dayIdx: MON_WED },
      { days: 'Thu – Sat', open: '9am', close: '9pm', openH: 9, closeH: 21, dayIdx: THU_SAT },
      { days: 'Sun', open: '9am', close: '7pm', openH: 9, closeH: 19, dayIdx: [0] },
    ],
  },
  {
    id: 'hendra',
    name: 'Hendra',
    address: '355 Nudgee Rd, Hendra QLD 4011',
    suburb: 'Hendra',
    phone: '07 3495 2775',
    lat: -27.4184,
    lng: 153.0678,
    hours: [
      { days: 'Mon – Wed', open: '9am', close: '8pm', openH: 9, closeH: 20, dayIdx: MON_WED },
      { days: 'Thu – Sat', open: '9am', close: '9pm', openH: 9, closeH: 21, dayIdx: THU_SAT },
      { days: 'Sun', open: '9am', close: '7pm', openH: 9, closeH: 19, dayIdx: [0] },
    ],
  },
  {
    id: 'tingalpa',
    name: 'Tingalpa',
    address: '1029 Manly Rd, Tingalpa QLD 4173',
    suburb: 'Tingalpa',
    phone: '07 3497 0886',
    lat: -27.4795,
    lng: 153.1237,
    hours: [
      { days: 'Mon – Wed', open: '9am', close: '8pm', openH: 9, closeH: 20, dayIdx: MON_WED },
      { days: 'Thu – Sat', open: '9am', close: '9pm', openH: 9, closeH: 21, dayIdx: THU_SAT },
      { days: 'Sun', open: '9am', close: '7pm', openH: 9, closeH: 19, dayIdx: [0] },
    ],
  },
  {
    id: 'buderim',
    name: 'Buderim',
    address: '90 Wises Rd, Buderim QLD 4556',
    suburb: 'Sunshine Coast',
    phone: '07 5237 4498',
    lat: -26.6854,
    lng: 153.0785,
    hours: [
      { days: 'Mon – Thu', open: '10am', close: '9pm', openH: 10, closeH: 21, dayIdx: MON_THU },
      { days: 'Fri – Sat', open: '10am', close: '10pm', openH: 10, closeH: 22, dayIdx: FRI_SAT },
      { days: 'Sun', open: '10am', close: '7pm', openH: 10, closeH: 19, dayIdx: [0] },
    ],
  },
  {
    id: 'woree',
    name: 'Woree',
    address: '554 Mulgrave Rd, Woree QLD 4868',
    suburb: 'Cairns',
    phone: '07 4285 2442',
    lat: -16.9518,
    lng: 145.7527,
    hours: [
      { days: 'Sun – Wed', open: '10am', close: '8pm', openH: 10, closeH: 20, dayIdx: SUN_WED },
      { days: 'Thu – Sat', open: '10am', close: '9pm', openH: 10, closeH: 21, dayIdx: THU_SAT },
    ],
  },
];

export function getStore(id: string | undefined): Store | undefined {
  return stores.find((s) => s.id === id);
}

export type OpenStatus =
  | { open: true; closesAt: string; closingSoon: boolean }
  | { open: false; opensAt: string; opensLabel: 'today' | 'tomorrow' };

export function getOpenStatus(store: Store, now = new Date()): OpenStatus {
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;
  const today = store.hours.find((h) => h.dayIdx.includes(day));
  if (today && hour >= today.openH && hour < today.closeH) {
    return { open: true, closesAt: today.close, closingSoon: today.closeH - hour <= 1 };
  }
  if (today && hour < today.openH) {
    return { open: false, opensAt: today.open, opensLabel: 'today' };
  }
  const tomorrow = store.hours.find((h) => h.dayIdx.includes((day + 1) % 7));
  return { open: false, opensAt: tomorrow?.open ?? '9am', opensLabel: 'tomorrow' };
}

export function distanceKm(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const R = 6371;
  const dLat = ((bLat - aLat) * Math.PI) / 180;
  const dLng = ((bLng - aLng) * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((aLat * Math.PI) / 180) * Math.cos((bLat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}
