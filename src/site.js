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
    state.isEditing = !state.isEditing;
    render();
  });

  document.querySelector('[data-editor-bold]')?.addEventListener('mousedown', (event) => {
    event.preventDefault();
  });

  document.querySelector('[data-editor-bold]')?.addEventListener('click', () => {
    const editableElement = getSelectedEditableElement();
    if (!editableElement) return;

    editableElement.focus();
    document.execCommand('bold');
    saveEditableElement(editableElement);
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

  document.querySelectorAll('[data-audio-track]').forEach((button) => {
    button.addEventListener('click', () => {
      const trackIndex = Number(button.dataset.audioTrack);
      if (!Number.isInteger(trackIndex)) return;

      state.selectedMusicTrackIndex = trackIndex;
      render();

      requestAnimationFrame(() => {
        document.querySelector('[data-music-player]')?.play?.().catch(() => {});
      });
    });
  });

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
    element.addEventListener('keydown', (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'b') {
        event.preventDefault();
        document.execCommand('bold');
        saveEditableElement(element);
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
  const soundFinalDescription =
    'I co-create these Suno AI tracks through MIDI keyboard sketches, 10+ years of music theory study, and hands-on musicianship across eight instruments.';
  const interstellarFinalDescription =
    '🚀 A <b>co-op</b> <b>racing</b> 🚗 <b>rhythm 🎵 game</b> set in a 1970s retro-futurist universe, following a cosmic journey to discover the most beautiful music. As <b>Producer, Audio Director</b>, and <b>QA Director</b>, I helped guide <b>production planning</b>, <b>task tracking</b>, <b>audio direction</b> 🔊, and <b>QA testing</b>.';

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
  const [group, idOrField, field] = path.split('.');

  if (group === 'profile') {
    if (idOrField === 'about') {
      if (field === 'title' || field === 'body') {
        content.profile.about[field] = value;
        return;
      }

      const [, , sectionIndex, sectionField] = path.split('.');
      if (field === 'paragraphs') {
        content.profile.about.paragraphs[Number(sectionIndex)] = value;
        return;
      }

      const highlight = content.profile.about.highlights[Number(sectionIndex)];
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
