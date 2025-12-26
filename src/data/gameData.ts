import { Activity, Achievement, DateScenario, PotentialPartner, RandomEvent } from '@/types/game';

export const activities: Activity[] = [
  {
    id: 'work',
    name: 'Work Overtime',
    description: 'Put in extra hours to earn more money',
    icon: '💼',
    statChanges: { wealth: 8, health: -3, strength: -2 },
    stabilityChange: 5,
    duration: 1,
  },
  {
    id: 'gym',
    name: 'Hit the Gym',
    description: 'Build strength and improve your physique',
    icon: '🏋️',
    statChanges: { strength: 6, health: 4, looks: 3 },
    stabilityChange: 3,
    duration: 1,
  },
  {
    id: 'study',
    name: 'Study & Learn',
    description: 'Expand your knowledge and credentials',
    icon: '📚',
    statChanges: { intelligence: 5, education: 7 },
    stabilityChange: 4,
    duration: 1,
  },
  {
    id: 'spa',
    name: 'Self-Care Day',
    description: 'Pamper yourself and boost your appearance',
    icon: '✨',
    statChanges: { looks: 8, health: 3, wealth: -5 },
    stabilityChange: 2,
    duration: 1,
  },
  {
    id: 'meditate',
    name: 'Meditation',
    description: 'Find inner peace and mental clarity',
    icon: '🧘',
    statChanges: { intelligence: 3, health: 5 },
    stabilityChange: 8,
    duration: 1,
  },
  {
    id: 'invest',
    name: 'Invest Wisely',
    description: 'Grow your wealth through smart investments',
    icon: '📈',
    statChanges: { wealth: 12, intelligence: 2 },
    stabilityChange: 6,
    duration: 1,
  },
];

export const achievements: Achievement[] = [
  {
    id: 'first_stable',
    title: 'Finding Balance',
    description: 'Reach 50% Stability Index',
    icon: '⚖️',
  },
  {
    id: 'very_stable',
    title: 'Rock Solid',
    description: 'Reach 80% Stability Index',
    icon: '🏔️',
  },
  {
    id: 'max_stable',
    title: 'Perfectly Balanced',
    description: 'Reach 100% Stability Index',
    icon: '🌟',
  },
  {
    id: 'wealthy',
    title: 'Making Bank',
    description: 'Reach 80+ Wealth stat',
    icon: '💰',
  },
  {
    id: 'buff',
    title: 'Iron Will',
    description: 'Reach 80+ Strength stat',
    icon: '💪',
  },
  {
    id: 'first_date',
    title: 'First Date',
    description: 'Go on your first date',
    icon: '💕',
  },
  {
    id: 'relationship',
    title: 'Official',
    description: 'Start a relationship',
    icon: '💑',
  },
  {
    id: 'all_rounder',
    title: 'Renaissance Person',
    description: 'Have all stats above 60',
    icon: '🎯',
  },
  {
    id: 'survivor',
    title: 'Survivor',
    description: 'Overcome 5 negative events',
    icon: '🛡️',
  },
];

export const partnerPersonalities = [
  {
    id: 'ambitious',
    name: 'Ambitious',
    description: 'Values success and hard work',
    preferences: { wealth: 0.3, intelligence: 0.3, education: 0.2, looks: 0.1, strength: 0.05, health: 0.05 },
  },
  {
    id: 'athletic',
    name: 'Athletic',
    description: 'Loves fitness and outdoor activities',
    preferences: { strength: 0.35, health: 0.35, looks: 0.15, wealth: 0.05, intelligence: 0.05, education: 0.05 },
  },
  {
    id: 'intellectual',
    name: 'Intellectual',
    description: 'Appreciates deep conversations and learning',
    preferences: { intelligence: 0.35, education: 0.35, health: 0.1, wealth: 0.1, looks: 0.05, strength: 0.05 },
  },
  {
    id: 'balanced',
    name: 'Balanced',
    description: 'Values overall stability and well-roundedness',
    preferences: { wealth: 0.17, strength: 0.17, looks: 0.17, intelligence: 0.17, education: 0.16, health: 0.16 },
  },
];

