import { editableText, escapeHtml } from '../utils/editor.js';

export function renderHero({ isEditing, profile, projectCount, soundReel }) {
  return `
    <section class="hero" id="top">
      <video
        class="hero-media"
        src="${profile.hero.video}"
        poster="${profile.hero.poster}"
        muted
        autoplay
        loop
        playsinline
      ></video>
      <div class="hero-overlay"></div>
      <div class="hero-hud hero-hud-left" aria-hidden="true">
        <span>PORTFOLIO / 2026</span>
        <strong>AVAILABLE</strong>
      </div>
      <div class="hero-hud hero-hud-right" aria-hidden="true">
        <span>LOCATION</span>
        <strong>${escapeHtml(profile.location)}</strong>
      </div>
      <div class="hero-content">
        ${editableText({
          className: 'eyebrow',
          isEditing,
          path: 'profile.roles',
          tag: 'p',
          value: profile.roles.join(' / ')
        })}
        ${editableText({ isEditing, path: 'profile.name', tag: 'h1', value: profile.name })}
        ${editableText({ className: 'hero-copy', isEditing, path: 'profile.intro', tag: 'p', value: profile.intro })}
        <div class="hero-actions">
          <a class="primary-action" href="#project">View project <span aria-hidden="true">-&gt;</span></a>
          <a class="secondary-action" href="${profile.resumePdf}">Resume <span aria-hidden="true">PDF</span></a>
        </div>
      </div>
      <div class="hero-focus" aria-label="Creative focus">
        <span><strong>I organize</strong> production scope and team momentum</span>
        <span><strong>I build</strong> playable systems and UE workflows</span>
        <span><strong>I tune</strong> audio identity, timing, and atmosphere</span>
      </div>
      <div class="scanline" aria-hidden="true"></div>
    </section>
  `;
}
