import { RPGEvent, RPGCharacter, LifeStage } from '@/types/rpg';

const INDIAN_FIRST_NAMES_GIRL = ['Priya', 'Ananya', 'Kavya', 'Meera', 'Riya', 'Sneha', 'Divya', 'Ishita', 'Pooja', 'Tara'];
const INDIAN_FIRST_NAMES_BOY = ['Rohan', 'Arjun', 'Karan', 'Vikram', 'Aditya', 'Rahul', 'Siddharth', 'Nikhil'];

export const stageForAge = (age: number): LifeStage => {
  if (age < 13) return 'childhood';
  if (age < 20) return 'teen';
  if (age < 30) return 'youngAdult';
  return 'adult';
};

export const randomName = (gender: 'girl' | 'boy') =>
  (gender === 'girl' ? INDIAN_FIRST_NAMES_GIRL : INDIAN_FIRST_NAMES_BOY)[
    Math.floor(Math.random() * (gender === 'girl' ? INDIAN_FIRST_NAMES_GIRL.length : INDIAN_FIRST_NAMES_BOY.length))
  ];

export const LIFE_EVENTS: RPGEvent[] = [
  // ----------------- CHILDHOOD -----------------
  {
    id: 'first_school_day',
    title: 'First Day at School',
    minAge: 5, maxAge: 7,
    text: () => 'Your mother packs aloo paratha in a steel tiffin and walks you to the school gate. You feel small.',
    choices: () => [
      { label: 'Hold her hand and cry a little', effects: { happiness: -3, charm: -2, logLine: 'Cried on the first day of school.' }, resultText: 'A teacher kindly takes you in. You feel safer but a few kids giggle.' },
      { label: 'Walk in bravely', effects: { happiness: 4, reputation: 3, logLine: 'Walked into school bravely on day one.' }, resultText: 'The teacher smiles. Mummy is proud.' },
    ],
  },
  {
    id: 'math_olympiad',
    title: 'Maths Olympiad',
    minAge: 8, maxAge: 12,
    text: () => 'Your class teacher pushes you to sign up for the maths olympiad.',
    choices: (c) => [
      { label: 'Study hard for weeks', effects: { intelligence: 6, health: -3, happiness: -2, logLine: 'Won a maths olympiad medal.' }, resultText: c.stats.intelligence > 40 ? 'You bring home a bronze medal. Papa shows it to every uncle.' : 'You don\'t place, but you learned a lot.' },
      { label: 'Skip it, play cricket instead', effects: { happiness: 5, health: 4, intelligence: -2, logLine: 'Chose cricket over olympiad.' }, resultText: 'The galli cricket boys cheer your sixes.' },
    ],
  },
  {
    id: 'parents_fight_child',
    title: 'Parents Arguing',
    minAge: 6, maxAge: 14,
    weight: 0.8,
    text: (c) => `${c.father.name} and ${c.mother.name} are arguing loudly about money in the kitchen.`,
    choices: () => [
      { label: 'Hide in your room', effects: { happiness: -6, logLine: 'Hid through a parents\' fight.' }, resultText: 'The shouting eventually dies. You can\'t sleep.' },
      { label: 'Go and hug them both', effects: { happiness: -2, parentWarmth: 4, logLine: 'Comforted parents during a fight.' }, resultText: 'They stop, look at you, and quietly make tea.' },
    ],
  },
  {
    id: 'tuition_pressure',
    title: 'Tuition Pressure',
    minAge: 10, maxAge: 16,
    text: (c) => `${c.father.name} signs you up for three extra tuitions this year.`,
    choices: () => [
      { label: 'Obey and grind', effects: { intelligence: 5, happiness: -5, health: -3, logLine: 'Survived a brutal tuition year.' }, resultText: 'Your marks improve. Your back aches.' },
      { label: 'Push back, ask for one only', effects: { intelligence: 2, happiness: 2, parentWarmth: -4, logLine: 'Pushed back against tuition load.' }, resultText: 'Papa is disappointed but agrees. The house is quiet for a week.' },
    ],
  },

  // ----------------- TEEN -----------------
  {
    id: 'first_crush',
    title: 'A Crush',
    minAge: 13, maxAge: 19,
    weight: 1.2,
    condition: (c) => !c.romance,
    text: () => {
      return 'Someone in your class catches your eye every morning at the assembly.';
    },
    choices: (c) => {
      const gender: 'girlfriend' | 'boyfriend' = Math.random() < 0.85 ? 'girlfriend' : 'boyfriend';
      return [
        { label: 'Pass a note in the chemistry lab', effects: { charm: 2, happiness: 3, triggerRomance: gender, logLine: `Started seeing someone at age ${c.age}.` }, resultText: 'A folded reply comes back. It says yes — barely.' },
        { label: 'Just admire from far. Boards are coming.', effects: { intelligence: 3, happiness: -2, logLine: 'Ignored a crush to focus on studies.' }, resultText: 'You bury yourself in NCERT books.' },
      ];
    },
  },
  {
    id: 'board_exams',
    title: 'Board Exams',
    minAge: 15, maxAge: 18,
    weight: 1.5,
    text: () => 'Class 10/12 boards are weeks away. The whole house revolves around your timetable.',
    choices: (c) => [
      { label: 'Lock yourself in and study 12 hrs/day', effects: { intelligence: 10, health: -8, happiness: -6, romanceAffection: -10, logLine: 'Grinded through board exams.' }, resultText: 'Marks: solid. Eyes: tired.' },
      { label: 'Balance study and friends', effects: { intelligence: 5, happiness: 2, logLine: 'Took a balanced approach to boards.' }, resultText: c.stats.intelligence > 50 ? 'You score well anyway.' : 'You scrape through.' },
      { label: 'Slack off, play PUBG all night', effects: { intelligence: -4, happiness: 4, parentWarmth: -8, reputation: -5, logLine: 'Slacked off during boards.' }, resultText: 'Papa nearly throws the router out the window.' },
    ],
  },
  {
    id: 'family_disapproval',
    title: 'Family Finds Out',
    minAge: 14, maxAge: 22,
    weight: 1.4,
    condition: (c) => !!c.romance && c.romance.status === 'active' && !c.romance.approvedByFamily,
    text: (c) => `An auntie spotted you at the chaat stall with ${c.romance!.name}. Word reached home.`,
    choices: (c) => [
      { label: `Defend ${c.romance!.name} to your parents`, effects: { parentWarmth: -8, happiness: -4, romanceAffection: 10, logLine: 'Defended partner against family.' }, resultText: 'Voices raised. But your partner heard you stood up for them.' },
      { label: 'Lie and say it was just tuition', effects: { reputation: -3, parentWarmth: 2, romanceAffection: -12, logLine: 'Lied to parents about partner.' }, resultText: 'Parents calm. Partner is hurt.' },
      { label: 'Break it off to keep peace', effects: { happiness: -10, triggerBreakup: true, parentWarmth: 6, logLine: 'Broke up under family pressure.' }, resultText: 'You send a long text. You don\'t sleep that night.' },
    ],
  },
  {
    id: 'parent_health_scare',
    title: 'Hospital Call',
    minAge: 12, maxAge: 60,
    weight: 1.1,
    condition: (c) => (c.father.alive && c.father.health < 60) || (c.mother.alive && c.mother.health < 60),
    text: (c) => {
      const sick = c.father.health < c.mother.health ? c.father.name : c.mother.name;
      return `${sick} collapsed at home. The hospital wants a deposit.`;
    },
    choices: (c) => [
      { label: 'Pay from savings, no questions', effects: { wealth: -15, parentHealth: 15, parentWarmth: 8, logLine: 'Paid for parent\'s hospital bill.' }, resultText: 'They stabilise. The bank account doesn\'t.' },
      { label: 'Borrow from relatives', effects: { wealth: -5, reputation: -6, parentHealth: 12, logLine: 'Borrowed from relatives for treatment.' }, resultText: 'Chacha lends, but never lets you forget it.' },
      { label: 'Delay, hope it gets better', effects: { parentHealth: -10, happiness: -10, logLine: 'Delayed parent\'s treatment.' }, resultText: 'Things get worse before they get better.' },
    ],
  },

  // ----------------- YOUNG ADULT -----------------
  {
    id: 'engineering_or_arts',
    title: 'College Choice',
    minAge: 17, maxAge: 19,
    text: () => 'Your JEE rank is in. So is a Delhi University arts seat.',
    choices: (c) => [
      { label: 'Engineering — safe, predictable', effects: { intelligence: 6, wealth: 5, happiness: -3, parentWarmth: 6, logLine: 'Joined an engineering college.' }, resultText: 'Mummy distributes laddoos.' },
      { label: 'Arts — follow your gut', effects: { charm: 6, happiness: 8, parentWarmth: -10, wealth: -4, logLine: 'Chose arts over engineering.' }, resultText: c.father.strictness > 60 ? 'Papa doesn\'t speak to you for a week.' : 'Papa shrugs and says, "Do well at least."' },
    ],
  },
  {
    id: 'first_job',
    title: 'First Job Offer',
    minAge: 21, maxAge: 25,
    text: () => 'A startup offers ₹35k/month. A PSU offers ₹28k/month and pension.',
    choices: () => [
      { label: 'Startup — hustle', effects: { wealth: 8, intelligence: 4, health: -4, parentWarmth: -3, logLine: 'Joined a startup.' }, resultText: 'You learn fast. You sleep at office.' },
      { label: 'PSU — stable', effects: { wealth: 5, happiness: 3, parentWarmth: 8, logLine: 'Joined a PSU.' }, resultText: 'Relatives finally stop asking when you\'ll "settle".' },
    ],
  },
  {
    id: 'arranged_proposal',
    title: 'Rishta Aaya Hai',
    minAge: 24, maxAge: 32,
    weight: 1.3,
    condition: (c) => !c.romance || c.romance.status !== 'active',
    text: (c) => `${c.mother.name} shows you a biodata photo. "Beta, just meet her once."`,
    choices: (c) => [
      { label: 'Agree to meet', effects: { parentWarmth: 6, triggerRomance: 'girlfriend', logLine: 'Met a rishta and started talking.' }, resultText: 'Tea is poured. Awkward smiles. You exchange numbers.' },
      { label: 'Refuse — "Not now, Ma"', effects: { parentWarmth: -6, happiness: 2, logLine: 'Refused a rishta.' }, resultText: 'She sighs the sigh of all Indian mothers.' },
    ],
  },
  {
    id: 'compatibility_test',
    title: 'A Real Fight',
    minAge: 15, maxAge: 50,
    weight: 1.2,
    condition: (c) => !!c.romance && c.romance.status === 'active',
    text: (c) => `${c.romance!.name} accuses you of never making time. The compatibility is being tested.`,
    choices: (c) => [
      { label: 'Plan a real date this weekend', effects: { romanceAffection: 12, wealth: -4, happiness: 4, logLine: `Worked things out with ${c.romance!.name}.` }, resultText: 'You both laugh again over momos.' },
      { label: 'Snap back — "I\'m busy, deal with it"', effects: { romanceAffection: -20, happiness: -5, logLine: 'Snapped at partner during a fight.' }, resultText: c.romance!.compatibility < 40 ? 'They leave. For good.' : 'A cold week follows.' },
      { label: 'Suggest a break', effects: { triggerBreakup: true, happiness: -8, logLine: `Took a break from ${c.romance!.name}.` }, resultText: 'The "break" becomes permanent.' },
    ],
  },
  {
    id: 'shaadi',
    title: 'Marriage?',
    minAge: 25, maxAge: 40,
    weight: 1,
    condition: (c) => !!c.romance && c.romance.status === 'active' && c.romance.affection > 70,
    text: (c) => `Three years in with ${c.romance!.name}. Both families are dropping hints.`,
    choices: (c) => [
      { label: 'Propose, with parents\' blessing', effects: { happiness: 15, wealth: -20, parentWarmth: 10, logLine: `Married ${c.romance!.name}.` }, resultText: 'Sehra, ghodi, baraat. A new life begins.' },
      { label: 'Elope quietly', effects: { happiness: 8, parentWarmth: -20, reputation: -10, logLine: 'Eloped.' }, resultText: 'Court marriage. The family WhatsApp group explodes.' },
      { label: 'Postpone — "Career first"', effects: { romanceAffection: -10, wealth: 4, logLine: 'Postponed marriage for career.' }, resultText: 'Your partner nods. Their eyes don\'t.' },
    ],
  },

  // ----------------- ADULT -----------------
  {
    id: 'midlife',
    title: 'Promotion or Family',
    minAge: 30, maxAge: 50,
    text: () => 'A promotion needs you to relocate to Bangalore. Family won\'t move.',
    choices: () => [
      { label: 'Take it, commute monthly', effects: { wealth: 12, happiness: -6, romanceAffection: -8, health: -4, logLine: 'Took a long-distance promotion.' }, resultText: 'More money. Less home.' },
      { label: 'Stay, decline politely', effects: { wealth: -2, happiness: 5, romanceAffection: 6, logLine: 'Declined relocation for family.' }, resultText: 'A colleague gets the role. You sleep in your own bed.' },
    ],
  },
  {
    id: 'aging_parent',
    title: 'Parents Are Old Now',
    minAge: 35, maxAge: 70,
    condition: (c) => c.father.alive || c.mother.alive,
    text: () => 'Your parents need full-time care. So does your career.',
    choices: () => [
      { label: 'Bring them home', effects: { wealth: -8, happiness: 4, parentWarmth: 12, parentHealth: 8, logLine: 'Took in aging parents.' }, resultText: 'The house is fuller, busier, warmer.' },
      { label: 'Pay for a caretaker', effects: { wealth: -12, parentWarmth: -2, parentHealth: 4, logLine: 'Hired a caretaker for parents.' }, resultText: 'Practical. Quietly guilty.' },
      { label: 'Old age home', effects: { wealth: -4, parentWarmth: -14, parentHealth: -4, reputation: -8, logLine: 'Sent parents to an old age home.' }, resultText: 'Relatives never let this one go.' },
    ],
  },
];

// Pick an eligible event with weighted random
export const pickEvent = (c: RPGCharacter): RPGEvent | null => {
  const eligible = LIFE_EVENTS.filter(
    e => c.age >= e.minAge && c.age <= e.maxAge && (!e.condition || e.condition(c))
  );
  if (!eligible.length) return null;
  const total = eligible.reduce((s, e) => s + (e.weight ?? 1), 0);
  let r = Math.random() * total;
  for (const e of eligible) {
    r -= (e.weight ?? 1);
    if (r <= 0) return e;
  }
  return eligible[0];
};
