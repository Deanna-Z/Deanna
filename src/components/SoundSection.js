import { editableText, escapeHtml } from '../utils/editor.js';

export function renderSoundSection({ isEditing, selectedMusicTrackIndex = 0, soundReel }) {
  const tracks = soundReel.musicTracks || [];
  const selectedTrack = tracks[selectedMusicTrackIndex] || tracks[0];

  return `
    <section class="section sound-section" id="soundreel">
      <div class="section-heading">
        <p class="eyebrow">${soundReel.kicker}</p>
        ${editableText({ className: 'section-title', isEditing, path: 'soundReel.title', tag: 'h2', value: soundReel.title })}
      </div>
      <div class="sound-layout">
        <div class="sound-copy">
          <span class="sound-mark">${soundReel.label}</span>
          ${editableText({ isEditing, path: 'soundReel.description', tag: 'p', value: soundReel.description })}
          ${selectedTrack ? renderMusicPlayer({ selectedMusicTrackIndex, selectedTrack, tracks }) : ''}
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

function renderMusicPlayer({ selectedMusicTrackIndex, selectedTrack, tracks }) {
  return `
    <div class="ai-music-lab">
      <div class="music-lab-heading">
        <span>AI Music Lab</span>
        <strong>Suno x Deanna</strong>
      </div>
      <div class="music-now">
        <div>
          <span>Now Playing</span>
          <strong data-now-playing-title>${escapeHtml(selectedTrack.title)}</strong>
        </div>
        <span class="music-wave" aria-hidden="true">
          <i></i><i></i><i></i><i></i><i></i>
        </span>
      </div>
      <audio class="music-audio" data-music-player controls src="${escapeHtml(selectedTrack.src)}">
        Your browser does not support audio playback.
      </audio>
      <div class="music-track-list" aria-label="Suno AI collaboration tracks">
        ${tracks.map((track, index) => `
          <button
            class="${index === selectedMusicTrackIndex ? 'music-track is-active' : 'music-track'}"
            data-audio-track="${index}"
            data-audio-src="${escapeHtml(track.src)}"
            data-audio-title="${escapeHtml(track.title)}"
            type="button"
          >
            <span>${String(index + 1).padStart(2, '0')}</span>
            <strong>${escapeHtml(track.title)}</strong>
            <small>${escapeHtml(track.note)}</small>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}
