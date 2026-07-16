import { renderHome } from './pages/home.js';
import { articles } from './data/articles.js';
import { profile } from './data/profile.js';
import { projects, skills } from './data/projects.js';
import { soundReel } from './data/sound.js';
import { sanitizeEditableHtml } from './utils/editor.js';

const storageKey = 'deanna-portfolio-edits';
const filters = ['All', ...new Set(projects.map((project) => project.category))];
const initialProjectId = getInitialProjectId();
const initialProjectIndex = initialProjectId
  ? projects.findIndex((project) => project.id === initialProjectId)
  : 0;

const state = {
  activeFilter: 'All',
  edits: loadEdits(),
  isEditing: false,
  menuOpen: false,
  selectedMusicTrackIndex: 0,
  selectedReelIndex: Math.max(initialProjectIndex, 0),
  selectedProjectId: initialProjectId || projects[0].id
};

let savedEditableRange = null;
let musicAudioContext = null;
let musicAnalyser = null;
let musicSource = null;
let musicWaveAnimation = null;

function render() {
  const root = document.getElementById('root');
  const content = createContent();
  const selectedProject =
    content.projects.find((project) => project.id === state.selectedProjectId) || content.projects[0];

  root.innerHTML = renderHome({
    articles: content.articles,
    filters,
    isEditing: state.isEditing,
    profile: content.profile,
    projects: content.projects,
    selectedProject,
    skills: content.skills,
    soundReel: content.soundReel,
    state
  });

  bindEvents();
  scrollToInitialProject();
}

let didScrollToInitialProject = false;

function getInitialProjectId() {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get('project');

  if (projectId && projects.some((project) => project.id === projectId)) {
    return projectId;
  }

  return null;
}

function scrollToInitialProject() {
  if (didScrollToInitialProject || !initialProjectId) return;
  didScrollToInitialProject = true;
  scrollToProjectSpotlight({ topOffset: 170, behavior: 'auto' });
}

function bindEvents() {
  bindProjectReelDrag();
  bindProjectReelSelection();
  bindContactCopy();

  document.querySelector('.menu-toggle')?.addEventListener('click', () => {
    state.menuOpen = !state.menuOpen;
    render();
  });

  document.querySelectorAll('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      const content = createContent();
      state.activeFilter = button.dataset.filter;
      state.selectedProjectId =
        content.projects.find((project) => state.activeFilter === 'All' || project.category === state.activeFilter)?.id ||
        content.projects[0].id;
      state.selectedReelIndex = 0;
      render();
      scrollToProjectBrowser();
    });
  });

  document.querySelectorAll('[data-project]').forEach((button) => {
    button.addEventListener('click', (event) => {
      if (event.defaultPrevented) return;
      if (event.target.closest('.project-reel')) return;
      if (event.target.closest('[contenteditable="true"]')) return;
      selectProject(button.dataset.project);
    });
  });

  document.querySelector('[data-editor-toggle]')?.addEventListener('click', () => {
    if (state.isEditing) {
      persistAllEditableElements();
      savedEditableRange = null;
    }
    state.isEditing = !state.isEditing;
    render();
  });

  document.querySelector('[data-editor-bold]')?.addEventListener('mousedown', (event) => {
    event.preventDefault();
    saveCurrentEditableRange();
  });

  document.querySelector('[data-editor-bold]')?.addEventListener('click', () => {
    restoreSavedEditableRange();
    const editableElement = getSelectedEditableElement();
    if (!editableElement) return;

    editableElement.focus();
    document.execCommand('bold');
    saveEditableElement(editableElement);
    requestAnimationFrame(() => saveEditableElement(editableElement));
  });

  document.querySelector('[data-editor-reset]')?.addEventListener('click', () => {
    if (!window.confirm('Reset all local edits in this browser?')) return;
    state.edits = {};
    localStorage.removeItem(storageKey);
    render();
  });

  document.querySelector('[data-editor-export]')?.addEventListener('click', async () => {
    const exportText = JSON.stringify(state.edits, null, 2);
    await navigator.clipboard.writeText(exportText);
    window.alert('Local edits copied to clipboard as JSON.');
  });

  bindMusicPlayer();


  document.querySelector('[data-spotlight-font-scale]')?.addEventListener('input', (event) => {
    const value = Number(event.target.value);
    if (!Number.isFinite(value)) return;

    state.edits.settings = {
      ...(state.edits.settings || {}),
      spotlightFontScale: value
    };
    localStorage.setItem(storageKey, JSON.stringify(state.edits));
    document.querySelector('.site-shell')?.style.setProperty('--spotlight-font-scale', value);
    event.target.nextElementSibling.textContent = `${Math.round(value * 100)}%`;
  });

  document.querySelector('[data-project-filter-offset]')?.addEventListener('input', (event) => {
    const value = Number(event.target.value);
    if (!Number.isFinite(value)) return;

    state.edits.settings = {
      ...(state.edits.settings || {}),
      projectFilterOffset: value
    };
    localStorage.setItem(storageKey, JSON.stringify(state.edits));
    document.querySelector('.site-shell')?.style.setProperty('--project-filter-offset', `${value}vw`);
    event.target.nextElementSibling.textContent = `${value}vw`;
  });

  document.querySelectorAll('[data-edit-path]').forEach((element) => {
    element.addEventListener('mouseup', saveCurrentEditableRange);
    element.addEventListener('keyup', saveCurrentEditableRange);

    element.addEventListener('keydown', (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'b') {
        event.preventDefault();
        document.execCommand('bold');
        requestAnimationFrame(() => saveEditableElement(element));
      }
    });

    element.addEventListener('paste', (event) => {
      event.preventDefault();
      const text = event.clipboardData?.getData('text/plain') || '';
      document.execCommand('insertText', false, text);
    });

    element.addEventListener('blur', () => {
      if (saveEditableElement(element)) {
        render();
      }
    });
  });
}

