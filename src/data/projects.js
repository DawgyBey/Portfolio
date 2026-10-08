/**
 * Your projects. Add as many as you like.
 *  - cover: optional image path (put files in /public/projects, e.g. '/projects/lumina.jpg').
 *           Without it, a generated art tile with the ASCII sketch is used.
 *  - link:  where clicking the tile goes.
 */
export const PROJECTS = [
  {
    id: 'M_001',
    name: 'Lumina',
    kind: 'Academic Project',
    year: '2026',
    desc: 'A seamless fusion of computer vision and architectural glass. Designed to empower the modern campus with Invisible Intelligence.',
    stack: ['Computer Vision', 'Smart Mirror', 'IoT'],
    link: 'https://github.com/sunwaycollege-research/lumina_smart_mirror',
    cover: null,
    ascii: [
      '┌──────────────────┐',
      '│  ◉  LUMINA  ◉    │',
      '│  ┌────────────┐  │',
      '│  │ face.detect│  │',
      '│  │ ████████░░ │  │',
      '│  └────────────┘  │',
      '└──────────────────┘',
    ],
  },
  {
    id: 'M_002',
    name: 'Incanto',
    kind: 'Personal Project',
    year: '2026',
    desc: 'An AI-powered gift and product finder that helps users discover personalized recommendations using intelligent matching and real-time e-commerce data.',
    stack: ['Recommender', 'NLP Matching', 'Live Data'],
    link: 'https://github.com/DawgyBey/Incanto',
    cover: null,
    ascii: [
      '┌──────────────────┐',
      '│ ✦ INCANTO ✦      │',
      '│  query ──► embed │',
      '│  embed ──► rank  │',
      '│  rank  ──► gift  │',
      '└──────────────────┘',
    ],
  },
]
