---
name: build-your-website
description: Build a replaceable Chinese-English personal portfolio website through a sequential, material-aware upload-and-question workflow. Use when a user wants a personal homepage, portfolio, resume site, or bilingual creator site with a locked michaeltsirakis.com-inspired layout, user-supplied Work/Lab media, downloadable resume, a concise About statement, an uploaded or generated 16:9 hero image or video, five built-in palettes, theme switching, locale switching, and adaptive project grids.
---

# Build Your Website

Create a production-ready personal site from the bundled Next.js starter. Preserve the reference layout contract, not the reference owner's identity, writing, projects, media, marks, or resume.

## Non-negotiable behavior

- Run intake as a sequence of small, adaptive upload-and-question stages. Request only the material category needed for the current visible page fields, inspect it, summarize what was understood, ask up to three missing-field questions, and only then move forward. Never ask the user to upload every asset at once. Accept text, folders, images, video, PDF, DOCX, links, screenshots, and resumes at their relevant stages.
- Do not begin visual implementation after the first answer. Run the staged interview in `references/interview-workflow.md`.
- Ask at most three related questions per turn. Give 2-4 concrete options only when a real choice exists, recommend the evident option when the material makes it clear, and always accept `其他`, `都可以/你决定`, `没有`, and free-form answers.
- Ask only for content or behavior that appears in the locked site: displayed identity and bilingual copy, hero media, Work, Lab, About statement, resume download, public contact fields, locale/theme defaults, and palette. Never ask about website purpose, target audience, page scope, reference websites, alternative visual styles, or motion preference. Those decisions are already fixed by this skill.
- Keep internal workflow language invisible. User-facing messages must not say `处理屏首`, `处理 About`, `进入下一阶段`, `这一轮`, `下一步`, `Stage`, `模块`, or `部分`. Ask naturally for the needed material and silently map it to the correct site field.
- Inventory every received file immediately within its current stage before asking for missing information. Never ask again for facts already present in the files. If the user uploads future-stage material early, preserve and inventory it, then continue from the current stage without requesting it again later.
- Attempt to inspect each attachment with the available format-appropriate reader before questioning the user. Distinguish `received only`, `parsed`, `partially parsed`, and `unreadable`. Never claim to have read a PDF, DOCX, folder, image, or link when only its filename or the user's description is available.
- Keep the homepage section order, navigation placement, button placement, responsive behavior, and interaction model in `references/layout-contract.md`.
- Read `references/style-prompt.md` before implementation and treat its desktop proportions and motion timings as the approved visual baseline. Do not enlarge cards, containers, navigation, or internal mockups for dramatic effect.
- Replace every content field and every media asset. Never download or ship the reference site's personal content or assets.
- Use Gallery Modern only through the site owner's Adobe Fonts Web Project stylesheet. Never copy, bundle, upload, self-host, or redistribute a Gallery Modern font file. Accept the owner's Adobe embed code or `https://use.typekit.net/<project-id>.css` URL, extract the stylesheet URL, inspect the stylesheet for its declared CSS family when possible, and store both values in `typography.adobeWebProject`. Keep DM Serif Display Regular 400 bundled as the automatic display fallback when no Adobe project is supplied or the Adobe font fails to load. Use Inter for English body, Geist Mono for English metadata, and Source Han Serif SC for Chinese with matched functional weights. Never synthesize heavier display weights.
- Place a 28.8px circular locale control immediately left of the 28.8px theme control on the approved desktop baseline. Show `中` in English mode and `EN` in Chinese mode.
- Keep the measured desktop navigation indicator dimensions and travel distances unchanged. The active Work, Lab, or About item must use a near-black `#111318` pill with a white label in both expanded and compact header states.
- Render every Work and Lab item as a static presentation card. Do not add card links, detail routes, external destinations, title arrows, hover blur, hover overlays, View project buttons, hover zoom, hover title recoloring, or active-scale feedback. Preserve project slugs and clean component boundaries so the site owner can add interaction later.
- Use a user-uploaded or AI-generated 16:9 hero image or video. Ask which medium the user wants; image remains the default when undecided. For video, use a local MP4/WebM plus a same-composition poster, autoplay muted, loop, play inline, and hide player controls. If the user explicitly postpones the hero, finish the interview and brief but mark final site delivery blocked until a real hero asset arrives. Read `references/image-generation.md` when generation or portrait conversion is requested.
- Default portfolio media to images. Use video only when the user supplies it and confirms autoplay or click-to-play behavior.
- Lock the approved project-media edges: Work uses a centered `1120px` track with `38.4px` horizontal padding, and every Lab project layout uses that same `1120px / 38.4px` media track. Lab headings may retain the wider `1280px / 32px` section track. Do not let featured items expand into that wider heading track, and do not treat the bundled Work or Lab grid as a fixed design.
- Read `references/adaptive-work-layout.md` and choose composition from the actual media inventory, item count, aspect ratios, and evidence strength. If `design-taste-frontend` is installed, invoke it and record its layout decision in `site-content.ts`; otherwise apply the bundled decision rules. Do not mechanically reuse the same Work/Lab composition across unrelated users.
- Offer the five built-in palettes from `assets/palettes.json`, or accept a user-supplied custom palette. Use color references only for semantic color extraction; never imitate their typography, composition, effects, or page style. Validate the selected or supplied palette against `references/palette-contract.md`.
- Compress any supplied biography into one bilingual About statement that fits approximately 3-5 desktop lines at the approved 32/44 type scale. Preserve the user's essential identity, disciplines, and point of view; remove chronology, repetition, and resume detail. Show the edited statement for approval before build.
- Keep only the `Download resume` action in About. Never add `More about me`, an About detail route, `pageHref`, a second About button, or any other route from this section.

