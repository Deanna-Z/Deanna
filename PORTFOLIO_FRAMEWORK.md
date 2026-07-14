# Deanna Portfolio Page Framework

This file is a planning framework for the homepage. Use it as the source of truth before adding or changing projects.

## Top Navigation

Order:

- dz
- project
- soundreel
- articles
- skills
- resume

Purpose:

- Keep navigation short and portfolio-focused.
- Each label should point to one clear section.
- Avoid adding too many top-level items. If something is a project, put it inside `project`.

Update files:

- `src/components/Nav.js`
- `src/data/profile.js` for resume links and identity text

## Screen 1: Hero / Identity

Goal:

- Tell visitors who you are in the first 5 seconds.
- Make the portfolio feel memorable before they scroll.

Content:

- Name: Deanna Zhao
- Role line: Game Producer / Product Manager / Game Developer / Audio Creator
- Short intro: one clear sentence about what kind of work you make
- Primary button: View project
- Secondary button: Resume PDF
- Small LinkedIn and Email icon links
- Background: strongest visual or video from your work

Design notes:

- This should feel cinematic and personal.
- Do not overload it with project details.
- The hero should answer: "Who is this person and what world do they work in?"

Update files:

- `src/data/profile.js`
- Hero video/poster images in `images/`

## Screen 2: About Me

Goal:

- Give the visitor a clearer sense of who you are before they evaluate the work.
- Connect your identity, working style, and strengths.

Content:

- A strong about headline
- One paragraph about your practice
- 3 short highlights about how you work

Design notes:

- This should feel like a full screen, not a small bio footer.
- Keep the writing human and specific.
- Avoid repeating the hero line exactly.

Update files:

- `src/data/profile.js`
- `src/components/AboutSection.js` if the layout needs to change

## Screen 3: Project Reel

Goal:

- Give a fast visual impression of your work.
- Let the visitor feel the range before reading details.

Content:

- Auto-scrolling project cards
- Each card needs:
  - project title
  - category
  - short one-line description
  - strong image

Design notes:

- This is the emotional preview layer.
- Images matter more than long text here.
- Keep descriptions short.

Update files:

- `src/data/projects.js`
- Project images in `images/project_folder/`

## Screen 4: Featured Project Spotlight

Goal:

- Let one selected project become the main story.
- Give enough context for recruiters or collaborators to understand your role.

Content:

- Large project image
- Category
- Year
- Role
- Project title
- 2-3 sentence description
- Tags
- Open project link

Recommended writing structure:

- Sentence 1: What the project is.
- Sentence 2: What you were responsible for.
- Sentence 3: What makes it worth showing.

Design notes:

- This section should feel more intentional and slower than the reel.
- Use this for your best or most relevant project first.

Update files:

- `src/data/projects.js`

## Screen 5: Project Archive

Goal:

- Make it easy to scan all projects.
- Make adding new projects predictable.

Content:

- Filter buttons generated from project categories
- Project cards for all work
- Each project card needs:
  - image
  - title
  - year
  - role
  - category
  - short description

Project categories:

- Games
- Tools
- Sound
- Articles or Research, if needed later

Design notes:

- This is the practical browsing area.
- Keep card structure consistent so new projects do not break the layout.
- Every project should have the same data fields, even if the description is short.

Update files:

- `src/data/projects.js`

New project template:

```js
{
  id: 'project-id',
  title: 'Project Title',
  category: 'Games',
  role: 'Your Role',
  year: '2026',
  short: 'One sentence summary for cards and reel.',
  description:
    'Two or three sentences explaining what the project is, what you did, and why it matters.',
  image: new URL('../../images/project_folder/image_01.png', import.meta.url).href,
  link: sitePath('project_folder/'),
  external: false,
  tags: ['Tag One', 'Tag Two', 'Tag Three'],
  icon: 'Game'
}
```

## Screen 6: Soundreel

Goal:

- Separate your audio identity from general projects.
- Make sound feel like a real specialty, not just a side note.

Content:

- Section title
- Short description of your sound design direction
- Embedded video or reel
- Optional future additions:
  - audio breakdown
  - sound categories
  - tools used
  - selected cues

Design notes:

- Keep this focused.
- If the reel is strong, let the video breathe.
- Avoid putting too many text blocks next to the video.

Update files:

- `src/data/sound.js`
- `src/components/SoundSection.js` if the layout needs extra blocks

## Screen 7: Articles / Devlog

Goal:

- Show thinking, process, and communication ability.
- Give depth beyond finished project images.

Content:

- Article title
- Date
- Category
- Cover image
- Short excerpt
- Tags

Possible article types:

- Production breakdown
- UE5 tool process
- Audio design notes
- Game jam reflection
- Product/design thinking

Design notes:

- Articles should feel like a thoughtful archive.
- Keep titles specific.
- Use article excerpts to explain why the post matters.

Update files:

- `src/data/articles.js`

## Screen 8: Skills

Goal:

- Summarize your working strengths clearly.
- Help recruiters understand what roles fit you.

Content:

- 3-6 skill cards
- Each card should have:
  - skill title
  - short explanation
  - optional icon label

Suggested skill groups:

- Game Production
- Product & Gameplay
- Audio Creation
- Unreal / Technical Tools
- Team Communication
- Creative Direction

Design notes:

- Skills should be readable, not decorative.
- Avoid long paragraphs.
- Each card should describe what you can do in a team.

Update files:

- `src/data/projects.js` currently stores `skills`

## Screen 9: Contact / Closing

Goal:

- End with a clear next step.
- Make it easy to contact you or view resume.

Content:

- Short closing sentence
- Email or contact button
- Resume link
- Optional social links

Design notes:

- Keep it simple.
- This is a conversion section, not a new portfolio section.
- Repeat LinkedIn and Email here so visitors have a clear contact point after browsing.

Update files:

- `src/data/profile.js`
- `src/components/ContactSection.js`

## Future Project Page Framework

For each individual project page, use this order:

1. Project hero
2. One-sentence summary
3. Role and timeline
4. Problem / goal
5. What I did
6. Process images or clips
7. Result / reflection
8. Tools used
9. Back to project archive

Each project page should answer:

- What is this?
- What was my role?
- What did I actually make or manage?
- What skills does this prove?
- What should the viewer remember?
