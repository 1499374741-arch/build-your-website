# Palette Contract

Offer the five built-in palettes in `assets/palettes.json`, or accept a user-supplied custom palette. The three source colors in each built-in palette must remain exact; supporting semantic neutrals may be derived for readability. When the user says `你决定`, select one from the five using the supplied content, not an external style reference.

Each approved palette must provide light and dark semantic tokens:

```json
{
  "id": "short-ascii-id",
  "label": { "en": "Name", "zh": "名称" },
  "light": {
    "background": "#ffffff",
    "foreground": "#111318",
    "muted": "#eef0f3",
    "mutedForeground": "#626873",
    "border": "#d9dde3",
    "accent": "#2877d4",
    "accentForeground": "#ffffff",
    "darkBand": "#111318",
    "darkBandForeground": "#f7f7f4"
  },
  "dark": {
    "background": "#111318",
    "foreground": "#f7f7f4",
    "muted": "#252932",
    "mutedForeground": "#aeb4bf",
    "border": "#373c46",
    "accent": "#60a9eb",
    "accentForeground": "#0f1217",
    "darkBand": "#090b0f",
    "darkBandForeground": "#f7f7f4"
  }
}
```

Validate normal text contrast at 4.5:1, large text at 3:1, and focus indicators at 3:1 against adjacent colors. Palette changes must not alter spacing, component geometry, or typography.

The source color cards authorize color extraction only. Never imitate their layout, typography, blur, gradients, artwork, slogans, or decorative composition.
