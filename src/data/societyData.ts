import { MeddleTemplate, NPCRole, SocialNPC, LifeCrisis } from '@/types/society';

const firstNames = ['Sunita', 'Raj', 'Meena', 'Pooja', 'Anil', 'Lakshmi', 'Vikram', 'Geeta', 'Suresh', 'Rohan', 'Priya', 'Deepa', 'Arjun', 'Kavita', 'Mr. Sharma', 'Mrs. Iyer', 'Ravi', 'Neha'];
const avatars = ['👵', '👴', '👨‍🦳', '👩‍🦳', '🧓', '👨‍🦰', '👩', '👨', '🧔', '👱‍♀️'];

const rand = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
const rng = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const makeAlignment = () => ({
  nosiness: rng(-100, 100),
  strictness: rng(-100, 100),
  judginess: rng(-100, 100),
  warmth: rng(-100, 100),
});

export const generateSocialCircle = (): SocialNPC[] => {
  const roles: { role: NPCRole; count: number; prefix: string }[] = [
    { role: 'parent', count: 1, prefix: 'Ma/Pa' },
    { role: 'in-law', count: 0, prefix: 'In-law' },
    { role: 'auntie', count: 2, prefix: 'Auntie' },
    { role: 'uncle', count: 1, prefix: 'Uncle' },
    { role: 'sibling', count: 1, prefix: '' },
    { role: 'neighbour', count: 2, prefix: '' },
  ];
  const circle: SocialNPC[] = [];
  roles.forEach(r => {
    for (let i = 0; i < r.count; i++) {
      circle.push({
        id: `${r.role}-${i}-${Math.random().toString(36).slice(2, 6)}`,
        name: r.prefix ? `${r.prefix} ${rand(firstNames)}` : rand(firstNames),
        avatar: rand(avatars),
        role: r.role,
        alignment: makeAlignment(),
        relationship: rng(-20, 40),
        lastActedDay: 0,
      });
    }
  });
  return circle;
};

