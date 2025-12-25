import { Activity, Achievement, DateScenario } from '@/types/game';

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
  wealth: 30,
  strength: 35,
  looks: 40,
  intelligence: 45,
  education: 35,
  health: 50,
};

export const avatarOptions = ['🧑', '👨', '👩', '🧔', '👱‍♀️', '👱', '🧑‍🦱', '👩‍🦰', '👨‍🦳', '👩‍🦳'];
