# Content Contract

Normalize all input into `src/content/site-content.ts`.

## Required records

- `preferences`: unique ASCII storage key, default locale (`en`, `zh`, or `browser`), and default theme (`light`, `dark`, or `system`)
- `typography`: optional site-owner Adobe Fonts Web Project stylesheet URL and its declared Gallery Modern CSS family. Keep both empty/omitted to use bundled DM Serif Display automatically.
- `layout`: Work composition (`balanced-grid`, `feature-first`, or `editorial-stack`) and Lab composition (`phone-gallery`, `mixed-grid`, or `showcase`), chosen after the design pass rather than copied from another site
- `person`: slug, bilingual display name, bilingual role, bilingual hero support text, location, email
- `navigation`: bilingual Work, Lab, About, Resume, Say Hi labels
- `hero`: image or video path, media type, alt text in both languages, object position, optional poster for video, and optional dark overlay strength. A deferred hero is permitted during intake only; never ship its placeholder.
- `work`: 1-8 primary records with bilingual title, metadata, summary, alt text, media path/type, year, and optional `layout.span/mediaAspect`. Do not include card destinations or detail-page fields.
- `lab`: zero or more secondary records with bilingual title, description, metadata, alt text, media path/type, presentation variant, and optional `layout.span/mediaAspect`
- `about`: one approved bilingual statement compressed to the fixed About measure
- `resume`: shared PDF, locale-specific paths, or explicit hidden mode
- `contact`: email, approved social links, location label, copyright name
- `palette`: active palette id and semantic color tokens

## Pairing rules

- Every visible English string must have a Chinese counterpart and vice versa.
- Preserve URLs, company names, product names, and dates unless the user requests localized forms.
- Translate meaning, not line breaks. Allow CSS to reflow each locale independently.
- Localize aria labels, image alt text, page title, description, menu controls, and download labels.
- Missing translation is a blocker unless the user explicitly authorizes agent translation. Mark generated translations for approval in the build brief.

## Typography

- Accept Gallery Modern only through the site owner's Adobe Fonts Web Project URL matching `https://use.typekit.net/<project-id>.css`.
- Never place a Gallery Modern font binary in `public/fonts`, the generated project, the Skill, an archive, or source control.
- Put the Adobe CSS family first in `--font-display` and bundled `DM Serif Display` second. This CSS stack must fall back automatically if the Adobe stylesheet is absent, invalid, blocked, or no longer active.
- Use DM Serif Display Regular only at weight 400 for English display roles. Keep its `DMSerifDisplay-OFL.txt` beside the font file.

## Layout rules

- Treat `layout` values as the recorded output of a design decision, not user-entered decoration.
- Keep every Work and Lab project-media track at max-width `1120px` with `38.4px` horizontal padding on the approved desktop baseline. Lab headings may use max-width `1280px` with `32px` horizontal padding.
- Use `span: "wide"` only when an item has stronger evidence, a genuinely wide visual, or narrative priority. Use `mediaAspect` to crop intentionally, never to distort.
- If the bundled composition families cannot represent the supplied material well, add a project-specific internal grid while preserving the same project-media edges. Never use the wider Lab heading track for cards.
- Keep Work and Lab cards non-interactive. Store content and media only; do not add `href`, `linkMode`, hover labels, or case-study routes.

## Resume

- `mode: "shared"`: both locales link to the same PDF.
- `mode: "localized"`: English and Chinese link to separate PDFs.
- `mode: "hidden"`: remove all resume links consistently, including mobile menu and about actions.

## About

- Store one `statement` only. Do not add `body`, `interests`, `pageHref`, or detailed-page content.
- Compress long source biographies to approximately 24-40 English words and 45-75 Chinese characters, then verify both locales fit about 3-5 lines at the approved desktop baseline.
- Preserve core identity, disciplines, and point of view. Do not silently truncate with CSS line clamping.
- The only About action is `Download resume` when a resume exists. Never add `More about me` or another route.

## Privacy

Do not expose file-system paths, private addresses, personal IDs, private phone numbers, or document metadata. Strip resume metadata when practical and use public-facing filenames.