export const potentialPartners: PotentialPartner[] = [
  {
    id: 'alex',
    name: 'Alex',
    avatar: '👩',
    age: 27,
    bio: "Coffee enthusiast, weekend hiker, and aspiring chef. Looking for someone to share adventures with!",
    personality: 'The Go-Getter',
    personalityId: 'ambitious',
    traits: ['Driven', 'Adventurous', 'Foodie'],
    compatibilityHint: 'Values ambition and intelligence',
    preferences: { wealth: 0.3, intelligence: 0.3, education: 0.2, looks: 0.1, strength: 0.05, health: 0.05 },
  },
  {
    id: 'jordan',
    name: 'Jordan',
    avatar: '🧔',
    age: 29,
    bio: "Gym rat by day, bookworm by night. Yes, I know that's an unusual combo.",
    personality: 'The Renaissance Soul',
    personalityId: 'balanced',
    traits: ['Fit', 'Curious', 'Loyal'],
    compatibilityHint: 'Appreciates well-rounded partners',
    preferences: { wealth: 0.17, strength: 0.17, looks: 0.17, intelligence: 0.17, education: 0.16, health: 0.16 },
  },
  {
    id: 'sam',
    name: 'Sam',
    avatar: '👱‍♀️',
    age: 25,
    bio: "PhD student by day, yoga instructor by weekend. Seeking intellectual connection.",
    personality: 'The Thinker',
    personalityId: 'intellectual',
    traits: ['Smart', 'Zen', 'Deep'],
    compatibilityHint: 'Craves deep conversations',
    preferences: { intelligence: 0.35, education: 0.35, health: 0.1, wealth: 0.1, looks: 0.05, strength: 0.05 },
  },
  {
    id: 'taylor',
    name: 'Taylor',
    avatar: '👨‍🦱',
    age: 28,
    bio: "Marathon runner and nutrition coach. Looking for someone who can keep up! 🏃",
    personality: 'The Athlete',
    personalityId: 'athletic',
    traits: ['Energetic', 'Disciplined', 'Outdoorsy'],
    compatibilityHint: 'Attracted to fitness and health',
    preferences: { strength: 0.35, health: 0.35, looks: 0.15, wealth: 0.05, intelligence: 0.05, education: 0.05 },
  },
  {
    id: 'casey',
    name: 'Casey',
    avatar: '🧑‍🦰',
    age: 26,
    bio: "Startup founder, failed poet, successful dog parent. Coffee is my love language.",
    personality: 'The Entrepreneur',
    personalityId: 'ambitious',
    traits: ['Creative', 'Ambitious', 'Witty'],
    compatibilityHint: 'Values success and charm',
    preferences: { wealth: 0.35, intelligence: 0.25, looks: 0.2, education: 0.1, strength: 0.05, health: 0.05 },
  },
  {
    id: 'riley',
    name: 'Riley',
    avatar: '👩‍🦳',
    age: 30,
    bio: "Doctor by profession, gamer by passion. Looking for someone real in this virtual world.",
    personality: 'The Caregiver',
    personalityId: 'intellectual',
    traits: ['Caring', 'Nerdy', 'Reliable'],
    compatibilityHint: 'Values health and intelligence',
    preferences: { health: 0.3, intelligence: 0.3, education: 0.2, wealth: 0.1, looks: 0.05, strength: 0.05 },
  },
];