function bindContactCopy() {
  document.querySelectorAll('[data-copy-value]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      const target = link.getAttribute('target');

      event.preventDefault();
      copyText(link.dataset.copyValue);
      showCopyStatus(link, link.dataset.copyLabel || 'Copied');

      if (!href) return;
      if (target === '_blank') {
        window.open(href, '_blank', 'noopener,noreferrer');
        return;
      }

      window.setTimeout(() => {
        window.location.href = href;
      }, 120);
    });
  });
}

async function copyText(value) {
  if (!value) return;

  try {
    await navigator.clipboard.writeText(value);
    return;
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.append(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  }
}

function showCopyStatus(link, label) {
  link.classList.add('is-copied');
  link.dataset.copyStatus = label;
  window.clearTimeout(link.copyStatusTimer);
  link.copyStatusTimer = window.setTimeout(() => {
    link.classList.remove('is-copied');
    delete link.dataset.copyStatus;
  }, 1800);
}

function bindProjectReelSelection() {
  const reel = document.querySelector('.project-reel');
  if (!reel) return;

  reel.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const card = event.target.closest('.story-card');
    if (!card) return;

    event.preventDefault();
    selectProject(card.dataset.project, { reelIndex: Number(card.dataset.reelIndex) });
  });
}

function bindProjectReelDrag() {
  const reel = document.querySelector('.project-reel');
  if (!reel) return;

  let isDragging = false;
  let startX = 0;
  let startScrollLeft = 0;
  let dragDistance = 0;
  let pressedCard = null;
  let suppressNextClick = false;

  reel.addEventListener('pointerdown', (event) => {
    isDragging = true;
    startX = event.clientX;
    startScrollLeft = reel.scrollLeft;
    dragDistance = 0;
    pressedCard = event.target.closest('.story-card');
    reel.classList.add('is-dragging');
    reel.setPointerCapture(event.pointerId);
  });

  reel.addEventListener('pointermove', (event) => {
    if (!isDragging) return;
    const deltaX = event.clientX - startX;
    dragDistance = Math.max(dragDistance, Math.abs(deltaX));
    reel.scrollLeft = startScrollLeft - deltaX;
  });

  reel.addEventListener('pointerup', (event) => {
    isDragging = false;
    reel.classList.remove('is-dragging');
    reel.releasePointerCapture(event.pointerId);

    if (pressedCard && dragDistance <= 8 && !event.target.closest('[contenteditable="true"]')) {
      suppressNextClick = true;
      selectProject(pressedCard.dataset.project, { reelIndex: Number(pressedCard.dataset.reelIndex) });
    }

    pressedCard = null;
  });

  reel.addEventListener('pointercancel', () => {
    isDragging = false;
    pressedCard = null;
    reel.classList.remove('is-dragging');
  });

  reel.addEventListener('click', (event) => {
    if (suppressNextClick || dragDistance > 8) {
      event.preventDefault();
      event.stopPropagation();
    }
    suppressNextClick = false;
    dragDistance = 0;
  }, true);
}


