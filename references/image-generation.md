# Hero Media Generation

Use the host's normal AI image command. The final file must be a 16:9 bitmap, preferably 3840x2160 or 1920x1080, with no text, logo, signature, or watermark.

When the user chooses video, first create or approve a 16:9 key image using this guide, then use it as the video composition reference and poster. Generate a restrained seamless shot: one subject, stable framing, subtle natural motion, no camera whip, no scene change, no text, no watermark, and a loop-friendly ending. Export MP4 or WebM and keep the poster alongside it.

## Shared composition

- Asset type: personal portfolio hero
- Subject: one person, waist-up or three-quarter view
- Placement: follow confirmed focal point; default slightly right of center with safe negative space for lower-left copy
- Backdrop: one flat monochrome field selected from the active palette, without gradients, scenery, floating shapes, or bokeh
- Crop: keep face, hands, and silhouette away from browser and mobile control zones
- Output: 16:9 landscape; clean enough to survive `object-fit: cover` at 390x844 and 1440x900

## Flat anime generation

```text
Use case: stylized-concept
Asset type: 16:9 personal portfolio hero image
Primary request: Create a refined flat anime editorial portrait of [PERSON DESCRIPTION].
Input images: [Image 1: identity reference, if supplied]
Scene/backdrop: perfectly flat solid [BACKGROUND COLOR] monochrome background, no gradient or scenery
Subject: one person, [WAIST-UP/THREE-QUARTER], [PLACEMENT], natural confident expression
Style/medium: premium flat anime illustration, precise silhouette, restrained cel shading, clean graphic shapes, mature editorial finish
Composition/framing: 16:9 landscape, keep [COPY SIDE] usable as calm negative space, protect face and hands from edge crops
Color palette: subject colors harmonized with [PALETTE] while remaining distinct from the background
Constraints: preserve facial identity, age cues, hairstyle, skin tone, expression, and body proportions when a reference is supplied; no text, logo, watermark, props, scenery, gradient, bokeh, or extra people
Avoid: childish chibi proportions, generic stock-avatar look, exaggerated eyes, plastic skin, excessive detail behind copy
```

## 3D anime generation

```text
Use case: stylized-concept
Asset type: 16:9 personal portfolio hero image
Primary request: Create a refined stylized 3D anime portrait of [PERSON DESCRIPTION].
Input images: [Image 1: identity reference, if supplied]
Scene/backdrop: seamless flat solid [BACKGROUND COLOR] monochrome studio field, no gradient or environment
Subject: one person, [WAIST-UP/THREE-QUARTER], [PLACEMENT], natural confident expression
Style/medium: high-end stylized 3D character render, sculpted but believable features, subtle material variation, soft studio key light, restrained detail
Composition/framing: 16:9 landscape, reserve [COPY SIDE] as negative space, keep silhouette readable at mobile crop
Color palette: [PALETTE]
Constraints: preserve facial identity, age cues, hairstyle, skin tone, expression, and body proportions when a reference is supplied; no text, logo, watermark, props, scenery, gradient, bokeh, or extra people
Avoid: toy figurine, glossy plastic, hyperreal uncanny skin, oversized head, game splash-art effects
```

## Identity-preserving edit

Treat the uploaded photo as the edit target. Repeat this invariant on every iteration: `Change only rendering style and background; preserve face geometry, age, hairstyle, skin tone, expression, pose, clothing silhouette, and framing.`

## QA and iteration

Check subject resemblance, flatness of background, copy-safe negative space, mobile crop, hands, eyes, extra limbs, and absence of text. Iterate one issue at a time. Save the selected asset in the generated site under `public/media/hero.webp`; keep the original upload unchanged.
