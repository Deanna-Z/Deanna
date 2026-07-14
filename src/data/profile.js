const basePath = import.meta.env.BASE_URL;
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
      '👋 Hi, my name is Yaqing Zhao, but I usually go by Deanna. I am a producer and product manager passionate about turning creative ideas and emerging technologies into engaging, user-centered experiences. Before moving into creative technology, I worked as a structural engineer in Macau, contributing to large-scale projects including the Hong Kong-Zhuhai-Macao Bridge and a dinosaur museum. This experience shaped the structured problem-solving, clear communication, and cross-functional leadership I bring to multidisciplinary teams today.',
      'My work now spans game production 🎮, product development, creative technology, and AI-powered tools. I enjoy translating user needs and complex ideas into clear priorities and actionable roadmaps, aligning creative, technical, and business stakeholders, and guiding projects from concept through testing, iteration, and release. With hands-on experience in Unreal Engine, Unity, Jira, Agile development, and AI workflows, I bridge creative vision, technical implementation, and user experience.',
      'Outside of work, I am an 11-year marathon runner 🏃‍♀️ and a musician 🎹 who plays eight instruments, including piano, guitar, and accordion. Feel free to reach out ☎️!'
    ]
  },
  closingLine: "Let's build the next playable milestone with clarity, momentum, and player-focused taste.",
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
