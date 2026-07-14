import { renderArticleSection } from '../components/ArticleSection.js';
import { renderAboutSection } from '../components/AboutSection.js';
import { renderContactSection } from '../components/ContactSection.js';
import { renderHero } from '../components/Hero.js';
import { renderNav } from '../components/Nav.js';
import { renderProjectSection } from '../components/ProjectSection.js';
import { renderSkillsSection } from '../components/SkillsSection.js';
import { renderSoundSection } from '../components/SoundSection.js';

export function renderHome({ articles, filters, profile, projects, selectedProject, skills, soundReel, state }) {
  const spotlightFontScale = Number(state.edits?.settings?.spotlightFontScale) || 0.94;

  return `
    <main class="site-shell" style="--spotlight-font-scale: ${spotlightFontScale};">
      ${renderNav({ menuOpen: state.menuOpen, profile })}
      ${renderEditorToolbar({ isEditing: state.isEditing, spotlightFontScale })}
      ${renderHero({ isEditing: state.isEditing, profile, projectCount: projects.length, soundReel })}
      ${renderAboutSection({ isEditing: state.isEditing, profile })}
      ${renderProjectSection({
        activeFilter: state.activeFilter,
        filters,
        isEditing: state.isEditing,
        projects,
        selectedProject,
        selectedReelIndex: state.selectedReelIndex
      })}
      ${renderSoundSection({ isEditing: state.isEditing, soundReel })}
      ${renderArticleSection({ articles, isEditing: state.isEditing })}
      ${renderSkillsSection({ isEditing: state.isEditing, skills })}
      ${renderContactSection({ isEditing: state.isEditing, profile })}
    </main>
  `;
}

function renderEditorToolbar({ isEditing, spotlightFontScale }) {
  return `
    <aside class="editor-toolbar" aria-label="Page editor">
      <button class="${isEditing ? 'is-active' : ''}" data-editor-toggle type="button">
        ${isEditing ? 'Exit Edit' : 'Edit Mode'}
      </button>
      ${isEditing ? `
        <label class="editor-slider">
          <span>Detail Text</span>
          <input
            data-spotlight-font-scale
            type="range"
            min="0.82"
            max="1.22"
            step="0.02"
            value="${spotlightFontScale}"
          />
          <output>${Math.round(spotlightFontScale * 100)}%</output>
        </label>
      ` : ''}
      <button data-editor-export type="button">Export JSON</button>
      <button data-editor-reset type="button">Reset</button>
    </aside>
  `;
}