function bindMusicPlayer() {
  const audio = document.querySelector('[data-music-player]');
  const wave = document.querySelector('.music-wave');
  const nowPlayingTitle = document.querySelector('[data-now-playing-title]');
  const trackButtons = [...document.querySelectorAll('[data-audio-track]')];

  if (!audio) return;

  trackButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const trackIndex = Number(button.dataset.audioTrack);
      if (!Number.isInteger(trackIndex)) return;

      state.selectedMusicTrackIndex = trackIndex;
      if (button.dataset.audioSrc && audio.getAttribute('src') !== button.dataset.audioSrc) {
        audio.setAttribute('src', button.dataset.audioSrc);
        audio.load?.();
      }
      if (nowPlayingTitle && button.dataset.audioTitle) {
        nowPlayingTitle.textContent = button.dataset.audioTitle;
      }

      trackButtons.forEach((trackButton) => {
        trackButton.classList.toggle('is-active', trackButton === button);
      });

      audio.play?.().catch(() => {});
      startMusicWave(audio, wave);
    });
  });

  audio.addEventListener('play', () => startMusicWave(audio, wave));
  audio.addEventListener('pause', () => stopMusicWave(wave));
  audio.addEventListener('ended', () => stopMusicWave(wave));
}

function startMusicWave(audio, wave) {
  if (!audio || !wave) return;

  try {
    if (!musicAudioContext) {
      musicAudioContext = new AudioContext();
    }
    if (musicAudioContext.state === 'suspended') {
      musicAudioContext.resume();
    }
    if (!musicAnalyser) {
      musicAnalyser = musicAudioContext.createAnalyser();
      musicAnalyser.fftSize = 64;
    }
    if (!musicSource) {
      musicSource = musicAudioContext.createMediaElementSource(audio);
      musicSource.connect(musicAnalyser);
      musicAnalyser.connect(musicAudioContext.destination);
    }
  } catch {
    wave.classList.add('is-playing');
    return;
  }

  const bars = [...wave.querySelectorAll('i')];
  const data = new Uint8Array(musicAnalyser.frequencyBinCount);
  wave.classList.add('is-playing');
  cancelAnimationFrame(musicWaveAnimation);

  const tick = () => {
    musicAnalyser.getByteFrequencyData(data);
    bars.forEach((bar, index) => {
      const value = data[index * 3 + 2] || data[index] || 0;
      const height = Math.max(18, Math.min(100, 18 + value / 2.4));
      bar.style.height = `${height}%`;
    });
    musicWaveAnimation = requestAnimationFrame(tick);
  };

  tick();
}

function stopMusicWave(wave) {
  cancelAnimationFrame(musicWaveAnimation);
  musicWaveAnimation = null;
  wave?.classList.remove('is-playing');
  wave?.querySelectorAll('i').forEach((bar) => {
    bar.style.height = '';
  });
}
function selectProject(projectId, options = {}) {
  if (!projectId) return;
  state.selectedProjectId = projectId;
  if (Number.isFinite(options.reelIndex)) {
    state.selectedReelIndex = options.reelIndex;
  }
  render();
  scrollToProjectSpotlight();
}

