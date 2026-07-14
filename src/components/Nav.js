export function renderNav({ menuOpen, profile }) {
  const navItems = [
    { label: 'about', href: '#about' },
    { label: 'projects', href: '#project' },
    { label: 'sound reel', href: '#soundreel' },
    { label: 'articles', href: '#articles' },
    { label: 'skills', href: '#skills' },
    { label: 'resume', href: profile.resumePdf }
  ];

  return `
    <header class="top-nav">
      <a class="brand-mark" href="#top" aria-label="${profile.name} home">${profile.initials.toLowerCase()}</a>
      <button class="menu-toggle" type="button" aria-label="Toggle menu">
        ${menuOpen ? 'Close' : 'Menu'}
      </button>
      <nav class="${menuOpen ? 'nav-links is-open' : 'nav-links'}">
        ${navItems.map((item) => `<a href="${item.href}">${item.label}</a>`).join('')}
      </nav>
      <div class="social-dock nav-social" aria-label="Contact links">
        <a class="social-link linkedin-link" href="${profile.contact.linkedin}" target="_blank" rel="noreferrer" aria-label="Open LinkedIn profile">
          <span class="linkedin-mark" aria-hidden="true">in</span>
        </a>
        <a class="social-link email-link" href="${profile.contact.email}" target="_blank" rel="noreferrer" aria-label="Send email">
          <svg class="mail-mark" aria-hidden="true" viewBox="0 0 24 24">
            <path d="M4.75 6.75h14.5v10.5H4.75z"></path>
            <path d="m5.25 7.25 6.75 5.5 6.75-5.5"></path>
          </svg>
        </a>
      </div>
    </header>
  `;
}