export const randomEvents: RandomEvent[] = [
  {
    id: 'job_offer',
    title: 'Exciting Job Offer!',
    category: 'Career',
    description: 'A prestigious company reaches out with an amazing opportunity. The catch? It requires relocating and intense hours initially.',
    type: 'neutral',
    choices: [
      { text: 'Accept the offer - chase the dream!', risk: 'high', effects: { wealth: 15, health: -10, strength: -5 }, affectionChange: -5, stabilityMultiplier: 0.8 },
      { text: 'Negotiate remote work', risk: 'medium', effects: { wealth: 8, intelligence: 3 }, affectionChange: 0, stabilityMultiplier: 0.95 },
      { text: 'Decline politely', risk: 'low', effects: {}, affectionChange: 2, stabilityMultiplier: 1.0 },
    ],
  },
  {
    id: 'health_scare',
    title: 'Health Concern',
    category: 'Health',
    description: "You've been feeling off lately. The doctor suggests some lifestyle changes after a routine checkup.",
    type: 'negative',
    choices: [
      { text: 'Start a strict health regime', risk: 'low', effects: { health: 10, wealth: -5, looks: 3 }, affectionChange: 1, stabilityMultiplier: 1.1 },
      { text: 'Ignore it, you feel fine', risk: 'high', effects: { health: -15 }, affectionChange: -2, stabilityMultiplier: 0.85 },
      { text: 'Take it easy for a while', risk: 'medium', effects: { health: 5, strength: -3 }, affectionChange: 0, stabilityMultiplier: 1.0 },
    ],
  },
  {
    id: 'family_emergency',
    title: 'Family Emergency',
    category: 'Personal',
    description: 'A family member needs help urgently. This will require your time and resources.',
    type: 'negative',
    choices: [
      { text: 'Drop everything to help', risk: 'medium', effects: { wealth: -10, health: -5, intelligence: 2 }, affectionChange: 5, stabilityMultiplier: 0.85 },
      { text: 'Help within your means', risk: 'low', effects: { wealth: -5 }, affectionChange: 2, stabilityMultiplier: 0.95 },
      { text: 'Send money but stay focused', risk: 'medium', effects: { wealth: -8 }, affectionChange: -3, stabilityMultiplier: 1.0 },
    ],
  },
  {
    id: 'windfall',
    title: 'Unexpected Windfall!',
    category: 'Finance',
    description: 'You received an unexpected bonus! How will you use this sudden wealth?',
    type: 'positive',
    choices: [
      { text: 'Invest it all', risk: 'high', effects: { wealth: 20, intelligence: 2 }, affectionChange: 0, stabilityMultiplier: 0.9 },
      { text: 'Treat yourself and your partner', risk: 'low', effects: { wealth: 5, looks: 5 }, affectionChange: 8, stabilityMultiplier: 1.0 },
      { text: 'Save it for emergencies', risk: 'low', effects: { wealth: 10 }, affectionChange: 1, stabilityMultiplier: 1.1 },
    ],
  },
  {
    id: 'partner_jealousy',
    title: 'Jealousy Issues',
    category: 'Relationship',
    description: 'Your partner noticed you talking to an attractive colleague. They seem bothered.',
    type: 'negative',
    choices: [
      { text: 'Have an honest conversation', risk: 'low', effects: { intelligence: 2 }, affectionChange: 5, stabilityMultiplier: 1.05 },
      { text: "Dismiss their concerns - it's nothing", risk: 'high', effects: {}, affectionChange: -10, stabilityMultiplier: 0.8 },
      { text: 'Avoid the colleague entirely', risk: 'medium', effects: { education: -2 }, affectionChange: 3, stabilityMultiplier: 0.95 },
    ],
  },
  {
    id: 'fitness_challenge',
    title: 'Fitness Challenge',
    category: 'Health',
    description: "A friend challenges you to a month-long fitness competition. It's intense but could be transformative.",
    type: 'neutral',
    choices: [
      { text: 'Go all in!', risk: 'medium', effects: { strength: 12, health: 8, wealth: -3 }, affectionChange: 2, stabilityMultiplier: 0.9 },
      { text: 'Participate casually', risk: 'low', effects: { strength: 5, health: 3 }, affectionChange: 0, stabilityMultiplier: 1.0 },
      { text: 'Decline - not your thing', risk: 'low', effects: {}, affectionChange: -1, stabilityMultiplier: 1.0 },
    ],
  },
  {
    id: 'social_media_drama',
    title: 'Social Media Storm',
    category: 'Social',
    description: 'An old photo of you resurfaces online and is getting unwanted attention.',
    type: 'negative',
    choices: [
      { text: 'Address it publicly with grace', risk: 'medium', effects: { intelligence: 3, looks: -2 }, affectionChange: 2, stabilityMultiplier: 0.95 },
      { text: 'Ignore and let it blow over', risk: 'medium', effects: { looks: -5 }, affectionChange: -2, stabilityMultiplier: 0.9 },
      { text: 'Delete all social media', risk: 'low', effects: { looks: -3, health: 3 }, affectionChange: 1, stabilityMultiplier: 1.0 },
    ],
  },
  {
    id: 'education_opportunity',
    title: 'Learning Opportunity',
    category: 'Education',
    description: 'A prestigious online course becomes available, but it requires significant time investment.',
    type: 'positive',
    choices: [
      { text: 'Enroll and commit fully', risk: 'medium', effects: { education: 15, intelligence: 8, health: -5 }, affectionChange: -3, stabilityMultiplier: 0.85 },
      { text: 'Take it at your own pace', risk: 'low', effects: { education: 8, intelligence: 4 }, affectionChange: 0, stabilityMultiplier: 1.0 },
      { text: "Skip it - you're doing fine", risk: 'low', effects: {}, affectionChange: 1, stabilityMultiplier: 1.0 },
    ],
  },
  {
    id: 'partner_gift',
    title: 'Special Occasion',
    category: 'Relationship',
    description: "It's your partner's birthday! How will you celebrate?",
    type: 'positive',
    choices: [
      { text: 'Throw an extravagant party', risk: 'high', effects: { wealth: -15, looks: 3 }, affectionChange: 12, stabilityMultiplier: 0.85 },
      { text: 'Plan a thoughtful surprise', risk: 'low', effects: { wealth: -5, intelligence: 2 }, affectionChange: 8, stabilityMultiplier: 1.0 },
      { text: 'Keep it simple and intimate', risk: 'low', effects: { wealth: -2 }, affectionChange: 5, stabilityMultiplier: 1.05 },
    ],
  },
  {
    id: 'accident',
    title: 'Minor Accident',
    category: 'Health',
    description: 'You had a small accident. Nothing serious, but it shook you up.',
    type: 'negative',
    choices: [
      { text: 'Rest and recover properly', risk: 'low', effects: { health: -5, strength: -3, wealth: -3 }, affectionChange: 2, stabilityMultiplier: 1.0 },
      { text: 'Push through - no time to rest', risk: 'high', effects: { health: -15, strength: -5 }, affectionChange: -2, stabilityMultiplier: 0.8 },
      { text: 'Use it as a wake-up call', risk: 'low', effects: { health: 5, intelligence: 3 }, affectionChange: 1, stabilityMultiplier: 1.05 },
    ],
  },
];