function openProjectPage(card) {
  const link = card.dataset.projectLink;

  if (!link) {
    selectProject(card.dataset.project);
    return;
  }

  if (card.dataset.projectExternal === 'true') {
    window.open(link, '_blank', 'noopener,noreferrer');
    return;
  }

  window.location.href = link;
}

function scrollToProjectSpotlight({ topOffset = 112, behavior = 'smooth' } = {}) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const spotlight = document.querySelector('.project-spotlight');
      if (!spotlight) return;

      const targetTop = spotlight.getBoundingClientRect().top + window.scrollY - topOffset;
      window.scrollTo({ top: targetTop, behavior });
    });
  });
}

function scrollToProjectBrowser({ topOffset = 112, behavior = 'smooth' } = {}) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const browser = document.querySelector('.project-browser');
      if (!browser) return;

      const targetTop = browser.getBoundingClientRect().top + window.scrollY - topOffset;
      window.scrollTo({ top: targetTop, behavior });
    });
  });
}

function getSelectedEditableElement() {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return null;

  const anchorElement = getClosestEditableElement(selection.anchorNode);
  const focusElement = getClosestEditableElement(selection.focusNode);

  if (!anchorElement || anchorElement !== focusElement) return null;
  return anchorElement;
}

function saveCurrentEditableRange() {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return;

  const editableElement = getSelectedEditableElement();
  if (!editableElement) return;

  savedEditableRange = selection.getRangeAt(0).cloneRange();
}

function restoreSavedEditableRange() {
  if (!savedEditableRange) return;

  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(savedEditableRange);
}

function getClosestEditableElement(node) {
  const element = node?.nodeType === Node.ELEMENT_NODE ? node : node?.parentElement;
  return element?.closest?.('[data-edit-path]') || null;
}

function saveEditableElement(element) {
  const value = sanitizeEditableHtml(element.innerHTML).trim();
  if (!element.textContent.trim()) return false;

  state.edits[element.dataset.editPath] = value;
  localStorage.setItem(storageKey, JSON.stringify(state.edits));
  element.innerHTML = value;
  return true;
}

function persistAllEditableElements() {
  document.querySelectorAll('[data-edit-path]').forEach((element) => {
    saveEditableElement(element);
  });
}

function createContent() {
  const content = structuredClone({
    articles,
    profile,
    projects,
    skills,
    soundReel
  });

  Object.entries(state.edits).forEach(([path, value]) => {
    setContentValue(content, path, value);
  });

  return content;
}

function loadEdits() {
  try {
    const edits = JSON.parse(localStorage.getItem(storageKey)) || {};
    return migrateEdits(edits);
  } catch {
    return {};
  }
}

