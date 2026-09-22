/**
 * Mock member profile. Replace with the loyalty API when it is wired up.
 * The member number is what the counter scans; the QR payload is
 * intentionally the number itself so existing scanners keep working.
 */
export type Member = {
  id: string;
  firstName: string;
  lastName: string;
  memberNumber: string;
  tier: 'Mate' | 'Good Mate' | 'Best Mate';
  points: number;
  pointsToNextReward: number;
  memberSince: string; // ISO date
  homeStoreId: string;
  email: string;
  mobile: string;
};

export const member: Member = {
  id: 'm_50456972',
  firstName: 'Goran',
  lastName: 'Spuzic',
  memberNumber: '50456972',
  tier: 'Good Mate',
  points: 1240,
  pointsToNextReward: 260,
  memberSince: '2021-03-14',
  homeStoreId: 'arana-hills',
  email: 'goran@example.com',
  mobile: '0413 287 677',
};

export const benefits = [
  {
    id: 'mates-rates',
    title: "Mate's Rates on every visit",
    body: 'Scan your card at the counter and member pricing applies automatically.',
  },
  {
    id: 'beat-down',
    title: "Bob's Beat Down Guarantee",
    body: "Find it cheaper within 10 km and we'll beat the price on the spot.",
  },
  {
    id: 'first-look',
    title: 'First look at specials',
    body: 'Weekly and wine specials land in the app before they hit the shelf talkers.',
  },
  {
    id: 'bulk',
    title: 'Bulk buy quotes',
    body: 'Weddings, footy clubs, work dos. Tell us what you need and we quote it.',
  },
] as const;

export const beatDownTerms = [
  'Competitor must have the item available for immediate sale and pick up at time of offer.',
  "Competitor's advertisement must be current and for an identical item.",
  "Competitor's advertisement must be viewed and verified by staff at time of sale.",
  "Competitor's store must be within 10 km of the store you are buying from.",
  'Excludes online members, trade sales, clearance, out-of-date and duty-free lines.',
  'Limited to reasonable retail quantities and stock on the floor at time of price match.',
];
