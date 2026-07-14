const basePath = import.meta.env.BASE_URL;
const sitePath = (path) => `${basePath}${path}`;

export const projects = [
  {
    id: 'interstellar-drive-final',
    title: 'Interstellar Drive',
    category: 'Games',
    role: 'Capstone Project / Producer & Audio & QA',
    year: '2025',
    short: 'A capstone project exploring cinematic racing, player flow, and production leadership.',
    description:
      'A co-op racing rhythm game set in a 1970s retro-futurist universe, following a cosmic journey to discover the most beautiful music. As Producer, Audio Director, and QA Director, I helped guide production planning, task tracking, audio direction, and QA testing.',
    image: new URL('../../images/interstellar_drive_final/card1.png', import.meta.url).href,
    visualLabel: 'Interstellar Drive',
    link: sitePath('interstellar_drive_final/'),
    external: false,
    tags: ['UE5', 'C++', 'Wwise', 'Reaper', 'Jira', 'Steam'],
    icon: 'Game'
  },
  {
    id: 'grid-master',
    title: 'Grid Master',
    category: 'Games',
    role: 'Producer / Sound Design',
    year: '2025',
    short: 'A grid-based shooting game with compact tactical decisions.',
    description:
      'An award-winning multiplayer third-person shooter where players battle across nine time dimensions and capture three connected eras to win. As the Producer and Sound Designer, I coordinated the development workflow and created the game’s award-winning audio while also contributing to level design and VFX. 🏆 The project won Best Sound Design at the 1st Triangle Game Jam.',
    image: new URL('../../images/grid_master/card2.png', import.meta.url).href,
    link: 'https://kerrylu.itch.io/gridmaster',
    external: true,
    tags: ['UE5', 'FL Studio', 'Itch.io'],
    icon: 'Game'
  },
  {
    id: 'the-dinner',
    title: 'The Dinner',
    category: 'Games',
    role: 'Narrative Production',
    year: '2025',
    short: 'An intimate game scene built around mood and story.',
    description:
      'A narrative piece where staging, pacing, team alignment, and sensory detail carry the emotional weight of the experience.',
    image: new URL('../../images/the_dinner/image_01.png', import.meta.url).href,
    link: sitePath('the_dinner/'),
    external: false,
    tags: ['Narrative', 'Mood', 'Scene Design'],
    icon: 'Film'
  },
  {
    id: 'insurance-fraud',
    title: 'Insurance Fraud',
    category: 'Games',
    role: 'Team Production / Systems',
    year: '2025',
    short: 'A playful itch.io project with absurdist systems energy.',
    description:
      'A compact game concept shaped around readable goals, humor, fast iteration, and small-team production constraints.',
    image: new URL('../../images/insurance_fraud/image_01.png', import.meta.url).href,
    link: 'https://ronithkumardevarakonda.itch.io/insurance-fraud',
    external: true,
    tags: ['Indie', 'Systems', 'Itch.io'],
    icon: 'Game'
  },
  {
    id: 'ue5-screenshot-tool',
    title: 'UE5 Screenshot Tool',
    category: 'Tools',
    role: 'Production Tooling',
    year: '2025',
    short: 'A bookmark and screenshot workflow tool for Unreal Engine 5.',
    description:
      'An Unreal Engine workflow tool that supports versioned visual review, repeatable camera positions, and faster art-team feedback loops.',
    image: new URL('../../images/ue5_screenshot/screenshot_02.png', import.meta.url).href,
    link: sitePath('ue5_screenshot/'),
    external: false,
    tags: ['UE5', 'Python', 'Artist Tools'],
    icon: 'Tool'
  },
  {
    id: 'ue5-ai-material',
    title: 'UE5 AI Texture & Material Pipeline',
    category: 'Tools',
    role: 'Pipeline Production',
    year: '2026',
    short: 'A UE5 pipeline connecting viewport screenshots to AI-assisted materials.',
    description:
      'A concept-to-asset workflow using UE5 Python, Hunyuan, and Meshy AI to reduce handoff friction and speed up look-development.',
    image: new URL('../../images/ue5_ai_material/ue5_ai_material5.png', import.meta.url).href,
    link: sitePath('ue5_ai_material/'),
    external: false,
    tags: ['UE5', 'AI Pipeline', 'PyQt'],
    icon: 'AI'
  },
  {
    id: 'sound-reel',
    title: 'Sound Reel',
    category: 'Sound',
    role: 'Sound Design',
    year: '2026',
    short: 'Interactive audio direction, ambience, and gameplay feedback.',
    description:
      'A focused reel showing how sound can clarify interaction, build place, and create emotional texture in games.',
    image: new URL('../../images/sound_reel/card7.png', import.meta.url).href,
    link: '#soundreel',
    external: false,
    tags: ['Sound Design', 'Gameplay Audio', 'Ambience'],
    icon: 'Sound'
  }
];

export const skills = [
  {
    title: 'Game Production',
    text: 'Scope planning, milestone tracking, team coordination, risk awareness, and keeping creative goals actionable.',
    icon: 'Game'
  },
  {
    title: 'Product & Gameplay',
    text: 'Player goals, feature prioritization, gameplay implementation, feedback loops, and decisions that support the core experience.',
    icon: 'Sound'
  },
  {
    title: 'Audio Creation',
    text: 'Sound design judgment, dynamic ambience, musical thinking, and audio direction that gives games identity.',
    icon: 'Tool'
  }
];
