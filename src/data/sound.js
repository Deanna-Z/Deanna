const basePath = '/version0/';
const sitePath = (path) => `${basePath}${path}`;

export const soundReel = {
  kicker: 'Sound Reel',
  label: 'Audio',
  title: 'Audio creation as product feel, atmosphere, and player feedback.',
  description: 'I co-create these Suno AI tracks through MIDI keyboard sketches, 10+ years of music theory study, and hands-on musicianship across eight instruments.',
  embedUrl: 'https://www.youtube.com/embed/hR0oe4qIBu8?si=EjgPTOAG6iWvFyYN',
  musicTracks: [
    {
      title: 'Robur Horizon',
      note: 'Expansive sci-fi mood / horizon build',
      src: sitePath('audio/robur-horizon.wav')
    },
    {
      title: 'Nebula Beats',
      note: 'Suno AI collaboration / cosmic groove',
      src: sitePath('audio/nebula-beats.wav')
    },
    {
      title: 'Galactic Pulse',
      note: 'Driving synth rhythm / space-race energy',
      src: sitePath('audio/galactic-pulse.wav')
    },
    {
      title: 'Interstellar Voyagers',
      note: 'Cinematic travel mood / retro-futurist melody',
      src: sitePath('audio/interstellar-voyagers.wav')
    },
    {
      title: 'Astral Gate',
      note: 'Suno AI collaboration / luminous opening theme',
      src: sitePath('audio/astral-gate.wav')
    },
    {
      title: 'Starlight Drift',
      note: 'Soft motion / dreamy synth travel',
      src: sitePath('audio/starlight-drift.wav')
    },
    {
      title: 'Orbit of Memory',
      note: 'Reflective melody / emotional space ambience',
      src: sitePath('audio/orbit-of-memory.wav')
    }
  ]
};
