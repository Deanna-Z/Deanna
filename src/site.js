import { renderHome } from './pages/home.js';
import { articles } from './data/articles.js';
import { profile } from './data/profile.js';
import { projects, skills } from './data/projects.js';
import { soundReel } from './data/sound.js';

const storageKey = 'deanna-portfolio-edits';
const filters = ['All', 'Games', 'Sound', 'Tools'];

const state = {
  activeFilter: 'All',
  edits: loadEdits(),
  isEditing: false,
  menuOpen: false,
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
      render();
      document.querySelector('.project-spotlight')?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    });
  });

  document.querySelectorAll('[data-project]').forEach((button) => {
    button.addEventListener('click', (event) => {
      if (event.target.closest('[contenteditable="true"]')) return;
      state.selectedProjectId = button.dataset.project;
      render();
      document.querySelector('.project-spotlight')?.scrollIntoView({ block: 'center', behavior: 'smooth' });
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
