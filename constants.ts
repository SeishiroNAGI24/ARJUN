import { Rank, Specialization, SpecializationName, Dungeon, Phase, StatType } from './types';

export const LEADERBOARD_DATA = [
  { rank: 1, name: 'Shadow Monarch', level: 99, title: Rank.S },
  { rank: 2, name: 'Code Emperor', level: 95, title: Rank.S },
  { rank: 3, name: 'You', level: 1, title: Rank.F },
  { rank: 4, name: 'Syntax Sage', level: 88, title: Rank.A },
  { rank: 5, name: 'Logic Lord', level: 85, title: Rank.A },
];

export const RANKS_DATA: Record<Rank, { color: string, threshold: number }> = {
  [Rank.S]: { color: 'text-yellow-400', threshold: 90 },
  [Rank.A]: { color: 'text-red-500', threshold: 70 },
  [Rank.B]: { color: 'text-blue-400', threshold: 50 },
  [Rank.C]: { color: 'text-green-400', threshold: 30 },
  [Rank.D]: { color: 'text-gray-400', threshold: 20 },
  [Rank.E]: { color: 'text-gray-500', threshold: 10 },
  [Rank.F]: { color: 'text-gray-600', threshold: 0 },
};

export const SPECIALIZATIONS_DATA: Specialization[] = [
    {
      id: 1,
      name: SpecializationName.FrontendMaster,
      description: 'Masters of the user interface, weaving intricate designs with flawless functionality.',
      icon: '🎨',
      bonus: { stat: StatType.Creativity, amount: 10 },
    },
    {
      id: 2,
      name: SpecializationName.BackendLegend,
      description: 'Architects of data and logic, building robust systems that power the digital world.',
      icon: '⚙️',
      bonus: { stat: StatType.Systems, amount: 10 },
    },
    {
      id: 3,
      name: SpecializationName.DevOpsOverlord,
      description: 'Commanders of infrastructure, ensuring seamless deployment and unwavering stability.',
      icon: '🚀',
      bonus: { stat: StatType.Logic, amount: 10 },
    },
];