export const dateScenarios: DateScenario[] = [
  {
    id: 'coffee',
    name: 'Coffee Date',
    icon: '☕',
    description: 'A casual coffee meetup',
    requiredAffection: 0,
    dialogue: [
      { speaker: 'partner', text: "So, tell me about yourself. What do you do for fun?" },
      { 
        speaker: 'player', 
        options: [
          { text: "I love staying active and hitting the gym!", stats: ['strength', 'health'], affectionBonus: 2 },
          { text: "I'm really into reading and learning new things.", stats: ['intelligence', 'education'], affectionBonus: 2 },
          { text: "Honestly, I'm focused on my career right now.", stats: ['wealth'], affectionBonus: 1 },
        ]
      },
      { speaker: 'partner', text: "That's interesting! I appreciate someone who knows what they want." },
    ],
  },
  {
    id: 'dinner',
    name: 'Fancy Dinner',
    icon: '🍽️',
    description: 'An upscale restaurant experience',
    requiredAffection: 20,
    dialogue: [
      { speaker: 'partner', text: "This place is lovely. Do you come here often?" },
      { 
        speaker: 'player', 
        options: [
          { text: "I know the owner actually. Connections matter!", stats: ['wealth', 'intelligence'], affectionBonus: 3 },
          { text: "First time! I wanted to impress you.", stats: ['looks'], affectionBonus: 4 },
          { text: "I read great reviews. I did my research.", stats: ['intelligence', 'education'], affectionBonus: 2 },
        ]
      },
      { speaker: 'partner', text: "Well, I'm definitely impressed so far..." },
    ],
  },
  {
    id: 'hiking',
    name: 'Hiking Adventure',
    icon: '🥾',
    description: 'Explore nature together',
    requiredAffection: 30,
    dialogue: [
      { speaker: 'partner', text: "Wow, this trail is beautiful! How are you holding up?" },
      { 
        speaker: 'player', 
        options: [
          { text: "I could do this all day! Want to race to the top?", stats: ['strength', 'health'], affectionBonus: 4 },
          { text: "It's challenging but the view is worth it.", stats: ['health'], affectionBonus: 3 },
          { text: "Let's take a break and enjoy the scenery.", stats: ['intelligence'], affectionBonus: 2 },
        ]
      },
      { speaker: 'partner', text: "I love spending time in nature with you." },
    ],
  },
  {
    id: 'movie',
    name: 'Movie Night',
    icon: '🎬',
    description: 'Watch a film together',
    requiredAffection: 40,
    dialogue: [
      { speaker: 'partner', text: "What genre should we watch tonight?" },
      { 
        speaker: 'player', 
        options: [
          { text: "How about a documentary? I love learning.", stats: ['intelligence', 'education'], affectionBonus: 3 },
          { text: "Action movie! Something exciting.", stats: ['strength'], affectionBonus: 2 },
          { text: "A romantic comedy - seems fitting.", stats: ['looks'], affectionBonus: 4 },
        ]
      },
      { speaker: 'partner', text: "Perfect choice. I'll make the popcorn!" },
    ],
  },
  {
    id: 'commitment',
    name: 'The Big Question',
    icon: '💍',
    description: 'Take things to the next level',
    requiredAffection: 80,
    dialogue: [
      { speaker: 'partner', text: "We've been through so much together. I feel like this is really special." },
      { 
        speaker: 'player', 
        options: [
          { text: "I feel the same. Will you be my partner officially?", stats: [], affectionBonus: 20 },
          { text: "Let's keep things as they are for now.", stats: [], affectionBonus: -10 },
          { text: "I've been thinking about our future too...", stats: ['intelligence'], affectionBonus: 15 },
        ]
      },
      { speaker: 'partner', text: "This means everything to me..." },
    ],
  },
];

export const initialPlayerStats = {
  wealth: 25,
  strength: 25,
  looks: 30,
  intelligence: 30,
  education: 25,
  health: 35,
};

export const avatarOptions = ['🧑', '👨', '👩', '🧔', '👱‍♀️', '👱', '🧑‍🦱', '👩‍🦰', '👨‍🦳', '👩‍🦳'];
