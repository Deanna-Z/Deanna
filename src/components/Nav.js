export function renderNav({ menuOpen, profile }) {
  return `
    <header class="top-nav">
      <a class="brand-mark" href="#top" aria-label="${profile.name} home">${profile.initials}</a>
      <button class="menu-toggle" type="button" aria-label="Toggle menu">
        ${menuOpen ? 'Close' : 'Menu'}
      </button>
      <nav class="${menuOpen ? 'nav-links is-open' : 'nav-links'}">
        <a href="#work">Work</a>
        <a href="#articles">Articles</a>
        <a href="#sound">Sound</a>
        <a href="#skills">Skills</a>
        <a href="${profile.resumePdf}">Resume</a>
      </nav>
    </header>
  `;
}