function migrateEdits(edits) {
  const dinnerDescriptionPath = 'projects.the-dinner.description';
  const dinnerDescription = edits[dinnerDescriptionPath];
  const interstellarDescriptionPath = 'projects.interstellar-drive-final.description';
  const interstellarDescription = edits[interstellarDescriptionPath];
  const soundDescriptionPath = 'soundReel.description';
  const soundDescription = edits[soundDescriptionPath];
  const ragNoteTitlePath = 'articles.sound-feedback-notes.title';
  const ragNoteExcerptPath = 'articles.sound-feedback-notes.excerpt';
  const planetWarsTitlePath = 'articles.ai-material-pipeline.title';
  const planetWarsExcerptPath = 'articles.ai-material-pipeline.excerpt';
  const leanCanvasTitlePath = 'articles.ue5-tool-devlog.title';
  const leanCanvasExcerptPath = 'articles.ue5-tool-devlog.excerpt';
  const fmodTitlePath = 'articles.fmod-setting.title';
  const fmodExcerptPath = 'articles.fmod-setting.excerpt';
  const soundFinalDescription =
    'I co-create these Suno AI tracks through MIDI keyboard sketches, 10+ years of music theory study, and hands-on musicianship across eight instruments.';
  const ragNoteFinalTitle = 'Building a Knowledge Base for RAG';
  const ragNoteFinalExcerpt =
    'A practical guide to transforming raw documents into structured, searchable knowledge through document loading, text chunking, embedding, and vector storage.';
  const planetWarsFinalTitle = 'Building an AI Agent for Planet Wars RTS';
  const planetWarsFinalExcerpt =
    'A hands-on exploration of game AI, developing and optimizing autonomous agents that evaluate game states, make strategic decisions, and compete across varied real-time strategy scenarios.';
  const leanCanvasFinalTitle = 'Lean Canvas Analysis of Game Interstellar Drive';
  const leanCanvasFinalExcerpt =
    'A Lean Canvas analysis exploring the game’s target audience, player needs, unique value proposition, market positioning, and potential business model.';
  const fmodFinalTitle = 'FMOD Integration and Setup in Unreal Engine 5';
  const fmodFinalExcerpt =
    'A setup note on getting FMOD connected inside Unreal Engine, from project integration to basic event workflow and implementation checks.';
  const interstellarFinalDescription =
    '🚀 A <b>co-op</b> <b>racing</b> 🚗 <b>rhythm 🎵 game</b> set in a 1970s retro-futurist universe, following a cosmic journey to discover the most beautiful music. As <b>Producer, Audio Director</b>, and <b>QA Director</b>, I helped guide <b>production planning</b>, <b>task tracking</b>, <b>audio direction</b> 🔊, and <b>QA testing</b>.';
  const skillFinalEdits = {
    'skills.0.title': '🎮 Game Production',
    'skills.0.text':
      'Agile production, scope planning, sprint coordination, milestone tracking, risk management, playtesting, and cross-functional team leadership.',
    'skills.1.title': '🤖 AI &amp; Creative Technology',
    'skills.1.text':
      'AI-powered product development, workflow automation, rapid prototyping, prompt design, and human-centered AI experiences.',
    'skills.2.title': '📊 Product Management',
    'skills.2.text':
      'User research, product strategy, feature prioritization, roadmap planning, stakeholder alignment, and data-informed iteration.'
  };
  const legacySkillEdits = {
    'skills.0.title': ['Game Production'],
    'skills.0.text': [
      'Scope planning, milestone tracking, team coordination, risk awareness, and keeping creative goals actionable.'
    ],
    'skills.1.title': ['Product &amp; Gameplay', 'Product & Gameplay'],
    'skills.1.text': [
      'Player goals, feature prioritization, gameplay implementation, feedback loops, and decisions that support the core experience.'
    ],
    'skills.2.title': ['Audio Creation'],
    'skills.2.text': [
      'Sound design judgment, dynamic ambience, musical thinking, and audio direction that gives games identity.'
    ]
  };
  let didMigrateSkills = false;

  Object.entries(skillFinalEdits).forEach(([path, value]) => {
    if (edits[path] === undefined || legacySkillEdits[path]?.includes(edits[path])) {
      edits[path] = value;
      didMigrateSkills = true;
    }
  });

  if (didMigrateSkills) {
    localStorage.setItem(storageKey, JSON.stringify(edits));
  }

  if (edits[ragNoteTitlePath] === 'Designing Sound Feedback for Play') {
    edits[ragNoteTitlePath] = ragNoteFinalTitle;
    localStorage.setItem(storageKey, JSON.stringify(edits));
  }

  if (
    edits[ragNoteExcerptPath] ===
    'A working note on making actions feel readable, responsive, and emotionally clear through audio.'
  ) {
    edits[ragNoteExcerptPath] = ragNoteFinalExcerpt;
    localStorage.setItem(storageKey, JSON.stringify(edits));
  }

  if (edits[planetWarsTitlePath] === 'Planet Wars AI Challenge') {
    edits[planetWarsTitlePath] = planetWarsFinalTitle;
    localStorage.setItem(storageKey, JSON.stringify(edits));
  }

  if (edits[planetWarsTitlePath] && edits[planetWarsTitlePath] !== planetWarsFinalTitle) {
    edits[planetWarsTitlePath] = planetWarsFinalTitle;
    localStorage.setItem(storageKey, JSON.stringify(edits));
  }

  if (
    edits[planetWarsExcerptPath] ===
    'A technical note on building strategy, decision-making logic, and iterative improvements for an AI gameplay challenge.'
  ) {
    edits[planetWarsExcerptPath] = planetWarsFinalExcerpt;
    localStorage.setItem(storageKey, JSON.stringify(edits));
  }

  if (edits[planetWarsExcerptPath] && edits[planetWarsExcerptPath] !== planetWarsFinalExcerpt) {
    edits[planetWarsExcerptPath] = planetWarsFinalExcerpt;
    localStorage.setItem(storageKey, JSON.stringify(edits));
  }

  if (edits[leanCanvasTitlePath] !== leanCanvasFinalTitle) {
    edits[leanCanvasTitlePath] = leanCanvasFinalTitle;
    localStorage.setItem(storageKey, JSON.stringify(edits));
  }

  if (edits[leanCanvasExcerptPath] !== leanCanvasFinalExcerpt) {
    edits[leanCanvasExcerptPath] = leanCanvasFinalExcerpt;
    localStorage.setItem(storageKey, JSON.stringify(edits));
  }

  if (edits[fmodExcerptPath] !== fmodFinalExcerpt) {
    edits[fmodExcerptPath] = fmodFinalExcerpt;
    localStorage.setItem(storageKey, JSON.stringify(edits));
  }

  if (edits[fmodTitlePath] !== fmodFinalTitle) {
    edits[fmodTitlePath] = fmodFinalTitle;
    localStorage.setItem(storageKey, JSON.stringify(edits));
  }

  if (
    typeof dinnerDescription === 'string' &&
    dinnerDescription.includes('Winner of Best Game') &&
    !dinnerDescription.includes('🏆')
  ) {
    edits[dinnerDescriptionPath] = dinnerDescription.replace('Winner of Best Game', '🏆 Winner of Best Game');
    localStorage.setItem(storageKey, JSON.stringify(edits));
  }

  if (
    typeof interstellarDescription === 'string' &&
    interstellarDescription.includes('co-op') &&
    interstellarDescription.includes('racing') &&
    interstellarDescription !== interstellarFinalDescription
  ) {
    edits[interstellarDescriptionPath] = interstellarFinalDescription;
    localStorage.setItem(storageKey, JSON.stringify(edits));
  }

  if (
    typeof soundDescription === 'string' &&
    soundDescription.includes('My sound work connects player experience')
  ) {
    edits[soundDescriptionPath] = soundFinalDescription;
    localStorage.setItem(storageKey, JSON.stringify(edits));
  }

  return edits;
}

