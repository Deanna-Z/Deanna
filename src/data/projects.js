const basePath = import.meta.env.BASE_URL;
const sitePath = (path) => `${basePath}${path}`;

export const projects = [
  {
    id: 'interstellar-drive-final',
    title: 'Sound Reel',
    category: 'Games',
    role: 'Capstone Project / Producer & Audio & QA',
    year: '2025',
    short: 'Interactive Audio Direction, Dynamic Audio Systems, Ambience, and Gameplay Feedback',
    description:
      '🚀 A <b>co-op</b> <b>racing</b> 🚗 <b>rhythm 🎵 game</b> set in a 1970s retro-futurist universe, following a cosmic journey to discover the most beautiful music. As <b>Producer, Audio Director</b>, and <b>QA Director</b>, I helped guide <b>production planning</b>, <b>task tracking</b>, <b>audio direction</b> 🔊, and <b>QA testing</b>.',
    image: new URL('../../images/interstellar_drive_final/card1.png', import.meta.url).href,
    visualLabel: 'Interstellar Drive',
    link: sitePath('interstellar_drive_final/'),
    external: false,
    tags: ['Unreal Engine 5', 'C++', 'Wwise', 'Reaper', 'Jira', 'Steam'],
    icon: 'Game'
  },
  {
    id: 'the-dinner',
    title: 'The Dinner',
    category: 'Games',
    role: 'Production / Audio',
    year: '2025',
    short: 'An award-winning co-op puzzle game with flying pieces and delightful surprises.',
    description:
      'An <b>award-winning</b> cooperative <b>puzzle game</b> where players work together to align flying puzzle pieces, or embrace the silly, adorable surprises when things go wrong. <b>🏆 Winner of Best Game</b> at the Duke Game Jam, with my contributions spanning <b>game design</b> and <b>audio production</b>.',
    image: new URL('../../images/the_dinner/image_01.png', import.meta.url).href,
    link: sitePath('the_dinner/'),
    external: false,
    tags: ['Unity', 'C#', 'Logic Pro'],
    icon: 'Film'
  },
  {
    id: 'grid-master',
    title: 'Grid Master',
    category: 'Games',
    role: 'Producer / Sound Design',
    year: '2025',
    short: 'A grid-based shooting game with compact tactical decisions.',
    description:
      'An <b>award-winning</b> multiplayer third-person shooter where players battle across nine time dimensions and capture three connected eras to win. As the <b>Producer</b> and <b>Sound Designer</b>, I coordinated the development workflow and created the game’s award-winning audio while also contributing to <b>level design</b> and <b>VFX</b>. 🏆 The project won <b>Best Sound Design</b> at the <b>1st Triangle Game Jam</b>.',
    image: new URL('../../images/grid_master/card2.png', import.meta.url).href,
    link: 'https://kerrylu.itch.io/gridmaster',
    external: true,
    tags: ['Unreal Engine 5', 'FL Studio', 'Itch.io'],
    icon: 'Game'
  },
  {
    id: 'insurance-fraud',
    title: 'Insurance Fraud',
    category: 'Games',
    role: 'Producer / UI / UX / Audio',
    year: '2025',
    short: 'A darkly comedic insurance scam simulator with ragdoll chaos.',
    description:
      'A <b>darkly comedic 🎭 simulation</b> game where players orchestrate convincing “accidents” using environmental interactions and perfectly timed ragdoll physics. Across four unique levels, players balance risk and reward while avoiding fraud charges or even worse consequences. 🎮 As <b>Producer</b>, I <b>managed schedules</b>, <b>tasks</b>, and team collaboration while leading <b>UI</b> design and <b>sound design</b> 🔊.',
    image: new URL('../../images/insurance_fraud/image_01.png', import.meta.url).href,
    link: 'https://ronithkumardevarakonda.itch.io/insurance-fraud',
    external: true,
    tags: ['Unreal Engine 5', 'C++', 'Reaper', 'Itch.io'],
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
    tags: ['Unreal Engine 5', 'Python', 'Artist Tools', 'Independent Project'],
    icon: 'Tool'
  },
  {
    id: 'ue5-ai-material',
    title: 'UE5 AI Texture & Material Pipeline',
    category: 'Tools',
    role: 'AI Tool Development',
    year: '2026',
    short: 'A UE5 pipeline connecting viewport screenshots to AI-assisted materials.',
    description:
      'A concept-to-asset workflow using UE5 Python, Hunyuan, and Meshy AI to reduce handoff friction and speed up look-development.',
    image: new URL('../../images/ue5_ai_material/ue5_ai_material5.png', import.meta.url).href,
    link: sitePath('ue5_ai_material/'),
    external: false,
    tags: ['Unreal Engine 5', 'AI Pipeline', 'PyQt', 'Independent Project'],
    icon: 'AI'
  },
  {
    id: 'sound-reel',
    title: 'Sound Reel',
    category: 'Sound',
    role: 'Sound Design',
    year: '2026',
    short: 'Interactive Audio Direction, Dynamic Audio Systems, Ambience, and Gameplay Feedback',
    description:
      '🎧 A focused reel showcasing how sound clarifies player interactions, builds immersive worlds, and creates emotional texture through sound design, ⚙️ Wwise RTPC systems, and FMOD implementation.',
    image: new URL('../../images/sound_reel/card7.png', import.meta.url).href,
    link: '#soundreel',
    external: false,
    tags: ['Reaper', 'FL Studio', 'Wwise', 'FMOD'],
    icon: 'Sound'
  }
];

export const skills = [
  {
    title: '🎮 Game Production',
    text: 'Agile production, scope planning, sprint coordination, milestone tracking, risk management, playtesting, and cross-functional team leadership.',
    icon: 'Game'
  },
  {
    title: '🤖 AI &amp; Creative Technology',
    text: 'AI-powered product development, workflow automation, rapid prototyping, prompt design, and human-centered AI experiences.',
    icon: 'AI'
  },
  {
    title: '📊 Product Management',
    text: 'User research, product strategy, feature prioritization, roadmap planning, stakeholder alignment, and data-informed iteration.',
    icon: 'Product'
  }
];
