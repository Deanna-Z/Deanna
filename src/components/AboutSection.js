import { editableText } from '../utils/editor.js';

export function renderAboutSection({ isEditing, profile }) {
  return `
    <section class="section about-section" id="about">
      <div class="about-layout">
        <div class="section-heading about-heading">
          <p class="eyebrow">About Me</p>
          ${editableText({ className: 'section-title', isEditing, path: 'profile.about.title', tag: 'h2', value: profile.about.title })}
        </div>
        <figure class="about-photo">
          <img src="${profile.about.photo}" alt="Yaqing Deanna Zhao" />
          <figcaption>Yaqing "Deanna" Zhao</figcaption>
        </figure>
        <div class="about-panel">
          <div class="about-copy">
            ${profile.about.paragraphs.map((paragraph, index) => editableText({
              isEditing,
              path: `profile.about.paragraphs.${index}`,
              tag: 'p',
              value: paragraph
            })).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}
