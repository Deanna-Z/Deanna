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
  const projectFilterOffset = Number.isFinite(Number(state.edits?.settings?.projectFilterOffset))
    ? Number(state.edits.settings.projectFilterOffset)
    : -29;

  return `
    <main class="site-shell" style="--spotlight-font-scale: ${spotlightFontScale}; --project-filter-offset: ${projectFilterOffset}vw;">
      ${renderNav({ menuOpen: state.menuOpen, profile })}
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
      ${renderSoundSection({
        isEditing: state.isEditing,
        selectedMusicTrackIndex: state.selectedMusicTrackIndex,
        soundReel
      })}
      ${renderArticleSection({ articles, isEditing: state.isEditing })}
      ${renderSkillsSection({ isEditing: state.isEditing, skills })}
      ${renderContactSection({ isEditing: state.isEditing, profile })}
    </main>
  `;
}

function renderEditorToolbar({ isEditing, projectFilterOffset, spotlightFontScale }) {
  return `
    <aside class="editor-toolbar" aria-label="Page editor">
      <button class="${isEditing ? 'is-active' : ''}" data-editor-toggle type="button">
        ${isEditing ? 'Exit Edit' : 'Edit Mode'}
      </button>
      ${isEditing ? `
        <button class="editor-format-button" data-editor-bold type="button" title="Bold selected text" aria-label="Bold selected text">
          B
        </button>
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
        <label class="editor-slider">
          <span>Filters X</span>
          <input
            data-project-filter-offset
            type="range"
            min="-45"
            max="10"
            step="1"
            value="${projectFilterOffset}"
          />
          <output>${projectFilterOffset}vw</output>
        </label>
      ` : ''}
      <button data-editor-export type="button">Export JSON</button>
      <button data-editor-reset type="button">Reset</button>
    </aside>
  `;
}
