import { editableText, escapeHtml } from '../utils/editor.js';

export function renderArticleSection({ articles, isEditing }) {
  return `
    <section class="section articles-section" id="articles">
      <div class="section-heading">
        <p class="eyebrow">Documents / Podcasts</p>
        <h2 class="section-title">NOTES</h2>
      </div>
      <div class="article-directory">
        ${articles.map((article, index) => renderArticleRow(article, index, isEditing)).join('')}
      </div>
    </section>
  `;
}

function renderArticleRow(article, index, isEditing) {
  return `
    <article class="article-row">
      <div class="article-row-index">
        <span>${String(index + 1).padStart(2, '0')}</span>
        <strong>${escapeHtml(article.category)}</strong>
      </div>
      <div class="article-row-main">
        <p class="project-meta">${escapeHtml(article.date)} / Notion doc</p>
        ${editableText({ isEditing, path: `articles.${article.id}.title`, tag: 'h3', value: article.title })}
        ${editableText({ isEditing, path: `articles.${article.id}.excerpt`, tag: 'p', value: article.excerpt })}
        <div class="tag-row">
          ${article.tags.map((tag) => `<span>${tag}</span>`).join('')}
        </div>
      </div>
      <a class="article-row-link" href="${escapeHtml(article.href || '#articles')}" target="_blank" rel="noreferrer">
        Open Notion <span aria-hidden="true">-&gt;</span>
      </a>
    </article>
  `;
}
