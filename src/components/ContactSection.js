import { editableText } from '../utils/editor.js';

export function renderContactSection({ isEditing, profile }) {
  return `
    <section class="contact-section">
      <div>
        <p class="eyebrow">Next</p>
        ${editableText({ isEditing, path: 'profile.closingLine', tag: 'h2', value: profile.closingLine })}
      </div>
      <div class="contact-actions">
        <div class="social-dock" aria-label="Contact links">
          <a class="social-link linkedin-link" href="${profile.contact.linkedin}" target="_blank" rel="noreferrer" aria-label="Open LinkedIn profile" data-copy-label="Copied" data-copy-value="${profile.contact.linkedin}">
            <span class="linkedin-mark" aria-hidden="true">in</span>
          </a>
          <a class="social-link email-link" href="${profile.contact.email}" aria-label="Send email" data-copy-label="Email copied" data-copy-value="${profile.contact.emailAddress}">
            <svg class="mail-mark" aria-hidden="true" viewBox="0 0 24 24">
              <path d="M4.75 6.75h14.5v10.5H4.75z"></path>
              <path d="m5.25 7.25 6.75 5.5 6.75-5.5"></path>
            </svg>
          </a>
        </div>
        <a class="primary-action" href="${profile.resumePage}">View resume <span aria-hidden="true">-&gt;</span></a>
      </div>
    </section>
  `;
}
