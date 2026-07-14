import { editableText } from '../utils/editor.js';

const iconMap = {
  AI: 'AI',
  Film: 'FM',
  Game: 'GM',
  Sound: 'SD',
  Tool: 'TL'
};

export function renderProjectSection({ activeFilter, filters, isEditing, projects, selectedProject, selectedReelIndex }) {
  const visibleProjects =
    activeFilter === 'All' ? projects : projects.filter((project) => project.category === activeFilter);

  return `
    <section class="section works-section project-index" id="project">
      <div class="section-heading project-index-heading">
        <div>
          <p class="eyebrow">Selected Work</p>
          <h2 class="section-title">PROJECTS</h2>
        </div>
      </div>
      <div class="story-cinema project-reel" aria-label="Auto-playing project reel">
        <div class="story-track">
          ${[...visibleProjects, ...visibleProjects].map((project, index) => renderStoryCard(project, index % visibleProjects.length, index, selectedReelIndex, isEditing)).join('')}
        </div>
      </div>
      ${renderProjectSpotlight(selectedProject, isEditing)}
      <div class="project-browser">
        <div class="project-browser-topline">
          <div>
            <p class="eyebrow">Archive</p>
            <h3>${activeFilter === 'All' ? 'All projects' : activeFilter}</h3>
          </div>
          <div class="filter-row" aria-label="Project filters">
            ${filters.map((filter) => `
              <button class="${filter === activeFilter ? 'filter is-active' : 'filter'}" data-filter="${filter}" type="button">
                ${filter}
              </button>
            `).join('')}
          </div>
        </div>
        <div class="work-layout project-archive">
          <div class="project-grid">
            ${visibleProjects.map((project, index) => renderProjectCard(project, index, selectedProject, isEditing)).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderStoryCard(project, index, reelIndex, selectedReelIndex, isEditing) {
  return `
    <article
      class="${reelIndex === selectedReelIndex ? 'story-card is-selected' : 'story-card'}"
      data-project="${project.id}"
      data-reel-index="${reelIndex}"
      data-project-link="${project.link || ''}"
      data-project-external="${project.external ? 'true' : 'false'}"
      role="button"
      tabindex="0"
    >
      <div class="story-image">
        ${renderProjectVisual(project)}
      </div>
      <div class="story-card-body">
        <span class="story-step">${String(index + 1).padStart(2, '0')} / ${project.category}</span>
        ${editableText({ isEditing, path: `projects.${project.id}.title`, tag: 'h3', value: project.title })}
        ${editableText({ isEditing, path: `projects.${project.id}.short`, tag: 'p', value: project.short })}
      </div>
    </article>
  `;
}

function renderProjectCard(project, index, selectedProject, isEditing) {
  const tag = isEditing ? 'article' : 'button';
  const buttonType = isEditing ? '' : ' type="button"';

  return `
    <${tag}
      class="${project.id === selectedProject.id ? 'project-card is-selected' : 'project-card'}"
      data-project="${project.id}"
      ${buttonType}
    >
      <span class="mission-index">${String(index + 1).padStart(2, '0')}</span>
      <span class="mission-status">${project.category}</span>
      ${renderProjectVisual(project)}
      ${editableText({ isEditing, path: `projects.${project.id}.title`, tag: 'strong', value: project.title })}
      ${editableText({ isEditing, path: `projects.${project.id}.short`, value: project.short })}
      <span class="mission-action">${project.id === selectedProject.id ? 'In spotlight' : 'View spotlight'}</span>
    </${tag}>
  `;
}

function renderProjectSpotlight(project, isEditing) {
  return `
    <article class="project-spotlight" aria-live="polite">
      <div class="spotlight-media">
        ${renderProjectVisual(project)}
        <div class="spotlight-orbit" aria-hidden="true">
          <span>${iconMap[project.icon] || 'PR'}</span>
        </div>
      </div>
      <div class="spotlight-copy">
        <p class="eyebrow">${project.role}</p>
        ${editableText({ isEditing, path: `projects.${project.id}.title`, tag: 'h3', value: project.title })}
        ${editableText({ isEditing, path: `projects.${project.id}.description`, tag: 'p', value: project.description })}
        <div class="spotlight-meter" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>
        <div class="tag-row">
          ${project.tags.map((tag) => `<span>${tag}</span>`).join('')}
        </div>
        ${project.link ? `
          <a class="text-link" href="${project.link}" ${project.external ? 'target="_blank" rel="noreferrer"' : ''}>
            Open project <span aria-hidden="true">-&gt;</span>
          </a>
        ` : ''}
      </div>
    </article>
  `;
}

function renderProjectVisual(project) {
  if (project.image) {
    return `<img src="${project.image}" alt="${project.title}" />`;
  }

  return `
    <div class="project-visual-placeholder" role="img" aria-label="${project.title} cover placeholder">
      <span>${project.visualLabel || project.title}</span>
    </div>
  `;
}
