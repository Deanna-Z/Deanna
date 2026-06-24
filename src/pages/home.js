import { renderArticleSection } from '../components/ArticleSection.js';
import { renderContactSection } from '../components/ContactSection.js';
import { renderHero } from '../components/Hero.js';
import { renderNav } from '../components/Nav.js';
import { renderProjectSection } from '../components/ProjectSection.js';
import { renderSkillsSection } from '../components/SkillsSection.js';
import { renderSoundSection } from '../components/SoundSection.js';

export function renderHome({ articles, filters, profile, projects, selectedProject, skills, soundReel, state }) {
  return `
    <main class="site-shell">
      ${renderNav({ menuOpen: state.menuOpen, profile })}
      ${renderEditorToolbar({ isEditing: state.isEditing })}
      ${renderHero({ isEditing: state.isEditing, profile, projectCount: projects.length, soundReel })}
      ${renderProjectSection({
        activeFilter: state.activeFilter,
        filters,
        isEditing: state.isEditing,
        projects,
        selectedProject
      })}
      ${renderArticleSection({ articles, isEditing: state.isEditing })}
      ${renderSoundSection({ isEditing: state.isEditing, soundReel })}
      ${renderSkillsSection({ isEditing: state.isEditing, skills })}
      ${renderContactSection({ isEditing: state.isEditing, profile })}
    </main>
  `;
}

function renderEditorToolbar({ isEditing }) {
  return `
    <aside class="editor-toolbar" aria-label="Page editor">
      <button class="${isEditing ? 'is-active' : ''}" data-editor-toggle type="button">
        ${isEditing ? 'Exit Edit' : 'Edit Mode'}
      </button>
      <button data-editor-export type="button">Export JSON</button>
      <button data-editor-reset type="button">Reset</button>
    </aside>
  `;
}