export const meddleTemplates: MeddleTemplate[] = [
  // ─── NEGATIVE (the brutal Asian-relative chestnuts) ───
  {
    id: 'compare_cousin',
    trigger: 'judginess', triggerSign: 'negative',
    roles: ['auntie', 'uncle', 'parent'],
    title: "{npc}: \"Look at Sharma-ji's son…\"",
    description: "{npc} is comparing you to a cousin who supposedly earns triple your salary and married a doctor.",
    choices: [
      { text: "Smile politely and absorb it", description: "Keep the peace, lose a piece of yourself.", effects: { stability: -6, spiral: 6, relationship: 3 } },
      { text: "Push back firmly", description: "Stand your ground. They'll sulk for weeks.", effects: { stability: 3, relationship: -25, reputation: -5 } },
      { text: "Promise to do better", description: "Buy time with empty promises.", effects: { stability: -2, spiral: 3, relationship: 5 } },
    ],
  },
  {
    id: 'marriage_pressure',
    trigger: 'strictness', triggerSign: 'negative',
    roles: ['parent', 'auntie'],
    requiresPartner: true,
    title: "{npc}: \"When is the wedding?\"",
    description: "{npc} has been asking every relative when you'll finally 'settle down'. Aunties are involved now.",
    choices: [
      { text: "Tell them to mind their business", description: "Direct. Costly.", effects: { stability: 4, relationship: -20, reputation: -8 } },
      { text: "Cave and rush wedding plans", description: "Appease the tribe.", effects: { stability: -10, spiral: 12, affection: -5 } },
      { text: "Deflect with humor", description: "Slippery enough to survive lunch.", effects: { stability: -2, relationship: 2 } },
    ],
  },
  {
    id: 'baby_pressure',
    trigger: 'nosiness', triggerSign: 'negative',
    roles: ['parent', 'in-law', 'auntie'],
    requiresMarried: true,
    title: "{npc}: \"Any good news yet?\"",
    description: "{npc} is poking around your reproductive timeline. Loudly. At dinner.",
    choices: [
      { text: "Shut it down at the table", description: "Cousins go silent. Awkward.", effects: { stability: 5, relationship: -15, reputation: -5 } },
      { text: "Laugh nervously and change topic", description: "Survive tonight, pay tomorrow.", effects: { stability: -4, spiral: 5 } },
      { text: "Lie and say 'we're trying'", description: "Buys six weeks.", effects: { stability: -3, affection: -3, relationship: 5 } },
    ],
  },
  {
    id: 'neighbour_gossip',
    trigger: 'nosiness', triggerSign: 'negative',
    roles: ['neighbour'],
    title: "{npc} is gossiping about you at the gate",
    description: "{npc} told three other neighbours about that loud argument they 'happened to hear'.",
    choices: [
      { text: "Confront them publicly", description: "Drama level: society-wide.", effects: { reputation: -12, relationship: -30, stability: 2 } },
      { text: "Gift sweets and play nice", description: "Diplomacy via mithai.", effects: { stats: { wealth: -3 }, relationship: 15, reputation: 3 } },
      { text: "Ignore it and let it fester", description: "Reputation slowly bleeds.", effects: { reputation: -6, spiral: 4 } },
    ],
  },
  {
    id: 'sibling_compare',
    trigger: 'judginess', triggerSign: 'negative',
    roles: ['sibling'],
    title: "{npc} is humble-bragging again",
    description: "Your sibling {npc} just bought a car / got a promotion / has the 'perfect' relationship — and parents are listening.",
    choices: [
      { text: "Get competitive — out-grind them", description: "Lock in. Burn out maybe.", effects: { stats: { wealth: 5, health: -5 }, stability: -3, spiral: 4 } },
      { text: "Be happy for them", description: "Mature. Costs ego.", effects: { stability: 5, relationship: 15 } },
      { text: "Disengage from family chat", description: "Less drama, more distance.", effects: { stability: 3, relationship: -10 } },
    ],
  },
  {
    id: 'in_law_intrusion',
    trigger: 'strictness', triggerSign: 'negative',
    roles: ['in-law'],
    requiresMarried: true,
    title: "{npc} is rearranging your household",
    description: "{npc} 'visited for a week' three weeks ago and is now running your kitchen and your marriage.",
    choices: [
      { text: "Side with your partner, set boundaries", description: "Risky but right.", effects: { affection: 10, relationship: -25, stability: 4 } },
      { text: "Let it slide for peace", description: "Resentment compounds.", effects: { affection: -8, spiral: 8, stability: -5 } },
      { text: "Plan a 'work trip' to escape", description: "Avoidance with a passport.", effects: { stats: { wealth: -10 }, stability: 3, affection: -3 } },
    ],
  },
  {
    id: 'career_judgement',
    trigger: 'judginess', triggerSign: 'negative',
    roles: ['uncle', 'auntie', 'parent'],
    title: "{npc}: \"That's not a real job\"",
    description: "{npc} doesn't think your career counts unless it ends in -doctor or -engineer.",
    choices: [
      { text: "Defend your choices", description: "Costs the family rumour mill.", effects: { reputation: -5, stability: 4, relationship: -15 } },
      { text: "Pretend to consider their advice", description: "Survive the lunch.", effects: { stability: -3, spiral: 3 } },
      { text: "Actually pivot to please them", description: "A long, slow self-erasure.", effects: { stats: { wealth: 5, intelligence: -3 }, stability: -8, spiral: 10 } },
    ],
  },
  // ─── POSITIVE (the rare good ones) ───
  {
    id: 'supportive_parent',
    trigger: 'warmth', triggerSign: 'positive',
    roles: ['parent'],
    title: "{npc} just checked in on you",
    description: "{npc} called for no reason except to make sure you're eating. No agenda.",
    choices: [
      { text: "Open up about your stress", description: "It actually helps.", effects: { stability: 10, relationship: 15 } },
      { text: "Keep it light, say thanks", description: "Brief warmth.", effects: { stability: 4, relationship: 5 } },
    ],
  },
  {
    id: 'kind_neighbour',
    trigger: 'warmth', triggerSign: 'positive',
    roles: ['neighbour'],
    title: "{npc} dropped off home-cooked food",
    description: "No occasion. {npc} just thought of you.",
    choices: [
      { text: "Return the gesture later", description: "Build the bond.", effects: { stats: { wealth: -2 }, relationship: 20, reputation: 8 } },
      { text: "Accept gratefully", description: "Quiet boost.", effects: { stability: 5, relationship: 10, reputation: 3 } },
    ],
  },
  {
    id: 'sibling_ally',
    trigger: 'warmth', triggerSign: 'positive',
    roles: ['sibling'],
    title: "{npc} has your back at the family meeting",
    description: "When the aunties started in on you, {npc} actually deflected the heat.",
    choices: [
      { text: "Thank them later, privately", description: "Strengthens the alliance.", effects: { relationship: 20, stability: 6 } },
      { text: "Return the favour next time", description: "Mutual treaty.", effects: { relationship: 15, stability: 4 } },
    ],
  },
];

export const lifeCrises: Omit<LifeCrisis, 'resolved'>[] = [
  { id: 'debt_spiral', title: 'Drowning in Debt', description: 'You over-leveraged trying to keep up. Creditors are calling.', icon: '💸' },
  { id: 'health_collapse', title: 'Burnout Hospitalisation', description: 'You ignored every warning. Your body finally said no.', icon: '🏥' },
  { id: 'public_scandal', title: 'Society Scandal', description: 'The neighbourhood rumour mill turned on you. Reputation: shredded.', icon: '🔥' },
  { id: 'marital_crisis', title: 'Marriage on the Brink', description: 'Years of meddling and neglect have caught up. One more wrong move ends it.', icon: '💔' },
  { id: 'family_estrangement', title: 'Cut Off by Family', description: 'They stopped picking up. The group chat went quiet.', icon: '🚪' },
];
