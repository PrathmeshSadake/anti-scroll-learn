# Theme Guidelines Reference

These are the exact token maps available in `src/constants/theme.ts`.

## Colors (`ThemeColors` via `useThemeColors()`)

| Key | Use Case |
|---|---|
| `primary` | Main brand color (Purple: `#ce82ff`) |
| `primaryLight` / `primaryDark` | Variations for gradients or interactions |
| `accent` | Secondary semantic actions (Green: `#58CC02`) |
| `background` | Primary app background |
| `surface` | Cards, modals, overlaid structural elements |
| `surfaceLight` | Slightly elevated surface |
| `text` | Primary body text |
| `textSecondary` | Subtitles, descriptions |
| `textMuted` | Disabled or subtle text |
| `textInverse` | Text on top of solid primary/accent backgrounds |
| `success` / `error` / `warning` / `info` | Standard semantic colors |
| `border` / `borderLight` | Dividers and strokes |
| `tabBarBg` / `tabBarActive` / `tabBarInactive` | Navigation styling |
| `progressBg` / `progressFill` | Progress bars |

## Spacing (`Spacing`)

You MUST import `Spacing` from `src/constants/theme`.

- `Spacing.xs`: 4
- `Spacing.sm`: 8
- `Spacing.md`: 12
- `Spacing.lg`: 16
- `Spacing.xl`: 20
- `Spacing.xxl`: 24
- `Spacing.xxxl`: 32
- `Spacing.huge`: 48
- `Spacing.massive`: 64

## Typography

### Font Family (`FontFamily`)
Always import `FontFamily` from `src/constants/theme`. Do NOT use generic "Arial" or numerical font-weights unless setting them up.

- `FontFamily.regular`: "DMSans-Regular"
- `FontFamily.medium`: "DMSans-Medium"
- `FontFamily.semibold`: "DMSans-SemiBold"
- `FontFamily.bold`: "DMSans-Bold"
- `FontFamily.heavy`: "DMSans-ExtraBold"

*(Note: The corresponding native text `fontWeight` can also be used if needed via `FontWeight`.)*

### Font Size (`FontSize`)

- `FontSize.xs`: 11
- `FontSize.sm`: 13
- `FontSize.md`: 15
- `FontSize.lg`: 17
- `FontSize.xl`: 20
- `FontSize.xxl`: 24
- `FontSize.xxxl`: 32
- `FontSize.display`: 40

## Border Radius (`BorderRadius`)

- `BorderRadius.sm`: 8
- `BorderRadius.md`: 12
- `BorderRadius.lg`: 16
- `BorderRadius.xl`: 24
- `BorderRadius.xxl`: 48
- `BorderRadius.full`: 9999