export const BOOTCAMP_DATA: Phase[] = [
  {
    id: 1,
    title: "Level 1: Initiate",
    theme: "Core Skill: Python basics (syntax, data types, control flow). Think in terms of 'input -> transform -> output'.",
    isUnlocked: true,
    quests: [
      { id: 101, name: "Challenge: CLI Calculator", description: "Build a command-line interface calculator in 2 hours.", difficulty: 'Easy', reward: '+100 EXP, +5 Logic', cleared: false },
      { id: 102, name: "Boss Assessment: Text To-Do App", description: "Code a text-based to-do app with add/delete features.", difficulty: 'Medium', reward: '+250 EXP, +10 Logic', cleared: false }
    ]
  },
  {
    id: 2,
    title: "Level 2: Apprentice",
    theme: "Core Skill: Data structures (lists, dicts, sets). Visualize data flow in memory and choose the right DS for each task.",
    isUnlocked: false,
    quests: [
      { id: 201, name: "Challenge: Custom Linked List", description: "Implement a custom linked list and its traversal routines.", difficulty: 'Medium', reward: '+200 EXP, +10 Algorithms', cleared: false },
      { id: 202, name: "Boss Assessment: Simple Memory Cache", description: "Build a simple memory cache with a basic eviction policy.", difficulty: 'Hard', reward: '+400 EXP, +15 Systems', cleared: false }
    ]
  },
  {
    id: 3,
    title: "Level 3: Code Warrior",
    theme: "Core Skill: Algorithms (sorting, searching). Identify operation hotspots and optimize for time and space trade-offs.",
    isUnlocked: false,
    quests: [
      { id: 301, name: "Challenge: Benchmark Sorts", description: "Code and benchmark QuickSort vs MergeSort, producing a report.", difficulty: 'Medium', reward: '+300 EXP, +15 Algorithms', cleared: false },
      { id: 302, name: "Boss Assessment: Kth Largest Element", description: "Solve the 'Kth largest element' problem in a single pass.", difficulty: 'Hard', reward: '+500 EXP, +20 Algorithms', cleared: false }
    ]
  },
  {
    id: 4,
    title: "Level 4: System Architect I",
    theme: "Core Skill: Object-Oriented Design (SOLID principles). Favor composition over inheritance; design clean interfaces with low coupling.",
    isUnlocked: false,
    quests: [
      { id: 401, name: "Challenge: E-commerce Cart Design", description: "Design a basic e-commerce cart class hierarchy.", difficulty: 'Medium', reward: '+400 EXP, +15 Systems', cleared: false },
      { id: 402, name: "Boss Assessment: Multi-Tenant API", description: "Architect a multi-tenant API server focusing on OOD principles.", difficulty: 'Hard', reward: '+600 EXP, +20 Systems', cleared: false }
    ]
  },
  {
    id: 5,
    title: "Level 5: Backend Conqueror",
    theme: "Core Skill: REST & GraphQL APIs, Databases. Model resources, not methods, and focus on statelessness and scale patterns.",
    isUnlocked: false,
    quests: [
      { id: 501, name: "Challenge: RESTful Blog Service", description: "Build a RESTful blog service with CRUD operations and pagination.", difficulty: 'Medium', reward: '+500 EXP, +15 Systems', cleared: false },
      { id: 502, name: "Boss Assessment: GraphQL Gateway", description: "Create a GraphQL gateway that aggregates 3 microservices.", difficulty: 'Hard', reward: '+700 EXP, +20 Systems', cleared: false }
    ]
  },
  {
    id: 6,
    title: "Level 6: Frontend Vanguard",
    theme: "Core Skill: HTML/CSS/JS frameworks (React/Vue). Break UI into reusable widgets and manage state with unidirectional data flow.",
    isUnlocked: false,
    quests: [
      { id: 601, name: "Challenge: Dynamic Dashboard", description: "Build a dynamic dashboard with responsive charts.", difficulty: 'Medium', reward: '+550 EXP, +15 Creativity', cleared: false },
      { id: 602, name: "Boss Assessment: Collaborative Canvas", description: "Build a collaborative editing canvas, similar to Figma.", difficulty: 'Hard', reward: '+750 EXP, +20 Creativity', cleared: false }
    ]
  },
  {
    id: 7,
    title: "Level 7: DevOps Adept",
    theme: "Core Skill: CI/CD pipelines, containerization (Docker). Automate everything you'd hate to do twice. Use immutable infrastructure.",
    isUnlocked: false,
    quests: [
      { id: 701, name: "Challenge: Containerize & Deploy", description: "Containerize a frontend + backend app and deploy it via GitHub Actions.", difficulty: 'Medium', reward: '+600 EXP, +20 Systems', cleared: false },
      { id: 702, name: "Boss Assessment: Auto-Scaling on EKS", description: "Implement a full auto-scaling solution on AWS EKS.", difficulty: 'Hard', reward: '+800 EXP, +25 Systems', cleared: false }
    ]
  },
  {
    id: 8,
    title: "Level 8: Security Sentinel",
    theme: "Core Skill: OWASP Top 10, authentication flows. Assume breach, minimize blast radius, and apply the principle of least privilege.",
    isUnlocked: false,
    quests: [
      { id: 801, name: "Challenge: Harden API", description: "Harden your previous blog API against SQLi and XSS vulnerabilities.", difficulty: 'Medium', reward: '+650 EXP, +20 Logic', cleared: false },
      { id: 802, name: "Boss Assessment: Full Security Audit", description: "Conduct a full security audit and implement a patch pipeline.", difficulty: 'Nightmare', reward: '+900 EXP, +25 Logic', cleared: false }
    ]
  },
  {
    id: 9,
    title: "Level 9: Scalability Sage",
    theme: "Core Skill: Distributed systems, caching, load balancing. Optimize for failure and eventual consistency. Design with partitioning and sharding.",
    isUnlocked: false,
    quests: [
      { id: 901, name: "Challenge: Simulate Chat App", description: "Architect and simulate a chat application serving 10k concurrent users.", difficulty: 'Hard', reward: '+800 EXP, +25 Systems', cleared: false },
      { id: 902, name: "Boss Assessment: TikTok-Scale Feed", description: "Design a TikTok-scale feed delivery system.", difficulty: 'Nightmare', reward: '+1000 EXP, +30 Systems', cleared: false }
    ]
  },
  {
    id: 10,
    title: "Level 10: Innovation Architect",
    theme: "Core Skill: ML/AI fundamentals and integration. Frame problems as prediction/classification/regression tasks.",
    isUnlocked: false,
    quests: [
      { id: 1001, name: "Challenge: Recommendation Engine", description: "Integrate a recommendation engine into an existing application.", difficulty: 'Hard', reward: '+900 EXP, +25 Algorithms', cleared: false },
      { id: 1002, name: "Boss Assessment: Full MLOps Pipeline", description: "Deploy a full MLOps pipeline for an ML model.", difficulty: 'Nightmare', reward: '+1200 EXP, +30 Systems', cleared: false }
    ]
  },
  {
    id: 11,
    title: "Level 11: Leadership Luminary",
    theme: "Core Skill: Team management, mentoring, code reviews. Think in systems of people, not just code. Design scalable processes.",
    isUnlocked: false,
    quests: [
      { id: 1101, name: "Challenge: Lead a Sprint", description: "Lead a 3-member sprint from planning to demo, focusing on team velocity.", difficulty: 'Hard', reward: '+1000 EXP, +20 Creativity', cleared: false },
      { id: 1102, name: "Boss Assessment: Resolve Team Blocker", description: "Resolve a critical cross-team blocker under intense time pressure.", difficulty: 'Nightmare', reward: '+1500 EXP, +30 Logic', cleared: false }
    ]
  },
  {
    id: 12,
    title: "Level 12: Shadow Monarch",
    theme: "Core Skill: End-to-end product vision, entrepreneurship. Solve real problems, not just technical puzzles. Master tech, team, and market.",
    isUnlocked: false,
    quests: [
      { id: 1201, name: "Challenge: Launch a SaaS", description: "Ideate, prototype, and launch your own SaaS product in 30 days.", difficulty: 'Nightmare', reward: '+2500 EXP, +50 Creativity', cleared: false },
      { id: 1202, name: "Boss Assessment: Achieve PMF", description: "Achieve verifiable product-market fit indicators for your SaaS.", difficulty: 'Nightmare', reward: '+5000 EXP, +100 All Stats', cleared: false }
    ]
  }
];
