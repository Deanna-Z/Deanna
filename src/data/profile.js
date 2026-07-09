const basePath = import.meta.env.BASE_URL;
const sitePath = (path) => `${basePath}${path}`;

export const profile = {
  name: 'Deanna Zhao',
  initials: 'DZ',
  location: 'Production Hub',
  roles: ['Game Producer', 'Product Manager', 'Game Developer', 'Audio Creator'],
  intro:
    'I help game teams move from idea to playable experience by aligning player goals, production scope, gameplay implementation, creative direction, and audio identity.',
  closingLine: "Let's build the next playable milestone with clarity, momentum, and player-focused taste.",
  resumePage: sitePath('resume/'),
  resumePdf: sitePath('resume/pdf/Yaqing_Zhao_Resume.pdf'),
  hero: {
    engine: 'UE5',
    poster: new URL('../../images/interstellar_drive/image_01.png', import.meta.url).href,
    video: new URL('../../images/ue5_ai_material/ue5_ai_material01.mp4', import.meta.url).href
  }
};
