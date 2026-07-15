const iconMap = {
  AI: 'AI',
  Game: 'GM',
  Product: 'PM',
  Sound: 'SD',
  Tool: 'TL'
};

export function renderSkillsSection({ isEditing, skills }) {
  return `
    <section class="section skills-section" id="skills">
      <div class="section-heading">
        <p class="eyebrow">Capabilities</p>
        <h2 class="section-title">SKILLS</h2>
      </div>
      <div class="skills-grid">
        ${skills.map((skill, index) => `
          <article class="skill-card">
            <span>${iconMap[skill.icon] || 'SK'}</span>
            ${editableText({ isEditing, path: `skills.${index}.title`, tag: 'h3', value: skill.title })}
            ${editableText({ isEditing, path: `skills.${index}.text`, tag: 'p', value: skill.text })}
          </article>
        `).join('')}
      </div>
    </section>
  `;
}
import { editableText } from '../utils/editor.js';
