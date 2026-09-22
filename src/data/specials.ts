/**
 * Specials. The four wine lines are from the live "Mate's Rates" catalogue on
 * bobsbulkbooze.com.au (Sept 2026). The rest are placeholders in the same shape
 * so every category has content; swap for the real feed.
 */
export type Category = 'beer' | 'wine' | 'spirits' | 'premix' | 'cider';

export type Special = {
  id: string;
  name: string;
  variant?: string;
  size: string;
  category: Category;
  memberPrice: number;
  nonMemberPrice: number;
  endsOn: string; // ISO date
  campaign: 'weekly' | 'wine';
  tone: string; // colour swatch used in place of a product photo
  emoji: string;
  blurb?: string;
  live: boolean; // true = confirmed from the site, false = placeholder
};

export const categories: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'beer', label: 'Beer' },
  { id: 'wine', label: 'Wine' },
  { id: 'spirits', label: 'Spirits' },
  { id: 'premix', label: 'Premix' },
  { id: 'cider', label: 'Cider' },
];

export const campaigns = {
  weekly: { label: 'Weekly specials', endsOn: '2026-09-22' },
  wine: { label: 'Wine specials', endsOn: '2026-10-12' },
} as const;

export const specials: Special[] = [
  {
    id: 'matua-sauv-blanc',
    name: 'Matua Valley',
    variant: 'Sauvignon Blanc',
    size: '750ml',
    category: 'wine',
    memberPrice: 13.12,
    nonMemberPrice: 19.68,
    endsOn: campaigns.wine.endsOn,
    campaign: 'wine',
    tone: '#7FC8C4',
    emoji: '🍾',
    blurb: 'Marlborough sav with the classic passionfruit and cut-grass hit.',
    live: true,
  },
  {
    id: 'croser-nv',
    name: 'Croser',
    variant: 'NV Range',
    size: '750ml',
    category: 'wine',
    memberPrice: 21.42,
    nonMemberPrice: 32.13,
    endsOn: campaigns.wine.endsOn,
    campaign: 'wine',
    tone: '#2F2F35',
    emoji: '🥂',
    blurb: 'Adelaide Hills sparkling, traditional method. Celebration sorted.',
    live: true,
  },
  {
    id: 'brown-brothers-moscato',
    name: 'Brown Brothers',
    variant: 'Moscato Range',
    size: '750ml',
    category: 'wine',
    memberPrice: 13.48,
    nonMemberPrice: 20.22,
    endsOn: campaigns.wine.endsOn,
    campaign: 'wine',
    tone: '#F2D5A8',
    emoji: '🍇',
    blurb: 'Light, sweet and fizzy. The crowd-pleaser.',
    live: true,
  },
  {
    id: 'de-bortoli-prosecco',
    name: 'De Bortoli',
    variant: 'King Valley Prosecco',
    size: '750ml',
    category: 'wine',
    memberPrice: 13.9,
    nonMemberPrice: 22.22,
    endsOn: campaigns.wine.endsOn,
    campaign: 'wine',
    tone: '#9AD1E8',
    emoji: '🥂',
    blurb: 'Crisp King Valley prosecco. Sunday session material.',
    live: true,
  },
  {
    id: 'great-northern-super-crisp',
    name: 'Great Northern',
    variant: 'Super Crisp',
    size: '30 × 375ml cans',
    category: 'beer',
    memberPrice: 49.99,
    nonMemberPrice: 56.99,
    endsOn: campaigns.weekly.endsOn,
    campaign: 'weekly',
    tone: '#F6C24B',
    emoji: '🍺',
    live: false,
  },
  {
    id: 'xxxx-gold',
    name: 'XXXX Gold',
    size: '30 × 375ml cans',
    category: 'beer',
    memberPrice: 47.99,
    nonMemberPrice: 54.99,
    endsOn: campaigns.weekly.endsOn,
    campaign: 'weekly',
    tone: '#E6B23A',
    emoji: '🍺',
    live: false,
  },
  {
    id: 'balter-xpa',
    name: 'Balter',
    variant: 'XPA',
    size: '16 × 375ml cans',
    category: 'beer',
    memberPrice: 59.99,
    nonMemberPrice: 66.99,
    endsOn: campaigns.weekly.endsOn,
    campaign: 'weekly',
    tone: '#5AA9E6',
    emoji: '🍻',
    live: false,
  },
  {
    id: 'bundaberg-up',
    name: 'Bundaberg Rum',
    variant: 'UP',
    size: '1L',
    category: 'spirits',
    memberPrice: 62.99,
    nonMemberPrice: 69.99,
    endsOn: campaigns.weekly.endsOn,
    campaign: 'weekly',
    tone: '#B5651D',
    emoji: '🥃',
    live: false,
  },
  {
    id: 'smirnoff-red',
    name: 'Smirnoff',
    variant: 'Red Label Vodka',
    size: '1L',
    category: 'spirits',
    memberPrice: 49.99,
    nonMemberPrice: 56.99,
    endsOn: campaigns.weekly.endsOn,
    campaign: 'weekly',
    tone: '#C8102E',
    emoji: '🍸',
    live: false,
  },
  {
    id: 'canadian-club-dry',
    name: 'Canadian Club',
    variant: '& Dry 4.8%',
    size: '10 × 375ml cans',
    category: 'premix',
    memberPrice: 44.99,
    nonMemberPrice: 49.99,
    endsOn: campaigns.weekly.endsOn,
    campaign: 'weekly',
    tone: '#8B5A2B',
    emoji: '🥤',
    live: false,
  },
  {
    id: 'hard-rated',
    name: 'Hard Rated',
    variant: 'Lemon 4.5%',
    size: '10 × 375ml cans',
    category: 'premix',
    memberPrice: 39.99,
    nonMemberPrice: 44.99,
    endsOn: campaigns.weekly.endsOn,
    campaign: 'weekly',
    tone: '#F7E04B',
    emoji: '🍋',
    live: false,
  },
  {
    id: 'somersby-apple',
    name: 'Somersby',
    variant: 'Apple Cider',
    size: '10 × 375ml cans',
    category: 'cider',
    memberPrice: 36.99,
    nonMemberPrice: 42.99,
    endsOn: campaigns.weekly.endsOn,
    campaign: 'weekly',
    tone: '#8CC152',
    emoji: '🍏',
    live: false,
  },
];

export function getSpecial(id: string | undefined): Special | undefined {
  return specials.find((s) => s.id === id);
}

export function saving(s: Special): number {
  return Math.round((s.nonMemberPrice - s.memberPrice) * 100) / 100;
}

export function savingPercent(s: Special): number {
  return Math.round(((s.nonMemberPrice - s.memberPrice) / s.nonMemberPrice) * 100);
}

export function formatPrice(n: number): string {
  return `$${n.toFixed(2)}`;
}

export function formatEnds(iso: string): string {
  const d = new Date(iso + 'T23:59:59');
  return d.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' });
}
