const basePath = '/version0/';
const sitePath = (path) => `${basePath}${path}`;

export const profile = {
  name: 'Deanna Zhao',
  initials: 'DZ',
  location: 'Production Hub',
  roles: ['Game Producer', 'Product Manager', 'Game Developer', 'Audio Creator'],
  intro:
    'I help game teams move from idea to playable experience by aligning player goals, production scope, gameplay implementation, creative direction, and audio identity.',
  about: {
    title: 'I connect creative ideas, emerging technology, and user-centered production.',
    photo: new URL('../../images/about/aboutme1.jpg', import.meta.url).href,
    paragraphs: [
      '👋 Hi, I’m <b>Yaqing Zhao</b>, but I usually go by <b>Deanna</b>. I’m a <b>producer</b> and <b>product manager</b> with <b>10+ years of multidisciplinary experience</b> across <b>game</b> development, <b>business</b> management, <b>structural</b> engineering, and <b>creative</b> technology. I hold a <b>Master of Engineering in Game Design, Development &amp; Innovation</b> from <b>Duke</b> University and am a certified <b>Project Management Professional (PMP)</b> and <b>Professional Scrum Master (PSM I)</b>.',
      '🎮 I lead multidisciplinary teams, coordinate <b>Agile production</b> and <b>playtesting</b>, develop games with <b>Unreal Engine</b> and <b>Unity</b>, and build <b>AI-powered tools</b> for creative workflows. I enjoy turning user needs and complex ideas into <b>clear priorities, actionable roadmaps</b>, and engaging experiences.',
      '🏗️ Previously, I spent <b>four years as a structural engineer</b> in Macau, contributing to over <b>$1 billion</b> in<b> large-scale</b> infrastructure projects, including facilities supporting the <b>Hong Kong–Zhuhai–Macao Bridge</b>. This experience strengthened my <b>cross-functional communication</b> and <b>collaboration skills </b>in complex project environments.',
      'Outside of work, I’m an <b>11-year marathon runner</b> 🏃‍♀️ and have completed multiple marathons, including the <b>Chicago Marathon</b>.',
      '✨ <b>Fun fact</b>: I play <b>eight instruments</b>, including piano 🎹, guitar, and accordion, and I once designed the whole structure for a <b>dinosaur museum</b>. 🦖',
      '☎️ Feel free to reach out. I’m always happy to connect!'
    ]
  },
  closingLine: 'Let&#039;s build the next playable milestone with clarity, momentum, and player-focused taste.',
  contact: {
    email: 'https://outlook.live.com/mail/0/deeplink/compose?to=deanna0517%40hotmail.com',
    linkedin: 'https://www.linkedin.com/in/yaqing-deanna/'
  },
  resumePage: sitePath('resume/'),
  resumePdf: sitePath('resume/pdf/Yaqing_Zhao_Resume.pdf'),
  hero: {
    engine: 'UE5',
    poster: new URL('../../images/interstellar_drive/image_01.png', import.meta.url).href,
    video: new URL('../../images/ue5_ai_material/ue5_ai_material01.mp4', import.meta.url).href
  }
};