function setContentValue(content, path, value) {
  const parts = path.split('.');
  const [group, idOrField, field] = parts;

  if (group === 'profile') {
    if (idOrField === 'about') {
      if (field === 'title' || field === 'body') {
        content.profile.about[field] = value;
        return;
      }

      if (field === 'paragraphs') {
        content.profile.about.paragraphs[Number(parts[3])] = value;
        return;
      }

      const sectionIndex = parts[3];
      const sectionField = parts[4];
      const highlight = content.profile.about.highlights?.[Number(sectionIndex)];
      if (highlight) highlight[sectionField] = value;
      return;
    }

    if (idOrField === 'roles') {
      content.profile.roles = value.split('/').map((role) => role.trim()).filter(Boolean);
      return;
    }
    content.profile[idOrField] = value;
    return;
  }

  if (group === 'soundReel') {
    content.soundReel[idOrField] = value;
    return;
  }

  if (group === 'projects') {
    const project = content.projects.find((item) => item.id === idOrField);
    if (project) project[field] = value;
    return;
  }

  if (group === 'articles') {
    const article = content.articles.find((item) => item.id === idOrField);
    if (article) article[field] = value;
    return;
  }

  if (group === 'skills') {
    const skill = content.skills[Number(idOrField)];
    if (skill) skill[field] = value;
  }
}

render();
