import { renderHome } from './pages/home.js';
import { articles } from './data/articles.js';
import { profile } from './data/profile.js';
import { projects, skills } from './data/projects.js';
import { soundReel } from './data/sound.js';

const storageKey = 'deanna-portfolio-edits';
const filters = ['All', ...new Set(projects.map((project) => project.category))];

const state = {
  activeFilter: 'All',
  edits: loadEdits(),
  isEditing: false,
  menuOpen: false,
  selectedReelIndex: 0,
  selectedProjectId: projects[0].id
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
      scrollToProjectSpotlight();
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

  document.querySelectorAll('[data-edit-path]').forEach((element) => {
    element.addEventListener('blur', () => {
      const value = element.textContent.trim();
      if (!value) return;
      state.edits[element.dataset.editPath] = value;
      localStorage.setItem(storageKey, JSON.stringify(state.edits));
      render();
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

function scrollToProjectSpotlight() {
  requestAnimationFrame(() => {
    document.querySelector('.project-spotlight')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
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
    return JSON.parse(localStorage.getItem(storageKey)) || {};
  } catch {
    return {};
  }
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
