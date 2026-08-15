# Approved Style Prompt

Use this prompt as the visual implementation contract. Replace bracketed content but preserve proportions, topology, and motion.

```text
Build a premium bilingual Chinese-English personal portfolio website that follows the approved michaeltsirakis.com-inspired layout grammar without copying the reference owner's identity, writing, projects, media, logo, contact details, or resume. All personal content and media must come from the user.

DESIGN CHARACTER
Quiet, precise, editorial, and product-focused. The page must feel compact and refined rather than oversized. Preserve generous page margins and a high ratio of white space to content. Do not enlarge cards, phone mockups, section headings, navigation, buttons, or footer typography for dramatic effect. No decorative cards inside cards, no gradients, no floating blobs, and no generic marketing hero.

PAGE ORDER
1. Fixed floating navigation
2. Full-viewport hero
3. Light Selected work section
4. Dark Apps I shipped / Lab section
5. Light About section
6. Full-width accent Say hello footer

DESKTOP BASELINE
Use the approved 1280x720 CSS viewport as the dimensional baseline and scale responsively without changing the visual ratios.
- Initial header: almost full width with 19.2px side inset and 16px top inset; transparent border and background so its edges visually disappear.
- Compact header after the hero midpoint: 614.4px wide, about 43.2px high, centered, 5.6px from top, subtle 1px border, translucent background, 19.2px blur, and restrained shadow. Animate between states over 500ms with cubic-bezier(.4,0,.2,1).
- Header controls: locale and theme circles are each 28.8px. Locale sits immediately left of theme. Say Hi is 28px high with clear horizontal padding and visible distance from the capsule edge.
- Hero: 100svh, minimum 560px, full bleed. Copy sits 40px from the left and 80px from the bottom. Display name and role use 7vw, weight 600, line-height .95. Supporting copy is 18/28 and actions follow below.
- Selected work: 102.4px vertical padding. Inner width max 1120px with 38.4px horizontal padding. These outer measurements are immutable. Header block is 96.8px high with 64px gap below. Heading is 48/48. A two-column grid with 32px column gap, 51.2px row gap, 4:3 media, and 12.8px corners is the balanced baseline only. The design pass may use featured wide items, editorial staggering, or other internal composition without changing the outer measurements. Metadata is 8/12, title 22.4/25.76, summary 12/17.14.
- Lab: 102.4px vertical padding. The heading track is max 1280px with 32px horizontal padding. The project-media track is separately centered at max 1120px with 38.4px horizontal padding, exactly matching Selected Work's media edges. Heading block is 128px high with 51.2px gap below. A three-column phone gallery with 25.6px gap is one baseline only. Mixed cards and feature rows are allowed inside the narrower project track. Ordinary image cards default to 4:3. A wide feature may span the track but uses a restrained stage around 360px high on the 1280x720 baseline. Phone media remains 192px wide inside a 417.064px-high media stage and must never scale to fill the column. Captions stay compact and centered.
- Media-edge formula: `(viewport width - 1120px) / 2 + 38.4px` per side once the max-width is active. At a `2048px` viewport, Work and Lab media must begin near `502.4px` and end near `1545.6px`. A tolerance of only a few pixels is allowed for scrollbars and rendering.
- About: 102.4px vertical padding. Inner width max 1120px with 32px horizontal padding. Twelve-column grid with 9 columns for the statement and 3 for the single resume action; 51.2px gap. Statement is 32/44 and must fit approximately 3-5 desktop lines after editorial compression. Do not line-clamp it. Keep visible margins on both sides.
- Footer: inner width max 1280px with 89.6px vertical and 32px horizontal padding. Say hello aligns to the same inner gutter and uses 9vw, not full-bleed edge-to-edge text. Preserve the divider and three metadata columns.

HERO MEDIA
Ask the user to choose a 16:9 image or video.
- Image: uploaded or generated, object-fit cover, optional restrained contrast overlay.
- Video: local MP4/WebM, full bleed, object-fit cover, autoplay, muted, loop, playsInline, no visible controls, and a same-composition poster image. Avoid black first frames and layout shift.
- Default portrait composition places the subject slightly right of center and reserves calm copy-safe space at lower left. Also support centered or left-positioned subjects when confirmed.

TYPOGRAPHY AND LANGUAGE
English display: use the site owner's Gallery Modern Adobe Web Project family when supplied, with bundled DM Serif Display Regular as the automatic fallback. Use weight 400 for the hero name and role, section headings, project titles, About statement, mobile display links, and Say hello; never synthesize bold display weights. English body: Inter. English metadata: Geist Mono. Chinese: Source Han Serif SC for every role, using functional weights 600 display, 500 controls, 400 body and metadata. Keep letter-spacing at 0. The circular locale control shows 中 in English mode and EN in Chinese mode.

The active desktop navigation item uses the existing moving pill at its exact measured size. Its fill is near-black `#111318` and its label is white in both expanded and compact header states. Inactive labels retain their existing theme-aware colors.

MOTION
- Hero entrance: each heading line rises from its own clipped wrapper; 1.1s cubic-bezier(.16,1,.3,1), second line delayed 120ms. Supporting copy fades/rises after 340ms; actions after 460ms.
- Header: edges are visually absent at the top, then the bar narrows into the compact bordered capsule as the page passes the hero midpoint.
- Hero media moves down subtly during the first 900px of scroll while hero copy fades upward later in the hero.
- Section reveals trigger only when the element crosses 75% of viewport height, the line one quarter up from the bottom. Use IntersectionObserver rootMargin `0px 0px -25% 0px`. Animate opacity for 1.15s and transform for 1.25s. Work cards rise 80px with slight .975 scale; headings and footer rise 40px; Lab cards rise 48px. Stagger siblings by 100ms.
- Work and Lab cards are static display modules. Hovering must not blur, zoom, recolor, reveal an overlay or button, or imply navigation. Titles have no link arrow, and cards do not open detail pages or external destinations.
- Respect prefers-reduced-motion by removing long animations and transforms.

CONTENT BEHAVIOR
Keep all copy, projects, media, links, resume files, location, and contact details replaceable through one typed content object. Every Work and Lab project image stops at the same approved Selected Work media edges, but internal composition may be selected from the actual content. The wider Lab track is for its heading only. Record the chosen global layout and per-project span/aspect in the typed object. Use images by default for projects; support supplied videos. Hide the Lab section only when the user explicitly confirms there are no secondary projects. Never stretch source media. About contains one compressed bilingual statement and, when supplied, one Download resume action. Never render More about me or create detail routes.

PALETTE BOUNDARY
Offer the five bundled semantic palettes or a custom user palette. Palette references change color tokens only. Never borrow another site's layout, typography, effects, artwork, or visual style; the layout and style in this contract remain fixed.

QUALITY BAR
Match the approved outer proportions before adding new ideas. Do not repeat one project's Work/Lab composition merely because the starter contains it. Verify at desktop first, then tablet and mobile. At 2048px wide, compare visible project-media edges against the reference before approving any adaptive layout; a featured Lab image that reaches the wider heading track fails. Check exact container-to-viewport ratios, locked left/right margins, intentional item hierarchy, inner media scale, section spacing, header transition, hero entrance, 75%-viewport reveal trigger, bilingual wrapping, footer visibility, and console/media errors.
```