## Workflow

1. Read `references/interview-workflow.md` and begin at Stage 0.
2. Maintain a cumulative material inventory and missing-data ledger after every stage.
3. Read `references/content-contract.md`; normalize files and answers into one `site-content.ts` object. Keep English and Chinese fields paired.
4. Present a concise build brief for confirmation: displayed identity, project order, hero mode, compressed About statement, selected palette, locale behavior, resume behavior, display-font source, and the Work/Lab layout decision.
5. Scaffold with:

   ```bash
   node scripts/scaffold.mjs --output <target-directory>
   ```

6. Copy user assets into `public/media/` with descriptive ASCII filenames. Do not overwrite originals.
7. Replace all `REPLACE_ME` values in `src/content/site-content.ts`. Run:

   ```bash
   node scripts/validate-content.mjs <target-directory>/src/content/site-content.ts
   ```

8. If hero media is missing, generate or edit an image using `references/image-generation.md`, or collect/generate the confirmed video and its poster. Save final project assets under `public/media/`.
9. Implement project media and adaptive layout. Set `layout.work`, `layout.lab`, and per-project `layout.span/mediaAspect` from the design pass. Keep the approved outer gutters unchanged and never stretch source media.
10. Run typecheck, lint, build, and visual QA at 1440x900, 1024x768, and 390x844. Read `references/qa-checklist.md` before declaring completion.

## Output rules

- Deliver a complete runnable project, not a mockup or prose-only proposal.
- Use real user content only. Clearly block delivery if required identity, hero, or resume assets still contain placeholders.
- Preserve locale and theme across navigation with local storage and update `<html lang>`.
- Ensure every visible string, aria label, alt text, metadata field, and resume label is localized.
- Use one shared resume PDF or separate EN/ZH PDFs according to the user's answer. A resume is optional: when the user chooses hidden, remove it consistently from desktop navigation, mobile menu, About, and metadata. Hide no requested section silently.
- Include source files, optimized media, and a short run command in the final handoff.
