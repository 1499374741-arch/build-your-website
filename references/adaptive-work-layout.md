# Adaptive Work And Lab Layout

Choose composition from the uploaded material. Lock the outer geometry, not the grid.

## Immutable outer geometry

- Work project track: max-width `1120px`, horizontal padding `38.4px` on the approved desktop baseline.
- Lab project track: use the same max-width `1120px` and horizontal padding `38.4px`. The Lab heading may remain on its wider max-width `1280px`, horizontal padding `32px` track.
- For viewports at or above `1120px`, calculate each visible media edge as `(viewport width - 1120px) / 2 + 38.4px`. At `2048px`, the target is about `502.4px` from both sides.
- Preserve section order, heading coordinates, typography roles, navigation, footer, and reveal behavior.
- Mobile collapses to one readable column or the approved Lab scroll rail.

Do not enlarge the project-media track to make a featured item feel more dramatic. A wide Lab item must still stop at the same left and right coordinates as Selected Work. Do not reduce the side distance to fit another column.

## Design pass

Invoke `design-taste-frontend` after inventory and content mapping. Set a design read and the three dials, then decide:

1. Which visitor the portfolio must persuade.
2. Which work has the strongest evidence and visual quality.
3. Which assets are naturally wide, square, 4:3, or portrait.
4. Whether the item set needs equal comparison, a clear lead item, or editorial pacing.
5. Whether Lab contains phone screenshots, websites, images, video, or mixed media.

Record the result in `site-content.ts` using global layout modes plus per-project `span` and `mediaAspect`. Do not mechanically reuse the previous user's decision.

## Work composition families

| Mode | Use when | Typical structure |
| --- | --- | --- |
| `balanced-grid` | Items have similar importance and comparable 4:3 evidence | two equal columns; optional intentional wide item |
| `feature-first` | One or two items carry the strongest story or wide media | full-width feature, paired supporting items, optional closing feature |
| `editorial-stack` | Media shapes and narrative depth vary | staggered seven-column items with controlled white space |

The modes are starting structures, not a closed design library. Add a project-specific internal grid when the material needs another composition. Preserve the immutable project-media track.

## Lab composition families

| Mode | Use when | Typical structure |
| --- | --- | --- |
| `phone-gallery` | Most items are portrait app screenshots of similar importance | three compact phone stages; phones remain 192px wide |
| `mixed-grid` | Lab includes websites, images, film, code studies, or mixed shapes | one restrained wide feature plus paired 4:3 image cards |
| `showcase` | A larger set needs scanning with one or more highlighted experiments | 12-column grid with controlled feature spans |

Use phone frames only for real portrait app screenshots. Do not put photography, websites, writing, or film stills inside fake devices.

## Per-project decisions

- `span: "single"`: normal item in the chosen layout.
- `span: "wide"`: full-track emphasis justified by evidence, priority, or source ratio. It may span columns but cannot exceed the Selected Work media edges.
- `mediaAspect: "four-three"`: product screenshots and comparable work.
- `mediaAspect: "wide"`: film, landscape photography, identity systems, or feature narratives.
- `mediaAspect: "square"`: square-native artwork only.

Preserve source media with `object-position` chosen per item. Make thumbnail derivatives instead of loading oversized originals. Never distort an asset to satisfy a layout.

## Count and rhythm checks

- Use exactly as many cells as there are projects. Never leave an empty cell.
- With 9+ primary works, recommend 6-8 selected items plus a localized archive action unless the user explicitly wants all.
- Avoid repeating the same media ratio and span without content justification.
- Lengthen the section for additional rows instead of widening its

### Span parity rule (default for Work and Lab grids)

Apply this per-section when no stronger narrative reason overrides it:

- **Even count** — every item uses `span: "single"`. Render as equal-width columns across rows (typically two columns). Do not promote the first item to wide.
- **Odd count** — the first item uses `span: "wide"` as the lead, and the remaining even number of items use `span: "single"` in equal columns.

This prevents the "one large + three small" imbalance that a single wide item creates with an even total, and keeps every grid cell filled. container.
- Rank by visitor relevance, evidence quality, visual strength, recency, and user priority. Do not rank by client fame alone.

## Acceptance test

Before delivery, compare two materially different user inventories. Their Work/Lab compositions should differ when their media and priorities differ, while every project image stops at the same approved left and right coordinates as Selected Work.
