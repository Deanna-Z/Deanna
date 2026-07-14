import { editableText } from '../utils/editor.js';

export function renderArticleSection({ articles, isEditing }) {
  return `
    <section class="section articles-section" id="articles">
      <div class="section-heading">
        <p class="eyebrow">Articles / Devlog</p>
        <h2 class="section-title">ARTICLES</h2>
      </div>
      <div class="article-grid">
        ${articles.map((article, index) => renderArticleCard(article, index, isEditing)).join('')}
      </div>
    </section>
  `;
}

function renderArticleCard(article, index, isEditing) {
  return `
    <article class="article-card">
      <span class="mission-index">${String(index + 1).padStart(2, '0')}</span>
      <img src="${article.cover}" alt="${article.title}" />
      <div class="article-card-body">
        <p class="project-meta">${article.date} / ${article.category}</p>
        ${editableText({ isEditing, path: `articles.${article.id}.title`, tag: 'h3', value: article.title })}
        ${editableText({ isEditing, path: `articles.${article.id}.excerpt`, tag: 'p', value: article.excerpt })}
        <div class="tag-row">
          ${article.tags.map((tag) => `<span>${tag}</span>`).join('')}
        </div>
      </div>
    </article>
  `;
}
