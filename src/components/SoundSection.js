import { editableText } from '../utils/editor.js';

export function renderSoundSection({ isEditing, soundReel }) {
  return `
    <section class="section sound-section" id="sound">
      <div class="section-heading">
        <p class="eyebrow">${soundReel.kicker}</p>
        ${editableText({ isEditing, path: 'soundReel.title', tag: 'h2', value: soundReel.title })}
      </div>
      <div class="sound-layout">
        <div class="sound-copy">
          <span class="sound-mark">${soundReel.label}</span>
          ${editableText({ isEditing, path: 'soundReel.description', tag: 'p', value: soundReel.description })}
        </div>
        <div class="video-frame">
          <iframe
            src="${soundReel.embedUrl}"
            title="${soundReel.title}"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </section>
  `;
}
