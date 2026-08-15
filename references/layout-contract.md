# Layout Contract

This contract is derived from the public reference at `https://michaeltsirakis.com/`. Reproduce the layout grammar only. Do not reuse its copy, project assets, videos, logo, portrait, email, or resume.

## Global topology

1. Fixed floating header
2. Full-viewport hero
3. Light primary portfolio band
4. Dark secondary-project band
5. Light about band
6. Full-width accent contact footer

Use `100svh` for hero height with a `560px` minimum. Use 24px mobile gutters. On the approved desktop baseline, primary work and About cap at 1120px, while Lab headings and footer cap at 1280px. All Work and Lab project media uses the same centered 1120px track with 38.4px internal gutters. Use the exact measurements in `style-prompt.md`.

## Header

- Desktop at the top: a nearly full-width transparent bar whose border visually disappears. After the hero midpoint it animates into a centered 614.4px capsule about 43.2px high.
- Keep brand left, Work/Lab/About pill navigation centered, controls and Say Hi right.
- Add locale control immediately before theme control. Both are 28.8x28.8 circles on the desktop baseline with identical border, background, blur, and hover treatment.
- Locale label is the destination language: `中` while viewing English and `EN` while viewing Chinese.
- Mobile: brand, locale, theme, and 44x44 menu control. Hide desktop nav and Say Hi. Expanded menu is a large rounded top panel with Work, Lab, About, Resume, and Say Hi.
- Maintain at least 44px mobile touch targets even when the visible circular control is 36px.

## Hero

- Use one full-bleed 16:9 image or video with `object-fit: cover`; never place hero media inside a card. Image is the default. Hero video autoplays muted, loops, plays inline, has no visible controls, and uses a matching poster image.
- Place identity copy in the lower-left region. Desktop display type is 7vw with 0.95 line height and weight 600 on the approved baseline. Mobile uses 11vw with stable containment.
- Layer name, role/value line, short supporting sentence, then two actions: View my work and About me.
- Use a restrained contrast overlay only when needed for text legibility. Do not obscure the portrait.

## Primary work

- Start with an asymmetric section header: label and large `Selected work` heading left, short context paragraph right, divider below.
- A four-item 2x2 grid with 4:3 media is the balanced baseline, not a universal rule. Depending on supplied media and priority, use a featured wide item, an editorial stagger, or a project-specific internal grid. Text order remains mono metadata, project title, one-sentence summary.
- Cards are static display modules. Do not add hover blur, media scale, overlays, View project buttons, title recoloring, active scaling, title arrows, links, or detail-page navigation.
- Mobile always becomes one column. Never leave an empty grid cell.
- Read `adaptive-work-layout.md` whenever count, media shape, or evidence depth differs.

## Secondary projects / lab

- Use a dark ink band and a large heading with a short accent phrase.
- A three-column phone gallery is one valid baseline, not a universal rule. Place every Lab project layout on the same `1120px / 38.4px` media track as Selected Work. Phone-oriented screenshots use a narrow 720:1564 device frame, 192px wide on the approved baseline, with 30.72px outer radius and 4.8px frame padding. Keep the surrounding media stage about 417px high so the device never fills the column.
- Non-phone media uses 4:3 by default. A justified wide feature may span the full media track but remains vertically restrained and cannot expand into the wider Lab heading track. Do not force every project into a fake phone.
- Mobile uses horizontal scroll snap, roughly 75vw card width capped at 320px, with compact arrow controls and position dots.
- Hide the entire band when there are no secondary items and the user confirms omission.

## About

- Large bilingual personal statement on the left and one resume action on the right. Do not render a second paragraph or interest/skill chips.
- Compress any source biography to approximately 3-5 desktop lines at the approved 32/44 statement scale, then obtain approval. Preserve meaning; do not line-clamp or hide overflow.
- Link `Download resume` directly to the uploaded PDF and keep Resume in the mobile menu. Do not render `More about me`, `pageHref`, an About detail route, or a second About action.

## Footer

- Full accent band. Large `Say hello` action, divider, then Email / Elsewhere / Based in columns.
- End with copyright and a short build credit. Replace every field.

## Typography

- English display: the site owner's Gallery Modern Adobe Web Project family when supplied, then bundled DM Serif Display Regular 400 as the automatic fallback; never synthesize heavier display weights. English body: Inter 400/500; English metadata: Geist Mono 400/500.
- Chinese locale: Source Han Serif SC for display, body, navigation, labels, and metadata. Map functional weights as display 600, navigation/buttons 500, body 400, metadata 400. Do not fake bold beyond installed weights.
- Use normal letter spacing for Chinese. Increase Chinese line-height by about 0.08-0.15 over equivalent English roles where needed.
- Do not scale font size directly with viewport width; use `clamp()` with stable limits.

## Color and theme

- Baseline light: white background, near-black ink, neutral border, court-blue accent.
- Baseline dark: near-black background, warm white text, brighter blue accent.
- Theme control toggles the root class, persists locally, and respects reduced motion.
- User palettes may change color only, not layout or semantic contrast roles.

## Interaction model

- Hero media is static for images. A confirmed hero video uses muted autoplay and looping unless the user explicitly requests click-to-play.
- Header/menu/theme/locale are click-driven.
- Cards are static presentation modules and have no hover/focus transformation or destination.
- Section reveals are scroll-driven with IntersectionObserver. Trigger when the element crosses the line at 75% of viewport height (`rootMargin: 0 0 -25% 0`), not the screen midpoint. Animate opacity for about 1.15s and transform for about 1.25s; disable transforms for reduced motion.
- Secondary mobile rail is swipe/scroll-driven plus optional buttons.
- Include a scroll-to-top control only after the first viewport.

## Detail pages

Do not generate detail pages. Keep project records and component boundaries clean so the site owner can add routes later.
