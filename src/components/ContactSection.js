import { editableText } from '../utils/editor.js';

export function renderContactSection({ isEditing, profile }) {
  return `
    <section class="contact-section">
      <div>
        <p class="eyebrow">Next</p>
        ${editableText({ isEditing, path: 'profile.closingLine', tag: 'h2', value: profile.closingLine })}
      </div>
      <a class="primary-action" href="${profile.resumePage}">View resume <span aria-hidden="true">-&gt;</span></a>
    </section>
  `;
}
