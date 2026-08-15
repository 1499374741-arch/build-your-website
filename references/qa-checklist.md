# QA Checklist

## Content integrity

- No `REPLACE_ME`, reference-owner copy, remote reference media, or reference contact details remain.
- About contains one approved bilingual statement fitting approximately 3-5 desktop lines and no clipped or hidden text.
- About has no `More about me`, `pageHref`, detail route, second paragraph, interest chips, or second action. If a resume exists, `Download resume` points directly to the copied PDF.
- Every visible string and aria label switches between Chinese and English.
- Resume links open the approved file and follow shared/localized/hidden mode.
- Project order and links match the confirmed brief.

## Visual

- Capture 1440x900, 1024x768, and 390x844.
- Header controls never overlap. Locale circle is immediately left of theme circle and matches its visible size.
- Hero fills the first viewport, remains inspectable, and has a useful crop in both languages.
- If hero uses video, verify autoplay while muted, seamless looping, inline playback, poster fallback, no visible controls, and no layout shift or black frame.
- The next section is hinted only when the chosen viewport and browser chrome permit it; do not shrink the hero below the layout contract.
- Primary work has no empty cells or stretched media.
- Secondary rail scrolls and snaps on mobile; buttons and dots reflect position.
- Chinese uses Source Han Serif SC. English display uses the approved Gallery Modern Adobe Web Project family when supplied and automatically falls back to bundled DM Serif Display Regular 400 otherwise; English body uses Inter and metadata uses Geist Mono. Confirm the browser does not synthesize bold display weights.
- Confirm the active Work, Lab, or About navigation pill is `#111318` with a white label in both expanded and compact header states.
- Confirm Work and Lab cards contain no anchor wrapper, destination, title arrow, hover blur, overlay, View project button, hover zoom, hover color change, or active-scale feedback.
- Confirm `gallery-modern-regular.otf`, or any other Gallery Modern font binary, is absent from the project and Git history. When Adobe code is supplied, confirm the only Gallery Modern request is the approved `use.typekit.net` stylesheet. Self-host DM Serif Display and the other approved open fonts using the exact filenames declared in `globals.css`; keep their OFL notices and do not rely on system fallbacks in the delivered build.
- Test once with an empty Adobe stylesheet URL and once with a syntactically valid but unavailable Adobe family; both cases must render DM Serif Display without layout shift or console errors.
- No text clips, overlaps, or escapes buttons at either locale.

## Interaction

- Theme and locale persist after refresh.
- `<html lang>` changes between `en` and `zh-CN`.
- Mobile menu traps no scrolling and closes on navigation or Escape.
- Focus states are visible. All controls are keyboard operable.
- Card hover has an equivalent focus-visible state.
- Reduced-motion mode removes reveal transforms and long transitions.

## Engineering

- Run `npm run typecheck`, `npm run lint`, and `npm run build`.
- Check browser console for errors and media 404s.
- Optimize raster assets and provide width/height or aspect ratio.
- Verify no target-domain network request ships in the final project.
