# Content Guide

This site is organized so new portfolio content can be added from `src/data/`
without editing the main page logic.

## Add A Project

1. Put project media in:

   ```text
   images/projects/project-id/
   ```

2. Add a new object to:

   ```text
   src/data/projects.js
   ```

   Example:

   ```js
   {
     id: 'new-project',
     title: 'New Project',
     category: 'Games',
     role: 'Sound Designer',
     year: '2026',
     short: 'One sentence summary.',
     description: 'Longer project description.',
     image: '/Deanna/images/projects/new-project/cover.png',
     link: '/Deanna/projects/new-project/',
     external: false,
     tags: ['Unity', 'Sound Design', 'Gameplay'],
     icon: 'Game'
   }
   ```

## Add An Article

1. Put article images in:

   ```text
   images/articles/article-id/
   ```

2. Add a new object to:

   ```text
   src/data/articles.js
   ```

   Example:

   ```js
   {
     id: 'new-article',
     title: 'New Article',
     date: '2026-06-23',
     category: 'Sound Design',
     cover: '/Deanna/images/articles/new-article/cover.png',
     excerpt: 'Short summary shown on the homepage.',
     tags: ['Audio', 'Process']
   }
   ```

## Edit About / Hero / Resume

Change:

```text
src/data/profile.js
```

## Edit Sound Reel

Change:

```text
src/data/sound.js
```

## Preview Locally

PowerShell may block `npm`, so use `npm.cmd`:

```powershell
cd D:\github\Deanna
npm.cmd run dev
```

Open:

```text
http://127.0.0.1:5173/Deanna/
```

## Edit In The Browser

The homepage has an `Edit Mode` toolbar.

- `Edit Mode`: click it, then click editable text directly on the page.
- Text saves to this browser's `localStorage` after you click away from the edited text.
- `Export JSON`: copies your local edits to the clipboard.
- `Reset`: clears local browser edits and returns to the data files.

Because this is a static GitHub Pages site, browser edits do not automatically
write back into repo files. Permanent changes should still be copied into:

```text
src/data/profile.js
src/data/projects.js
src/data/articles.js
src/data/sound.js
```
